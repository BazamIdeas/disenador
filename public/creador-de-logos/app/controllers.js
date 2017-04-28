angular.module("disenador-de-logos")

/* header */

.controller('headerController', ["$state", 'Auth', function ($state, Auth) {

    var bz = this;

    bz.autorizado = Auth.$getAuth();

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });


}])


/* Comenzar */

.controller('comenzarController', ["categoriasService", "preferenciasService", "$mdSidenav", function (categoriasService, preferenciasService, $mdSidenav) {

    var bz = this;


    bz.datos = {

        preferencias: []
    }

    /*------ CORREGIR --------*/

    bz.cambiarMenu = function (lugar) {

        return $mdSidenav('right').toggle();
    }


    bz.categoriasPosibles = [];

    bz.preferencias = [];

    categoriasService.listaCategorias.then(function (res) {

        angular.forEach(res.data, function (valor, llave) {

            bz.categoriasPosibles.push(valor);


        })

    })

    preferenciasService.listaPreferencias.then(function (res) {

        angular.forEach(res.data, function (valor, llave) {
            valor.valor = 2;
            bz.datos.preferencias.push(valor);


        })

    })




    /*----XXX -----*/



    this.mostrar = 1;

            }])

.controller('analisisController', ['$scope', '$mdDialog', "$stateParams", "LS", "$state", "$interval", "elementosService", "$base64", function ($scope, $mdDialog, $stateParams, LS, $state, $interval, elementosService, $base64) {

    var promise;

    var bz = this;

    bz.animacionTexto = 1;

    bz.datos = $stateParams.datos;

    bz.datos.respuesta = [];

    bz.stop = function () {
        $interval.cancel(promise);
    };


    elementosService.listaSegunPref($stateParams.datos).then(function (res) {

        bz.datos.respuesta.iconos = res.data;



        /*  angular.forEach(bz.datos.respuesta.iconos, function (valor, llave) {
              
              bz.datos.respuesta.iconos[llave].svg =   $base64.decode(valor.svg);
          })*/

        promise = $interval(function () {
            if (bz.animacionTexto == 4) {
                bz.stop();
                $state.go('opciones', {
                    datos: $stateParams.datos
                });
            } else {
                bz.animacionTexto = bz.animacionTexto + 1;
            }
        }, 3000);

    });







}])



/* Opciones */

.controller('opcionesController', ['$scope', '$mdDialog', "$stateParams", "$sce", "LS", "$state", "categoriasService", function ($scope, $mdDialog, $stateParams, $sce, LS, $state, categoriasService) {

    var bz = this;



    /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams.datos) {
        this.definirInfo($state.current.name, $stateParams.datos);
        this.datosEstadoAnterior = $stateParams.datos;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('comenzar');
    }

    /* *************** */


    this.seleccionado = function (primeraSeleccion, segundaSeleccion) {

        var llaves = Object.keys(primeraSeleccion).length * Object.keys(segundaSeleccion).length;
        return llaves;

    }


    this.datosEstadoAnterior.respuesta.fuentes = [{
        id: 1,
        url: "../creador-de-logos/assets/fonts/Bahiana-Regular.ttf",
        nombre: "Bahiana-Regular"
        }, {
        id: 2,
        url: "../creador-de-logos/assets/fonts/Barrio-Regular.ttf",
        nombre: "Barrio-Regular"
        }, {
        id: 3,
        url: "../creador-de-logos/assets/fonts/CaveatBrush-Regular.ttf",
        nombre: "CaveatBrush-Regular"
        }, {
        id: 4,
        url: "../creador-de-logos/assets/fonts/DellaRespira-Regular.ttf",
        nombre: "DellaRespira-Regular"
        }, {
        id: 5,
        url: "../creador-de-logos/assets/fonts/IndieFlower.ttf",
        nombre: "IndieFlower"
        }, {
        id: 6,
        url: "../creador-de-logos/assets/fonts/Anton-Regular.ttf",
        nombre: "Anton-Regular"
        }, {
        id: 7,
        url: "../creador-de-logos/assets/fonts/FjallaOne-Regular.ttf",
        nombre: "FjallaOne-Regular"
        }, {
        id: 8,
        url: "../creador-de-logos/assets/fonts/Lobster-Regular.ttf",
        nombre: "Lobster-Regular"
        }, {
        id: 9,
        url: "../creador-de-logos/assets/fonts/Pacifico-Regular.ttf",
        nombre: "Pacifico-Regular"
        }];

    this.datos = {

        fuentes: {},
        iconos: {}

    }

    this.agregarElemento = function (indice, valor, tipo) {

        if (Object.keys(this.datos[tipo]).length < 3) {

            if (!this.datos[tipo][indice]) {

                this.datos[tipo][indice] = valor;
                this.datosEstadoAnterior.respuesta[tipo][indice].estado = 'activo';

            } else {

                delete this.datos[tipo][indice];

                this.datosEstadoAnterior.respuesta[tipo][indice].estado = 'inactivo';
            }
        } else {

            if (this.datos[tipo][indice]) {


                delete this.datos[tipo][indice];

                this.datosEstadoAnterior.respuesta[tipo][indice].estado = 'inactivo';

            } else {

                return false;
            }
        }


    }

    /* CATEGORIAS EXISTENTES */
    this.categoria = this.datosEstadoAnterior.categoria;
    this.categoriasPosibles = [];

    categoriasService.listaCategorias.then(function (res) {

        angular.forEach(res.data, function (valor, llave) {

            bz.categoriasPosibles.push(valor);


        })

    })

    bz.mostrarDialogos = function (ev, nombre, id) {

        bz.mostrarDialogo(ev);
        bz.dialogos(nombre, id);

    }

    bz.configuraciones = {
        preferencias: {
            id: '1',
            nombre: 'Preferencias',
            icono: 'alarm_add'
        },
        categorias: {
            id: '2',
            nombre: 'Categorias',
            icono: 'alarm_add'
        }
    }

    bz.mostrarDialogo = function (ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/dialogos/dialogoOpciones.tpl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    bz.pestana = {
        nombre: '',
        id: ''
    };
    bz.preferencias = this.datosEstadoAnterior.preferencias;

    bz.dialogos = function (nombre, id) {
        bz.pestana.nombre = nombre;
        bz.pestana.id = id;
    }

    function DialogController($scope, $mdDialog, LS) {
        $scope.categoria = bz.categoria;
        $scope.categorias = bz.categoriasPosibles;
        $scope.pestana = bz.pestana;
        $scope.preferencias = bz.preferencias;

        $scope.dialogosCuerpos = $scope.pestana.id

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function (llave, datos) {
            $mdDialog.cancel();
            LS.definir(llave, datos);
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }



}])

/* Proceso */

.controller('procesoController', ['$scope', '$stateParams', 'crearLogoFactory', '$mdDialog', 'LS', '$state', '$base64', function ($scope, $stateParams, crearLogoFactory, $mdDialog, LS, $state, $base64) {


    this.base64 = function (icono) {

        return $base64.decode(icono);

    }


    /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams.datos) {
        this.definirInfo($state.current.name, $stateParams.datos);
        this.datosEstadoAnterior = $stateParams.datos;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('opciones');
    }

    /* *************** */

    this.datos = [];

    this.logos = crearLogoFactory(this.datosEstadoAnterior.elementos.iconos, this.datosEstadoAnterior.elementos.fuentes);

    this.efectoHover = function (indice, valor) {


        if (!this.datos[indice]) {

            this.datos[indice] = valor;
            this.icono[indice].estado = true;


        } else {

            delete this.datos[indice];
            this.icono[indice].estado = false;
        }


    }


    /*Posiciones */

    this.posicion = {

        coordenadas: {
            x: 256,
            y: 600
        },
        actual: 'bottom'
    }



    this.cambiarPosicion = function (valor) {
        /*
                if (valor == 'bottom') {

                    coordenadas = {
                        x: 256,
                        y: 600
                    }

                } else if (valor == 'top') {

                    coordenadas = {
                        x: 256,
                        y: 0
                    }

                } else if (valor == 'right') {

                    coordenadas = {
                        x: 512,
                        y: 300
                    }

                } else if (valor == 'left') {

                    coordenadas = {
                        x: 0,
                        y: 300
                    }

                }
                
               



                this.posicion.coordenadas = coordenadas;
                
                 */

        this.posicion.clase = this.posicion.actual + "-" + valor;
        this.posicion.claseG = this.posicion.actual + "-" + valor + "-g";
        this.posicion.actual = valor;


    }




    /* Barra */

    this.isOpen = false;

    this.estadoProcesoBarra = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };

}])


/* Editor */

.controller('editorController', ['$scope', '$stateParams', '$state', 'LS', '$timeout', '$base64', '$mdSidenav', 'categoriasService', 'Socialshare', function ($scope, $stateParams, $state, LS, $timeout, $base64, $mdSidenav, categoriasService, Socialshare) {

    var bz = this;

    this.base64 = function (icono) {

        return $base64.decode(icono);

    }

    /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams.logo && $stateParams.posicion && $stateParams.texto) {
        this.definirInfo($state.current.name, $stateParams);
        this.datosEstadoAnterior = $stateParams;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('opciones');
    }

    /* *************** */

    /* MENU EDITOR */
    this.menu = 1;
    this.menuItem = function (mswitch) {

        this.menu = mswitch;
    }

    /* *************** */

    this.logo = this.datosEstadoAnterior.logo;
    this.logo.texto = this.datosEstadoAnterior.texto;
    this.logo.posicion = this.datosEstadoAnterior.posicion;


    /*********** Estado activo o inactivo de los elementos **********/

    this.activo = {

        elementos: {},
        texto: ''

    };

    this.mostrar = {}

    this.activar = function (tipo, llave = false) {

        if (tipo == 'elemento') {

            this.activo.texto = '';

            if (!this.mostrar.color) {

                this.mostrar.color = 'color-animacion-entrada';
            }

            if (this.mostrar.texto) {

                this.mostrar.texto = 'color-animacion-salida'
            }

            this.activo.elementos = {};

            this.activo.elementos[llave] = 'si';

        } else if (tipo == 'texto') {


            this.activo.elementos = {};



            if (!this.mostrar.texto || this.mostrar.texto == 'color-animacion-salida') {

                this.mostrar.texto = 'color-animacion-entrada';

            }


            if (!this.mostrar.color) {

                this.mostrar.color = 'color-animacion-entrada';
            }





            this.activo.texto = 'si';

        }
    }


    /***********************/

    /**********logos copias********/
    this.comparadores = [];


    this.tipoGuardar = "comparar";

    this.guardarComparar = 0;

    //guarda un logo en el listado de logos comparativos
    this.guardar = function (tipo) {

        //acepta dos tipos de guardado, comprar y comparar
        this.tipoGuardar = tipo;
        this.guardarComparar++;


    }

    this.recuperar = function (clon) {
        /* REVISAR */
        this.color = ""

        this.activo = {

            elementos: {},
            texto: ''

        };
        /*----------*/

        this.logo.icono.svg = clon;


    }

    /******************************/


    $scope.fuente = null;
    $scope.fuentes = null;

    this.cambiarFuente = function (fuente) {
        this.logo.fuente.nombre = fuente;
    };

    this.fuentes = [{
        id: 1,
        url: "../creador-de-logos/assets/fonts/Bahiana-Regular.ttf",
        nombre: "Bahiana-Regular"
        }, {
        id: 2,
        url: "../creador-de-logos/assets/fonts/Barrio-Regular.ttf",
        nombre: "Barrio-Regular"
        }, {
        id: 3,
        url: "../creador-de-logos/assets/fonts/CaveatBrush-Regular.ttf",
        nombre: "CaveatBrush-Regular"
        }, {
        id: 4,
        url: "../creador-de-logos/assets/fonts/DellaRespira-Regular.ttf",
        nombre: "DellaRespira-Regular"
        }, {
        id: 5,
        url: "../creador-de-logos/assets/fonts/IndieFlower.ttf",
        nombre: "IndieFlower"
        }, {
        id: 6,
        url: "../creador-de-logos/assets/fonts/Anton-Regular.ttf",
        nombre: "Anton-Regular"
        }, {
        id: 7,
        url: "../creador-de-logos/assets/fonts/FjallaOne-Regular.ttf",
        nombre: "FjallaOne-Regular"
        }, {
        id: 8,
        url: "../creador-de-logos/assets/fonts/Lobster-Regular.ttf",
        nombre: "Lobster-Regular"
        }, {
        id: 9,
        url: "../creador-de-logos/assets/fonts/Pacifico-Regular.ttf",
        nombre: "Pacifico-Regular"
        }]

    bz.fabEditor = false;

    bz.cambiarMenu = function (lugar) {

        return $mdSidenav('right').toggle();
    }

    bz.fondo = "blanco";

    /* CATEGORIAS EXISTENTES */
    this.categoria = this.datosEstadoAnterior.logo.icono.categorias_idCategoria;
    this.categoriasPosibles = [];
    categoriasService.listaCategorias.then(function (res) {
        angular.forEach(res.data, function (valor, llave) {
            bz.categoriasPosibles.push(valor);
        })
    })

}])

.controller('previsualizarController', ['$scope', '$mdDialog', "$stateParams", "LS", "$state", "$interval", "$base64", function ($scope, $mdDialog, $stateParams, LS, $state, $interval, $base64) {

    var bz = this;

    /* PREVIZUALIZAR */

    bz.svg = $stateParams.datos;

    console.log(bz.datos);

    bz.modeloPrevisualizar = [
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        }
    ]

}])

/* login */


.controller('loginController', ['$scope', '$http', 'Auth', '$rootScope', '$state', function ($scope, $http, Auth, $rootScope, $state) {

    this.auth = Auth;

    this.datos = {

        registrar: {},
        login: {}

    };

    this.registrar = function (datos) {

        Auth.$createUserWithEmailAndPassword(datos.correo, datos.pass)
            .then(function (firebaseUser) {

                console.error(firebaseUser);

            }).catch(function (error) {
                console.error(error);
            });



    }

    this.login = function (metodo, datos = false) {

        Auth.$signInWithEmailAndPassword(datos.correo, datos.pass).then(function (firebaseUser) {
            console.log(firebaseUser);
            $state.go($rootScope.anterior);
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });

    }





    this.mostrarForm = 1;



}])

/* Cliente */

.controller('clienteController', ['$scope', '$mdDialog', "$stateParams", 'currentAuth', function ($scope, $mdDialog, $stateParams, currentAuth) {
    this.datosEstadoAnterior = $stateParams.datos;
    
    this.respuesta = {
        iconos: [{
                id: 1,
                url: "assets/svg/apple.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/audio.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/audiobook.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/book.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/browser.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/calculator.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/certificate.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/chat.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/chemistry.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "assets/svg/chip.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "assets/svg/cloud.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "assets/svg/code.svg",
                nombre: "X"
        }]
    }


    this.datos = [];
    this.estado = false;

        /* EFECTO HOVER */
        
    this.efectoHover = function (indice, valor) {


        if (!this.datos[indice]) {

            this.datos[indice] = valor;
            this.logos[indice].estado = true;


        } else {

            delete this.datos[indice];
            this.logos[indice].estado = false;
        }


    }
    
}])

/* Paquetes */

.controller('paquetesController', ['$scope', 'currentAuth', function ($scope, currentAuth) {

}])

/* Metodos */

.controller('metodosController', ['$scope', 'currentAuth', 'pedidosService', '$mdDialog', function ($scope, currentAuth, pedidosService, $mdDialog) {

    var bz = this;

    bz.mostrar = 'inicial';

    bz.compras = 1;

    this.pago = false;



    this.opts = {
        env: 'sandbox',
        client: {
            sandbox: 'AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV'
        },

        payment: function () {
            var env = this.props.env;
            var client = this.props.client;
            return paypal.rest.payment.create(env, client, {
                transactions: [{
                    amount: {
                        total: '1.00',
                        currency: 'USD'
                    }
                    }]
            });
        },
        commit: true, // Optional: show a 'Pay Now' button in the checkout flow
        onAuthorize: function (data, actions) {
            // Optional: display a confirmation page here
            return actions.payment.execute().then(function (res) {

                pedidosService.nuevoPedido().then(function (res) {

                    bz.compras = 2;

                }).catch(function (res) {

                    bz.compras = 3;
                    console.log("pago realizado mediante paypal, fallo al comprar, reembolsar")

                })

            }).catch(function (res) {

                bz.compras = 3;
                console.log("fallo con el pago de paypal")

            });
        }
    };

}])

/* Administras logo */

.controller('administrarController', ['$scope', 'currentAuth', function ($scope, currentAuth) {
    
}])
