angular.module("disenador-de-logos")

	.directive("bazamPapeleria", ["fontService", "$document", "$q", "papeleriaService", "$mdToast", "coloresPaletaValue", "$http", function (fontService, $document, $q, papeleriaService, $mdToast, coloresPaletaValue, $http) {
		return {
			restrict: "AE",
			scope: true,
			controller: ["$scope", function ($scope) {

			}],
			link: function (scope, element) {
				
				//obtenemos el controlador padre
				var bz = scope.$parent.papeleriaEditor;

		
				var logoColors = [
					"color-primario",
					"total-blanco",
					"total-negro",
					"total-gris"
				];



				///////////////////////////
				///////MIRROR RECTS////////
				///////////////////////////

				function crearMirrorRect (elementoData, identidad){
					
					var caraSvg = angular.element("svg.cara[data-index="+identidad.data.cara+"]");

					var mirrorRect = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "rect"));
						
					mirrorRect.addClass("mirror-rect");
					mirrorRect.attr("data-identidad", angular.toJson(identidad))
					var coordenadasElemento;

					if(identidad.tipo == "item"){
						
						var itemSvg = caraSvg.find(".hook#"+identidad.data.hook+" > svg > g[data-index="+identidad.data.item+"]");
						
						coordenadasElemento = itemSvg[0].getBBox();
						
						var padreSvg = itemSvg.parents(".hook");
						
						mirrorRect.attr("y", coordenadasElemento.y + parseFloat(padreSvg.attr("y")));
						mirrorRect.attr("x", coordenadasElemento.x + parseFloat(padreSvg.attr("x")));

						aplicarAlteraciones(elementoData, identidad.data.item, "mirror", mirrorRect);

					} else if(identidad.tipo == "logo"){

						var logoSvg = caraSvg.find(".contenedor-logo[data-index='"+identidad.data.logo+"']");

						coordenadasElemento = logoSvg[0].getBBox();	

						mirrorRect.attr("y", coordenadasElemento.y);
						mirrorRect.attr("x", coordenadasElemento.x);
						aplicarAlteraciones(elementoData, identidad.data.logo, "mirror", mirrorRect);

					}

					mirrorRect.css("fill", "transparent");
					mirrorRect.attr("height", coordenadasElemento.height);
					mirrorRect.attr("width", coordenadasElemento.width);
										
					caraSvg.append(mirrorRect);
				}


				////////////////////////////
				//////COLOREAR LOS SVG//////
				////////////////////////////

				function pintarLienzo(lienzo) {

					lienzo.find(".color-primario").css({
						"fill": bz.logo.atributos["color-icono"]
					});

					//si el icono y el texto tienen el mismo color, se agrega como color secundario ele mismo con 0.5 opacity
					if (bz.logo.atributos["color-icono"] === bz.logo.atributos["color-nombre"]) {

						lienzo.find(".color-secundario").css("fill", lienzo.find(".color-primario").css("fill").replace("rgb", "rgba").replace(")", ", 0.5)"));

					} else {

						lienzo.find(".color-secundario").css("fill", bz.logo.atributos["color-nombre"]);

					}
				}


				/////////////////////////////////////////
				////APLICAR ALTERACIONES A LOS ITEMS/////
				/////////////////////////////////////////
				// color, posicion, tamano
				function aplicarAlteraciones(elementoData, indice, elemento, elementoSvg) {
					
					var elementoDOM;

					if(elemento == "item"){
						elementoDOM = elementoSvg.find("g[data-index="+indice+"]");
					} else if(elemento == "logo" || elemento == "mirror"){
						elementoDOM = elementoSvg;						
					};
					
					angular.forEach(elementoData.alteraciones, function(alteracion, llave){

						switch(llave){

							case "matrix":
								var matrix = alteracion;
								
								for (var i = 0; i < matrix.length; i++) {
									matrix[i] = parseFloat(matrix[i]);
								}

								var newMatrix = "matrix(" + matrix.join(" ") + ")";
								elementoDOM.attr("transform", newMatrix);
								break;

						}

					});
					
					
				}

				/////////////////////////////////////////
				//////AGREGAR LOS HOOKS A LAS CARAS//////
				/////////////////////////////////////////

				function agregarHook(hook, caraSvg) {

					var defered = $q.defer();
					var promise = defered.promise;

					fontService.preparar(hook.fuente.nombre, hook.fuente.url)
						.finally(function () {

							var hookSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "foreignObject"));

							hookSvg.attr("id", hook.id);

							hookSvg.addClass("hook");

							hookSvg.css({
								"font-family": hook.fuente.nombre,
								"fill": hook.fuente.fill
							})

							hookSvg.append("<svg style='width:100%; height: 100%;'></svg>");

							caraSvg.append(hookSvg);

							angular.forEach(hook.caracteristicas, function (caracteristica, llave) {
								hookSvg.attr(llave, caracteristica);
							});

							angular.forEach(hook.items, function (item, indice) {
								agregarItem(item, indice, hook, hookSvg);
							});
							
							angular.forEach(hook.items, function(item, indice){
								aplicarAlteraciones(item, indice, "item", hookSvg)
							})

							defered.resolve();
						})

					return promise;

				};

				/////////////////////////////////////////
				//////AGREGAR LOS ITEMS A LOS HOOKS//////
				/////////////////////////////////////////
				function agregarItem(item, indice, hook, hookSvg, conservarAlteraciones) {

					var itemSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "g"));

					var textSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', item.tag))

					itemSvg.append(textSvg);

					itemSvg.attr("data-index", indice);

					//REVISAR
					hookSvg.children().append(itemSvg);

					var iconoTexto;
					var contenedorIconoSvg;
					var iconoSvg;

					if (item.icono) {

						var contenedorIconoSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "foreignObject"));

						iconoSvg = angular.element(item.icono.svg);

						contenedorIconoSvg.append(iconoSvg);

						angular.forEach(item.icono.clases, function (clase) {
							iconoSvg.addClass(clase);
						})

						if (item.icono.orientacion == 'right') {

							itemSvg.append(contenedorIconoSvg);

						} else if (item.icono.orientacion == 'left') {

							itemSvg.prepend(contenedorIconoSvg);

						}

					}

					var multilineas = 0;
					var tamanoLineas = 0;

					if (Array.isArray(item.valor)) { //con saltos de linea

						angular.forEach(item.valor, function (trozoText) {

							trozoTextSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "tspan"));
							trozoTextSvg.text(trozoText);
							textSvg.append(trozoTextSvg);

							tamanoLineas += trozoTextSvg[0].getBBox().height;
							multilineas++;

						})


					} else { //una sola linea de texto

						textSvg.text(item.valor);

					}

					angular.forEach(item.caracteristicas, function (caracteristica, llave) {

						textSvg.attr(llave, caracteristica);

					});

					if (multilineas) {

						if (multilineas <= 2) {
							var tamanoTexto = hook.tamanoTexto;
						} else if (multilineas > 2) {
							var tamanoTexto = (parseInt(hook.tamanoTexto) / multilineas) * 2;
						}

						itemSvg.css({
							"font-size": tamanoTexto
						});

					} else {

						itemSvg.css({
							"font-size": hook.tamanoTexto
						});

					}

					var coordenadasItem = itemSvg[0].getBBox();
					var tamanoIcono = parseInt(hook.tamanoTexto) * 2;
					var coordenadasHook = hookSvg[0].getBBox();
					var coordenadasTexto = textSvg[0].getBBox();
					var coordenadasContenedor;


					switch (hook.orientacion) {

						case "right":

							textSvg.attr("text-anchor", "end");

							if (item.icono) { //si tiene icono

								contenedorIconoSvg.attr("height", tamanoIcono);
								contenedorIconoSvg.attr("width", tamanoIcono);

								iconoSvg.attr("height", "100%");
								iconoSvg.attr("width", "100%");

								coordenadasContenedor = contenedorIconoSvg[0].getBBox();

								if (item.icono.orientacion == 'right') {

									contenedorIconoSvg.attr("x", coordenadasHook.width - coordenadasContenedor.width)

									coordenadasContenedor = contenedorIconoSvg[0].getBBox();

									if (multilineas) {
										textSvg.children().attr("x", (coordenadasContenedor.x * 0.95))
									} else {
										textSvg.attr("x", (coordenadasContenedor.x * 0.95));
									}


								} else if (item.icono.orientacion == 'left') {

									if (multilineas) {
										textSvg.children().attr("x", "100%")
									} else {
										textSvg.attr("x", "100%");
									}

									coordenadasTexto = textSvg[0].getBBox();

									contenedorIconoSvg.attr("x", coordenadasHook.width - coordenadasTexto.width - coordenadasContenedor.width)

								}


								if (multilineas) { //si es multilinea

									coordenadasContenedor = contenedorIconoSvg[0].getBBox();

									if (coordenadasContenedor.height > tamanoLineas) { //si el icono es mas grande que las lineas

										contenedorIconoSvg.attr("y", "0");

										//TODO: posicion del text guiado por el icono


									} else if (coordenadasContenedor.height <= tamanoLineas) { //si las lineas son mas grandes que el icono

										if (indice === 0) { //si es el primer item de este contenedor

											coordenadasTexto = textSvg[0].getBBox();

											textSvg.attr("y", coordenadasTexto.height)

											var alturaLinea = 0;

											textSvg.children().each(function (indiceTrozo) {

												var trozoTextSvg = angular.element(this);

												if (indiceTrozo === 0) { // primera linea de texto
													trozoTextSvg.attr("dy", "0");
													alturaLinea = trozoTextSvg[0].getBBox().height;
												} else {

													var coordenadasTrozo = trozoTextSvg[0].getBBox();
													trozoTextSvg.attr("dy", alturaLinea);
												}

											})

										} else { //cualquier item despues del primero

											var itemAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

											var alturaAnterior = alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

											textSvg.attr("y", alturaAnterior + coordenadasTexto.height);
											var alturaLinea = 0;
											textSvg.children().each(function (indiceTrozo) {

												var trozoTextSvg = angular.element(this);

												if (indiceTrozo === 0) { // primera linea de texto
													trozoTextSvg.attr("dy", "0");
													alturaLinea = trozoTextSvg[0].getBBox().height;

												} else {

													trozoTextSvg.attr("dy", alturaLinea);
												}


											})

										}

										coordenadasTexto = textSvg[0].getBBox();

										contenedorIconoSvg.attr("y", (coordenadasTexto.y + (coordenadasTexto.height / 2) - (coordenadasContenedor.height / 2)));

									}

								} else { //si es un texto de linea unica

									if (indice === 0) { //si es el primer item de este contenedor

										contenedorIconoSvg.attr("y", "0");

									} else { //cualquier item despues del primero

										var itemAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var alturaAnterior;
										/*
										if (hook.items[indice - 1].icono) { //SI HAY UN ICONO ANTERIOR

											var contenedorIconoSvgAnterior = itemAnterior.find("foreignObject");

											var coordenadasContenedorIconoSvgAnterior = contenedorIconoSvgAnterior[0].getBBox();

											alturaAnterior = coordenadasContenedorIconoSvgAnterior.height + coordenadasContenedorIconoSvgAnterior.y;

										} else { //SI NO HAY ICONO ANTERIOR
											*/
										alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

										//}

										//SE POSICIONA EL ICONO ACTUAL
										contenedorIconoSvg.attr("y", alturaAnterior);

										itemSvgAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();

									}

									coordenadasContenedor = contenedorIconoSvg[0].getBBox();

									textSvg.attr("y", (coordenadasContenedor.y + (coordenadasContenedor.height / 2) + (coordenadasTexto.height / 4)));
								}

							} else {

								if (multilineas) { //si es multilinea

									textSvg.children().attr("x", "100%")

									if (indice === 0) { //si es el primer item de este contenedor

										coordenadasTexto = textSvg[0].getBBox();

										textSvg.attr("y", coordenadasTexto.height)
										var alturaLinea = 0;
										textSvg.children().each(function (indiceTrozo) {

											var trozoTextSvg = angular.element(this);

											if (indiceTrozo === 0) { // primera linea de texto
												trozoTextSvg.attr("dy", "0");
												alturaLinea = trozoTextSvg[0].getBBox().height;
											} else {

												var coordenadasTrozo = trozoTextSvg[0].getBBox();
												trozoTextSvg.attr("dy", alturaLinea);
											}

										})

									} else { //cualquier item despues del primero

										var itemAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var alturaAnterior = alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

										textSvg.attr("y", alturaAnterior + coordenadasTexto.height);
										var alturaLinea = 0;
										textSvg.children().each(function (indiceTrozo) {

											var trozoTextSvg = angular.element(this);

											if (indiceTrozo === 0) { // primera linea de texto
												trozoTextSvg.attr("dy", "0");
												alturaLinea = trozoTextSvg[0].getBBox().height;

											} else {

												trozoTextSvg.attr("dy", alturaLinea);
											}


										})
									}


								} else { // si no es multilinea

									textSvg.attr("x", "100%");

									if (indice === 0) { //si es el primer item de este contenedor

										textSvg.attr("y", coordenadasItem.height);

									} else { //cualquier item despues del primero

										itemSvgAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();

										textSvg.attr("y", coordenadasItem.height + coordenadasItemAnterior.y + coordenadasItemAnterior.height);

									}

								}

							}
							break;

						case "left":

							textSvg.attr("text-anchor", "start");

							if (item.icono) { //si tiene icono

								contenedorIconoSvg.attr("height", tamanoIcono);
								contenedorIconoSvg.attr("width", tamanoIcono);

								iconoSvg.attr("height", "100%")
								iconoSvg.attr("width", "100%")

								coordenadasContenedor = contenedorIconoSvg[0].getBBox();

								if (item.icono.orientacion == 'right') {

									//contenedorIconoSvg.attr("x", coordenadasHook.width - coordenadasContenedor.width)

									if (multilineas) {
										textSvg.children().attr("x", "0")
									} else {
										textSvg.attr("x", "0");
									}

									coordenadasTexto = textSvg[0].getBBox();

									contenedorIconoSvg.attr("x", coordenadasTexto.width);

									//coordenadasContenedor = contenedorIconoSvg[0].getBBox();

								} else if (item.icono.orientacion == 'left') {

									contenedorIconoSvg.attr("x", "0");

									coordenadasContenedor = contenedorIconoSvg[0].getBBox();

									if (multilineas) {
										textSvg.children().attr("x", (coordenadasContenedor.width * 1.05))
									} else {
										textSvg.attr("x", (coordenadasContenedor.width * 1.05));
									}


								}

								if (multilineas) { //si es multilinea


									coordenadasContenedor = contenedorIconoSvg[0].getBBox();

									if (coordenadasContenedor.height > tamanoLineas) { //si el icono es mas grande que las lineas

										//TODO:

									} else if (coordenadasContenedor.height <= tamanoLineas) { //si las lineas son mas grandes que el icono
										if (indice === 0) { //si es el primer item de este contenedor

											coordenadasTexto = textSvg[0].getBBox();

											textSvg.attr("y", coordenadasTexto.height)
											var alturaLinea = 0;
											textSvg.children().each(function (indiceTrozo) {

												var trozoTextSvg = angular.element(this);


												if (indiceTrozo === 0) { // primera linea de texto

													trozoTextSvg.attr("dy", "0");
													alturaLinea = trozoTextSvg[0].getBBox().height;

												} else {
													//var coordenadasTrozoTextAnterior = trozoTextSvg.prev()[0].getBBox();
													//var coordenadasTrozo = trozoTextSvg[0].getBBox();

													trozoTextSvg.attr("dy", alturaLinea);
												}

											})

										} else { //cualquier item despues del primero

											var itemAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

											var alturaAnterior = alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

											textSvg.attr("y", alturaAnterior + coordenadasTexto.height);
											var alturaLinea = 0;
											textSvg.children().each(function (indiceTrozo) {

												var trozoTextSvg = angular.element(this);

												if (indiceTrozo === 0) { // primera linea de texto
													trozoTextSvg.attr("dy", "0");
													alturaLinea = trozoTextSvg[0].getBBox().height;

												} else {

													trozoTextSvg.attr("dy", alturaLinea);
												}

											})

										}

										coordenadasTexto = textSvg[0].getBBox();

										contenedorIconoSvg.attr("y", (coordenadasTexto.y + (coordenadasTexto.height / 2) - (coordenadasContenedor.height / 2)));
									}


									//si es el primer item de este contenedor

								} else { //si es un texto de una sola linea

									if (indice === 0) { //si es el primer item de este contenedor

										contenedorIconoSvg.attr("y", "0");

									} else { //cualquier item despues del primero

										var itemAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var alturaAnterior;

										/*if (hook.items[indice - 1].icono) { //SI HAY UN ICONO ANTERIOR

											var contenedorIconoSvgAnterior = itemAnterior.find("foreignObject");

											var coordenadasContenedorIconoSvgAnterior = contenedorIconoSvgAnterior[0].getBBox();

											alturaAnterior = coordenadasContenedorIconoSvgAnterior.height + coordenadasContenedorIconoSvgAnterior.y;

										} else { //SI NO HAY ICONO ANTEIOR */

										alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

										//}

										//SE POSICIONA EL ICONO ACTUAL
										contenedorIconoSvg.attr("y", alturaAnterior);

										itemSvgAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();

									}

									coordenadasContenedor = contenedorIconoSvg[0].getBBox();

									textSvg.attr("y", (coordenadasContenedor.y + (coordenadasContenedor.height / 2) + (coordenadasTexto.height / 4)));

								}

							} else { //si no tiene icono

								if (multilineas) { //si es multilinea

									textSvg.children().attr("x", "0")

									if (indice === 0) { //si es el primer item de este contenedor

										coordenadasTexto = textSvg[0].getBBox();
										textSvg.attr("y", coordenadasTexto.height)
										var alturaLinea = 0;

										textSvg.children().each(function (indiceTrozo) {

											var trozoTextSvg = angular.element(this);
											if (indiceTrozo === 0) { // primera linea de texto
												trozoTextSvg.attr("dy", "0");
												alturaLinea = trozoTextSvg[0].getBBox().height;
											} else {

												var coordenadasTrozo = trozoTextSvg[0].getBBox();
												trozoTextSvg.attr("dy", alturaLinea);
											}

										})

									} else { //cualquier item despues del primero

										var itemAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var alturaAnterior = alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

										textSvg.attr("y", alturaAnterior + coordenadasTexto.height);
										var alturaLinea = 0;
										textSvg.children().each(function (indiceTrozo) {

											var trozoTextSvg = angular.element(this);

											if (indiceTrozo === 0) { // primera linea de texto
												trozoTextSvg.attr("dy", "0");
												alturaLinea = trozoTextSvg[0].getBBox().height;

											} else {

												trozoTextSvg.attr("dy", alturaLinea);
											}


										})
									}

								} else {
									textSvg.attr("x", "0%")

									if (indice === 0) { //si es el primer item de este contenedor

										textSvg.attr("y", coordenadasItem.height);

									} else { //cualquier item despues del primero

										itemSvgAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();

										textSvg.attr("y", coordenadasItem.height + coordenadasItemAnterior.y + coordenadasItemAnterior.height);

									}

								}

							}

							/*if(iconoSvg){//si tiene icono
											
										contenedorIconoSvg.attr("height", tamanoIcono);
										contenedorIconoSvg.attr("width", tamanoIcono);
										
										iconoSvg.attr("height", "100%")
										iconoSvg.attr("width", "100%")

										coordenadasContenedor = contenedorIconoSvg[0].getBBox();										
										contenedorIconoSvg.attr("x", coordenadasHook.width - coordenadasContenedor.width)

										coordenadasContenedor = contenedorIconoSvg[0].getBBox();

										textSvg.attr("x", (coordenadasContenedor.x * 0.95));
										textSvg.attr("text-anchor", "end");

										if(indice === 0){//si es el primer item de este contenedor
								
											textSvg.attr("y", coordenadasItem.height);
			
										} else {//cualquier item despues del primero
											
											itemSvgAnterior = hookSvg.children().find("g:nth-child("+(indice)+")");
											
											var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();
											
											textSvg.attr("y", coordenadasItem.height + coordenadasItemAnterior.y + coordenadasItemAnterior.height);
			
										}
										

									} else {

										//textSvg.attr("x", "100%");
										//textSvg.attr("text-anchor", "end");

										if(indice === 0){//si es el primer item de este contenedor
								
											textSvg.attr("y", coordenadasItem.height);
			
										} else {//cualquier item despues del primero
											
											itemSvgAnterior = hookSvg.children().find("g:nth-child("+(indice)+")");
											
											var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();
											
											textSvg.attr("y", coordenadasItem.height + coordenadasItemAnterior.y + coordenadasItemAnterior.height);
			
										}
									}*/


					};
				}




				/////////////////////////
				/////////COMIENZO////////
				/////////////////////////


				var promesasHooks = [];

				var loader = angular.element("<div></div>");
				loader.addClass("bazam-loader-papeleria");
				element.append(loader);



				angular.forEach(bz.papeleria.modelo.caras, function (cara, index) {

					var caraSvg = angular.element(cara.svg);
					caraSvg.addClass("cara");
					caraSvg.attr("data-index", index);

					if (index) {
						caraSvg.css({
							"visibiliy": "hidden",
							"z-index": "-1"
						})
					}

					var estilos = angular.element("<style></style>");
					estilos.addClass("estilos-cara");

					$http.get("/creador-de-logos/app/directives/papeleria/bazamPapeleria.css").then(function(res){
						estilos.text(res.data);
					})

					caraSvg.prepend(estilos);

					element.append(caraSvg);

					angular.forEach(cara.logos, function (logo, indiceLogo) {

						var logoSvg = angular.element("<g class='contenedor-logo' data-index="+indiceLogo+">" + bz.base64.decode(bz.logo.logo) + "</g>");

						angular.forEach(logo.caracteristicas, function (caracteristica, llave) {
							logoSvg.children().attr(llave, caracteristica);
						});

						angular.forEach(logo.clases, function (clase) {
							logoSvg.addClass(clase);
						});

						aplicarAlteraciones(logo, indiceLogo, "logo", logoSvg);

						caraSvg.append(logoSvg);

					});
					angular.forEach(cara.hooks, function (hook) {
						promesasHooks.push(agregarHook(hook, caraSvg));
					});

				});

				$q.all(promesasHooks)
					.finally(function () {
						element.html(element.html());
						pintarLienzo(element);

						angular.forEach(bz.papeleria.modelo.caras, function(cara, indiceCara){
							
							angular.forEach(cara.logos, function(logo, indiceLogo){
								var identidadLogo = {
									tipo: "logo",
									data: {
										cara: indiceCara,
										logo: indiceLogo
									}
								}
								crearMirrorRect(logo, identidadLogo);
							});
							
							angular.forEach(cara.hooks, function(hook, indiceHook){
								angular.forEach(hook.items, function(item, indiceItem){
									var identidadItem = {
										tipo: "item",
										data: {
											cara: indiceCara,
											hook: hook.id,
											item: indiceItem
										}
									}
									crearMirrorRect(item, identidadItem);
								});
							});

						});

						element.find(".bazam-loader-papeleria").remove();

					})


				bz.modificarHook = function (indiceCara, indiceHook, preservarAlteraciones) {

					var hook = bz.papeleria.modelo.caras[indiceCara].hooks[indiceHook];
					
					if(!preservarAlteraciones){
						angular.forEach(hook.items, function(item, indice){
							bz.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items[indice].alteraciones = {};
						})
					}				


					var caraSvg = angular.element("bazam-papeleria svg:nth-child(" + (indiceCara + 1) + ")");

					var hookSvg = caraSvg.find("foreignObject#" + hook.id);
					hookSvg.remove();

					agregarHook(hook, caraSvg).finally(function () {
						pintarLienzo(element);
						angular.forEach(hook.items, function(item, indiceItem){
							var identidadItem = {
								tipo: "item",
								data: {
									cara: indiceCara,
									hook: hook.id,
									item: indiceItem
								}
							}
							crearMirrorRect(item, identidadItem);
						});
					});

					

				}

				bz.cambiarCara = function (indiceCara) {

					element.find(".cara[data-index]").css("z-index", "-1");

					element.find("[data-index=" + indiceCara + "]").css("z-index", "1");
				}


				bz.elementoFocus = function (indiceCara, indiceHook, accion) {

					var hook = bz.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

					var caraSvg = angular.element("bazam-papeleria svg:nth-child(" + (indiceCara + 1) + ")");

					var hookSvg = caraSvg.find("foreignObject#" + hook.id);

					if (accion) { //si hace hover

						angular.element(".hook-seleccionado").removeClass("hook-seleccionado");
						hookSvg.addClass("hook-seleccionado");

					} else { //si deja de hacer hover

						hookSvg.removeClass("hook-seleccionado");
					}

				}


				bz.guardar = function () {

					if(bz.peticion) return;
					bz.peticion = true;

					bz.datos.tipo = bz.papeleria.tipo;
					bz.datos.modelo = bz.papeleria.modelo.nombre;
					bz.datos.pieza.caras = [];

					var caras = angular.copy(bz.papeleria.modelo.caras);

					angular.forEach(caras, function (cara, indice) {

						var svgCara = angular.element(".cara[data-index=" + indice + "]")[0].outerHTML;

						var nuevaCara = {
							hooks: cara.hooks,
							nombre: cara.nombre,
							logos: cara.logos,
							svg: svgCara
						}
						bz.datos.pieza.caras.push(nuevaCara)
					});

					papeleriaService.piezas.guardar(bz.datos.tipo, bz.datos.modelo, bz.datos.pieza)
						.then(function (res) {
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "¡Ha guardado su pieza!",
									clase: "success"
								}
							}));

							if(res.insertId){
								bz.datos.pieza._id = res.insertId._id;
							} else if (res.affectedRow) {
								bz.datos.pieza._id = res.affectedRow._id;
							}

							
						})
						.catch(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));

						})
						.finally(function () {
							bz.peticion = false;
						})
				}

				/////////////////////////////////////////////
				///////////vigilamos el movimiento///////////
				/////////////////////////////////////////////

				var currentX = 0;
				var currentY = 0;
				var currentMatrix = [];

				/*
				Eventos sin mirror item
				*/

				element.on("mouseenter", ".mirror-rect", function (evento){
					var mirrorSvg = angular.element(this);
					mirrorSvg.attr("movimiento-bz", "");

					var identidad = mirrorSvg.data("identidad");
					angular.element(".cara[data-index="+identidad.data.cara+"] .mirror-rect:not([movimiento-bz])").remove();
				})

				element.on("mousedown", ".mirror-rect[movimiento-bz]", function (evento){
					var mirrorSvg = angular.element(this);
					mirrorSvg.attr("movimiento-bz", "true");

					var identidad = angular.fromJson(mirrorSvg.data("identidad"));

					if (!mirrorSvg.attr("transform")) {
						mirrorSvg.attr("transform", "matrix(1 0 0 1 0 0)");
					};

					var objetivo;

					if(identidad.tipo == "logo"){
						objetivo = angular.element(".cara[data-index="+identidad.data.cara+"] .contenedor-logo[data-index="+identidad.data.logo+"]");
						
					} else if(identidad.tipo == "item") {
						var objetivo = angular.element(".cara[data-index="+identidad.data.cara+"] .hook#"+identidad.data.hook+" g[data-index="+identidad.data.item+"]");
					}

					if(!objetivo.attr("transform")){
						objetivo.attr("transform", "matrix(1 0 0 1 0 0)");
					}

					currentX = evento.clientX;
					currentY = evento.clientY;

					currentMatrix = objetivo.attr("transform").slice(7, -1).split(" ");

					for (var i = 0; i < currentMatrix.length; i++) {

						currentMatrix[i] = parseFloat(currentMatrix[i]);

					}

				})


				element.on("mousemove", ".mirror-rect[movimiento-bz=true]", function (evento) {
					
					var mirrorSvg = angular.element(this);

					var identidad = angular.fromJson(mirrorSvg.data("identidad"));

					angular.element(".element-color-picker").remove();
					
					var objetivo;

					if(identidad.tipo == "logo"){
						objetivo = angular.element(".cara[data-index="+identidad.data.cara+"] .contenedor-logo[data-index="+identidad.data.logo+"]");
						
					} else if(identidad.tipo == "item") {
						var objetivo = angular.element(".cara[data-index="+identidad.data.cara+"] .hook#"+identidad.data.hook+" g[data-index="+identidad.data.item+"]");
					}

					var dx = evento.clientX - currentX;
					var dy = evento.clientY - currentY;

					var caraSvg = element.find(".cara[data-index="+identidad.data.cara+"]");

					var relacionX = (caraSvg[0].getClientRects()[0].width / parseFloat(caraSvg.attr("viewBox").split(" ")[2]));
					var relacionY = (caraSvg[0].getClientRects()[0].height / parseFloat(caraSvg.attr("viewBox").split(" ")[3]));

					currentMatrix[4] += (dx / relacionY);
					currentMatrix[5] += (dy / relacionX);

					var newMatrix = "matrix(" + currentMatrix.join(" ") + ")";

					mirrorSvg.attr("transform", newMatrix);
					objetivo.attr("transform", newMatrix);
					currentX = evento.clientX;
					currentY = evento.clientY;


					if(identidad.tipo == "logo"){

						if(!bz.papeleria.modelo.caras[identidad.data.cara].logos[identidad.data.logo].alteraciones){ //si no existe una alteracion previa
							bz.papeleria.modelo.caras[identidad.data.cara].logos[identidad.data.logo].alteraciones = {};
						}
	
						bz.papeleria.modelo.caras[identidad.data.cara].logos[identidad.data.logo].alteraciones.matrix = currentMatrix;

					} else if(identidad.tipo == "item"){

						var indiceHook;
						angular.forEach(bz.papeleria.modelo.caras[identidad.data.cara].hooks, function(hookPapeleria, indice){
	
							if(identidad.data.hook == hookPapeleria.id){
								indiceHook = indice;
							}
						});

						if(!bz.papeleria.modelo.caras[identidad.data.cara].hooks[indiceHook].items[identidad.data.item].alteraciones){ //si no existe una alteracion previa
							bz.papeleria.modelo.caras[identidad.data.cara].hooks[indiceHook].items[identidad.data.item].alteraciones = {};
						}
	
						bz.papeleria.modelo.caras[identidad.data.cara].hooks[indiceHook].items[identidad.data.item].alteraciones.matrix = currentMatrix;

					}
					
				})

				angular.element("body").mouseup(function (evento){
					var mirrorSvg = element.find(".mirror-rect[movimiento-bz=true]");
					mirrorSvg.attr("movimiento-bz", "");
				})

				element.on("mouseleave", ".mirror-rect", function (evento){
					var mirrorSvg = angular.element(this);
					
					var identidad = angular.fromJson(mirrorSvg.data("identidad"));
					mirrorSvg.remove();			
					
					var cara = bz.papeleria.modelo.caras[identidad.data.cara];

					angular.forEach(cara.logos, function(logo, indiceLogo){
						var identidadLogo = {
							tipo: "logo",
							data: {
								cara: identidad.data.cara,
								logo: indiceLogo
							}
						}
						crearMirrorRect(logo, identidadLogo);
					});
					
					angular.forEach(cara.hooks, function(hook, indiceHook){
						angular.forEach(hook.items, function(item, indiceItem){
							var identidadItem = {
								tipo: "item",
								data: {
									cara: identidad.data.cara,
									hook: hook.id,
									item: indiceItem
								}
							}
							crearMirrorRect(item, identidadItem);
						});
					});

				})

				element.on("contextmenu", ".mirror-rect", function(evento){

					var mirrorSvg = angular.element(this);

					var coordenadasMirror = mirrorSvg[0].getBoundingClientRect();

					angular.element(".element-color-picker").remove();

					var identidad = mirrorSvg.data("identidad");				

					var colorPicker = angular.element("<div class='element-color-picker'><div class='title'>X</div>");
					
					colorPicker.attr("data-identidad", angular.toJson(identidad));

					var posicionPicker = {
						"position": "fixed",	
						"background-color": "white",
						"z-index": "2",
					};

					if(identidad.tipo == "item"){//si es un item perteneciente a un Hook se agrega una paleta de colores

						colorPicker.find(".title").html("Color<span class='close-color-picker'><i class='material-icons cerrar'>clear</i></span></div>");

						posicionPicker.left = coordenadasMirror.right;
						posicionPicker.top = coordenadasMirror.top - 200;									
						posicionPicker.width = "200px";
						posicionPicker.height = "200px";

						angular.forEach(coloresPaletaValue, function (color) {

							var colorIndividual = angular.element("<div></div>");

							colorIndividual.addClass("color");

							colorIndividual.attr("data-color", color);

							colorIndividual.css({
								"background-color": color,
								"width": "4.2%",
								"height": "6.7%",
								"display": "inline-block"
							});

							colorIndividual.click(function(){

								var hooks = bz.papeleria.modelo.caras[identidad.data.cara].hooks;
								var indexHook;
								angular.forEach(hooks, function(hook, indiceHook){
									
									if(hook.id == identidad.data.hook){
										indexHook = indiceHook;
										bz.papeleria.modelo.caras[identidad.data.cara].hooks[indiceHook].items[identidad.data.item].caracteristicas.fill = color;

										console.log(bz.papeleria.modelo.caras[identidad.data.cara].hooks[indiceHook].items[identidad.data.item].caracteristicas);
									}
									
								})

							

								bz.modificarHook(identidad.data.cara, indexHook, true);
								
							});

							colorPicker.append(colorIndividual);

						});
					} else if (identidad.tipo == "logo") {
						
						colorPicker.find(".title").html("Estilos <span class='close-color-picker'><i class='material-icons cerrar'>clear</i></span></div>");

						//colorPicker.append("<div></div>")

						var multiLogoContainer = angular.element("<div></div>");
						multiLogoContainer.addClass("multi-logo-color-container");
						
						angular.forEach(logoColors, function(color, indiceColor){
							var logoContainer = angular.element("<div></div>");
							logoContainer.addClass("logo-color-container");
							logoContainer.addClass(color);
							//logoContainer.attr("data-clase",color);
							
							logoContainer.click(function(){

								var logoSvg = element.find(".cara[data-index="+identidad.data.cara+"] .contenedor-logo[data-index="+identidad.data.logo+"]");
								var colorAnterior;

								angular.forEach(logoColors, function(colorIter){
									if(logoSvg.hasClass(colorIter)){
										logoSvg.removeClass(colorIter);
										colorAnterior = colorIter;
									}
								})

								logoSvg.addClass(color);					
								
								var indiceClase = bz.papeleria.modelo.caras[identidad.data.cara].logos[identidad.data.logo].clases.indexOf(colorAnterior);

								indiceClase = indiceClase === -1 ? 0 : indiceClase;

								bz.papeleria.modelo.caras[identidad.data.cara].logos[identidad.data.logo].clases[indiceClase] = color;
							})

							logoContainer.append(bz.base64.decode(bz.logo.logo));
							multiLogoContainer.append(logoContainer);
						})

						colorPicker.append(multiLogoContainer);

						posicionPicker["left"] = coordenadasMirror.right;
						posicionPicker["top"] = coordenadasMirror.top - 150;									
						posicionPicker["width"] = "300px";
						posicionPicker["height"] = "150px";

					}


					colorPicker.css(posicionPicker);
					colorPicker.addClass("color-picker-activo");




					
					colorPicker.draggable({
						revert:false
						});
					
					colorPicker.find(".close-color-picker").click(function(){
						colorPicker.remove();
					});

					/*colorPicker.find(".color").click(function(){
						
						if(identidad.tipo == "item"){

							console.log("item");
							/*
							var indiceHook;
							angular.forEach(bz.papeleria.modelo.caras[identidad.data.cara].hooks, function(hookPapeleria, indice){

								if(identidad.data.hook == hookPapeleria.id){
									indiceHook = indice;
								}
								
							});
							

						} else if(identidad.tipo == "logo") {
							console.log("logo");
						}
					})*/
					

					element.parent().append(colorPicker);
					evento.preventDefault();
				});				

			}
		};
	}]);