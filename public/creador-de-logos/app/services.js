angular.module("disenador-de-logos")


/*-------------------------- Services --------------------------*/


.service('categoriasService', ["$http", function ($http) {


    this.listaCategorias = $http.get("/app/categorias");


}])



.service('preferenciasService', ["$http", function ($http) {


    this.listaPreferencias = $http.get("/app/preferencias");


}])


.service('elementosService', ["$http", function ($http) {

    this.listaSegunPref = function (datos) {

        return $http.post("/app/elementos/busqueda", datos)

        .then(function (res) {
            console.log("x");
            console.log(res);
            
        }, function (res) {
            console.log("error");
            console.log(res);

        })

        .catch(function (res) {
             console.log("catch");
            console.log(res);

        })
    }
}])





/*--------------------------- Factories aislados ------------------*/
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

                    icono: icono,
                    fuente: fuente

                };

                logos.push(logo);

            })

        })

        return logos;

    }

    return crear;

}])

.factory('LS', ['$window', '$rootScope', function ($window, $rootScope) {
    /*
    angular.element($window).on('storage', function (event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });
    */

    return {
        definir: function (llave, valor) {
            $window.localStorage.setItem(llave, JSON.stringify(valor));
            return this;
        },
        obtener: function (llave) {
            return $window.localStorage.getItem(llave);
        }
    };

}])

.factory("Auth", ["$firebaseAuth",
  function ($firebaseAuth) {
        return $firebaseAuth();
  }])
