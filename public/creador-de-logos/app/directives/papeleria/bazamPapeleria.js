angular.module("disenador-de-logos")

	.directive("bazamPapeleria", ["fontService", "$document", function (fontService, $document) {
		return {
			restrict: "AE",
			scope: true,
			controller: ["$scope", function ($scope) {

			}],
			link: function (scope, element) {


				function pintarLienzo(lienzo) {



					lienzo.find(".color-primario").css({
						"fill": bz.logo.atributos["color-icono"]
					});

					//si el icono y el texto tienen el mismo color, se agrega como color secundario ele mismo con 0.5 opacity
					if (bz.logo.atributos["color-icono"] === bz.logo.atributos["color-nombre"]) {

						lienzo.find(".color-secundario").css("fill", lienzo.find(".color-primario").css("fill").replace(")", ", 0.5)"));

					} else {

						lienzo.find(".color-secundario").css("fill", bz.logo.atributos["color-nombre"]);

					}
				}


				function agregarHook(hook, caraSvg) {

					var hookSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "foreignObject"));

					hookSvg.attr("id", hook.id);

					hookSvg.append("<svg style='width:100%; height: 100%;'></svg>");

					caraSvg.append(hookSvg);

					angular.forEach(hook.caracteristicas, function (caracteristica, llave) {
						hookSvg.attr(llave, caracteristica);
					});

					angular.forEach(hook.items, function (item, indice) {
						agregarItem(item, indice, hook, hookSvg)

					});

				};


				function agregarItem(item, indice, hook, hookSvg) {

					var itemSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "g"));

					var textSvg = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', item.tag))

					itemSvg.append(textSvg);

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

						if (multilineas == 2) {

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

								iconoSvg.attr("height", "100%")
								iconoSvg.attr("width", "100%")

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
										/*
												if (indice === 0) { //si es el primer item de este contenedor

													contenedorIconoSvg.attr("y", "0");
	
												} else { //cualquier item despues del primero
	
													var itemAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");
	
													var alturaAnterior;
	
													if (hook.items[indice - 1].icono) { //SI HAY UN ICONO ANTERIOR
	
														var contenedorIconoSvgAnterior = itemAnterior.find("foreignObject");
	
														var coordenadasContenedorIconoSvgAnterior = contenedorIconoSvgAnterior[0].getBBox();
	
														alturaAnterior = coordenadasContenedorIconoSvgAnterior.height + coordenadasContenedorIconoSvgAnterior.y;
	
													} else { //SI NO HAY ICONO ANTEIOR
	
														alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;
	
													}
	
													//SE POSICIONA EL ICONO ACTUAL
													contenedorIconoSvg.attr("y", alturaAnterior);
	
	
													itemSvgAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");
	
													var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();
	
												}
	
												coordenadasContenedor = contenedorIconoSvg[0].getBBox();
	
	
												textSvg.attr("y", (coordenadasContenedor.y + (coordenadasContenedor.height / 2) + (coordenadasTexto.height / 4)));
												*/

									} else if (coordenadasContenedor.height <= tamanoLineas) { //si las lineas son mas grandes que el icono


										if (indice === 0) { //si es el primer item de este contenedor

											coordenadasTexto = textSvg[0].getBBox();

											textSvg.attr("y", coordenadasTexto.height)

											textSvg.children().each(function (indiceTrozo) {

												var trozoTextSvg = angular.element(this);

												if (indiceTrozo === 0) { // primera linea de texto
													trozoTextSvg.attr("dy", "0");
												} else {
													//var coordenadasTrozoTextAnterior = trozoTextSvg.prev()[0].getBBox();
													var coordenadasTrozo = trozoTextSvg[0].getBBox();

													trozoTextSvg.attr("dy", coordenadasTrozo.height);
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

										if (hook.items[indice - 1].icono) { //SI HAY UN ICONO ANTERIOR

											var contenedorIconoSvgAnterior = itemAnterior.find("foreignObject");

											var coordenadasContenedorIconoSvgAnterior = contenedorIconoSvgAnterior[0].getBBox();

											alturaAnterior = coordenadasContenedorIconoSvgAnterior.height + coordenadasContenedorIconoSvgAnterior.y;

										} else { //SI NO HAY ICONO ANTEIOR

											alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

										}

										//SE POSICIONA EL ICONO ACTUAL
										contenedorIconoSvg.attr("y", alturaAnterior);


										itemSvgAnterior = hookSvg.children().find("g:nth-child(" + (indice) + ")");

										var coordenadasItemAnterior = itemSvgAnterior[0].getBBox();

									}

									coordenadasContenedor = contenedorIconoSvg[0].getBBox();


									textSvg.attr("y", (coordenadasContenedor.y + (coordenadasContenedor.height / 2) + (coordenadasTexto.height / 4)));
								}

							} else {


								//textSvg.attr("text-anchor", "end");

								if (multilineas) { //si es multilinea

									textSvg.children().attr("x", "100%")

									if (indice === 0) { //si es el primer item de este contenedor

										coordenadasTexto = textSvg[0].getBBox();

										textSvg.attr("y", coordenadasTexto.height)

										textSvg.children().each(function (indiceTrozo) {

											var trozoTextSvg = angular.element(this);

											if (indiceTrozo === 0) { // primera linea de texto
												trozoTextSvg.attr("dy", "0");
											} else {
												//var coordenadasTrozoTextAnterior = trozoTextSvg.prev()[0].getBBox();
												var coordenadasTrozo = trozoTextSvg[0].getBBox();

												trozoTextSvg.attr("dy", coordenadasTrozo.height);
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

										//contenedorIconoSvg.attr("y", "0");


									} else if (coordenadasContenedor.height <= tamanoLineas) { //si las lineas son mas grandes que el icono
										if (indice === 0) { //si es el primer item de este contenedor

											coordenadasTexto = textSvg[0].getBBox();

											textSvg.attr("y", coordenadasTexto.height)

											textSvg.children().each(function (indiceTrozo) {

												var trozoTextSvg = angular.element(this);

												if (indiceTrozo === 0) { // primera linea de texto
													trozoTextSvg.attr("dy", "0");
												} else {
													//var coordenadasTrozoTextAnterior = trozoTextSvg.prev()[0].getBBox();
													var coordenadasTrozo = trozoTextSvg[0].getBBox();

													trozoTextSvg.attr("dy", coordenadasTrozo.height);
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

										if (hook.items[indice - 1].icono) { //SI HAY UN ICONO ANTERIOR

											var contenedorIconoSvgAnterior = itemAnterior.find("foreignObject");

											var coordenadasContenedorIconoSvgAnterior = contenedorIconoSvgAnterior[0].getBBox();

											alturaAnterior = coordenadasContenedorIconoSvgAnterior.height + coordenadasContenedorIconoSvgAnterior.y;

										} else { //SI NO HAY ICONO ANTEIOR

											alturaAnterior = itemAnterior[0].getBBox().y + itemAnterior[0].getBBox().height;

										}

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

										textSvg.children().each(function (indiceTrozo) {

											var trozoTextSvg = angular.element(this);

											if (indiceTrozo === 0) { // primera linea de texto
												trozoTextSvg.attr("dy", "0");
											} else {
												//var coordenadasTrozoTextAnterior = trozoTextSvg.prev()[0].getBBox();
												var coordenadasTrozo = trozoTextSvg[0].getBBox();

												trozoTextSvg.attr("dy", coordenadasTrozo.height);
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








				//obtenemos el controlador padre
				var bz = scope.$parent.papeleriaEditor;

				angular.forEach(bz.papeleria.modelo.caras, function (cara, index) {

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

					angular.forEach(cara.logos, function (logo) {

						var logoSvg = angular.element("<g class='contenedor-logo'>" + bz.base64.decode(bz.logo.logo) + "</g>");

						angular.forEach(logo.caracteristicas, function (caracteristica, llave) {
							logoSvg.children().attr(llave, caracteristica);
						});

						angular.forEach(logo.clases, function (clase) {
							logoSvg.addClass(clase);
						});

						caraSvg.append(logoSvg);

					});
					angular.forEach(cara.hooks, function (hook) {
						agregarHook(hook, caraSvg);
					});

				});

				element.html(element.html());

				pintarLienzo(element);

				bz.modificarHook = function (indiceCara, indiceHook) {

					var hook = bz.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

					var caraSvg = angular.element("bazam-papeleria svg:nth-child(" + (indiceCara + 1) + ")");

					var hookSvg = caraSvg.find("foreignObject#" + hook.id);
					hookSvg.remove();


					agregarHook(hook, caraSvg);

					pintarLienzo(element);
					//agregarItem(item, indice, hook, hookSvg)

				}

				bz.cambiarCara = function (indiceCara) {
					console.log(indiceCara)
					console.log("cara")
				}

			}
		};
	}]);