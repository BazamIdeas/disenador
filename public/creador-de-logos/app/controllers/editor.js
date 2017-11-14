angular.module("disenador-de-logos")

    /* Editor */

    .controller('editorController', ['$scope', '$stateParams', '$state', 'LS', '$timeout', '$base64', '$mdSidenav', 'categoriasService', 'Socialshare', 'logosService', 'SweetAlert', '$filter', '$mdDialog', '$interval', 'clientesService', function ($scope, $stateParams, $state, LS, $timeout, $base64, $mdSidenav, categoriasService, Socialshare, logosService, SweetAlert, $filter, $mdDialog, $interval, clientesService) {

        var bz = this;

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

        bz.codificar = function (icono) {

            return $base64.encode(icono);

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


        //////////////////////////////////////////////
        ///////////////LOCAL STORAGE//////////////////
        //////////////////////////////////////////////
        this.definirInfo = function (llave, datos) {
            return LS.definir(llave, datos);
        }

        if ($stateParams.logoModificado) { //si es un logo previamente modificado

            bz.restauracionIniciada = true;

            bz.restauraciones.push($stateParams.logoModificado.svg);

            bz.logo = {
                icono: {}
            }

            bz.logo.icono.tipo = $stateParams.logoModificado.tipo;
            bz.logo.icono.idElemento = $stateParams.logoModificado.idElemento;

        } else { //si no es logo modificado, se revisa el localStorage

            if ($stateParams.logo && $stateParams.posicion && $stateParams.texto) {
                this.definirInfo($state.current.name, $stateParams);
                this.datosEstadoAnterior = $stateParams;

            } else if (LS.obtener($state.current.name)) {

                this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
            } else {
                $state.go('opciones');
            }

            this.logo = this.datosEstadoAnterior.logo;
            this.logo.texto = this.datosEstadoAnterior.texto;
            this.logo.posicion = this.datosEstadoAnterior.posicion;
            this.fuentes = this.datosEstadoAnterior.fuentes;
            this.categoria = this.datosEstadoAnterior.logo.icono.categorias_idCategoria;

        }

        /* *************** */

        /* MENU EDITOR */

        this.elementosMenu = [{
            icono: 'font_download',
            nombre: 'Nombre',
            estado: 'activo'
        }, {
            icono: 'create',
            nombre: 'Slogan',
            estado: 'menu-desactivado'
        }, {
            icono: 'stars',
            nombre: 'Icono'
        }, {
            icono: 'filter',
            nombre: 'Comparaciones'
        }];

        this.hideMenu = function () {
            l = document.querySelector('.elementos');
            l.style.display = 'none';
        }

        this.menu = 0;
        this.efectoClick = function (index, elemento, event) {
            if (screen.width <= 980 || document.querySelector('.elementos').style.width != 'block') {
                l = document.querySelector('.elementos');
                l.style.display = 'block';
            }

            if (event) {
                var elementosLista = document.querySelectorAll('.menu-editor .menu-link.activo');
                var elementoActual = event.currentTarget;

                for (i = 0; i < elementosLista.length; i++) {
                    elementosLista[i].classList.remove('activo');
                }
                elementoActual.classList.add('activo');
            }

            this.menu = index;
            if (!this.elementosMenu[index]) {
                this.elementosMenu[index].estado = 'activo';
            } else {
                this.elementosMenu[index].estado = false;
            }
        }

        $scope.fuente = null;
        $scope.fuentes = null;

        bz.fabEditor = false;

        bz.cambiarMenu = function (lugar) {

            return $mdSidenav('right').toggle();
        }

        bz.fondo = "blanco";

        /* CATEGORIAS EXISTENTES */

        this.categoriasPosibles = [];
        categoriasService.listaCategorias.then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.categoriasPosibles.push(valor);
            })
        })

        /* LOGOS */

        bz.autorizado = clientesService.autorizado();
        bz.gLogo = function (logo, tipoLogo, idElemento) {

            //si el usuario esta logeado
            if (bz.autorizado) {

                logosService.guardarLogo(logo, tipoLogo, idElemento).then(function (res) {

                    SweetAlert.swal("Bien Hecho", "Tu logo ha sido guardado!", "success");

                })

            } else { //si el usuario no esta logeado 

                $state.go("login", ({
                    origen: $state.current.name,
                    destino: $state.current.name,
                    parametrosDestino: {

                        logoModificado: {
                            svg: bz.base64(logo),
                            tipo: tipoLogo,
                            idElemento: idElemento
                        },

                    }
                }));
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

            bz.detenerIntervalo();

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

            bz.detenerIntervalo();

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

            bz.detenerIntervalo();

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

        /* PREVISUALIZAR */

        bz.modeloPrevisualizar = [{
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
                templateUrl: './app/views/dialogos/previsualizar.html',
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

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

    }])