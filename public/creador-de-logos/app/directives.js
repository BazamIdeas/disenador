angular.module("disenador-de-logos")

.directive('bazam-svg-text', function () {
    return {
        restrict: 'AE',
        priority: 10,
        template: '{{scope.todo}}',
        link: function (scope, elem, attrs) {
            scope.todo = elem;
        }
        
    };
});
