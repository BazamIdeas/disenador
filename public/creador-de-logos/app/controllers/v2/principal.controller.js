angular.module("disenador-de-logos")

    /* Comenzar */

    .controller('principalController', ["categoriasService", "preferenciasService", "elementosService", '$stateParams', "$q", "$scope", "$state", "crearLogoFactory", "clientesService", function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService) {

        var bz = this;

        bz.datos = {
            nombre: "Mi logo",
            preferencias: [],
            categoria:{
                icono: "",
                fuente: ""
            }
        }


        bz.iconos = [];

        bz.fuentes = [];

        bz.logos = [];

        bz.logoSeleccionado = null;


   
        bz.categoriasPosibles = {
            fuentes: [],
            iconos: []
        };

        bz.preferencias = [];

        categoriasService.listaCategorias('ICONO').then(function (res) {

            bz.categoriasPosibles.iconos = res;

             
        })
         
        categoriasService.listaCategorias('FUENTE').then(function (res) {

            bz.categoriasPosibles.fuentes = res;

             
        })
        
        preferenciasService.listaPreferencias().then(function (res) {

            angular.forEach(res, function (valor, llave) {
                valor.valor = 2;
                bz.datos.preferencias.push(valor);

            })

        })

        bz.botonesTipo = [{
            nombre: 'Logo y nombre',
            activo: true
        }, {
            nombre: 'Tipografico',
            activo: true
        }, {
            nombre: 'Solo nombre',
            activo: true
        }];

        bz.completado = true;

        bz.solicitarElementos = function (tipoLogo, datos, valido) {

            if (valido && bz.completado) {

                bz.completado = false;

                angular.forEach(bz.botonesTipo, function (valor, llave) {

                    if (bz.botonesTipo[llave].nombre != tipoLogo.nombre) {

                        bz.botonesTipo[llave].activo = false;

                    } else {

                        bz.botonesTipo[llave].activo = true;
                    }

                })


                bz.datosIconos = {
                    categoria: bz.datos.categoria.icono,
                    preferencias: bz.datos.preferencias,
                    tipo: 'ICONO'
                }
                    
                bz.datosFuentes = {
                    categoria: bz.datos.categoria.fuente,
                    preferencias: bz.datos.preferencias,
                    tipo: 'FUENTE'
                };


                $q.all([
                    elementosService.listaSegunPref(bz.datosIconos),
                    elementosService.listaSegunPref(bz.datosFuentes)
                    ])
                    .then(function (res) {



                        bz.iconos = res[0];
                        bz.fuentes = res[1];

                        $state.go("principal.opciones", {
                            status: true
                        });

                        /*
                                    bz.datos.respuesta = {
                                        iconos: res[0].data,
                                        fuentes: res[1].data
                                    };


                                    promise = $interval(function () {
                                        if (bz.animacionTexto == 2) {

                                            bz.stop();
                                            $state.go('opciones', {
                                                datos: bz.datos
                                            });
                                        } else {
                                            bz.animacionTexto = bz.animacionTexto + 1;
                                        }
                                    }, 2500);
                        */


                        bz.completado = true;


                    }).catch(function (error) {

                        //$state.go('comenzar')
                    });

            }

        }

        bz.combinar = function () {

            bz.logos = crearLogoFactory(bz.iconos, bz.fuentes);

            $state.go("principal.combinaciones", {
                status: true
            });

        }


        bz.avanzar = function (indiceLogo) {

            bz.logoSeleccionado = indiceLogo;

            if (!clientesService.autorizado()) {

                bz.mostrarModalLogin = true;

            } else {

                $state.go("editor", {
                    status: true,
                    datos: {
                        logo: bz.logos[bz.logoSeleccionado],
                        texto: bz.datos.nombre,
                        fuentes: bz.fuentes,
                        categoria: bz.logos[bz.logoSeleccionado].icono.categorias_idCategoria
                    }
                });

            }

        }


        bz.datosLogin = {};

        bz.login = function (datos, valido) {

            if (valido) {

                clientesService.login(datos).then(function (res) {

                    if (clientesService.autorizado(true)) {

                        bz.mostrarModalLogin = false;
                        bz.avanzar(bz.logoSeleccionado);
                    }

                }).catch(function () {



                }).finally(function () {



                })

            };

        };

}])
