angular.module("disenador-de-logos")


	//////////////////////////////
	//////EDICION DEL SVG/////////
	//////////////////////////////

	.directive("bazamSvg", ["$rootScope", "fontService", "$timeout", "$q", "coloresPaletaValue", "disenadorService", function ($rootScope, fontService, $timeout, $q, coloresPaletaValue, disenadorService) {
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
				colorTexto: "=colorTexto"


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
						angular.element("bazam-svg").on("contextmenu", "g.contenedor-icono > svg :not(g), .textoPrincipal, .eslogan", function (e) {

							/* COLOPICKER */
							var coordenadasCon = angular.element(".svg-container")[0].getBoundingClientRect();

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
										"width": coordenadasCon.width / 1.6,
										"height": coordenadasCon.height / 2,
										"background-color": "white",
										"z-index": "2"
									};
									break;

								case "color-picker-texto":
									posicionPicker = {
										"position": "fixed",
										"left": coordenadasCon.left - (coordenadasCon.width / 2) - 10,
										"top": coordenadasCon.top - 40,
										"width": coordenadasCon.width / 1.6,
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
										"width": coordenadasCon.width / 1.6,
										"height": coordenadasCon.height / 2,
										"background-color": "white",
										"z-index": "2"
									};
								}

								var colorPicker = angular.element("<div class='element-color-picker'><div class='title'>" + titulo + " <span class='close-color-picker'><i class='material-icons cerrar'>clear</i></span></div></div>");

								colorPicker.attr("id", id);

								colorPicker.css(posicionPicker);

								angular.forEach(paletaColores, function (color) {

									var colorIndividual = angular.element("<div></div>");

									colorIndividual.addClass("color");

									colorIndividual.attr("data-color", color);

									colorIndividual.css({
										"background-color": color,
										"width": "4.2%",
										"height": "6.7%",
										"display": "inline-block"
									});

									colorPicker.append(colorIndividual);

								});

								angular.element(".principal-container.editor").append(colorPicker);

								colorPicker.draggable({
									revert:false
								  });

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
								e.preventDefault();
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
							e.preventDefault();
						});

						angular.element(".principal-container.editor").on("click", "#color-picker-icono, #color-picker-texto, #color-picker-eslogan", function (e) {

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


						angular.element(".principal-container.editor").on("click", ".close-color-picker", function () {

							var colorPicker = angular.element(this).parents(".element-color-picker");

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

						function reemplazarIcono(evento, icono) {
							//console.log(evento, icono)
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

						}

						scope.$on("editor:reemplazar", reemplazarIcono);


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


						function obtenerSVGFinal() {

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

						/******* DISENADOR ******/
						if(disenadorService.autorizado()){

							//creamos el boton para insertar imagen 
							var botonInsertarImagen = angular.element("<input type='file' accept='image/svg+xml' style='display:none'>");
							var botonMirror = angular.element("<button>Cargar Icono</button>");

							botonMirror.click(function(){
								botonInsertarImagen[0].click();
							})

							botonInsertarImagen.change(function(event){

								var input = event.target;

								var svgFile = input.files[0];
								
								if(!input.files.length || svgFile.type != "image/svg+xml"){
									botonInsertarImagen[0].value = '';

									//console.log(input.files)
									return;
								}

								var readerIconDisenador = new FileReader();

								readerIconDisenador.onload = function(){

									var svgInput = readerIconDisenador.result;
									svgInput = "<svg" + svgInput.split("<svg")[1];
									svgInput = svgInput.replace(/fill=/gi, "nofill=");

									var svgInputElement = angular.element(svgInput);
									
									//console.log(svgInputElement[0].outerHTML)
									svgInputElement.removeAttr("width");
									svgInputElement.removeAttr("height");

									reemplazarIcono(false, svgInputElement[0].outerHTML);

								};
								
								readerIconDisenador.readAsText(svgFile);

							})

							
							botonMirror.css({
								"postion": "fixed",
								"top" : "0px",
								"left":  "0px"
							})

							//insertamos el boton en el espacio del editor
							var contenedorEditor = element.parents(".principal-container.editor");

							contenedorEditor.prepend(botonMirror);

						}
					});

				}

			}
		};
	}]);


	


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
