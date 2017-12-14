angular.module("disenador-de-logos")

    /* Editor */

    .controller('descargarController', ["logoResolve", "logosService", "$state", "$scope", "$base64", "$filter", function (logoResolve, logosService, $state, $scope, $base64, $filter) {

        var bz = this;

        bz.base64 = $base64;


        bz.formatos = [
            {
                nombre: "svg",
                ancho: 100
            },
            {
                nombre: "facebook",
                ancho: 100
            },
            {
                nombre: "whatsapp",
                ancho: 100
            },
            {
                nombre: "instagram",
                ancho: 100
            },
            {
                nombre: "google-plus",
                ancho: 100
            },
            {
                nombre: "youtube",
                ancho: 100
            },
            {
                nombre: "skype",
                ancho: 100
            },
            {
                nombre: "twitter",
                ancho: 100
            },
            {
                nombre: "behance",
                ancho: 100
            },
            {
                nombre: "blogger",
                ancho: 100
            },
            {
                nombre: "deviantart",
                ancho: 100
            },
            {
                nombre: "dribbble",
                ancho: 100
            },
            {
                nombre: "flickr",
                ancho: 100
            },
            {
                nombre: "linkedin",
                ancho: 100
            },
            {
                nombre: "pinterest",
                ancho: 100
            },
            {
                nombre: "telegram",
                ancho: 100
            },
            {
                nombre: "tumblr",
                ancho: 100
            },
            {
                nombre: "viber",
                ancho: 100
            },
            {
                nombre: "vimeo",
                ancho: 100
            }
        ]

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

        bz.dispararDescarga = function (imgURI) {

            var evento = new MouseEvent('click', {
                view: window,
                bubbles: false,
                cancelable: true

            });


            var a = document.createElement('a');
            a.setAttribute('download', "hola");
            a.setAttribute('href', imgURI);
            a.setAttribute('target', '_blank');

            /*
                            var contenedor = angular.element(".contenedor-link");
                            contenedor.empty();
                            contenedor.append(a);
                            */
            a.dispatchEvent(evento);


        }


        bz.descargar = function (nombre, ancho) {



            logosService.descargarLogo(bz.logo.id, ancho, $filter('uppercase')(nombre), nombre).then(function (res) {

                if (res.zip) {
                    
                    var nombre = res.zip.replace('public', '');
                    
                } else if (res.png){
                    
                    var nombre = res.png.replace('public', '');
                    
                }

                console.log(nombre)
                var url = nombre;

                bz.dispararDescarga(url)




            })


        };









        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
