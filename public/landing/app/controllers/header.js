angular.module("landing")

    .controller("headerController", ["navegarFactory", "clientesService", "$scope" , "cookie", function (navegarFactory, clientesService, $scope, cookie) {

        var bz = this;

        bz.navegar = navegarFactory;

        bz.idiomaActivo = cookie.getCookie('logoLang');

        bz.cambiarIdioma = function (idioma) {
			idiomaCookie = cookie.getCookie('logoLang');
			
			if (bz.idiomaActivo != idiomaCookie) {
				document.cookie = "logoLang=" + idioma;
				$('body').animate({
					scrollTop: 0
				}, 1000);
				location.reload();
			} else {
				return;
			};
		};

        bz.salir = function () {
            clientesService.salir(true, true);
        };

        bz.opcionMostrarLogin = true;
        
        bz.autorizado = clientesService.autorizado();

        $scope.$on("sesionExpiro", function () {

            bz.autorizado = clientesService.autorizado();

        });

        $scope.$on("sesionInicio", function () {

            bz.autorizado = clientesService.autorizado();

        });

    }]);