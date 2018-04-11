angular.module("disenador-de-logos")

	.directive("bazamScroll", [function () {
		return {
			restrict: "AE",
			link: function (scope, element) {

				element.find('a.link-scroll').click(function (e) {
						
					var irA = element.find(e.target.attributes.href.value);

					angular.element('body').animate({
						scrollTop: irA[0].offsetTop
					}, 1000);

					return false;
				});

			}
		};

	}]);