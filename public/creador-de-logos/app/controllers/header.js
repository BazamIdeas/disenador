angular.module("disenador-de-logos")

/* header */

	.controller("headerController", ["clientesService", "$scope", "mostrarPasoPopAyudaFactory", "verificarBase64Factory", "$location", "disenadorService", "$mdToast", "$base64","$window", "$cookies",  function (clientesService,  $scope, mostrarPasoPopAyudaFactory, verificarBase64Factory, $location, disenadorService, $mdToast, $base64, $window, $cookies) {

		var bz = this;

		bz.traducciones = $window.traducciones;

		console.log(bz.traducciones)

		bz.idiomas = bz.traducciones.idiomas;

		bz.idiomaActivo = bz.traducciones.lang

		bz.cambiarIdioma = function (idioma) {
			idiomaCookie = $cookies.get('logoLang');
			
			if (bz.idiomaActivo != idiomaCookie) {
				$cookies.put("logoLang", idioma);
				$('body').animate({
					scrollTop: 0
				}, 1000);
				location.reload();
			} else {
				return;
			};
		};

		bz.base64 = $base64;

		bz.salir = function () {
			clientesService.salir(true, true);
		};

		bz.verificarBase64 = verificarBase64Factory;
    
		bz.autorizado = clientesService.autorizado();
        
		bz.mostrarPasoPopAyuda = mostrarPasoPopAyudaFactory;

		/**** DATOS FREELANCER ****/

		bz.datosDisenador = {};

		bz.loginDisenador = function(datos, valido){
			
			if(!valido) {
				return;
			}
			
			disenadorService.login(datos.usuario, datos.contrasena)
				
				.then(function(){

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Bienvenido",
							clase: "success"
						}
					}));

					bz.mostrarFormDisenador = false;
					bz.mostrarAccesoDisenador = false;
					bz.mostrarBannerDisenador = true;

					if(clientesService.autorizado()){

						clientesService.salir(true, true);
					}

				})
				.catch(function(){
					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Un error ha ocurrido",
							clase: "danger"
						}
					}));
				})
		
		}

		bz.cerrarSesionDisenador = function(){
			disenadorService.salir(true, true);
			bz.mostrarFormDisenador = false;
			bz.mostrarAccesoDisenador = false;
			bz.mostrarBannerDisenador = false;
		}
		


		var params = $location.search();

		bz.mostrarFormDisenador = false;
		bz.mostrarAccesoDisenador = false;
		bz.mostrarBannerDisenador = false;
		
		if(params.designer && !disenadorService.autorizado()){
			bz.mostrarAccesoDisenador = true;

			if(clientesService.autorizado()){
				clientesService.salir(true, true);
			}
			
		}

		if(disenadorService.autorizado()){
			bz.mostrarBannerDisenador = true;
		}


		bz.mostrarLogos = function(){
			bz.mostrarLogosDisenador = true;
		}

		bz.logosDisenador = [];

		bz.mostrarLogosContenedorDisenador = false;

		bz.logosDisenadorCargados = true;

		bz.mostrarLogosDisenador = function(){

			if(!bz.logosDisenadorCargados){
				return;
			}

			bz.logosDisenadorCargados = false;

			disenadorService.logosAprobados()

				.then(function(res){
					bz.logosDisenador = res;
					bz.mostrarLogosContenedorDisenador = true;
				})
				.catch(function(){
					$mdToast.show($mdToast.base({
						args: {
							mensaje: "No tienes logos Aprobados",
							clase: "Danger"
						}
					}));
				})
				.finally(function(){
					bz.logosDisenadorCargados = true;					
				})
		}
		

		/**** FIN DE DATOS FREELANCER ****/

		$scope.$on("sesionExpiro", function () {

			bz.autorizado = clientesService.autorizado();

		});

		$scope.$on("sesionInicio", function () {

			bz.autorizado = clientesService.autorizado();

		});

	}]);
