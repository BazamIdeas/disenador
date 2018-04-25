angular.module("disenador-de-logos")

	.directive("stripePaymentForm", ["$document", function ($document) {

		return {
			templateUrl: "app/templates/stripePaymentsForm.tpl",
			scope: {
				icono: "<",
				atributos: "<",
				svg: "<",
				precio: "<",
				pasarela: "<",
				logo: "<?"
			},
			controller: ["$scope", "pedidosService", "$q", "$state", "$window", "planesService", function ($scope, pedidosService, $q, $state, $window, planesService) {
				var defered = $q.defer();

				var disenadorPromise = defered.promise;

				$scope.completadoPagar = true;

				$scope.pagar = function () {
					if (!$scope.completadoPagar) {
						return;
					}
					$scope.completadoPagar = false;

					var stripePromise = $scope.stripe.createToken($scope.card);

					stripePromise
						.then(function (res) {
							if (res.error) {

								$scope.mensajeError(res.error.message);
								defered.reject();
							} else {
								
								if($scope.logo){//

									planesService.aumentarPedidoPlan({
										idPasarela: $scope.pasarela, 
										idPrecio: $scope.precio,
										idLogo: $scope.logo,
										stripeToken: res.token.id
									})
										.then(function () {
											$window.location.reload();
										})
										.catch(function () {
										//console.log(res)
										})
										.finally(function () {
											defered.resolve();
										});
									
								} else {

									pedidosService.pagar.stripe($scope.icono, $scope.atributos, $scope.svg, $scope.precio, "Logo y nombre", $scope.pasarela, res.token.id)
										.then(function (res) {
											$state.go("descargar", {
												id: res.idLogo
											});
										})
										.catch(function () {
											$scope.mensajeError("El pago no ha podido ser procesado");
										})
										.finally(function () {
											defered.resolve();
										});

								}
								

								
							}
						});


					$q.all({
						stripe: stripePromise,
						disenador: disenadorPromise
					})
						.finally(function () {
							$scope.completadoPagar = true;
						});
				};

			}],
			link: function (scope, el) {

				// Create a Stripe client.
				scope.stripe = Stripe("pk_test_ODlU80cwnJ5Xr2an9L1XZByL");

				// Create an instance of Elements.
				var elements = scope.stripe.elements();

				var style = {
					base: {
						color: "#32325d",
						lineHeight: "18px",
						fontFamily: "\"Helvetica Neue\", Helvetica, sans-serif",
						fontSmoothing: "antialiased",
						fontSize: "16px",
						"::placeholder": {
							color: "#aab7c4"
						}
					},
					invalid: {
						color: "#fa755a",
						iconColor: "#fa755a"
					}
				};

				// Create an instance of the card Element.
				scope.card = elements.create("card", {
					style: style
				});

				// Add an instance of the card Element into the `card-element` <div>.
				scope.card.mount("#card-element");

				// Handle real-time validation errors from the card Element.
				scope.card.addEventListener("change", function (event) {
					var displayError = $document[0].getElementById("card-errors");
					if (event.error) {
						displayError.textContent = event.error.message;
					} else {
						displayError.textContent = "";
					}
				});

				scope.mensajeError = function (mensaje) {
					el.find("#card-errors").text(mensaje);
				};


			}
		};

	}]);