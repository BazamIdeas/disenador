angular.module("disenador-de-logos")

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

    }]);