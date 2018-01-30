angular.module("landing")
	.value("estaticosLandingValue", {
		caracteristicas: [{
			nombre: "Instantaneo",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Reutilizable",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Seguro",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Facil Uso",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Diseños llavamativos",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Borradores",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}],
		testimonios: [{
			titulo: "Hi Baby",
			img: "/landing/assets/img/bg_.jpg",
			texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nobis molestias consectetur numquam ducimus dolorum inventore. Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium."
		}, {
			titulo: "Hi Baby",
			img: "/landing/assets/img/bg_.jpg",
			texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nobis molestias consectetur numquam ducimus dolorum inventore. Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium."
		}],
		preguntas: [{
			pregunta: "CUANTO CUESTA EL SERVICIO?",
			respuesta: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Architecto nobis molestias consectetur numquam ducimus dolorum inventore.Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium."
		}, {
			pregunta: "Lorem ipsum dolor?",
			respuesta: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Architecto nobis molestias consectetur numquam ducimus dolorum inventore.Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium."
		}]

	})

	.service("logosService", ["$http", "$q", function ($http, $q) {
		this.mostrarDestacados = function () {
			
			var defered = $q.defer();
		
			var promise = defered.promise;
		
			$http.post("/app/logos/aprobados/destacados").then(function (res) {
						
				defered.resolve(res.data);
		
			}).catch(function (res) {
		
				defered.reject(res);
		
			});
		
			return promise;
		
		};
	}])