angular.module("disenador-de-logos")

    /* Comenzar */

    .controller('principalController', ["categoriasService", "preferenciasService", "elementosService", '$stateParams', "$q", "$scope", "$state", "crearLogoFactory", "clientesService", function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService) {

        var bz = this;

        bz.datos = {
            nombre: "Mi logo",
            preferencias: []
        }
        
        bz.iconos = [];
        
        bz.fuentes = [];
        
        bz.logos = [];
        
        /*
        if ($stateParams.nombreLogo) {

            bz.datos.nombre = $stateParams.nombreLogo;

        };

        */

        bz.categoriasPosibles = [];

        bz.preferencias = [];

        categoriasService.listaCategorias().then(function (res) {

            angular.forEach(res, function (valor, llave) {

                bz.categoriasPosibles.push(valor);

            })

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


                bz.datos.tipo = "ICONO";

                bz.datosFuentes = {
                    categoria: bz.datos.categoria,
                    preferencias: bz.datos.preferencias,
                    tipo: 'FUENTE'
                };


                $q.all([
                    elementosService.listaSegunPref(bz.datos),
                    elementosService.listaSegunPref(bz.datosFuentes)
                    ])
                    .then(function (res) {
                    
                    
                    
                    bz.iconos = res[0];
                    bz.fuentes = res[1];
                    
                    $state.go("principal.opciones", {status: true});
                    
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
        
        
        
        bz.combinar = function(){

            bz.logos = crearLogoFactory(bz.iconos, bz.fuentes); 
        
            $state.go("principal.combinaciones", {status: true});
            
        }


         bz.avanzar = function(logo){
             
             if(!clientesService.autorizado()){
                 
                 bz.mostrarModalLogin = true;
             }
             
             
             $state.go("editor", {status: true, logo: logo});
             
         }



}])
