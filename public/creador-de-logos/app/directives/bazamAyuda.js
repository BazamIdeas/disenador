angular.module("disenador-de-logos")

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