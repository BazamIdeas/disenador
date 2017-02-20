angular.module("disenador-de-logos")

.directive('bazamSvgText', function ($timeout) {
    return {
        restrict: 'AE',
        priority: 1000000,
        template: '<p>Hola</p>',
        post: function(scope, element, attributes, controller, transcludeFn){
 
             }

        }

    };
});
