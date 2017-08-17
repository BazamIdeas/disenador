angular.module("administrador")

    /* header */

    .controller('headerController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'SweetAlert', 'clientesService', '$rootScope', function ($state, $mdSidenav, $mdMenu, $scope, SweetAlert, clientesService, $rootScope) {

        var bz = this;

        /* FUNCION SALIR DE SESION */

        this.salir = function () {
            SweetAlert.swal("Has cerrado sesion", "Vuelve pronto!", "success");
            clientesService.salir();
            $state.go('login');
        }

        /* VERIFICA SI EL USUARIO ESTA AUTORIZADO Y LO VIGILA */

        bz.autorizado = clientesService.autorizado();

        /* MOSTRAR TOKEN 
        console.log(bz.autorizado.token)
        */
        $scope.$watch('$root.objectoCliente', function (valor, nuevoValor) {
            if (valor !== nuevoValor) {
                bz.autorizado = $rootScope.objectoCliente;

            }
        });

        bz.menuMostrar = function () {
            bz.hmenuMostrar = !bz.hmenuMostrar;
        }

        if ($rootScope.objectoCliente) {
            bz.nombreEstado = $rootScope.objectoCliente.nombre;
        }

    }])

    .controller('sidenavController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'clientesService', '$rootScope', function ($state, $mdSidenav, $mdDialog, $scope, clientesService, $rootScope) {

        var bz = this;

        /* VERIFICA SI EL USUARIO ESTA AUTORIZADO Y LO VIGILA */

        bz.autorizado = clientesService.autorizado();

        $scope.$watch('$root.objectoCliente', function (valor, nuevoValor) {
            if (valor !== nuevoValor) {
                bz.autorizado = bz.autorizado = $rootScope.objectoCliente;
            }
        });

        /* INTERVALO DE ABRIR Y CERRAR EL MENU */
        bz.cambiarMenu = function (lugar) {
            return $mdSidenav('left').toggle();
        }

    }])

    .controller('clienteController', ["$state", "$mdSidenav", "clientesServiceAdmin", '$scope', 'pedidosService', 'SweetAlert', '$window', 'notificacionService', function ($state, $mdSidenav, clientesServiceAdmin, $scope, pedidosService, SweetAlert, $window, notificacionService) {
        var bz = this;
        bz.loaderMostrar = true;
        bz.clientes = [];
        bz.mostrarPedido = false;
        bz.pedidosC = [];

        bz.filtrosActivos;


        /* LISTAR TODOS LOS CLIENTES */

        bz.listarC = function () {
            var elementosLista = document.querySelectorAll('.lista .elemento.true');
            for (i = 0; i < elementosLista.length; i++) {
                elementosLista[i].classList.remove('true');
            }

            bz.clientes = [];
            bz.mostrarC = !bz.mostrarC;
            bz.mostrarPedido = false;

            clientesServiceAdmin.listarClientes().then(function (res) {
                    bz.loaderMostrar = false;
                    angular.forEach(res.data, function (valor, llave) {
                        bz.clientes.push(valor);
                        bz.clientes[llave].estadoE = false;
                    })
                })
                .catch(function (res) {
                    notificacionService.mensaje(res);
                })
        }

        bz.listarC()

        /* ELIMINAR CLIENTE */

        bz.eliminarC = function (idCliente, index) {
            clientesServiceAdmin.borrarCliente(idCliente).then(function (res) {
                SweetAlert.swal("Eliminado", "", "error");

            })
            delete bz.clientes[index];
        }

        /* TODOS LOS PEDIDOS DE UN CLIENTE */

        bz.pedidosCliente = function (id, index) {
            bz.pedidosC = [];
            bz.mostrarPedido = true;

            pedidosService.pedidosCliente(id).then(function (res) {
                angular.forEach(res.data, function (valor, llave) {
                    bz.pedidosC.push(valor);
                })
                bz.validarP = false;
            }).catch(function (res) {
                bz.validarP = true;
                notificacionService.mensaje('No existen pedidos de este cliente.');
            })
        }

        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado, index) {
            pedidosService.cambiarEstado(id, estado).then(function (res) {
                notificacionService.mensaje('Estado Cambiado!');
                bz.pedidosC[index].estado = estado;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.activar = function (event) {
            var elementosLista = document.querySelectorAll('.lista .elemento.true');
            var elementoActual = event.currentTarget;

            for (i = 0; i < elementosLista.length; i++) {
                elementosLista[i].classList.remove('true');
            }

            elementoActual.classList.add('true');
        }


    }])
    .controller('administrarController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'administrarService', 'paisesValue', 'monedasValue', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService) {

        var bz = this;

        this.datos = {
            impuestos: [],
            planes: [],
            nuevoPlan: {},
            modificarNombrePlan: {},
            modificarImpuesto: {},
            nuevoPrecioPlan: {},
            nuevoImpuesto: {},
            planDetalles: {},
            accionesVista: 0,
            bloquearPlan: {},
            preciosPlan:[]
        };
        bz.monedas = monedasValue;
        bz.paises = paisesValue;

        /* FUNCION PARA LISTAR PLANES Y IMPUESTOS */

        bz.mostrarPlanes = false;
        bz.mostrarImpuestos = false;

        bz.listar = function (opcion, cerrar) {
            bz.datos.accionesVista = 0;
            administrarService.listar(opcion).then(function (res) {
                if (opcion == 'planes') {
                    bz.mostrarPlanes = !bz.mostrarPlanes;
                    bz.datos.planes = res;
                    for(i = 0; i < bz.datos.planes.length; i++){
                        if (bz.datos.planes[i].status == 1) {
                            bz.datos.planes[i].estado = true;
                        }else{
                            bz.datos.planes[i].estado = false;
                        }
                    };
                } else if (opcion == 'impuestos') {
                    if(!cerrar){
                        bz.mostrarImpuestos = !bz.mostrarImpuestos;
                    }
                    bz.datos.impuestos = res;
                }
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        /* FUNCION PARA AGREGAR UN PLAN O IMPUESTO O PRECIO */

        bz.agregar = function (opcion, datos, validacion) {
            if (opcion == 'impuesto') {
                angular.forEach(bz.datos.impuestos, function (valor) {
                    if (valor.localidad == datos.localidad) {
                        validacion = false;
                        bz.localidadVal = 'Esta Localidad Ya esta en uso';
                    }
                });

            } else if (opcion == 'plan') {
                angular.forEach(bz.datos.planes, function (valor) {
                    if (valor.plan == datos.plan) {
                        validacion = false;
                        bz.localidadVal2 = 'Esta Nombre Ya esta en uso';
                    }
                });
            }else if(opcion == 'nuevoPrecioPlan'){
                validacion = true;
            }

            if (validacion) {

                administrarService.agregar(opcion, datos).then(function (res) {
                    if (opcion == 'impuesto') {
                        bz.datos.impuestos.push(datos);
                        bz.datos.nuevoImpuesto = {};
                    } else if (opcion == 'plan') {
                        bz.datos.planes.push(datos);
                        bz.datos.nuevoPlan = {};
                    } else if (opcion == 'nuevoPrecioPlan') {
                        document.getElementById('nuevoPrecioPlan').reset();
                        bz.datos.nuevoPrecioPlan = {};
                        bz.datos.accionesVista = 0;
                    }
                    notificacionService.mensaje('Peticion Realizada!');
                    bz.localidadVal = ' ';
                }).catch(function (res) {
                    console.log(res)
                })
            }
        }

        /* FUNCION PARA MODIFICAR UN PLAN O IMPUESTO */

        bz.modificar = function (opcion, datos, validacion) {
            if (validacion) {
                administrarService.modificar(opcion, datos).then(function (res) {
                    if (opcion == 'impuesto') {
                        bz.datos.impuestos[bz.index].impuesto = datos.impuesto;
                        document.getElementById('nombreimpuesto').reset();
                    } else if (opcion == 'nombrePlan') {
                        bz.datos.planes[bz.index].plan = datos.plan;
                        document.getElementById('nombrePlan').reset();
                    }
                    notificacionService.mensaje('Peticion Realizada.');
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                })
            }
        }

        bz.modificarPrecioPlan = function (datos) {
                administrarService.modificarPrecioPlan(datos).then(function (res) {
                    console.log(res)
                    notificacionService.mensaje('Peticion Realizada.');
                }).catch(function (res) {
                    console.log(res)
                    notificacionService.mensaje(res);
                })
        }

        /* FUNCION PARA MOSTRAR TODOS LOS PRECIOS DE UN PLAN */

        bz.mostrar = function (opcion, datos, index) {
            if (opcion == 'nombrePlan') {
                bz.datos.accionesVista = 5;
                bz.index = index;
                bz.datos.modificarNombrePlan.idplan = datos;
            } else if (opcion == 'nuevoPrecioPlan') {
                bz.datos.nuevoPrecioPlan.idplan = datos;
                bz.datos.accionesVista = 3;
            } else if (opcion == 'preciosPlan') {
                bz.datos.preciosPlan = [];
                administrarService.listarPrecios(datos).then(function(res){
                    bz.datos.preciosPlan = res;
                    bz.datos.accionesVista = 4;
                }).catch(function(res){
                    console.log(res)
                })
            } else if (opcion == 'impuesto') {
                bz.index = index;
                bz.datos.modificarImpuesto.localidad = datos;
                bz.datos.accionesVista = 6;
            }

            /*
            administrarService.mostrar(id).then(function(){

            }).catch(function(){

            })
            */
        }

        bz.borrar = function (opcion, id, index) {
            administrarService.borrar(opcion, id).then(function (res) {
                delete bz.datos.impuestos[index];
                bz.listar('impuestos', true);
                notificacionService.mensaje('Impuesto Borrado!');
            }).catch(function (res) {
                notificacionService.mensaje(res);
                console.log(res)
            })
        }

        bz.bloquearPlan = function (opcion, id, index) {
            bz.datos.bloquearPlan.idplan = id;
            if (opcion == 'bloquear') {
                bz.datos.accionesVista = 0;
                bz.datos.bloquearPlan.status = 0;
                bz.datos.planes[index].estado = false;
            } else if (opcion == 'desbloquear') {
                bz.datos.bloquearPlan.status = 1;
                bz.datos.planes[index].estado = true;
            }
            administrarService.bloquearPlan(opcion, bz.datos.bloquearPlan).then(function (res) {
                bz.datos.planes[index].status = bz.datos.bloquearPlan.status;
                bz.datos.bloquearPlan = {};
            }).catch(function (res) {
                console.log(res)
            })
        }

    }])

    .controller('pedidosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'pedidosService', 'SweetAlert', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, pedidosService, SweetAlert, notificacionService) {

        var bz = this;
        bz.elementos = [];
        bz.pedidoDetalle = [];

        /* FILTROS PARA LOS PEDIDOS */

        bz.filtros = {
            estados: [{
                nombre: 'COMPLETADO'
            }, {
                nombre: 'EN ESPERA'
            }, {
                nombre: 'EN PROCESO'
            }, {
                nombre: 'CANCELADO'
            }],
            paises: [{
                nombre: 'Venezuela'
            }, {
                nombre: 'Chile'
            }, {
                nombre: 'Ecuador'
            }],
            planes: [{
                nombre: 'Plan Basico'
            }, {
                nombre: 'Plan Premium'
            }, {
                nombre: 'Plan Comodo'
            }]
        };

        bz.filtrosActivos;

        /* LISTA DE TODOS LOS PEDIDOS */

        bz.listaP = function () {
            var elementosLista = document.querySelectorAll('.lista .elemento.true');
            for (i = 0; i < elementosLista.length; i++) {
                elementosLista[i].classList.remove('true');
            }

            bz.elementos = [];
            bz.mostrarP = !bz.mostrarP;
            bz.mostrarD = false

            pedidosService.listarPedidos().then(function (res) {
                angular.forEach(res.data, function (valor, llave) {
                    bz.elementos.push(valor);
                    bz.elementos[llave].estadoE = false;
                })

            }).catch(function () {
                bz.valPedidos = true;
                notificacionService.mensaje('No existen pedidos.');
            })
        }

        bz.listaP();



        /* DETALLES DE UN PEDIDO  */

        bz.pedidoDetalles = function (id, index) {

            bz.pedidoActivoIndex = index;

            bz.mostrarD = true;
            bz.pedidoDetalle = [];
            pedidosService.datosPedido(id).then(function (res) {
                angular.forEach(res.data, function (valor, llave) {
                    bz.pedidoDetalle.push(valor);
                })
            }).catch(function (res) {
                notificacionService.mensaje('No existen pedidos para este cliente.');
            })
        }

        bz.activar = function (event) {
            var elementosLista = document.querySelectorAll('.lista .elemento.true');
            var elementoActual = event.currentTarget;

            for (i = 0; i < elementosLista.length; i++) {
                elementosLista[i].classList.remove('true');
            }

            elementoActual.classList.add('true');
        }


        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado, index) {
            pedidosService.cambiarEstado(id, estado).then(function (res) {
                notificacionService.mensaje('Estado Cambiado');
                bz.pedidoDetalle[index].estado = estado;
                bz.elementos[bz.pedidoActivoIndex].estado = estado;
            })
        }

    }])

    .controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "clientesService", 'SweetAlert', 'notificacionService', function ($scope, $http, $rootScope, $state, $stateParams, clientesService, SweetAlert, notificacionService) {

        var bz = this;

        bz.loaderCargando = false;

        /* objeto datos vacios */
        this.datos = {

            registrar: {},
            login: {}

        };

        /* FUNCION LOGIN */

        this.login = function (datos, valido) {

            if (valido) {

                bz.loaderCargando = true;

                clientesService.login(datos).then(function (res) {

                    SweetAlert.swal("Genial", "Ingreso Exitoso!", "success");
                    $state.go('cliente')

                }).catch(function (res) {
                    bz.loaderCargando = false;
                    SweetAlert.swal("Error al ingresar", "Revisa tu conexion a internet!", "error");
                    console.error("Authentication failed:", res);
                })
            }

        }
    }])

    .controller('usuarioController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'clientesServiceAdmin', 'clientesService', 'SweetAlert', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, clientesServiceAdmin, clientesService, SweetAlert, notificacionService) {

        var bz = this;
        bz.loaderMostrar = true;
        bz.usuarios = [];

        /* LISTAR TODOS LOS CLIENTES */

        bz.listarU = function () {

            bz.mostrarU = !bz.mostrarU;
            bz.usuarios = [];

            clientesServiceAdmin.listarUsuarios().then(function (res) {
                    bz.loaderMostrar = false;
                    angular.forEach(res.data, function (valor, llave) {
                        bz.usuarios.push(valor);
                    })
                })
                .catch(function (res) {
                    notificacionService.mensaje(res);
                })
        }

        bz.listarU()

        /* objeto datos vacios */
        this.datos = {

            registrar: {},
            modificar: {}

        };

        /* REGISTRAR ADMINISTRADOR */

        bz.registrarU = function (datos, validado) {
            if (validado) {
                bz.loaderCargando = true;
                clientesService.registrar(datos).then(function (res) {
                        bz.loaderCargando = false;
                        SweetAlert.swal("Genial", "Registro Exitoso!", "success");
                        document.getElementById("formularioRegistro").reset()
                    })
                    .catch(function (res) {
                        bz.loaderCargando = false;
                        notificacionService.mensaje(res);
                    })
            }
        }

        /* MODIFICAR UN USUARIO */

        bz.modificarUsuario = function (id, nombre, index) {

            bz.mostrarMo = !bz.mostrarMo;
            bz.uMod = nombre;
            bz.idUsuario = id;

            bz.datos.modificar.idUsuario = id;

            bz.index = index;

        }

        bz.modificarU = function (datos, validado) {
            if (validado) {
                clientesService.modificarU(datos).then(function (res) {
                    bz.loaderCargando = false;
                    bz.usuarios[bz.index].nombreUser = datos.nombreUser;
                    bz.uMod = datos.nombreUser;
                    console.log(res)
                    notificacionService.mensaje('Modificacion Exitosa!');
                    document.getElementById("formularioModificar").reset();
                }).catch(function (res) {
                    notificacionService.mensaje(res);
                    bz.loaderCargando = false;
                })
            }
        }




    }])

    .controller('categoriasController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'categoriasService', 'SweetAlert', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, categoriasService, SweetAlert, notificacionService) {

        var bz = this;
        bz.opcionesCategorias = 0;

        bz.cats = [];
        bz.prefs = [];

        /* objeto datos vacios */
        this.datos = {
            modCategoria: {},
            nuevaCategoria: {},
            modPreferencia: {},
            nuevaPreferencia: {}
        };

        /* LISTAR */

        bz.listar = function (que, ocultar) {

            bz.opcionesCategorias = 0;
            if (que == 'categoria') {
                if (ocultar == true) {
                    bz.mostrarC = !bz.mostrarC;
                }
                bz.cats = [];
                categoriasService.listarCategorias().then(function (res) {
                    angular.forEach(res.data, function (valor, llave) {
                        bz.cats.push(valor);
                    })
                })
            } else {
                if (ocultar == true) {
                    bz.mostrarPre = !bz.mostrarPre;
                }
                bz.prefs = [];
                categoriasService.listarPreferencias().then(function (res) {
                    angular.forEach(res.data, function (valor, llave) {
                        bz.prefs.push(valor);
                    })
                })

            }

        }

        bz.listar('categoria')

        /* MODIFICAR */

        bz.modificarEm = function (id, nombre, opcion, index) {

            bz.elementoActivoIndex = index;

            if (opcion == 'categoria') {
                bz.opcionesCategorias = 1;
                bz.datos.modCategoria.idCategoria = id;
            } else {
                bz.opcionesCategorias = 2;
                bz.datos.modPreferencia.idPreferencia = id;
            }

            bz.mostrarOpciones = !bz.mostrarOpciones;
            bz.modNombre = nombre;
        }

        bz.modificarElemento = function (datos, opcion) {

            if (opcion == 'categoria') {
                categoriasService.modificarCategoria(datos).then(function (res) {
                        notificacionService.mensaje('Modificacion Exitosa');
                        bz.cats[bz.elementoActivoIndex].nombreCategoria = datos.nombreCategoria;
                        bz.modNombre = datos.nombreCategoria;
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            } else {
                categoriasService.modificarPreferencia(datos).then(function (res) {
                        notificacionService.mensaje("Modificación Exitosa!");
                        bz.prefs[bz.elementoActivoIndex].nombre1 = datos.nombre1;
                        bz.prefs[bz.elementoActivoIndex].nombre2 = datos.nombre2;
                        bz.modNombre = datos.nombre1 + ' y ' + datos.nombre2;
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            }
        }

        /* CREAR */

        bz.crear = function (datos, opcion) {
            if (opcion == 'categoria') {
                categoriasService.nuevaCategoria(datos).then(function (res) {
                        notificacionService.mensaje('Registro Existoso');
                        datos.idCategoria = res.data.insertId;
                        bz.cats.push(datos);
                        bz.datos.nuevaCategoria = {};
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            } else {
                categoriasService.nuevaPreferencia(datos).then(function (res) {
                        notificacionService.mensaje('Registro Exitoso!');
                        datos.idPreferencia = res.data.insertId;
                        bz.prefs.push(datos);
                        bz.datos.nuevaPreferencia = {};
                    })
                    .catch(function (res) {
                        notificacionService.mensaje(res);
                    })
            }
        }

        /* ELIMINAR */

        bz.eliminar = function (id, opcion, index) {
            if (opcion == 'categoria') {
                categoriasService.eliminarCategoria(id).then(function (res) {
                        notificacionService.mensaje('Eliminada!');
                        delete bz.cats[index];
                        bz.listar('categoria');
                    })
                    .catch(function (res) {
                        console.log(res)
                    })
            } else {
                categoriasService.eliminarPreferencia(id).then(function (res) {
                        notificacionService.mensaje('Eliminada!');
                        delete bz.prefs[index];
                        bz.listar('preferencia');
                    })
                    .catch(function (res) {
                        console.log(res)
                    })
            }
        }

    }])

    .controller('iconosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'Upload', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, iconoFuente, categoriasService, Upload, notificacionService) {

        var bz = this;
        bz.mostrarR = false;

        /* objeto datos vacios */
        this.datos = {
            registro: {}
        };

        bz.categorias = [];
        bz.preferencias = [];

        bz.nuevoIcono = function (datos) {
            iconoFuente.nuevoIcono(datos).then(function (res) {
                console.log(res)
            }).catch(function (res) {
                console.log(res)
            })
        }

        categoriasService.listarCategorias().then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.categorias.push(valor);
            })
        })

        categoriasService.listarPreferencias().then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.preferencias.push(valor);
            })
            bz.datos.registro.datoPrefe = bz.preferencias;
        })

    }])

    .controller('fuentesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, iconoFuente, categoriasService, notificacionService) {

        var bz = this;
        bz.mostrarR = false;

        /* objeto datos vacios */
        this.datos = {
            registro: {}
        };

        bz.nuevaFuente = function (datos) {
            iconoFuente.nuevaFuente(datos).then(function (res) {
                console.log(res)
            }).catch(function (res) {})
        }

        bz.categorias = [];
        bz.preferencias = [];

        categoriasService.listarCategorias().then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.categorias.push(valor);
            })
        })

        categoriasService.listarPreferencias().then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.preferencias.push(valor);
            })

            bz.datos.registro.datoPrefe = bz.preferencias;
        })
    }])