angular.module("landing")
	.value("rutasValue", {
		cliente: {
			base: "creador-de-logos/",
			estado: {
				login: "login/",
				editor: "editor/",
				galeria: "logos-galeria/"
			}
		},
		freelance: {
			base: "freelance/",
			estado: {
				login: "login/",
				editor: "editor/"
			}
		}
	})

	.factory("navegarFactory",["rutasValue", "$window", "$httpParamSerializer", function(rutasValue, $window, $httpParamSerializer){
		
		var paramsFunction = function (params) {

			return !angular.isUndefined(params) ? "?" + $httpParamSerializer(params) : "";
		}

		return {
			cliente: function (estado, params) {

				if (!estado) {
					$window.location = rutasValue.cliente.base + paramsFunction(params);
					return;
				} else {

					if (rutasValue.cliente.estado[estado]){
						$window.location = rutasValue.cliente.base + rutasValue.cliente.estado[estado] + paramsFunction(params);
					} else{
						return;
					}
				}
			},
			freelance: function (estado, params) {
				if (!estado) {
					$window.location = rutasValue.freelance.base + paramsFunction(params);
					return ;
				} else {

					if (rutasValue.freelance.estado[estado]){
						$window.location = rutasValue.freelance.base + rutasValue.freelance.estado[estado] + paramsFunction(params);
					} else{
						return;
					}
				}
			}
		}

	}])

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

    .factory("clienteDatosFactory", [function () {

		var cliente = null;

		return {
			obtener: function () {

				return cliente;

			},
			definir: function (objectoCliente) {

				cliente = objectoCliente;

			},
			eliminar: function () {

				cliente = null;

			}
		};

	}])
    
    .service("clientesService", ["$http", "$q", "$window", "$rootScope", "clienteDatosFactory", function ($http, $q, $window, $rootScope, clienteDatosFactory) {

		this.registrar = function (nombreCliente, correo, pass, telefono, pais) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/cliente", {
				nombreCliente: nombreCliente,
				correo: correo,
				pass: pass,
				telefono: telefono,
				pais: pais
			}).then(function (res) {
				$window.localStorage.setItem("bzToken", angular.toJson(res.data));
				clienteDatosFactory.definir(res.data);
				defered.resolve();
			})
			.catch(function (res) {
				$window.localStorage.removeItem("bzToken");
				defered.reject(res);
			});

			return promise;

		};

		this.login = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/cliente/login", datos)

				.then(function (res) {

					$window.localStorage.setItem("bzToken", angular.toJson(res.data));
					clienteDatosFactory.definir(res.data);
					defered.resolve();

				})
				.catch(function (res) {
					$window.localStorage.removeItem("bzToken");
					defered.reject();
				});

			return promise;

		};

		this.autorizado = function (emitir) {

			if (clienteDatosFactory.obtener()) {

				if (emitir) {
					$rootScope.$broadcast("sesionInicio", "true");
				}

				return clienteDatosFactory.obtener();

			} else {

				if ($window.localStorage.getItem("bzToken")) {

					clienteDatosFactory.definir(angular.fromJson($window.localStorage.getItem("bzToken")));

					if (emitir) {
						$rootScope.$broadcast("sesionInicio", "true");
					}

					return clienteDatosFactory.obtener();

				} else {

					return false;

				}

			}

		};

		this.salir = function (emitir, desactivarAlerta) {

			$window.localStorage.removeItem("bzToken");
			clienteDatosFactory.eliminar();

			if (emitir) {

				$rootScope.$broadcast("sesionExpiro");

			}

			if (!desactivarAlerta) {
				alert("Alerta Sesion Expiro");
			}
		};

		this.pais = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/pais")

				.then(function (res) {

					defered.resolve(res.data);

				})
				.catch(function (res) {

					defered.reject();
				});

			return promise;

		};

		this.datos = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/datos")

				.then(function (res) {

					defered.resolve(res.data);

				})
				.catch(function (res) {

					defered.reject();
				});

			return promise;

		};


		this.modificar = function (nombreCliente, telefono, pais) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/cliente/modificar", {
				telefono: telefono,
				nombreCliente: nombreCliente,
				pais: pais
			})

				.then(function (res) {

					defered.resolve(res.data);

				})
				.catch(function (res) {

					defered.reject();
				});

			return promise;
		};

	}])