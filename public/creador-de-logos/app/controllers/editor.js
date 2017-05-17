angular.module("disenador-de-logos")

/* Editor */

.controller('editorController', ['$scope', '$stateParams', '$state', 'LS', '$timeout', '$base64', '$mdSidenav', 'categoriasService', 'Socialshare', 'logosService', 'SweetAlert', 'Auth', '$filter', '$mdDialog', '$interval', function ($scope, $stateParams, $state, LS, $timeout, $base64, $mdSidenav, categoriasService, Socialshare, logosService, SweetAlert, Auth, $filter, $mdDialog, $interval) {

    var bz = this;

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });

    bz.base64 = function (icono) {

        return $base64.decode(icono);

    }

    bz.codificar = function (icono) {

        return $base64.encode(icono);

    }
    
    /* COMPRAR LOGO */
    
    bz.comprarLogo = function(svgFinal, idFuente, idPrecio, idIcono, tipoLogo){
        
        var svg = bz.codificar(svgFinal)
        var datos = {svgFinal, idFuente, idPrecio, idIcono, tipoLogo}
        
        $state.go('',datos);
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

    this.elementosMenu = [{
        icono: 'font_download',
        nombre: 'Nombre',
    }, {
        icono: 'font_download',
        nombre: 'Slogan',
        estadoF: 'menu-desactivado',
    }, {
        icono: 'stars',
        nombre: 'Icono'
    }, {
        icono: 'filter',
        nombre: 'Comparaciones'
    }];

    this.menu = 0;
    this.efectoClick = function (index, elemento) {
        this.menu = index;
        if (!this.elementosMenu[index]) {
            this.elementosMenu[index].estado = 'activo';
        } else {
            this.elementosMenu[index].estado = false;
        }
    }


    this.logo = this.datosEstadoAnterior.logo;
    this.logo.texto = this.datosEstadoAnterior.texto;
    this.logo.posicion = this.datosEstadoAnterior.posicion;

    $scope.fuente = null;
    $scope.fuentes = null;


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

    bz.cambiarMenu = function (tipo) {
        if (tipo == null) {
            bz.tipoNav = bz.tipoNav;
        } else {
            bz.tipoNav = tipo;
        }
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

    /* LOGOS */

    bz.gLogo = function (idLogo, estado, logo, tipoLogo, firebaseUser, idElemento) {

        logo = bz.codificar(logo);

        if (firebaseUser) {

            logosService.guardarLogo(idLogo, estado, logo, tipoLogo, firebaseUser, idElemento).then(function (res) {
                SweetAlert.swal("Bien Hecho", "Tu logo ha sido guardado!", "success");
            })

        } else {
            SweetAlert.swal("No disponible", "Tienes que ingresar primero!", "error");
        }
    }



    //////////////////////////////////////
    ///////////INTERVALO GLOBAL///////////
    //////////////////////////////////////

    bz.interval = null;

    bz.detenerIntervalo = function () {

        $interval.cancel(bz.interval)

    }


    ///////////////////////////////////////
    /////posicion para icono y texto///////
    ///////////////////////////////////////

    bz.posicionTexto = {
        x: 0,
        y: 0
    }

    bz.posicionIcono = {
        x: 0,
        y: 0
    }

    bz.modificarPosicion = function (coordenada, accion, objetivo) {


        bz.interval = $interval(function () {


            if (objetivo == "texto") {

                bz.posicionTexto[coordenada] = (accion) ? bz.posicionTexto[coordenada] + 10 : bz.posicionTexto[coordenada] - 10;

            } else if (objetivo == "icono") {

                bz.posicionIcono[coordenada] = (accion) ? bz.posicionIcono[coordenada] + 10 : bz.posicionIcono[coordenada] - 10;

            }

        }, 100);

    }



    //////////////////////////////
    /////escala para el icono/////
    //////////////////////////////

    bz.escala = 1;

    bz.modificarEscala = function (escala, accion) {

        bz.interval = $interval(function () {

            escala = parseFloat($filter('number')(bz.escala, 1));

            if (accion) {

                if (escala <= 2) {

                    bz.escala = escala + 0.1;
                }

            } else {

                if (escala >= 0.5) {

                    bz.escala = escala - 0.1;

                }

            }

        }, 100);

    }



    ////////////////////////////
    ////tamano de la fuente/////
    ////////////////////////////
    bz.tamano = 0;


    bz.modificarTamano = function (accion) {

        bz.interval = $interval(function () {

            if (accion) {

                if (bz.tamano < 200) {

                    bz.tamano = bz.tamano + 4;

                }

            } else {

                if (bz.tamano > 0) {

                    bz.tamano = bz.tamano - 4;

                }

            }

        }, 100);

    }

    /////////////////////////////////
    ////propiedades de la fuente/////
    /////////////////////////////////  
    bz.propiedadesTexto = {

        bold: false,
        cursive: false

    }


    bz.modificarPropiedadTexto = function (propiedad) {


        bz.propiedadesTexto[propiedad] = (bz.propiedadesTexto[propiedad]) ? false : true;

    }


    /////////////////////////////////////////////////////////////////////////
    ////Disparar el guardado de un svg como copia de comparacion/////////////
    /////////////////////////////////////////////////////////////////////////

    bz.comparaciones = [];

    bz.comparar = true;

    bz.realizarComparacion = function (valor) {
        bz.menu = 3;
        bz.comparar = (valor) ? false : true;

    }



    /////////////////////////////////////
    ////// Mostrar Visualizaciones///////
    /////////////////////////////////////
    bz.visualizacionUsada = false;

    bz.visualizaciones = [];

    bz.visualizar = function (valor) {

        bz.visualizacionUsada = false;

        bz.visualizaciones.pop();

        bz.visualizaciones.push(valor);

    }


    /////////////////////////////////////
    ///// Realizar Restauraciones ///////
    /////////////////////////////////////

    bz.restauracionIniciada = false;

    bz.restauraciones = [];

    bz.realizarRestauracion = function (restauracion) {
        bz.visualizacionUsada = true;

        if (bz.restauracionIniciada == false) {
            bz.restauracionIniciada = true;
        }

        if (bz.restauraciones.length) {
            bz.restauraciones.pop();
        }
        bz.restauraciones.push(restauracion);


    }



    /* PREVISUALIZAR */

    bz.modeloPrevisualizar = [
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta',
            ancho: '40%'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta',
            ancho: '40%'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta',
            ancho: '30%'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta',
            ancho: '40%'
        },
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta',
            ancho: '40%'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta',
            ancho: '40%'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta',
            ancho: '30%'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta',
            ancho: '40%'
        }
    ]

    bz.mostrarDialogo = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/views/dialogos/previsualizar.tpl',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen
        })
    };

    function DialogController($scope, $mdDialog, LS) {
        $scope.svgD = bz.svgFinal;
        $scope.modeloPrev = bz.modeloPrevisualizar;

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
