angular.module("disenador-de-logos")

	.directive("bazamPapeleria", ["fontService", "$document", function (fontService, $document) {
		return {
			restrict: "AE",
			scope: true,
			controller: ["$scope", function ($scope) {
                
			}],
			link: function (scope, element) {
				
				//obtenemos el controlador padre
				var bz = scope.$parent.papeleriaEditor;

				angular.forEach(bz.papeleria.modelo.caras, function(cara, index){

					var caraSvg = angular.element(cara.svg);

					var estilos = angular.element("<style></style>");

					estilos.text(
						`.total-blanco, .total-blanco * {
							stroke: white !important;
							fill: white !important;
						}`
					);

					caraSvg.prepend(estilos);

					element.append(caraSvg);
					
					angular.forEach(cara.logos, function(logo){

						var logoSvg = angular.element("<g class='contenedor-logo'>"+bz.base64.decode(bz.logo.logo)+"</g>");

						angular.forEach(logo.caracteristicas, function(caracteristica, llave){
							logoSvg.children().attr(llave, caracteristica);
						});

						angular.forEach(logo.clases, function(clase){
							logoSvg.addClass(clase);
						});

						caraSvg.append(logoSvg);

					});
					
					angular.forEach(cara.hooks, function(hook){

						var hookSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "foreignObject"));

						hookSvg.attr("id", hook.id);

						hookSvg.append("<svg style='width:100%; height: 100%;'></svg>");

						caraSvg.append(hookSvg);

						angular.forEach(hook.caracteristicas, function(caracteristica, llave){
							hookSvg.attr(llave, caracteristica);
						});
				
						angular.forEach(hook.items, function(item, indice){
						
							//console.log(angular.element("#A svg")[0].getBoundingClientRect())
							
							var itemSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "g"));

						
							var textSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', item.tag))

							itemSvg.append(textSvg);

							if(item.icono){

								var iconoTexto = angular.element(item.icono.svg);
								
								angular.forEach(item.clases, function(clase){
									iconoTexto.addClass(clase)
								})
								
								if(item.icono.orientacion == 'right'){
									itemSvg.append(iconoTexto);
								} else if(item.icono.orientacion == 'left'){
									itemSvg.prepend(iconoTexto);
								}
								
							}

							

							if(item.valor.indexOf("\n") != -1){ //con saltos de linea
								
								/*
								var trozosText = item.valor.split("\n");
								angular.forEach(trozosText, function(trozoText){
									
									trozoTextSvg = angular.element("<tspan>"+trozoText+"</span>");
									trozoTextSvg.attr("dx", "100%");
									trozoTextSvg.attr("y", "0");
									
									//trozoTextSvg.attr("dy", "1.2em");
									itemSvg.children().append(trozoTextSvg);

								})
								*/

							} else { //una sola linea de texto

								textSvg.text(item.valor);

							}

							angular.forEach(item.caracteristicas, function(caracteristica, llave){
								textSvg.attr(llave,caracteristica);
							});

							itemSvg.css({"font-size": hook.tamanoTexto})
							
							switch(hook.orientacion){
								case "right":
									textSvg.attr("x", "100%");
									textSvg.attr("text-anchor", "end")
							};
						


							hookSvg.children().append(itemSvg);

							var coordenadasItem = itemSvg[0].getBBox();

							if(indice === 0){//si es el primer item de este contenedor
								
								textSvg.attr("y", coordenadasItem.height);

							} else {//cualquier item despues del primero
								
								itemSvgAnterior = hookSvg.children().find(":nth-child("+(indice)+")");
								console.log(itemSvgAnterior)
								var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();
								
								textSvg.attr("y", coordenadasItem.height + coordenadasItemAnterior.y + coordenadasItemAnterior.height);

							}
	
						});
						
				

					});

					

				});

				element.html(element.html());


				element.find(".color-primario").css({"fill": bz.logo.atributos["color-icono"]});

				//si el icono y el texto tienen el mismo color, se agrega como color secundario ele mismo con 0.5 opacity
				if(bz.logo.atributos["color-icono"] === bz.logo.atributos["color-nombre"]){
					
					element.find(".color-secundario").css("fill", element.find(".color-primario").css("fill").replace(")", ", 0.5)"));

				} else {

					element.find(".color-secundario").css("fill",bz.logo.atributos["color-nombre"]);

				}

				bz.agregarElemento = function(indiceCara, indiceHook, indiceElemento){
					console.log(indiceCara, indiceHook, indiceElemento)
					console.log("agregar")
				}

				bz.cambiarTexto = function(indiceCara, indiceHook, indiceElemento, texto){
					console.log(indiceCara,indiceHook,indiceElemento, texto)
					console.log("cambio texto")
				}

				bz.eliminarElemento = function(indiceCara, indiceHook, indiceElemento){
					console.log(indiceCara, indiceHook, indiceElemento)
					console.log("eliminar")
				}

				bz.cambiarCara = function(indiceCara){
					console.log(indiceCara)
					console.log("cara")
				}

			}
		};
	}]);


