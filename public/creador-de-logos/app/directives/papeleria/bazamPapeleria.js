angular.module("disenador-de-logos")

	.directive("bazamPapeleria", ["fontService", "$document", "$q", "papeleriaService", "$mdToast", function (fontService, $document, $q, papeleriaService, $mdToast) {
		return {
			restrict: "AE",
			scope: true,
			controller: ["$scope", function ($scope) {

			}],
			link: function (scope, element) {
				
				//obtenemos el controlador padre
				var bz = scope.$parent.papeleriaEditor;

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
				////APLICAR ALTERACIONES A LOS items/////
				/////////////////////////////////////////
				// color, posicion, tamano
				function aplicarAlteraciones(elementoData, indice, elemento, elementoSvg) {
					
					var elementoDOM;
					
					if(elemento == "item"){
						elementoDOM = elementoSvg.find("g[data-index="+indice+"]");
					} else if(elemento == "logo"){
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
								aplicarAlteraciones(item, indice, "hook", hookSvg)
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
					estilos.text(
						`.total-blanco, .total-blanco * {
							stroke: white !important;
							fill: white !important;
						}`
					);

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

						element.find(".bazam-loader-papeleria").remove();

					})


				bz.modificarHook = function (indiceCara, indiceHook, preservarAlteraciones) {

					preservarAlteraciones

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
					})

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

				element.on("mouseenter", ".hook g, g.contenedor-logo", function (evento){

					var objetivo = angular.element(evento.currentTarget);

					objetivo.attr("movimiento-bz", "false");

					angular.element(".rect-bz").remove();	

					var coordenadasObjetivo = objetivo[0].getBBox();

					var rectangulo = angular.element($document[0].createElementNS('http://www.w3.org/2000/svg', "rect"));

					rectangulo.addClass("rect-bz");

					rectangulo.css({					
						"fill": "transparent",
						"stroke": "black",
						"stroke-width": "1px",
						"stroke-dasharray": "3px"
					})

					var cara = objetivo.parents(".cara");
					var hook = objetivo.parents(".hook");

					rectangulo.attr("height", coordenadasObjetivo.height);
					rectangulo.attr("width", coordenadasObjetivo.width);

					if(hook.length){
						rectangulo.attr("x", coordenadasObjetivo.x + parseFloat(hook.attr("x")));
						rectangulo.attr("y", coordenadasObjetivo.y + parseFloat(hook.attr("y")));
					} else {
						rectangulo.attr("x", coordenadasObjetivo.x);
						rectangulo.attr("y", coordenadasObjetivo.y);
					}
					
					rectangulo.attr("transform", objetivo.attr("transform"))

					cara.append(rectangulo);
				})

				element.on("mouseleave", ".rect-bz", function (evento){
					angular.element(".rect-bz").remove();
					var objetivo = angular.element("[movimiento-bz]");
					objetivo.removeAttr("movimiento-bz");
				})

				element.on("mousedown", ".rect-bz", function (evento) {
		
					var objetivo = angular.element("[movimiento-bz]");
					objetivo.attr("movimiento-bz", "true")
					//var svgPadre = objetivo.hasClass("contenedor-logo") ? objetivo.parents(".cara") : objetivo.parents(".hook svg");

	
					if (!objetivo.attr("transform")) {

						objetivo.attr("transform", "matrix(1 0 0 1 0 0)");

					}
			

					currentX = evento.clientX;

					currentY = evento.clientY;

					currentMatrix = objetivo.attr("transform").slice(7, -1).split(" ");

					for (var i = 0; i < currentMatrix.length; i++) {

						currentMatrix[i] = parseFloat(currentMatrix[i]);

					}
		
				});


				element.on("mousemove", ".rect-bz", function (evento) {

					var objetivo = angular.element(evento.currentTarget);

					if(!angular.element("[movimiento-bz=true]").length){
						return;
					}
					
					var dx = evento.clientX - currentX;
					var dy = evento.clientY - currentY;

					var svgPadre = objetivo.parents(".cara")[0];

					var relacionX = (svgPadre.getClientRects()[0].width / parseFloat(element.children().attr("viewBox").split(" ")[2]));
					var relacionY = (svgPadre.getClientRects()[0].height / parseFloat(element.children().attr("viewBox").split(" ")[3]));

					currentMatrix[4] += (dx / relacionY);
					currentMatrix[5] += (dy / relacionX);

					var newMatrix = "matrix(" + currentMatrix.join(" ") + ")";

					objetivo.attr("transform", newMatrix);
					angular.element("[movimiento-bz]").attr("transform", newMatrix);
					currentX = evento.clientX;
					currentY = evento.clientY;



				});

				angular.element("body").mouseup(function () {

					var objetivo = angular.element("[movimiento-bz]");

					if(!objetivo.length){
						return;
					}

					
					var objetivoElemento = objetivo.hasClass("contenedor-logo") ? "logo" : "item";

					if(objetivoElemento === "item"){

						var indiceCara = objetivo.parents(".cara").data("index");
						var idHook = objetivo.parents(".hook").attr("id");
						var indiceItem = objetivo.data("index");
	
						var indiceHook;
						angular.forEach(bz.papeleria.modelo.caras[indiceCara].hooks, function(hookPapeleria, indice){
	
							if(idHook == hookPapeleria.id){
								indiceHook = indice;
							}
						});
						
						if(!bz.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items[indiceItem].alteraciones){ //si no existe una alteracion previa
							bz.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items[indiceItem].alteraciones = {};
						}
	
						bz.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items[indiceItem].alteraciones.matrix = currentMatrix;

					} else if(objetivoElemento === "logo") {
						var indiceCara = objetivo.parents(".cara").data("index");
						var indiceLogo = objetivo.data("index");


						
						if(!bz.papeleria.modelo.caras[indiceCara].logos[indiceLogo].alteraciones){ //si no existe una alteracion previa
							bz.papeleria.modelo.caras[indiceCara].logos[indiceLogo].alteraciones = {};
						}
	
						bz.papeleria.modelo.caras[indiceCara].logos[indiceLogo].alteraciones.matrix = currentMatrix;

					}
				

					//angular.element(".rect-bz").remove();

					//angular.element("")

					angular.element("[movimiento-bz]").attr("movimiento-bz", "false");

					
				
				});



			}
		};
	}]);