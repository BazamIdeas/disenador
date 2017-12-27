angular.module("disenador-de-logos")

    /* Editor */

    .controller('descargarController', ["logoResolve", "logosService", "$state", "$scope", "$base64", "$filter", function (logoResolve, logosService, $state, $scope, $base64, $filter) {

        var bz = this;

        bz.base64 = $base64;

        bz.formatosNoSociales = [
            {
                nombre: "editable",
                ancho: 400
            },
            {
                nombre: "papeleria",
                ancho: 300
            }
        ]

        bz.formatos = [
            {
                nombre: "facebook",
                ancho: 180
            },
            {
                nombre: "whatsapp",
                ancho: 300
            },
            {
                nombre: "instagram",
                ancho: 110
            },
            {
                nombre: "google-plus",
                ancho: 250
            },
            {
                nombre: "youtube",
                ancho: 200
            },
            {
                nombre: "skype",
                ancho: 214
            },
            {
                nombre: "twitter",
                ancho: 400
            },
            {
                nombre: "flickr",
                ancho: 60
            },
            {
                nombre: "linkedin",
                ancho: 400
            },
            {
                nombre: "pinterest",
                ancho: 60
            },
            {
                nombre: "telegram",
                ancho: 300
            },
            {
                nombre: "tumblr",
                ancho: 64
            },
            {
                nombre: "vimeo",
                ancho: 300
            },
            {
                nombre: "line",
                ancho: 300
            }
        ]

        bz.formatoSeleccionado = bz.formatos[0];

        bz.logo = {
            id: logoResolve.id,
            logo: logoResolve.logo
        };

        if (!bz.logo.logo) {

            logosService.obtenerPorId(bz.logo.id).then(function (res) {

                bz.logo.logo = res.logo;

            }).catch(function (res) {

                $state.go("logos");

            })

        }
        
        
        bz.seleccionar = function (formato) {
            
            bz.formatoSeleccionado = angular.copy(formato);
            
        }
        

        bz.dispararDescarga = function (imgURI, nombre, ancho) {

            var evento = new MouseEvent('click', {
                view: window,
                bubbles: false,
                cancelable: true

            });

            var a = document.createElement('a');
            a.setAttribute('download', nombre+"@"+ancho+"x"+ancho);
            a.setAttribute('href', imgURI);
            a.setAttribute('target', '_blank');
            a.dispatchEvent(evento);

        }

        bz.completado = true;
        bz.descargar = function (nombre, ancho) {

            if(bz.completado){
                
                bz.completado = false;
                
                angular.element(document.querySelector(".full-overlay")).fadeIn(1000);

                logosService.descargarLogo(bz.logo.id, ancho, $filter('uppercase')(nombre), nombre)

                    .then(function (res) {

                        if (res.zip) {

                            var url = res.zip.replace('public', '');

                        } else if (res.png){

                            var url = res.png.replace('public', '');

                        }

                        bz.dispararDescarga(url, nombre, ancho);

                    })
                
                    .finally(function(){
                    
                        bz.completado = true;
                        angular.element(document.querySelector(".full-overlay")).fadeOut(1000);
                    
                    })
            
                }

        };

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
