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

				element.append('<svg class="background-svg" viewbox="0 0 400 400"></svg>');

				fontService.preparar(scope.fuente, scope.url)

					.then(function () {})
					.catch(function () {})
					.finally(function () {
						{

							element.find('.background-svg').remove();
						
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

							svgIcono.setAttribute("height", (tamanoBase / 3) + "px");
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
							element.children().prepend("<style> @font-face { font-family: '" + scope.fuente + "'; src: url('" + scope.url + "')}  </style>");

							$timeout(function () {
								scope.callback = element[0].innerHTML;
							}, 1000);

						}
					});
			}
		};

	}]);