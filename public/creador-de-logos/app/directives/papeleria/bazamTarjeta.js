angular.module("disenador-de-logos")

	.directive("bazamTarjeta", ["fontService",function (fontService) {
		return {
			restrict: "AE",
			scope: true,
			controller: ["$scope", function ($scope) {
                
			}],
			link: function (scope, element) {
				
				//obtenemos el controlador padre
				var bz = scope.$parent.papeleriaEditor;

				//agregamos la cara principal de la tarjeta
				var primeraCara = angular.element(bz.papeleria.modelo.svg[0]);
				primeraCara.addClass("primera-cara");
				element.append(primeraCara);


				//si existe agregamos la cara trasera
				if(bz.papeleria.modelo.svg[1]){
					
					var segundaCara = angular.element(bz.papeleria.modelo.svg[1]);
					segundaCara.addClass("segunda-cara");
					element.append(segundaCara);

				}

				//encontramos el logo default de la tarjeta
				var logosReemplazar = element.find(".logo");

		

				logosReemplazar.each(function(index, el){
					
					var logoReemplazar = angular.element(el);
					//guardamos su tamaño y coordenada
					var datosLogo = {};
					datosLogo.height = logoReemplazar.attr("height");
					datosLogo.width = logoReemplazar.attr("width");
					datosLogo.x = logoReemplazar.attr("x");
					datosLogo.y = logoReemplazar.attr("y");
					datosLogo.clases = logoReemplazar[0].classList;
					
					//encontramos el padre del logo default
					var logoContenedor = logoReemplazar.parent();
					angular.element(logoReemplazar).remove();

					//creamos el logo final con las coordenadas del logo default
					var logo = angular.element(bz.base64.decode(bz.logo.logo));
					logo.attr("height", datosLogo.height);
					logo.attr("width", datosLogo.width);
					logo.attr("x", datosLogo.x);
					logo.attr("y", datosLogo.y);


					var gLogo = angular.element("<g></g>");
					angular.forEach(datosLogo.clases, function(clase){
						gLogo.addClass(clase);
					});
					
					gLogo.append(logo);
					
					//lo insertamos en el padre
					logoContenedor.append(gLogo);
					

				});
				element.html(element.html());
				//agregamos el color primario
				element.find(".color-primario").css({"fill": bz.logo.atributos["color-icono"]});

				//si el icono y el texto tienen el mismo color, se agrega como color secundario ele mismo con 0.5 opacity
				if(bz.logo.atributos["color-icono"] === bz.logo.atributos["color-nombre"]){
					
					element.find(".color-secundario").css("fill", element.find(".color-primario").css("fill").replace(")", ", 0.5)"));

				} else {

					element.find(".color-secundario").css("fill",bz.logo.atributos["color-nombre"]);

				}

				fontService.preparar(bz.papeleria.modelo.fuentes[0])

				var textos = element.find("text");

				textos.each(function(index, text){

					angular.forEach(bz.papeleria.pieza, function(pieza, llave){
						var textActual = angular.element(text);
						if(textActual.hasClass(llave)){
							textActual.text(pieza);
							textActual.css({"font-family": bz.papeleria.modelo.fuentes[0]});
						}
						
					});
					
				});

			}
		};
	}]);


