angular.module("landing")

    /* header */


    .controller('comienzoController', ['$window', '$base64', function ($window, $base64) {

        var bz = this;

        bz.enviarComenzar = function (nombreLogo, v) {

            if (!v) {
                return;
            }

            bz.url = 'http://' + location.host + '/creador-de-logos/comenzar/?n=' + nombreLogo;

            $window.location.href = bz.url;
            // $window.open(bz.url, "_blank");
        }

        bz.caracteristicas = [{
            nombre: 'Instantaneo',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.',
            img: 'assets/img/a.jpg'
        }, {
            nombre: 'Reutilizable',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.',
            img: 'assets/img/a.jpg'
        }, {
            nombre: 'Seguro',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.',
            img: 'assets/img/a.jpg'
        }, {
            nombre: 'Facil Uso',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.',
            img: 'assets/img/a.jpg'
        }, {
            nombre: 'Diseños llavamativos',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.',
            img: 'assets/img/a.jpg'
        }, {
            nombre: 'Borradores',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.',
            img: 'assets/img/a.jpg'
        }];

        bz.testimonios = [{
            titulo: 'Hi Baby',
            img: 'assets/img/bg_.jpg',
            texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nobis molestias consectetur numquam ducimus dolorum inventore. Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium.'
        }, {
            titulo: 'Hi Baby',
            img: 'assets/img/bg_.jpg',
            texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nobis molestias consectetur numquam ducimus dolorum inventore. Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium.'
        }]

        bz.preguntas = [{
            pregunta: 'CUANTO CUESTA EL SERVICIO?',
            respuesta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Architecto nobis molestias consectetur numquam ducimus dolorum inventore.Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium.'
        }, {
            pregunta: 'Lorem ipsum dolor?',
            respuesta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Architecto nobis molestias consectetur numquam ducimus dolorum inventore.Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium.'
        }]


        bz.modFun = function (i) {
            bz.modfire = i;
            bz.modInit = !bz.modInit;
        }

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

    }])