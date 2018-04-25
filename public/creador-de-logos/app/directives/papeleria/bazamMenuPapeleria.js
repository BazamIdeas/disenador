angular.module("disenador-de-logos")

    .directive("bazaMenuPareleria", ["fontService", function (fontService) {
        return {
            restrict: "AE",
            scope: true,
            controller: ["$scope", function ($scope) {
                var bz = $scope.$parent.papeleriaEditor;

                
            }]
        }
    }]);