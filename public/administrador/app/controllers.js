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
            }).catch(function(res){
                bz.validarP = true;
                notificacionService.mensaje(res);
            })
        }

        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado, index) {
            pedidosService.cambiarEstado(id, estado).then(function (res) {
                notificacionService.mensaje('Estado Cambiado!');
                bz.pedidosC[index].estado = estado;
            }).catch(function(res){
                notificacionService.mensaje(res);
            })
        }

        bz.activar = function(event){
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
        impuestos:[],
        planes: [],
        nuevoPlan: {},
        modificarNombrePlan: {},
        modificarImpuesto:{},
        nuevoPrecioPlan:{},
        nuevoImpuesto:{},
        planDetalles:{},
        accionesVista: 0
    };
    bz.monedas = monedasValue;
    bz.paises = paisesValue;

    /* FUNCION PARA LISTAR PLANES Y IMPUESTOS */

    bz.mostrarPlanes = false;
    bz.mostrarImpuestos = false;

    bz.listar = function(opcion){
        bz.datos.accionesVista = 0;
        administrarService.listar(opcion).then(function(res){
            if(opcion == 'planes'){
                bz.mostrarPlanes = !bz.mostrarPlanes;
                bz.datos.planes = res;
            }else if(opcion == 'impuestos'){
                bz.mostrarImpuestos = !bz.mostrarImpuestos;
                bz.datos.impuestos = res;
            }
        }).catch(function(res){
            notificacionService.mensaje(res);
        })
    }

    /* FUNCION PARA MOSTRAR FORMULARIO DE NUEVO PRECIO */

    bz.nuevoPrecio = function(index){
        bz.datos.nuevoPrecioPlan.idplan = bz.datos.planes[index].idPlan;
        bz.datos.accionesVista = 3;
    } 

    /* FUNCION PARA AGREGAR UN PLAN O IMPUESTO O PRECIO */

    bz.agregar = function(opcion, datos){
        console.log(datos)
        administrarService.agregar(opcion,datos).then(function(res){
            if(opcion == 'impuesto'){
                bz.datos.impuestos.push(datos);
                bz.datos.nuevoImpuesto = {};
            }else if(opcion == 'plan'){
                bz.datos.planes.push(datos);
                bz.datos.nuevoPlan = {};
            }else if(opcion == 'nuevoPrecioPlan'){
               
            }
            notificacionService.mensaje('Peticion Realizada!');  
        }).catch(function(res){
            console.log(res)
        })
    }

    /* FUNCION PARA MODIFICAR UN PLAN O IMPUESTO */

    bz.modificar = function(opcion, datos){
        administrarService.modificar(opcion,datos).then(function(res){
            console.log(res)
        }).catch(function(res){
            notificacionService.mensaje(res);
        })
    }

    /* FUNCION PARA MOSTRAR TODOS LOS PRECIOS DE UN PLAN */

    bz.mostrar = function(opcion, id){
        if(opcion == 'nombrePlan'){
            bz.datos.accionesVista = 5;
        }else if(opcion == 'preciosPlan'){
            bz.datos.accionesVista = 4;
        }else if(opcion == 'impuesto'){
            bz.datos.accionesVista = 6;
        }
        
        /*
        administrarService.mostrar(id).then(function(){

        }).catch(function(){

        })
        */
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
                notificacionService.mensaje(res);
            })
        }

        bz.activar = function(event){
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

        bz.registrarU = function (datos) {
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

        /* MODIFICAR UN USUARIO */

        bz.modificarUsuario = function (id, nombre) {

            bz.mostrarMo = !bz.mostrarMo;
            bz.uMod = nombre;
            bz.usuarioId = id;
        }

        bz.modificarU = function (datos) {
            clientesService.modificarU(datos).then(function (res) {
                bz.loaderCargando = false;
                notificacionService.mensaje('Modificacion Exitosa!');
                document.getElementById("formularioModificar").reset();
            }).catch(function (res) {
                notificacionService.mensaje(res);
                bz.loaderCargando = false;
            })
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
                if(ocultar == true){
                    bz.mostrarC = !bz.mostrarC;
                }
                bz.cats = [];
                categoriasService.listarCategorias().then(function (res) {
                    angular.forEach(res.data, function (valor, llave) {
                        bz.cats.push(valor);
                    })
                })
            } else {
                if(ocultar == true){
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

        bz.nuevoIcono = function(datos){
            iconoFuente.nuevoIcono(datos).then(function(res){
                console.log(res)
            }).catch(function(res){
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
        })

}])

.controller('fuentesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'iconoFuente', 'categoriasService', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, iconoFuente, categoriasService, notificacionService) {

        var bz = this;
        bz.mostrarR = false;

        /* objeto datos vacios */
        this.datos = {
            registro: {}
        };

        bz.nuevaFuente = function(datos){
            iconoFuente.nuevaFuente(datos).then(function(res){
                console.log(res)
            }).catch(function(res){
            })
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
        })
}])