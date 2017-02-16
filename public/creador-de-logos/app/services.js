angular.module("disenador-de-logos")

.factory('compartirFactory', [function () {
    var estados = [];
    var informacion = {
        definir: function (nombre, valor) {
            estados[nombre] = valor;
        },
        obtener: function (nombre) {
            return estados[nombre];
        }
    }
    return informacion;
}])

.factory('crearLogoFactory', [function () {

    var logos = [];

    var crear = function (iconos, fuentes) {

        angular.forEach(iconos, function (icono, indice) {

            angular.forEach(fuentes, function (fuente, indice) {

                var logo = {

                    icono: icono.url,
                    fuente: fuente.url

                };

                logos.push(logo);

            })

        })
        
        return logos;

    }

    return crear;

}])
