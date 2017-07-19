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
        console.log($rootScope.objectoCliente)

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

    .controller('clienteController', ["$state", "$mdSidenav", "clientesServiceAdmin", '$scope', 'pedidosService', 'SweetAlert', '$window', function ($state, $mdSidenav, clientesServiceAdmin, $scope, pedidosService, SweetAlert, $window) {
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

            clientesServiceAdmin.listarClientes.then(function (res) {
                    bz.loaderMostrar = false;
                    angular.forEach(res.data, function (valor, llave) {
                        bz.clientes.push(valor);
                        bz.clientes[llave].estadoE = false; 
                    })
                })
                .catch(function (res) {
                    SweetAlert.swal(res.msg, "", "error");
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
            })
        }

        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado, index) {
            pedidosService.cambiarEstado(id, estado).then(function (res) {
                SweetAlert.swal("Estado cambiado!", res.msg, "success");
                bz.pedidosC[index].estado = estado;
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

    .controller('iconosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', function ($state, $mdSidenav, $mdMenu, $scope) {

        var bz = this;



}])


    .controller('administrarController', ["$state", "$mdSidenav", "$mdDialog", '$scope', function ($state, $mdSidenav, $mdMenu, $scope) {

        var bz = this;



}])

    .controller('pedidosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'pedidosService', 'SweetAlert', function ($state, $mdSidenav, $mdMenu, $scope, pedidosService, SweetAlert) {

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

            pedidosService.listarPedidos.then(function (res) {
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
                console.log(res)
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
                SweetAlert.swal("Estado cambiado!", "", "success");
                bz.pedidoDetalle[index].estado = estado;
                bz.elementos[bz.pedidoActivoIndex].estado = estado;
            })
        }

}])

    .controller('fuentesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', function ($state, $mdSidenav, $mdMenu, $scope) {

        var bz = this;

}])

    .controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "clientesService", 'SweetAlert', function ($scope, $http, $rootScope, $state, $stateParams, clientesService, SweetAlert) {

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

    .controller('usuarioController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'clientesServiceAdmin', 'clientesService', 'SweetAlert', function ($state, $mdSidenav, $mdMenu, $scope, clientesServiceAdmin, clientesService, SweetAlert) {

        var bz = this;
        bz.loaderMostrar = true;
        bz.usuarios = [];

        /* LISTAR TODOS LOS CLIENTES */

        bz.listarU = function () {

            bz.mostrarU = !bz.mostrarU;
            bz.usuarios = [];

            clientesServiceAdmin.listarUsuarios.then(function (res) {
                    bz.loaderMostrar = false;
                    angular.forEach(res.data, function (valor, llave) {
                        bz.usuarios.push(valor);
                    })
                })
                .catch(function (res) {
                    SweetAlert.swal("Error", res.msg, "error");
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
                    SweetAlert.swal("Error al registrar", res.data.msg, "error");
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
                SweetAlert.swal("Genial!!", "Modificación Exitosa!", "success");
                document.getElementById("formularioModificar").reset();
            }).catch(function (res) {
                SweetAlert.swal("Error al Modificar", '', "error");
                bz.loaderCargando = false;
            })
        }




}])

    .controller('categoriasController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'categoriasService', 'SweetAlert', function ($state, $mdSidenav, $mdMenu, $scope, categoriasService, SweetAlert) {

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

        bz.listar = function (que) {

            bz.opcionesCategorias = 0;
            if (que == 'categoria') {
                bz.cats = [];
                bz.mostrarC = !bz.mostrarC;
                categoriasService.listarCategorias.then(function (res) {
                    angular.forEach(res.data, function (valor, llave) {
                        bz.cats.push(valor);
                    })
                })
            } else {
                bz.prefs = [];
                bz.mostrarPre = !bz.mostrarPre;
                categoriasService.listarPreferencias.then(function (res) {
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
                        SweetAlert.swal("Genial!!", "Modificación Exitosa!", "success");
                        bz.cats[bz.elementoActivoIndex].nombreCategoria = datos.nombreCategoria;
                        bz.modNombre = datos.nombreCategoria;
                    })
                    .catch(function (res) {
                        console.log(res)
                        SweetAlert.swal("Error al Modificar", res.data.msg, "error");
                    })
            } else {
                categoriasService.modificarPreferencia(datos).then(function (res) {
                        SweetAlert.swal("Genial!!", "Modificación Exitosa!", "success");
                        bz.prefs[bz.elementoActivoIndex].nombre1 = datos.nombre1;
                        bz.prefs[bz.elementoActivoIndex].nombre2 = datos.nombre2;
                        bz.modNombre = datos.nombre1 + ' y ' + datos.nombre2;
                    })
                    .catch(function (res) {
                        console.log(res)
                        SweetAlert.swal("Error al Modificar", res.data.msg, "error");
                    })
            }
        }

        /* CREAR */

        bz.crear = function (datos, opcion) {
            if (opcion == 'categoria') {
                categoriasService.nuevaCategoria(datos).then(function (res) {
                        SweetAlert.swal("Genial!!", "Registro Exitoso!", "success");
                        datos.idCategoria = res.data.insertId;
                        bz.cats.push(datos);
                    })
                    .catch(function (res) {
                        SweetAlert.swal("Error al Registrar", res.data.msg, "error");
                    })
            } else {
                categoriasService.nuevaPreferencia(datos).then(function (res) {
                        SweetAlert.swal("Genial!!", "Registro Exitoso!", "success");
                        datos.idPreferencia = res.data.insertId;
                        bz.prefs.push(datos);
                    })
                    .catch(function (res) {
                        SweetAlert.swal("Error al Registrar", res.data.msg, "error");
                        console.log(res)
                    })
            }
        }

        /* ELIMINAR */

        bz.eliminar = function (id, opcion) {
            if (opcion == 'categoria') {
                categoriasService.eliminarCategoria(id).then(function (res) {
                        SweetAlert.swal("Eliminada!!", res.data.msg, "success");
                    })
                    .catch(function (res) {
                        SweetAlert.swal("Error al Eliminar", res.data.msg, "error");
                    })
            } else {
                categoriasService.eliminarPreferencia(id).then(function (res) {
                        SweetAlert.swal("Eliminada!!", res.data.msg, "success");
                    })
                    .catch(function (res) {
                        SweetAlert.swal("Error al Eliminar", res.data.msg, "error");
                        console.log(res)
                    })
            }
        }

}])
