angular.module("disenador-de-logos")

	.directive("bazamSvgText", ["fontService", "$timeout", function (fontService, $timeout) {
		return {
			restrict: "AE",
			scope: {
				svg: "<",
				texto: "<",
				colorTexto: "<colorTexto",
				colorIcono: "<colorIcono",
				fuente: "<",
				url: "<",
				callback: "="
			},
			link: function (scope, element) {

				fontService.preparar(scope.fuente, scope.url)

					.then(function () {})
					.catch(function () {})
					.finally(function () {
						{

							var tamanoBase = 100;
							/*
							////////////////////////////////////////////////////////////
							//////Insertamos el SVG del icono dentro del SVG padre//////
							////////////////////////////////////////////////////////////

							element[0].innerHTML = "<svg  viewBox='0 0 " + tamanoBase + " " + tamanoBase + "'>" + scope.icono + "</svg>";

							var relacion = element[0].children[0].getClientRects()[0].height / tamanoBase;
							var svgIcono = element[0].children[0].children[0];

							svgIcono.setAttribute("height", (tamanoBase / 2) + "px");
							svgIcono.setAttribute("fill", scope.colorIcono);

							/////////////////////////////////////////
							////////creamos el elemento Text/////////
							/////////////////////////////////////////

							var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

							texto.setAttributeNS(null, "x", (tamanoBase / 2));

							var textoNode = document.createTextNode(scope.texto);

							texto.appendChild(textoNode);

							element[0].children[0].appendChild(texto);

							var svgTexto = element[0].children[0].children[1];

							svgTexto.style.fontSize = (tamanoBase / 2) + "px";

							if (scope.colorTexto) {
								svgTexto.style.fill = scope.colorTexto;
							}

							svgTexto.setAttribute("text-anchor", "middle");
							svgTexto.setAttribute("font-family", scope.fuente);

							//////////////////////////////////////////////////////////////////////
							////ajustamos el tamaño del texto en relacion al tamaño del icono/////
							//////////////////////////////////////////////////////////////////////


							while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

								svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

							}

							///////////////////////////////////
							/////centramos los elementos///////
							///////////////////////////////////

							var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

							svgIcono.y.baseVal.value = paddingTopIcono;

							var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + (svgTexto.getClientRects()[0].height / relacion)) + "px";

							svgTexto.setAttribute("y", paddingTopText);


							if ((((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) * 1.5) >= tamanoBase) {

								while ((((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) * 1.5) >= tamanoBase) {

									svgIcono.setAttribute("height", (parseFloat(svgIcono.getAttribute("height")) * 0.95) + "px");

									svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

								}

								paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

								svgIcono.y.baseVal.value = paddingTopIcono;

								paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

								svgTexto.setAttribute("y", paddingTopText);

							}
							*/


							scope.svgSaneado = scope.svg.trim();

							var posicion1 = scope.svgSaneado.search(">");

							//svg tag
							scope.svgTagIncompleto = scope.svgSaneado.substr(0, posicion1 + 1);

							var posicion2 = scope.svgSaneado.substr(posicion1 + 1).search("</svg>");

							//contenido del svg
							scope.seccionInterna = scope.svgSaneado.substr(posicion1 + 1).substr(0, posicion2);

							//recipiente de secciones del svg original
							scope.seccionInternaElementos = [];

							//indices del elemento
							scope.elementosIndices = [];

							//division en partes del svg
							scope.seccionInterna.trim().split(">").forEach(function (parte, index) {
								var indiceParte = " data-indice='" + index + "'";
								if (parte != "") { //si no es un tag de cerrar
									if (parte.search("</") == -1) {
										//si es un tag compuesto, ej: 
										if (parte.search("/") == -1) {
											scope.seccionInternaElementos.push(parte + indiceParte + ">");
										}
										//si no es un tag compuesto, ej: path
										else {
											scope.seccionInternaElementos.push(parte.replace("/", "") + indiceParte + "/>");
										}
										//si es un tag de cerrar
									} else {
										scope.seccionInternaElementos.push(parte + ">");
									}
								}
								scope.elementosIndices.push(false);
							});
							//union del nuevo contenido
							scope.seccionInterna = scope.seccionInternaElementos.join("");

							scope.svgTag = scope.svgTagIncompleto + scope.seccionInterna + "</svg>";

							////////////////////////////////////////////////////////////
							//////Insertamos el SVG del icono dentro del SVG padre//////
							////////////////////////////////////////////////////////////

							element[0].innerHTML = "<svg viewBox='0 0 " + tamanoBase + " " + tamanoBase + "'><g class='contenedor-icono'>" + scope.svgTag + "</g></svg>";

							var relacion = element[0].children[0].getClientRects()[0].height / tamanoBase;

							var svgIcono = element[0].children[0].children[0].children[0];

							svgIcono.setAttribute("height", (tamanoBase / 2) + "px");
							svgIcono.setAttribute("fill", scope.colorIcono);

							/////////////////////////////////////////
							////////creamos el elemento Text/////////
							/////////////////////////////////////////

							var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

							texto.setAttributeNS(null, "x", (tamanoBase / 2));

							var textoNode = document.createTextNode(scope.texto);

							texto.appendChild(textoNode);

							element[0].children[0].appendChild(texto);

							var svgTexto = element[0].children[0].children[1];


							svgTexto.style.fill = scope.colorTexto;
							svgTexto.style.fontSize = (tamanoBase / 2) + "px";
							svgTexto.setAttribute("text-anchor", "middle");
							svgTexto.setAttribute("font-family", scope.fuente);
							svgTexto.setAttribute("class", "textoPrincipal");

							//////////////////////////////////////////////////////////////////////
							////ajustamos el tamaño del texto en relacion al tamaño del icono/////
							//////////////////////////////////////////////////////////////////////

							while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

								svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

							}

							///////////////////////////////////
							/////centramos los elementos///////
							///////////////////////////////////

							var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

							svgIcono.setAttribute("y", paddingTopIcono);

							var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

							svgTexto.setAttribute("y", paddingTopText);

							if (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

								while (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

									svgIcono.setAttribute("height", (parseFloat(svgIcono.getAttribute("height")) * 0.95) + "px");

									svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

								}

								paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

								svgIcono.setAttribute("y", paddingTopIcono);

								paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

								svgTexto.setAttribute("y", paddingTopText);

							}


							//agregamos el Style Tag al svg
							element.children().prepend("<style> @font-face { font-family: '" + scope.fuente.nombre + "'; src: url('" + scope.fuente.url + "')}  </style>");

							$timeout(function () {
								scope.callback = element[0].innerHTML;
							}, 1000);

						}
					});
			}
		};

	}])


	//////////////////////////////
	//////EDICION DEL SVG/////////
	//////////////////////////////

	.directive("bazamSvg", ["$rootScope", "fontService", "$timeout", "$q", "coloresPaletaValue", function ($rootScope, fontService, $timeout, $q, coloresPaletaValue) {
		return {
			restrict: "AE",
			scope: {

				svg: "=svg",
				texto: "=texto",
				fuente: "=fuente",
				svgFinal: "=svgFinal",
				idLogo: "=idLogo",
				idPadre: "=idPadre",
				eslogan: "=eslogan",
				colorIcono: "=colorIcono",
				colorTexto: "=colorTexto",


			},
			controller: function ($scope)

			{

				$scope.svgPreparado = $q.defer();

				if (!$scope.idLogo && !$scope.idPadre) { //si no es un logo previamente guardado

					$scope.fuenteCargada = fontService.preparar($scope.fuente.nombre, $scope.fuente.url);

					$scope.svgSaneado = $scope.svg.trim();

					var posicion1 = $scope.svgSaneado.search(">");

					//svg tag
					$scope.svgTagIncompleto = $scope.svgSaneado.substr(0, posicion1 + 1);

					var posicion2 = $scope.svgSaneado.substr(posicion1 + 1).search("</svg>");

					//contenido del svg
					$scope.seccionInterna = $scope.svgSaneado.substr(posicion1 + 1).substr(0, posicion2);

					//recipiente de secciones del svg original
					$scope.seccionInternaElementos = [];

					//indices del elemento
					$scope.elementosIndices = [];

					//division en partes del svg
					$scope.seccionInterna.trim().split(">").forEach(function (parte, index) {
						var indiceParte = " data-indice='" + index + "'";
						if (parte != "") { //si no es un tag de cerrar
							if (parte.search("</") == -1) {
								//si es un tag compuesto, ej: 
								if (parte.search("/") == -1) {
									$scope.seccionInternaElementos.push(parte + indiceParte + ">");
								}
								//si no es un tag compuesto, ej: path
								else {
									$scope.seccionInternaElementos.push(parte.replace("/", "") + indiceParte + "/>");
								}
								//si es un tag de cerrar
							} else {
								$scope.seccionInternaElementos.push(parte + ">");
							}
						}
						$scope.elementosIndices.push(false);
					});
					//union del nuevo contenido
					$scope.seccionInterna = $scope.seccionInternaElementos.join("");

					$scope.svgTag = $scope.svgTagIncompleto + $scope.seccionInterna + "</svg>";

				} else if ($scope.idLogo || $scope.idPadre) { //si es un logo previamente guardado

					$scope.elementosIndices = [];

				}

			},
			link: {
				pre: function (scope, element) {

					var tamanoBase = 100;

					if (!scope.idLogo && !scope.idPadre) { // si no es un logo guardado previamente

						scope.fuenteCargada
							.then(function () {})
							.catch(function () {})
							.finally(function () {


								////////////////////////////////////////////////////////////
								//////Insertamos el SVG del icono dentro del SVG padre//////
								////////////////////////////////////////////////////////////

								element[0].innerHTML = "<svg viewBox='0 0 " + tamanoBase + " " + tamanoBase + "'><g class='contenedor-icono'>" + scope.svgTag + "</g></svg>";

								var relacion = element[0].children[0].getClientRects()[0].height / tamanoBase;

								var svgIcono = element[0].children[0].children[0].children[0];

								svgIcono.setAttribute("height", (tamanoBase / 2) + "px");
								svgIcono.setAttribute("fill", scope.colorIcono);

								/////////////////////////////////////////
								////////creamos el elemento Text/////////
								/////////////////////////////////////////

								var texto = document.createElementNS("http://www.w3.org/2000/svg", "text");

								texto.setAttributeNS(null, "x", (tamanoBase / 2));

								var textoNode = document.createTextNode(scope.texto);

								texto.appendChild(textoNode);

								element[0].children[0].appendChild(texto);

								var svgTexto = element[0].children[0].children[1];


								svgTexto.style.fill = scope.colorTexto;
								svgTexto.style.fontSize = (tamanoBase / 2) + "px";
								svgTexto.setAttribute("text-anchor", "middle");
								svgTexto.setAttribute("font-family", scope.fuente.nombre);
								svgTexto.setAttribute("class", "textoPrincipal");

								//////////////////////////////////////////////////////////////////////
								////ajustamos el tamaño del texto en relacion al tamaño del icono/////
								//////////////////////////////////////////////////////////////////////

								while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

									svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

								}

								///////////////////////////////////
								/////centramos los elementos///////
								///////////////////////////////////

								var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

								svgIcono.setAttribute("y", paddingTopIcono);

								var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

								svgTexto.setAttribute("y", paddingTopText);

								if (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

									while (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

										svgIcono.setAttribute("height", (parseFloat(svgIcono.getAttribute("height")) * 0.95) + "px");

										svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

									}

									paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

									svgIcono.setAttribute("y", paddingTopIcono);

									paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

									svgTexto.setAttribute("y", paddingTopText);

								}


								//agregamos el Style Tag al svg
								element.children().prepend("<style> @font-face { font-family: '" + scope.fuente.nombre + "'; src: url('" + scope.fuente.url + "')}  </style>");

								scope.svgPreparado.resolve();

							});

					} else if (scope.idLogo || scope.idPadre) { // si es un logo previamenteguardado

						element.html(scope.svg);

						element.find("g.contenedor-icono > svg [data-indice]").each(function () {

							scope.elementosIndices[parseInt(this.getAttribute("data-indice"))] = false;

						});

						scope.texto = element.find("text.textoPrincipal").text();

						if (element.find("text.eslogan").length) {


							scope.eslogan = element.find("text.eslogan").text();
						}
						scope.svgPreparado.resolve();

					}




				},
				post: function (scope, element) {

					//esperamos a que la fuente haya cargado
					scope.svgPreparado.promise.finally(function () {

						//reinsertamos el svg para permitir que se muestre
						element.html(element.html());

						scope.svgFinal = element.html();

						var fuentes = {
							principal: scope.fuente,
							eslogan: null
						};

						var paletaColores = coloresPaletaValue;

						//evento para los hijos directos de seccion-icono
						angular.element("bazam-svg").on("click", "g.contenedor-icono > svg :not(g), .textoPrincipal, .eslogan", function (e) {

							/* COLOPICKER */
							var coordenadasCon = angular.element(".contenedor-svg")[0].getBoundingClientRect();

							var titulo = "";
							var id = "";


							var crearPicker = function (id) {

								if (angular.element("#" + id).length) {
									return;
								}

								var posicionPicker;

								switch (id) {

								case "color-picker-icono":
									posicionPicker = {
										"position": "fixed",
										"left": coordenadasCon.right + 10,
										"top": coordenadasCon.top - 10,
										"width": coordenadasCon.width / 2,
										"height": coordenadasCon.height / 2,
										"background-color": "white",
										"z-index": "2"
									};
									break;

								case "color-picker-texto":
									posicionPicker = {
										"position": "fixed",
										"left": coordenadasCon.left - (coordenadasCon.width / 2) - 10,
										"top": coordenadasCon.top - 10,
										"width": coordenadasCon.width / 2,
										"height": coordenadasCon.height / 2,
										"background-color": "white",
										"z-index": "2"
									};
									break;

								case "color-picker-eslogan":
									posicionPicker = {
										"position": "fixed",
										"left": coordenadasCon.left - (coordenadasCon.width / 2) - 10,
										"top": coordenadasCon.top + 10 + (coordenadasCon.height / 2),
										"width": coordenadasCon.width / 2,
										"height": coordenadasCon.height / 2,
										"background-color": "white",
										"z-index": "2"
									};
								}

								var colorPicker = angular.element("<div class='color-picker-bazam'><div class='titulo'>" + titulo + " <span class='cerrar-color-picker'><i class='material-icons cerrar'>clear</i></span></div></div>");

								colorPicker.attr("id", id);

								colorPicker.css(posicionPicker);

								angular.forEach(paletaColores, function (color) {

									var colorIndividual = angular.element("<div></div>");

									colorIndividual.addClass("color");

									colorIndividual.attr("data-color", color);

									colorIndividual.css({
										"background-color": color,
										"width": "9%",
										"height": "10%",
										"display": "inline-block"
									});

									colorPicker.append(colorIndividual);

								});

								angular.element(".contenedor-principal.editor").append(colorPicker);
							};



							var clicked = angular.element(e.target);

							if (clicked.hasClass("textoPrincipal")) {
								titulo = "NOMBRE";
								id = "color-picker-texto";

							} else if (clicked.hasClass("eslogan")) {
								titulo = "ESLOGAN";
								id = "color-picker-eslogan";
							} else {
								titulo = "ICONO";
								id = "color-picker-icono";
							}

							crearPicker(id);

							if (clicked.hasClass("textoPrincipal") || clicked.hasClass("eslogan")) {
								return;
							}

							//angular.element("body").append("<div style='position:fixed; left: 50%; top: 50%; background: white; width: 200px; height: 200px'> hola </div>")

							angular.element(".seleccionado").removeClass("seleccionado");
							angular.element(this).addClass("seleccionado");

							//obtenemos el indice que es espejo del array
							var indiceParte = angular.element(this).attr("data-indice");

							//definimos en false todos los valores del array
							scope.elementosIndices.forEach(function (valor, indice) {

								scope.elementosIndices[indice] = false;

							});

							//definimos en true la seccion objetivo
							scope.elementosIndices[indiceParte] = true;

						});

						angular.element(".contenedor-principal.editor").on("click", "#color-picker-icono, #color-picker-texto, #color-picker-eslogan", function (e) {

							var contenedorColor = angular.element(e.target);

							var color = contenedorColor.data("color");

							var colorPicker = contenedorColor.parent();

							switch (colorPicker.attr("id")) {

							case "color-picker-icono":

								var indice = scope.elementosIndices.indexOf(true);
								//cambiamos el color al correcto
								element.find("[data-indice=" + indice + "]").css("fill", color);
								break;

							case "color-picker-texto":
								element.find("text.textoPrincipal").css("fill", color);
								break;

							case "color-picker-eslogan":
								element.find("text.eslogan").css("fill", color);

							}

						});


						angular.element(".contenedor-principal.editor").on("click", ".cerrar-color-picker", function () {

							var colorPicker = angular.element(this).parents(".color-picker-bazam");

							if (colorPicker.attr("id") == "color-picker-icono") {
								angular.element(".seleccionado").removeClass("seleccionado");
							}

							colorPicker.remove();



						});

						scope.$on("editor:cerrarColorPickers", function () {

							angular.element(".color-picker-bazam:not(#color-picker-fondo)").remove();
							angular.element(".seleccionado").removeClass("seleccionado");

						});


						////////////////////////////////////////////
						////////vigilamos el cambio de texto////////
						////////////////////////////////////////////

						scope.$on("editor:texto", function (evento, texto) {

							var textoFinal = texto.texto;

							var selector = !texto.eslogan ? ".textoPrincipal" : ".eslogan";

							element.find(selector).text(textoFinal);
							obtenerSVGFinal();

						});

						scope.$on("editor:eliminarEslogan", function () {

							element.find(".eslogan").remove();
							obtenerSVGFinal();

						});

						/////////////////////////////////////////////
						///vigilamos el cambio de fuente del texto///
						/////////////////////////////////////////////

						scope.$on("editor:fuente", function (evento, datos) {


							var selector = datos.objetivo == "texto" ? "text.textoPrincipal" : "text.eslogan";
							var keyFuente = datos.objetivo == "texto" ? "principal" : "eslogan";

							fuentes[keyFuente] = datos.fuente;

							var htmlStyle = "";



							if (fuentes.principal && fuentes.eslogan) {

								htmlStyle = "@font-face { font-family: '" + fuentes.principal.nombre + "'; src: url('" + fuentes.principal.url + "')}\n @font-face { font-family: '" + fuentes.eslogan.nombre + "'; src: url('" + fuentes.eslogan.url + "')}";

							} else if (fuentes.principal) {

								htmlStyle = "@font-face { font-family: '" + fuentes.principal.nombre + "'; src: url('" + fuentes.principal.url + "')}";

							}

							//cambiamos la font-family al correcto

							element.find(selector).attr("font-family", datos.fuente.nombre);

							element.children().children("style").html(htmlStyle);

							obtenerSVGFinal();

						});

						/////////////////////////////////////////////
						/////vigilamos las propiedades del texto/////
						/////////////////////////////////////////////

						scope.$on("editor:propiedad", function (evento, propiedad) {

							var selector = propiedad.eslogan ? "text.eslogan" : "text.textoPrincipal";

							if (propiedad.propiedad == "bold") {

								var grosor = element.find(selector).attr("font-weight") == "bold" ? "normal" : "bold";

								//cambiamos la font-weight al correcto
								element.find(selector).attr("font-weight", grosor);

							} else if (propiedad.propiedad == "cursive") {

								var estilo = element.find(selector)[0].style.fontStyle == "oblique" ? "normal" : "oblique";

								//cambiamos la font-weight al correcto
								element.find(selector).css("font-style", estilo);

							}

							obtenerSVGFinal();
						});


						/////////////////////////////////////////////
						///////vigilamos el cambio de tamaño/////////
						/////////////////////////////////////////////

						scope.$on("editor:tamano", function (evento, datos) {


							if (datos.objetivo == "texto" || datos.objetivo == "eslogan") {


								var selector = datos.objetivo == "eslogan" ? "text.eslogan" : "text.textoPrincipal";
								var texto = element.find(selector);
								var tamano = "";
								if (datos.accion) {

									tamano = (parseFloat(texto.css("font-size")) + 1) + "px";

								} else if (!datos.accion) {

									tamano = (parseFloat(texto.css("font-size")) - 1) + "px";

								}

								texto.css("font-size", tamano);

							} else if (datos.objetivo == "icono") {

								var icono = element.find("g.contenedor-icono > svg");

								var alto = parseFloat(icono.attr("height"));
								var ancho = icono.attr("width") ? parseFloat(icono.attr("width")) : null;
								var altoFinal = 0;
								var anchoFinal = 0;
								if (datos.accion) {

									altoFinal = alto + 1;
									anchoFinal = ancho ? ancho + 1 : null;

								} else if (!datos.accion) {

									altoFinal = alto - 1;
									anchoFinal = ancho ? ancho - 1 : null;

								}

								icono.attr("height", altoFinal + "px");

								if (anchoFinal) {

									icono.attr("width", anchoFinal + "px");

								}
							}

							obtenerSVGFinal();

						});



						/////////////////////////////////////////////
						///////////vigilamos el movimiento///////////
						/////////////////////////////////////////////

						var currentX = 0;
						var currentY = 0;
						var currentMatrix = 0;

						angular.element("bazam-svg").on("mousedown", "text.eslogan, text.textoPrincipal, g.contenedor-icono svg", function (evento) {

							var selector = evento.currentTarget.tagName == "svg" ? "g.contenedor-icono" : this;

							if (!angular.element(selector).attr("transform")) {

								angular.element(selector).attr("transform", "matrix(1 0 0 1 0 0)");

							}

							angular.element(selector).attr("movimiento-bz", true);

							currentX = evento.clientX;

							currentY = evento.clientY;

							currentMatrix = angular.element(selector).attr("transform").slice(7, -1).split(" ");

							for (var i = 0; i < currentMatrix.length; i++) {

								currentMatrix[i] = parseFloat(currentMatrix[i]);

							}

						});


						angular.element("bazam-svg").on("mousemove", "text.eslogan[movimiento-bz], text.textoPrincipal[movimiento-bz], g.contenedor-icono[movimiento-bz]", function (evento) {


							if (angular.element("[movimiento-bz]").length) {

								var dx = evento.clientX - currentX;
								var dy = evento.clientY - currentY;

								var svgPadre = element[0].children[0];

								var relacionX = (svgPadre.getClientRects()[0].width / parseFloat(element.children().attr("viewBox").split(" ")[2]));

								var relacionY = (svgPadre.getClientRects()[0].height / parseFloat(element.children().attr("viewBox").split(" ")[3]));

								currentMatrix[4] += (dx / relacionY);
								currentMatrix[5] += (dy / relacionX);

								var newMatrix = "matrix(" + currentMatrix.join(" ") + ")";

								angular.element(this).attr("transform", newMatrix);
								currentX = evento.clientX;
								currentY = evento.clientY;


							}

						});

						angular.element(document.querySelector("body")).mouseup(function () {

							angular.element("text.textoPrincipal, g.contenedor-icono, text.eslogan").removeAttr("movimiento-bz");

							var clon = angular.element(document.querySelector("bazam-svg")).clone();

							clon.find(".seleccionado").removeClass("seleccionado");

							scope.$apply(function () {
								scope.svgFinal = clon.html();
							});

						});

						/*
						angular.element(document.querySelector(".editor *")).mouseup(function () {

							if (intermediador) {

								element.find(".seleccionado").removeClass("seleccionado");
								console.log("hola")
								angular.element("#color-picker-icono").remove();

							}

						});
						*/


						///////////////////////////////////////////
						//////////////COMPARACION//////////////////
						///////////////////////////////////////////


						scope.$on("editor:comparar", function () {

							$rootScope.$broadcast("directiva:comparar", {
								svg: element.html(),
								creacion: Date.now()
							});

						});


						/////////////////////////////////////////
						//////////////ORIENTACION////////////////
						/////////////////////////////////////////



						scope.$on("editor:orientacion", function (evento, orientacion) {

							var tamanoBase = 100;
							var svgIcono;
							var svgTexto;
							var eslogan;

							var relacion = element[0].children[0].getClientRects()[0].height / tamanoBase;

							if (orientacion == "horizontal") {

								var alturaSVG = tamanoBase;
								var anchoSVG = tamanoBase;

								svgIcono = element.find("g.contenedor-icono > svg")[0];

								svgIcono.setAttribute("height", (alturaSVG * 0.75) + "px");
								svgIcono.setAttribute("width", (alturaSVG * 0.75) + "px");
								svgIcono.parentElement.setAttribute("transform", "");


								/////////////////////////////////////////
								////////creamos el elemento Text/////////
								/////////////////////////////////////////

								svgTexto = element.find("text.textoPrincipal")[0];

								svgTexto.style.fontSize = ((alturaSVG * 0.75) / 2) + "px";
								svgTexto.setAttribute("text-anchor", "left");
								svgTexto.setAttribute("transform", "");
								//////////////////////////////////////////////////////////////////////
								////ajustamos el tamaño del texto en relacion al tamaño del icono/////
								//////////////////////////////////////////////////////////////////////

								var anchoViewBox = parseInt(element[0].children[0].getAttribute("viewBox").split(" ")[3]);

								while ((svgIcono.width.baseVal.value + (anchoSVG * 0.05) + svgTexto.getComputedTextLength()) > (anchoViewBox * 0.80)) {

									svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";
									svgIcono.setAttribute("width", (svgIcono.width.baseVal.value * 0.95) + "px");
									svgIcono.setAttribute("height", (svgIcono.height.baseVal.value * 0.95) + "px");

								}

								///////////////////////////////////
								/////centramos los elementos///////
								///////////////////////////////////

								//anchoSVG - (svgIcono.width.baseVal.value + (anchoSVG * 0.05) + svgTexto.getComputedTextLength())

								var totalEspacioIconoFuente = (svgIcono.width.baseVal.value + (anchoSVG * 0.05) + svgTexto.getComputedTextLength());

								var paddingLeft = (anchoSVG - totalEspacioIconoFuente) / 2;

								svgIcono.setAttribute("y", (alturaSVG / 2) - (svgIcono.height.baseVal.value / 2));
								svgIcono.setAttribute("x", paddingLeft);

								svgTexto.setAttribute("x", paddingLeft + (svgIcono.width.baseVal.value + (anchoSVG * 0.05)));
								svgTexto.setAttribute("y", (alturaSVG / 2) + ((svgTexto.getClientRects()[0].height / relacion) / 4));

								//SI EXISTE EL ESLOGAN

								if (element.find("text.eslogan").length) {

									eslogan = element.find("text.eslogan")[0];

									eslogan.setAttribute("transform", "");
									eslogan.setAttribute("text-anchor", "left");
									eslogan.style.fontSize = svgTexto.style.fontSize;

									eslogan.setAttribute("x", svgTexto.getAttribute("x"));
									/*
									while ((eslogan.getComputedTextLength() > (svgTexto.getComputedTextLength() * 0.8))) {

										eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";

									}

									*/

									svgTexto.setAttribute("y", (alturaSVG / 2) + ((svgTexto.getClientRects()[0].height / relacion) / 4) * 0.5);



									//AJUSTAR ALTURA ESLOGAN AQUI
									//eslogan.setAttribute("y", (alturaSVG / 1.65));



									while (((eslogan.getClientRects()[0].height / relacion) * 1.5) >= (svgTexto.getClientRects()[0].height / relacion)) {
										eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";
									}

									eslogan.setAttribute("y", ((alturaSVG / 2) + ((svgTexto.getClientRects()[0].height / relacion) / 4) * 0.5) + ((eslogan.getClientRects()[0].height / relacion) * 0.9));

								}



							} else if (orientacion == "vertical") {


								////////////////////////////////////////////////////////////
								//////Insertamos el SVG del icono dentro del SVG padre//////
								////////////////////////////////////////////////////////////

								svgIcono = element.find("g.contenedor-icono > svg")[0];

								svgIcono.setAttribute("height", (tamanoBase / 2) + "px");
								svgIcono.removeAttribute("width");
								svgIcono.removeAttribute("x");
								svgIcono.parentElement.setAttribute("transform", "");

								/////////////////////////////////////////
								////////creamos el elemento Text/////////
								/////////////////////////////////////////

								svgTexto = element.find("text.textoPrincipal")[0];

								svgTexto.style.fontSize = (tamanoBase / 2) + "px";
								svgTexto.setAttribute("text-anchor", "middle");

								svgTexto.setAttribute("transform", "");
								svgTexto.setAttribute("x", tamanoBase / 2);

								//////////////////////////////////////////////////////////////////////
								////ajustamos el tamaño del texto en relacion al tamaño del icono/////
								//////////////////////////////////////////////////////////////////////

								while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

									svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

								}

								///////////////////////////////////
								/////centramos los elementos///////
								///////////////////////////////////

								var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

								svgIcono.setAttribute("y", paddingTopIcono);

								var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

								svgTexto.setAttribute("y", paddingTopText);

								if (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

									while (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

										svgIcono.setAttribute("height", (parseFloat(svgIcono.getAttribute("height")) * 0.95) + "px");

										svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

									}

									paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);


									svgIcono.setAttribute("y", paddingTopIcono);

									paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

									svgTexto.setAttribute("y", paddingTopText);

								}


								if (element.find("text.eslogan").length) {

									eslogan = element.find("text.eslogan")[0];
									eslogan.setAttribute("transform", "");
									eslogan.setAttribute("text-anchor", "middle");

									eslogan.style.fontSize = svgTexto.style.fontSize;

									eslogan.setAttribute("x", (tamanoBase / 2));

									while (((eslogan.getClientRects()[0].height / relacion) * 2.5) >= (svgTexto.getClientRects()[0].height / relacion)) {
										eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";
									}


									//verificamos que los elementos no superen el alto del lienzo

									while ((svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion) + (eslogan.getClientRects()[0].height / relacion) * 1.3 >= tamanoBase)) {

										svgIcono.setAttribute("height", (parseFloat(svgIcono.getAttribute("height")) * 0.95) + "px");

										svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

										eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";

									}

									var espacioSobrante = tamanoBase - ((svgIcono.getClientRects()[0].height + svgTexto.getClientRects()[0].height + eslogan.getClientRects()[0].height) / relacion);


									//AJUSTAR AQUI EL ESLOGAN
									svgIcono.setAttribute("y", (espacioSobrante / 2) + "px");

									svgTexto.setAttribute("y", (espacioSobrante / 2) + ((svgIcono.getClientRects()[0].height + svgTexto.getClientRects()[0].height) / relacion) + "px");

									eslogan.setAttribute("y", ((espacioSobrante / 2) + ((svgIcono.getClientRects()[0].height + svgTexto.getClientRects()[0].height + eslogan.getClientRects()[0].height) / relacion)) + "px");




								}

							}

							obtenerSVGFinal();
						});


						////////////////////////////////
						///////////REEMPLAZAR///////////
						////////////////////////////////

						scope.$on("editor:reemplazar", function (evento, icono) {

							var iconoSVG = element.find("g.contenedor-icono > svg");

							var x = iconoSVG.attr("x");
							var y = iconoSVG.attr("y");


							var heightIcono = iconoSVG.attr("height");
							var widthIcono = iconoSVG.attr("width");
							var transform = iconoSVG.attr("transform");

							iconoSVG.parent().html(icono);

							var iconoSVGcambiado = element.find("g.contenedor-icono > svg");

							iconoSVGcambiado.attr("x", x);
							iconoSVGcambiado.attr("y", y);
							iconoSVGcambiado.attr("height", heightIcono);

							if (widthIcono) {

								iconoSVGcambiado.attr("width", widthIcono);

							}

							if (transform) {

								iconoSVGcambiado.attr("transform", transform);
							}

							var indices = [];
							var seccionInternaElementos = [];

							//division en partes del svg
							iconoSVGcambiado.html().trim().split(">").forEach(function (parte, index) {
								var indiceParte = " data-indice='" + index + "'";
								if (parte != "") { //si no es un tag de cerrar
									if (parte.search("</") == -1) {
										//si es un tag compuesto, ej: 
										if (parte.search("/") == -1) {
											seccionInternaElementos.push(parte + indiceParte + ">");
										}
										//si no es un tag compuesto, ej: path
										else {
											seccionInternaElementos.push(parte.replace("/", "") + indiceParte + "/>");
										}
										//si es un tag de cerrar
									} else {
										seccionInternaElementos.push(parte + ">");
									}
								}
								seccionInternaElementos.push(false);
							});
							//union del nuevo contenido
							iconoSVGcambiado.html(seccionInternaElementos.join(""));

							scope.elementosIndices = indices;

							obtenerSVGFinal();

						});


						////////////////////////////////
						///////////RESTAURAR////////////
						////////////////////////////////

						scope.$on("editor:restaurar", function (evento, svg) {

							element.html(svg);

							var indices = [];

							//division en partes del svg
							element.find("g.contenedor-icono > svg [data-indice]").each(function () {

								indices[parseInt(this.getAttribute("data-indice"))] = false;

							});

							element.find(".seleccionado").removeClass("seleccionado");
							angular.element(".color-picker-bazam").remove();

							scope.elementosIndices = indices;

							var texto = element.find("text.textoPrincipal");
							scope.texto = texto.text();

							if (element.find("text.eslogan").length) {
								var eslogan = element.find("text.eslogan");
								scope.eslogan = eslogan.text();
								$rootScope.$broadcast("directiva:restaurarEslogan", {
									accion: true,
									fuente: eslogan.attr("font-family")
								});
							} else {
								$rootScope.$broadcast("directiva:restaurarEslogan", {
									accion: false
								});
							}

							obtenerSVGFinal();

						});


						scope.$on("editor:planes", function () {

							$rootScope.$broadcast("directiva:planes", {
								svg: scope.svgFinal,
								colores: obtenerColores()
							});

						});


						scope.$on("editor:agregarEslogan", function (evento, datos) {

							if (!element.find(".eslogan").length) {


								var tamanoBase = 100;
								var svgIcono;
								var svgTexto;
								var eslogan;

								var relacion = element[0].children[0].getClientRects()[0].height / tamanoBase;

								////////////////////////////////////////////////////////////
								//////Insertamos el SVG del icono dentro del SVG padre//////
								////////////////////////////////////////////////////////////

								svgIcono = element.find("g.contenedor-icono > svg")[0];

								svgIcono.setAttribute("height", (tamanoBase / 2) + "px");
								svgIcono.removeAttribute("width");
								svgIcono.removeAttribute("x");
								svgIcono.parentElement.setAttribute("transform", "");

								/////////////////////////////////////////
								////////creamos el elemento Text/////////
								/////////////////////////////////////////

								svgTexto = element.find("text.textoPrincipal")[0];

								svgTexto.style.fontSize = (tamanoBase / 2) + "px";
								svgTexto.setAttribute("text-anchor", "middle");

								svgTexto.setAttribute("transform", "");
								svgTexto.setAttribute("x", tamanoBase / 2);

								//////////////////////////////////////////////////////////////////////
								////ajustamos el tamaño del texto en relacion al tamaño del icono/////
								//////////////////////////////////////////////////////////////////////

								while (svgTexto.getComputedTextLength() > (1.6 * svgIcono.height.baseVal.value)) {

									svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) - 1) + "px";

								}

								///////////////////////////////////
								/////centramos los elementos///////
								///////////////////////////////////

								var paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);

								svgIcono.setAttribute("y", paddingTopIcono);

								var paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

								svgTexto.setAttribute("y", paddingTopText);

								if (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

									while (((svgTexto.getClientRects()[0].height / relacion) + svgIcono.height.baseVal.value) >= tamanoBase) {

										svgIcono.setAttribute("height", (parseFloat(svgIcono.getAttribute("height")) * 0.95) + "px");

										svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

									}

									paddingTopIcono = ((tamanoBase - (svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion))) / 2);


									svgIcono.setAttribute("y", paddingTopIcono);

									paddingTopText = (paddingTopIcono + parseFloat(svgIcono.getAttribute("height")) + ((svgTexto.getClientRects()[0].height / relacion) / 1.3)) + "px";

									svgTexto.setAttribute("y", paddingTopText);

								}

								var textoEslogan = document.createElementNS("http://www.w3.org/2000/svg", "text");

								textoEslogan.setAttributeNS(null, "x", tamanoBase / 2);
								textoEslogan.setAttributeNS(null, "y", tamanoBase * 0.9);

								var textoNodeEslogan = document.createTextNode(datos.eslogan);

								textoEslogan.appendChild(textoNodeEslogan);

								element.children()[0].appendChild(textoEslogan);

								var eslogan = element.children()[0].children[3];

								eslogan.setAttribute("text-anchor", "middle");
								eslogan.setAttribute("font-family", datos.fuente.nombre);
								eslogan.setAttribute("class", "eslogan");

								eslogan.setAttribute("transform", "");
								eslogan.setAttribute("text-anchor", "middle");

								eslogan.style.fontSize = svgTexto.style.fontSize;

								eslogan.setAttribute("x", (tamanoBase / 2));

								while (((eslogan.getClientRects()[0].height / relacion) * 2.5) >= (svgTexto.getClientRects()[0].height / relacion)) {
									eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";
								}


								//verificamos que los elementos no superen el alto del lienzo

								while ((svgIcono.height.baseVal.value + (svgTexto.getClientRects()[0].height / relacion) + (eslogan.getClientRects()[0].height / relacion) * 1.3 >= tamanoBase)) {

									svgIcono.setAttribute("height", (parseFloat(svgIcono.getAttribute("height")) * 0.95) + "px");

									svgTexto.style.fontSize = (parseFloat(svgTexto.style.fontSize) * 0.95) + "px";

									eslogan.style.fontSize = (parseFloat(eslogan.style.fontSize) * 0.95) + "px";

								}

								var espacioSobrante = tamanoBase - ((svgIcono.getClientRects()[0].height + svgTexto.getClientRects()[0].height + eslogan.getClientRects()[0].height) / relacion);


								//AJUSTAR AQUI EL ESLOGAN
								svgIcono.setAttribute("y", (espacioSobrante / 2) + "px");

								svgTexto.setAttribute("y", (espacioSobrante / 2) + ((svgIcono.getClientRects()[0].height + svgTexto.getClientRects()[0].height) / relacion) + "px");

								eslogan.setAttribute("y", ((espacioSobrante / 2) + ((svgIcono.getClientRects()[0].height + svgTexto.getClientRects()[0].height + eslogan.getClientRects()[0].height) / relacion)) + "px");







								/*
								var tamanoBase = 100;

								var textoEslogan = document.createElementNS("http://www.w3.org/2000/svg", "text");

								textoEslogan.setAttributeNS(null, "x", tamanoBase / 2);
								textoEslogan.setAttributeNS(null, "y", tamanoBase * 0.9);

								var textoNodeEslogan = document.createTextNode(datos.eslogan);

								textoEslogan.appendChild(textoNodeEslogan);

								element.children()[0].appendChild(textoEslogan);

								var svgEslogan = element.children()[0].children[3];

								//var textoPrincipal = element.find("text.textoPrincipal");

								svgEslogan.style.fontSize = (tamanoBase * 0.1) + "px";
								svgEslogan.setAttribute("text-anchor", "middle");
								svgEslogan.setAttribute("font-family", datos.fuente.nombre);
								svgEslogan.setAttribute("class", "eslogan");
								*/
							}

							obtenerSVGFinal();

						});


						var obtenerSVGFinal = function () {

							var elemento = element.clone();

							//elemento.find("[data-indice]").removeAttr("data-indice");
							elemento.find(".seleccionado").removeClass("seleccionado");


							//scope.$apply(function() {
							scope.svgFinal = elemento.html();
							//});

						};

						var obtenerColores = function () {

							var parteSVG = null;
							var tamañoPivote = 0;
							var color = {
								icono: "",
								nombre: "",
								eslogan: ""
							};

							element.find("g.contenedor-icono > svg [data-indice]:not(g)").each(function () {

								var elemento = angular.element(this)[0].getBoundingClientRect();

								var tamanoElemento = elemento.width * elemento.height;

								if (tamanoElemento >= tamañoPivote) {
									tamañoPivote = tamanoElemento;
									parteSVG = angular.element(this);
								}

							});


							if (parteSVG.css("fill")) {

								color.icono = parteSVG.css("fill");

							} else if (parteSVG.attr("fill")) {

								color.icono = parteSVG.attr("fill");

							} else {

								color.icono = "#fff";

							}

							color.nombre = element.find("text.textoPrincipal").css("fill");

							color.eslogan = element.find("text.eslogan").length ? element.find("text.eslogan").css("fill") : "";

							return color;

						};

					});

				}

			}
		};
	}])


	//////////////////////////////////////////
	////VISUALIZA EL SVG SIN ACCION ALGUNA////
	//////////////////////////////////////////
	.directive("bazamVisualizar", function () {

		return {
			restrict: "AE",
			scope: {

				svg: "=svg"

			},
			link: function (scope, element) {
				element.html(scope.svg);
				element.html(element.html());


			}
		};

	})

	.directive("bazamActualizar", function () {

		return {
			restrict: "AE",
			scope: {

				svg: "<svg"

			},
			link: function (scope, element) {

				element.html(scope.svg);
				element.html(element.html());

				scope.$watch("svg", function () {
					element.html(scope.svg);
					element.html(element.html());
				});



			}
		};

	})

	/////////////////////////////////////////////
	//////REDIRECCIONAR EN CAMBIO DE TAMAÑO//////
	/////////////////////////////////////////////

	.directive("bazamRedireccionar", function ($window, $location) {

		return {
			restrict: "AE",
			link: function () {

				if ($window.innerWidth < 1024) {
					$window.location = "/m" + $location.url();
				}

				angular.element(window).resize(function () {
					if ($window.innerWidth < 1024) {
						$window.location = "/m" + $location.url();
					}
				});

			}
		};

	})
	/*
	.directive("fondoContraste", ["coloresFactory", function (coloresFactory) {
		return {
			restrict: "AE",
			scope: {
				color: "<color"
			},
			link: function (scope, element) {

				element.css({
					"background-color": coloresFactory(scope.color)
				});
			}
		};
	}])

	*/
	/*

	/////////////////////////////////////////////
	//////Carousel de logos//////////////////////
	/////////////////////////////////////////////

	.directive("carouselCombinaciones", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/carousel-combinaciones.tpl",
			controller: ["$scope", "$base64", "arrayToJsonMetasFactory", function ($scope, $base64, arrayToJsonMetasFactory) {

				var bz = this;

				bz.logos = $scope.logos;

				bz.largoArray = bz.logos.length;

				bz.nombre = $scope.nombre;

				bz.callback = $scope.callback;

				bz.actual = 0;

				if (bz.largoArray > 1) {
					bz.actual = 1;
				}

				bz.convertidor = arrayToJsonMetasFactory;

				bz.base64 = $base64;

			}],
			controllerAs: "carouselCombinaciones",
			scope: {
				callback: "<",
				logos: "<",
				nombre: "<"
			}
		};


	}])

	/////////////////////////////////////////////
	/////Carousel de destacados/////////////////////
	/////////////////////////////////////////////

	.directive("carouselDestacados", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/carousel-destacados.tpl",
			controller: ["$scope", "$base64", "arrayToJsonMetasFactory", function ($scope, $base64, arrayToJsonMetasFactory) {

				var bz = this;

				bz.callback = $scope.callback;

				bz.actual = 0;

				if ($scope.logos.length > 5) {
					bz.actual = 4;
				} else if ($scope.logos.length > 4) {
					bz.actual = 3;
				} else if ($scope.logos.length > 3) {
					bz.actual = 2;
				} else if ($scope.logos.length > 2) {
					bz.actual = 1;
				}

				bz.convertidor = arrayToJsonMetasFactory;

				bz.base64 = $base64;

				bz.avanzar = function () {
					if (bz.actual < ($scope.logos.length - 2)) {
						bz.actual = bz.actual + 2;
					}
					if (bz.actual == ($scope.logos.length - 6)) {
						$scope.callback[1]($scope.logos[$scope.logos.length - 1]);
					}
				};


			}],
			controllerAs: "carouselDestacados",
			scope: {
				callback: "<",
				logos: "<"
			}
		};


	}])
	*/

	.directive("carouselMisLogos", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/carousel-mis-logos.tpl",
			controller: ["$scope", "$base64", "arrayToJsonMetasFactory", function ($scope, $base64, arrayToJsonMetasFactory) {

				var bz = this;

				bz.callback = $scope.callback;
				bz.elegido = $scope.elegido;
				bz.logos = $scope.logos;

				bz.base64 = $base64;

				bz.actual = 0;
				if($scope.logos.length){
					$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
				}
				

				if ($scope.logos.length > 1) {
					bz.actual = 1;
					$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
				}

				bz.convertidor = arrayToJsonMetasFactory;

				bz.mover = function (accion) {

					if (accion) {
						bz.actual = bz.actual == (bz.logos.length - 1) ? 0 : bz.actual + 1;
						$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
					} else {
						bz.actual = bz.actual == 0 ? bz.logos.length - 1 : bz.actual - 1;
						$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
					}

				};

				bz.borrarSlider = function (idLogo) {
					bz.callback[3](idLogo);

					if (bz.actual == $scope.logos.length - 1) {
						bz.actual = bz.actual - 1;
						$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
					}
				};

			}],
			controllerAs: "carouselMisLogos",
			scope: {
				callback: "<",
				logos: "<",
				elegido: "="
			}
		};


	}])

	.directive("bazamAyuda", ["$timeout", "$compile", function ($timeout, $compile) {
		return {
			restrict: "A",
			controllerAs: "bazamAyuda",
			scope: {
				clases: "<",
				titulo: "@",
				texto: "@",
				retraso: "@",
				orientacion: "@",
				identificador: "@",
				indice: "@paso"
			},
			link: function (scope, element) {

				if (!scope.clases) {
					scope.clases = [];
				}

				if (!scope.retraso) {
					scope.retraso = 200;
				}

				scope.$on("bazamAyuda:mostrar", function (evento, data) {

					if (angular.element("#" + scope.identificador).length) {
						return;
					}

					var coordenadas = element[0].getClientRects()[0];
					var body = angular.element("body");

					var orientacion = scope.orientacion ? scope.orientacion : "right";
					var orientacionFinal = {
						top: 0,
						left: 0
					};

					if (scope.indice == data.indice) {

						angular.element(".pop-ayuda").remove();

						var elementPOP = angular.element("<div></div>");
						elementPOP.addClass("pop-ayuda");
						elementPOP.append("<p class='titulo-ayuda'>" + scope.titulo + "</p>");
						elementPOP.append("<p class='texto-ayuda'>" + scope.texto + "</p>");
						elementPOP.attr("quitar-ayuda", parseInt(scope.indice));

						if (angular.element("[data-paso=" + (parseInt(scope.indice) - 1) + "]").length) {
							var flechaIzq = angular.element("<div></div>");
							flechaIzq.addClass("flecha-ayuda izquierda");
							flechaIzq.attr("mostrar-pop-ayuda", (parseInt(scope.indice) - 1));
							flechaIzq.append("<span><i class='material-icons'>keyboard_arrow_left</i></span>");
							elementPOP.append(flechaIzq);
						}

						if (angular.element("[data-paso=" + (parseInt(scope.indice) + 1) + "]").length) {
							var flechaDer = angular.element("<div></div>");
							flechaDer.addClass("flecha-ayuda derecha");
							flechaDer.attr("mostrar-pop-ayuda", (parseInt(scope.indice) + 1));
							flechaDer.append("<span><i class='material-icons'>keyboard_arrow_right</i></span>");
							elementPOP.append(flechaDer);
						}

						var html = $compile(elementPOP[0].outerHTML)(scope);
						var popCreado = angular.element(html);
						body.append(popCreado);

						angular.forEach(scope.clases, function (clase) {
							popCreado.addClass(clase);
						});

						popCreado.css({
							"position": "fixed",
							"z-index": 2,
							"opacity": 0
						});

						switch (orientacion) {
						case "bottom":
							orientacionFinal.top = coordenadas.bottom;
							orientacionFinal.left = coordenadas.left + (element.width() / 2);
							break;

						case "right":
							orientacionFinal.top = coordenadas.top + (element.height() / 2);
							orientacionFinal.left = coordenadas.right;
							break;

						case "left":
							orientacionFinal.top = coordenadas.top + (element.height() / 2);
							orientacionFinal.left = coordenadas.left - popCreado.width();
							break;

						case "top":
							orientacionFinal.top = coordenadas.top;
							orientacionFinal.left = coordenadas.left + (element.width() / 2);
							break;

						}

						popCreado.css({
							"top": orientacionFinal.top,
							"left": orientacionFinal.left
						});

						popCreado.attr({
							"id": scope.identificador
						});

						if (scope.retraso) {
							$timeout(function () {
								popCreado.addClass("aparecer");
							}, scope.retraso);

						}

					}

				});
			}
		};
	}])

	.directive("bazamPasosAyuda", ["$timeout", "$compile", function ($timeout, $compile) {
		return {
			restrict: "A",
			controllerAs: "bazamPasosAyuda",
			link: function (scope, element, attrs) {

				scope.$on("bazamPasoAyuda:mostrar", function (evento, accion) {

					if (accion) {

						var coordenadas = element[0].getClientRects()[0];
						var body = angular.element("body");

						var orientacion = attrs.orientacion ? attrs.orientacion : "right";
						var orientacionFinal = {
							top: 0,
							left: 0
						};

						var elementPOP = angular.element("<div></div>");
						elementPOP.attr("mostrar-pop-ayuda", attrs.paso);
						elementPOP.addClass("pop-paso-ayuda");
						elementPOP.append("<p class='paso-ayuda'>?</p>");

						var html = $compile(elementPOP[0].outerHTML)(scope);
						var popPasoCreado = angular.element(html);
						body.append(popPasoCreado);

						popPasoCreado.css({
							"position": "fixed",
							"z-index": 2,
							"opacity": 0
						});

						switch (orientacion) {
						case "bottom":
							orientacionFinal.top = coordenadas.bottom - 40;
							orientacionFinal.left = coordenadas.left + (element.width() / 2);
							break;

						case "right":
							orientacionFinal.top = (coordenadas.top + (element.height() / 2)) - 10;
							orientacionFinal.left = coordenadas.right - 35;
							break;

						case "left":
							orientacionFinal.top = (coordenadas.top + (element.height() / 2)) - 10;
							orientacionFinal.left = (coordenadas.left - popPasoCreado.width()) + 25;
							break;

						case "top":
							orientacionFinal.top = coordenadas.top + 40;
							orientacionFinal.left = coordenadas.left + (element.width() / 2);
							break;

						}

						popPasoCreado.css({
							"top": orientacionFinal.top,
							"left": orientacionFinal.left
						});

						$timeout(function () {
							popPasoCreado.addClass("aparecer");
						}, 300);

					} else {

						angular.element(".pop-paso-ayuda").remove();
						angular.element(".pop-ayuda").remove();

					}

				});
			}
		};
	}])


	.directive("mostrarPopAyuda", ["mostrarPopAyudaFactory", function (mostrarPopAyudaFactory) {
		return {
			restrict: "AE",
			link: function (scope, element, attrs) {
				element.click(function () {
					if (!angular.isUndefined(attrs.reiniciar)) {
						angular.element("[mostrar-pop-ayuda]:not([mostrar-pop-ayuda=1])").remove();
					}
					if (!angular.element("#cerrar-ayudas").length) {
						angular.element("body").append("<div><span>Cerrar Ayudas</span></div>");
					}
					mostrarPopAyudaFactory(attrs.mostrarPopAyuda);
				});
			}
		};
	}])


	.directive("bazamMail", ["clientesService", "$q", function (clientesService, $q) {
		return {
			require: "ngModel",
			link: function (scope, element, attributes, ctrl) {


				ctrl.$asyncValidators.disponible = function (modelValor) {

					var defered = $q.defer();
					var promise = defered.promise;

					if (ctrl.$isEmpty(modelValor)) {
						return defered.resolve();
					}

					clientesService.correoDisponible(modelValor)
						.then(function () {
							defered.resolve();
						})
						.catch(function () {
							defered.reject();
						});

					return promise;

				};






			}
		};

	}])
	.directive("bazamFormLogin", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/bazamFormLogin.tpl",
			controller: ["$scope", "clientesService", "$mdToast", "paisesValue", function ($scope, clientesService, $mdToast, paisesValue) {

				var bz = this;

				bz.paises = paisesValue;

				bz.paisDefecto = null;

				clientesService.pais()
					.then(function (res) {
						bz.paisDefecto = res.iso;
					});

				bz.datosLogin = {};

				bz.completadoLogin = true;

				bz.login = function (datos, valido) {

					if (valido && bz.completadoLogin) {

						bz.completadoLogin = false;

						clientesService.login(datos).then(function () {

							if (clientesService.autorizado(true)) {

								$mdToast.show($mdToast.base({
									args: {
										mensaje: "¡Bienvenido!",
										clase: "success"
									}
								}));
								$scope.callback();
								bz.mostrarModalLogin = false;
								/*
								switch ($scope.tipoLogo) {

								case "nuevo":
									$scope.callback[0]($scope.logo);
									break;

								case "predisenado":
									$scope.callback[1]($scope.logoPredisenado);
									break;

								}
								*/
							}

						}).catch(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Verifica tu Usuario y Contraseña",
									clase: "danger"
								}
							}));

						}).finally(function () {

							bz.completadoLogin = true;

						});


					}

				};



				bz.completadoRegistro = true;

				bz.registrar = function (datos, valido) {

					if (valido && bz.completadoRegistro) {

						bz.completadoRegistro = false;

						clientesService.registrar(datos.nombreCliente, datos.correo, datos.pass, datos.telefono, datos.pais).then(function () {

							if (clientesService.autorizado(true)) {

								$mdToast.show($mdToast.base({
									args: {
										mensaje: "¡Registro exitoso!",
										clase: "success"
									}
								}));

								bz.mostrarModalLogin = false;
								$scope.callback();

							}

						}).catch(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));


						}).finally(function () {

							bz.completadoRegistro = true;

						});

					}

				};

				bz.olvido = {
					tipo: "cliente"
				};

				bz.forgotPass = function (datos, v) {
					if (v) {
						bz.peticion = true;
						bz.loaderCargando2 = true;
						clientesService.forgotPass(datos).then(function (res) {
							bz.rc = 2;
							bz.loaderCargando2 = false;
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Codigo enviado al correo.",
									clase: "success"
								}
							}));
						}).catch(function () {
							bz.loaderCargando = false;
						}).finally(function () {
							bz.peticion = false;
						});
					}
				};

				bz.confirmarToken = function (opcion, val) {
					bz.peticion = true;
					if (opcion == true) {
						if (val) {
							clientesService.cambiarContrasena(bz.olvido).then(function (res) {

								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Contraseña cambiada.",
										clase: "success"
									}
								}));

								bz.completadoLogin = true;

								var datos = {
									correo: bz.olvido.correo,
									pass: bz.olvido.pass
								};

								bz.loaderCargando2 = false;
								bz.login(datos, true);

							}).finally(function () {
								bz.peticion = false;
							});
						}
					} else {
						clientesService.confirmarToken(bz.olvido.token).then(function (res) {
							if (res) {
								bz.rc = 3;
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Codigo Confirmado.",
										clase: "success"
									}
								}));
							}
						}).catch(function () {
							//console.log(res)
						}).finally(function () {
							bz.peticion = false;
						});

					}
				};

			}],
			controllerAs: "bazamLogin",
			scope: {
				callback: "<",
				mostrar: "=",
				/*tipoLogo: "<",
				logo: "<",
				logoPredisenado:"<"*/
			}
		};


	}])

	.directive("bazamListarPlanes", [function () {
		return {
			templateUrl: "app/templates/listar-planes.tpl",
			controllerAs: "listarPlanes",
			scope: {
				datos: "=",
				dataId: "=",
				guardarLogo: "<"
			},
			controller: ["pedidosService", "$scope", "$state", "$base64", "$window", "$http", "$mdToast", "facebookService", "logosService", "$filter", "$timeout", "$q", function (pedidosService, $scope, $state, $base64, $window, $http, $mdToast, facebookService, logosService, $filter, $timeout, $q) {

				var bz = this;

				bz.base64 = $base64;

				bz.estado = $scope.estado;

				/* PLANES */

				bz.monedas = {};
				bz.moneda = {};
				bz.monedaDefault = {};
				bz.planes = [];
				bz.impuesto = 0;

				pedidosService.listarPlanes().then(function (res) {

					bz.monedaDefault = {
						simbolo: res.monedaDefault.codigo,
						idMoneda: res.monedaDefault.idMoneda
					};

					bz.impuesto = res.impuesto;

					bz.planes = res.planes;

					angular.forEach(res.planes, function (plan) {

						angular.forEach(plan.precios, function (precio) {

							if (!bz.monedas[precio.moneda]) {

								bz.monedas[precio.moneda] = {
									simbolo: precio.moneda,
									idMoneda: precio.idMoneda
								};

							}

						});

					});

					bz.moneda = bz.monedaDefault;

				});

				bz.precioSeleccionado = function (precios) {

					var precioFinal = "";

					angular.forEach(precios, function (valor) {

						if (valor.moneda == bz.moneda.simbolo) {

							precioFinal = valor.moneda + " " + valor.precio;
						}

					});

					return precioFinal;

				};

				bz.comprobarMonedas = function (plan) {

					var coincidencia = false;

					angular.forEach(plan.precios, function (valor) {

						if (valor.moneda == bz.moneda.simbolo) {

							coincidencia = true;
						}

					});

					return coincidencia;

				};

				bz.avanzarCheckout = function (plan) {

					bz.logo = $scope.datos.logo; //SVG del logo
					bz.idElemento = $scope.datos.idElemento;
					bz.fuentes = {
						principal: $scope.datos.fuentes.principal,
						eslogan: $scope.datos.fuentes.eslogan
					};
					bz.colores = $scope.datos.colores;

					if (plan === true) {
						bz.peticion = true;
						var nombre = "editable";
						var ancho = 50;

						bz.compatirFacebook().then(function (res) {

							angular.element(document.querySelector(".full-overlay")).fadeIn(1000);

							if ($scope.dataId) {
								logosService.descargarLogo($scope.id, ancho, $filter("uppercase")(nombre), nombre).then(function (res) {
									var url = "";
									if (res.zip) {

										url = res.zip.replace("public", "");

									} else if (res.png) {

										url = res.png.replace("public", "");

									}

									logosService.dispararDescarga(url, nombre, ancho);
									bz.desabilitado = true;
									bz.promocion = true;
									bz.peticion = false;
								});
							} else {
								$scope.guardarLogo(bz.logo, "Logo y nombre", $scope.datos.idElemento, true).then(function (res) {

									logosService.descargarLogo(res, ancho, $filter("uppercase")(nombre), nombre).then(function (res) {
										var url = "";
										if (res.zip) {

											url = res.zip.replace("public", "");

										} else if (res.png) {

											url = res.png.replace("public", "");

										}

										logosService.dispararDescarga(url, nombre, ancho);

									}).catch(function () {
										//console.log(res)
									}).finally(function () {
										angular.element(document.querySelector(".full-overlay")).fadeOut(1000);

										bz.desabilitado = true;
										bz.promocion = true;
										bz.peticion = false;
									});
								});
							}


						}).catch(function (res) {

							if (res === "exceso") {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Tiempo excedido, Debes compartir en facebook para obtener tu logo gratis.",
										clase: "danger"
									}
								}));

								return;

							}

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Debes compartir en facebook para obtener tu logo gratis.",
									clase: "danger"
								}
							}));

							bz.peticion = false;

						}).finally(function () {
							bz.peticion = false;
						});

					}

					angular.forEach(plan.precios, function (precio) {

						if (precio.moneda == bz.moneda.simbolo) {

							var datosPago = {
								status: true,
								datos: {
									logo: $scope.datos.logo,
									idElemento: bz.idElemento,
									tipo: "Logo y nombre",
									plan: {
										nombre: plan.plan,
										idPlan: plan.idPlan
									},
									precio: {
										moneda: {
											simbolo: precio.moneda,
											idMoneda: precio.idMoneda
										},
										monto: precio.precio,
										idPrecio: precio.idPrecio
									},
									impuesto: bz.impuesto,
									atributos: {
										principal: bz.fuentes.principal,
										"color-nombre": bz.colores.nombre,
										"color-icono": bz.colores.icono
									}

								}
							};


							if ($scope.datos.idPadre) {
								datosPago.datos.atributos.padre = $scope.datos.idPadre;
							}

							if (bz.fuentes.eslogan) {
								datosPago.datos.atributos.eslogan = bz.fuentes.eslogan;
							}

							if (bz.colores.eslogan) {
								datosPago.datos.atributos["color-eslogan"] = bz.colores.eslogan;
							}

							$state.go("pago", datosPago);

						}

					});

				};

				bz.compatirFacebook = function () {
					var defered = $q.defer();
					var promise = defered.promise;

					var promesas = [$timeout(function () {
						return "exceso";
					}, 60000), facebookService.compartir()];

					$q.race(promesas).then(function (res) {
						if (res === "exceso") {
							defered.reject("exceso");
						} else {
							defered.resolve(res);
						}
					}).catch(function () {
						defered.reject();
					});
					return promise;

				};
			}]
		};
	}])

	.directive("bazamPlanes", [function () {
		return {
			templateUrl: "app/templates/planes.tpl",
			controllerAs: "planes",
			scope: {
				datos: "=",
				estado: "=",
				dataId: "=",
				guardarLogo: "<"
			}
		};

	}])

	.directive("bazamPrevisualizarDos", [function () {
		return {
			templateUrl: "app/templates/ver-logo.tpl",
			scope: {
				datos: "=",
				estado: "=",
				dataId: "=",
				guardarLogo: "<"
			}
		}
	}])

	.directive("bazamColorPicker", [function () {
		return {
			template: "<div style='position:relative;'>\
							<div class='selector-fondo' ng-style='jsonColor(color)' ng-click='mostrarPicker = !mostrarPicker'>\
							</div>\
							<div class='color-picker-bazam' id='color-picker-fondo' ng-show='mostrarPicker' style='position: absolute; width: 200px; height: 200px; background-color: white; z-index: 2; padding: 10px;'>\
									<div class='titulo'>\
										FONDO\
										<span class='cerrar-color-picker' ng-click='mostrarPicker = !mostrarPicker'>\
											<i class='material-icons cerrar'>clear</i>\
										</span>\
									</div>\
									<div ng-repeat='paletaColor in paletaColores track by $index' class='color' ng-style='jsonColor(paletaColor)' style='width: 9%; height: 10%; display: inline-block;' ng-click='$parent.color=paletaColor'></div>\
								</div>\
						</div>",
			scope: {
				color: "="
			},
			controller: ["$scope", "coloresPaletaValue", function ($scope, coloresPaletaValue) {
				$scope.paletaColores = coloresPaletaValue;

				$scope.jsonColor = function (color) {
					return {
						"background-color": color
					};
				};

				$scope.mostrarPicker = false;

				$scope.$on("editor:cerrarColorPickers", function () {

					$scope.mostrarPicker = false;

				});
			}]
		};
	}]);