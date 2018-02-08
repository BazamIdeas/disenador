angular.module("disenador-de-logos")

	.controller("descargarController", ["logoResolve", "logosService", "$state", "$scope", "$base64", "$filter", "planesService", "elementosService", function (logoResolve, logosService, $state, $scope, $base64, $filter, planesService, elementosService) {

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
		];

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
                nombre: "twitter",
                ancho: 400
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
                nombre: "vimeo",
                ancho: 300
            },
        ]

		//bz.formatoSeleccionado = bz.formatos[0];
       
		bz.logo = logoResolve;

		bz.plan = {};

		planesService.porLogo(bz.logo.id)
			.then(function (res) {
				bz.plan = res.caracteristicas;
            
				if(bz.plan && bz.plan.png){
					bz.formatoSeleccionado = bz.formatos[0];
				} else if(bz.plan && bz.plan.editable){
					bz.formatoSeleccionado = bz.formatosNoSociales[0];
				}
			})
			.catch(function () {
            
			});
        
		bz.seleccionar = function (formato) {
            
			bz.formatoSeleccionado = angular.copy(formato);
            
		};
        
    
        

		bz.dispararDescarga = function (imgURI, nombre, ancho) {

			var evento = new MouseEvent("click", {
				view: window,
				bubbles: false,
				cancelable: true

			});

			var a = document.createElement("a");
			a.setAttribute("download", nombre+"@"+ancho+"x"+ancho);
			a.setAttribute("href", imgURI);
			a.setAttribute("target", "_blank");
			a.dispatchEvent(evento);

		};

		bz.completado = true;
		bz.descargar = function (nombre, ancho) {

			if(bz.completado){
                
				bz.completado = false;
                
				angular.element(document.querySelector(".full-overlay")).fadeIn(1000);

				logosService.descargarLogo(bz.logo.id, ancho, $filter("uppercase")(nombre), nombre)

					.then(function (res) {
						var url = "";
						if (res.zip) {

							url = res.zip.replace("public", "");

						} else if (res.png){

							url = res.png.replace("public", "");

						}

						bz.dispararDescarga(url, nombre, ancho);

					})
                
					.finally(function(){
                    
						bz.completado = true;
						angular.element(document.querySelector(".full-overlay")).fadeOut(1000);
                    
					});
            
			}

		};


        bz.manualMarca = function(id){
			bz.esperaManual = true;
            logosService.obtenerPorId(id).then(function (res) {
				var logo = res;

				if (logo.atributos.length > 0){
					angular.forEach(logo.atributos, function (valor, llave) {

						if (valor.clave == 'principal') {
							logo.tieneNombre = valor.valor;
						}

						if (valor.clave == 'eslogan'){
							logo.tieneEslogan = valor.valor;
						}
					
					})
				}

				elementosService.listarFuentes().then(function(res){
					
					angular.forEach(res, function (valor, llave) {
						if(valor.idElemento == logo.tieneEslogan){
							logo.tipografia_s = { nombre: valor.nombre, url: valor.url}
						}

						if (valor.idElemento == logo.tieneNombre) {
							logo.tipografia_p = { nombre: valor.nombre, url: valor.url }
						}
					})

					logosService.manualMarca(logo).then(function (res) {
						var pdf = document.createElement('a');
						pdf.setAttribute('href', res.url);
						pdf.setAttribute('download', res.nombreArchivo);
						simulateClick(pdf);
					}).finally(function(res){
						bz.esperaManual = false;
					});
				})
			});
		};

		function simulateClick(control) {
			if (document.all) {
				control.click();
			}
			else {
				var evObj = document.createEvent("MouseEvents");
				evObj.initMouseEvent("click", true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
				control.dispatchEvent(evObj);
			}
		}

		$scope.$on("sesionExpiro", function () {

			$state.go("principal.comenzar");

		});


	}]);
