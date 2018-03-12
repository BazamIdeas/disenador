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

	.factory("navegarFactory", ["rutasValue", "$window", "$httpParamSerializer", function (rutasValue, $window, $httpParamSerializer) {

		var paramsFunction = function (params) {

			return params ? "?" + $httpParamSerializer(params) : "";
		};

		return {
			cliente: function (estado, params) {

				if (!estado) {
					$window.location = rutasValue.cliente.base + paramsFunction(params);
					return;
				} else {

					if (rutasValue.cliente.estado[estado]) {
						$window.location = rutasValue.cliente.base + rutasValue.cliente.estado[estado] + paramsFunction(params);
					} else {
						return;
					}
				}
			},
			freelance: function (estado, params) {
				if (!estado) {
					$window.location = rutasValue.freelance.base + paramsFunction(params);
					return;
				} else {

					if (rutasValue.freelance.estado[estado]) {
						$window.location = rutasValue.freelance.base + rutasValue.freelance.estado[estado] + paramsFunction(params);
					} else {
						return;
					}
				}
			}
		};

	}])

	.factory("verificarBase64Factory", [function () {

		return function (cadena) {

			return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(cadena);

		};
	}])

	.factory("arrayToJsonMetasFactory", [function () {

		return function (arrayMetas) {

			var jsonMetas = {};

			angular.forEach(arrayMetas, function (meta) {

				jsonMetas[meta.clave] = meta.valor;

			});

			return jsonMetas;

		};

	}])


	/***************************/
	/*********ELEMENTOS*********/
	/***************************/

	.service("elementosService", ["$http", "$q", function ($http, $q) {

		this.listaSegunPref = function (datos) {

			return $http.post("/app/elementos/busqueda", datos)

				.then(function (res) {

					return res.data;

				})

				.catch(function () {



				});
		};

		this.listarFuentes = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/elementos/fuente").then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

		this.listarIniciales = function (inicial) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/elementos/iniciales", {
				inicial: inicial
			}).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

	}])


	/***************************/
	/*******CATEGORIAS**********/
	/***************************/

	.service("categoriasService", ["$http", "$q", function ($http, $q) {

		this.listaCategorias = function (tipo) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/categorias", {
				tipo: tipo
			}).then(function (res) {

				defered.resolve(res.data);


			}).catch(function () {

				defered.reject();

			});

			return promise;


		};


		this.listaCategoriasElementos = function (idCategoria, tipo) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/elementos/categorias", {
				idCategoria: idCategoria,
				tipo: tipo
			}).then(function (res) {

				defered.resolve(res.data);


			}).catch(function () {

				defered.reject();

			});

			return promise;

		};


	}])



	.factory("guardarLogoFactory", ["$window", function ($window) {

		return function (logo, atributos) {
			var datosLogo = {
				logo: {
					icono: {
						idElemento: logo.elementos_idElemento,
						svg: logo.logo
					}
				},
				idLogoPadre: logo.idLogo,
				fuentes: {
					principal: atributos.principal,
					eslogan: atributos.eslogan
				}
			};
			$window.localStorage.setItem("editor", angular.toJson(datosLogo));
		};

	}])

	.value("estaticosLandingValue", {
		caracteristicas: [{
			nombre: "Simplicidad",
			descripcion: "Evita cargarlo demasiado y añadir efectos pesados. Un diseño cargado puede ser distractor; un logo más elegante y minimalista se ve más organizado. Aunque nuestro creador de logos gratis ofrece miles de formas de personalizar tu diseño, ¡no te dejes llevar!",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Elección del color",
			descripcion: "Ten en cuenta el primer consejo Quédate con un esquema de colores que refleje una identidad de marca profesional y cohesiva. Aunque haya miles de colores para elegir, sé listo/a.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Tipografía práctica",
			descripcion: "Piensa en la tipografía, el tamaño, la combinación, la fuente, y los colores. Hay mucho más que solo serif y sans serif. Normalmente, debes quedarte con solo una a dos fuentes dentro del diseño de tu logo.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Manual De Marcas",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Gran variedad de diseños",
			descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quasi modi a nam, dicta inventore doloribus unde reprehenderit impedit ipsum temporibus qui, maiores soluta nisi. Ex voluptate asperiores nemo odio.",
			img: "/landing/assets/img/a.jpg"
		}, {
			nombre: "Logos Hechos por Diseñadores",
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
		}],
		consejos: [{
			nombre: "Simplicidad",
			descripcion: "Evita cargarlo demasiado y añadir efectos pesados. Un diseño cargado puede ser distractor; un logo más elegante y minimalista se ve más organizado. Aunque nuestro creador de logos gratis ofrece miles de formas de personalizar tu diseño, ¡no te dejes llevar!"
		}, {
			nombre: "Elección del color",
			descripcion: "Ten en cuenta el primer consejo Quédate con un esquema de colores que refleje una identidad de marca profesional y cohesiva. Aunque haya miles de colores para elegir, sé listo/a."
		}, {
			nombre: "Tipografía práctica",
			descripcion: "Piensa en la tipografía, el tamaño, la combinación, la fuente, y los colores. Hay mucho más que solo serif y sans serif. Normalmente, debes quedarte con solo una a dos fuentes dentro del diseño de tu logo."
		}, {
			nombre: "Borradores",
			descripcion: "Ten en cuenta el primer consejo Quédate con un esquema de colores que refleje una identidad de marca profesional y cohesiva. Aunque haya miles de colores para elegir, sé listo/a."
		}, {
			nombre: "Colores a elegir",
			descripcion: "Ten en cuenta el primer consejo Quédate con un esquema de colores que refleje una identidad de marca profesional y cohesiva. Aunque haya miles de colores para elegir, sé listo/a."
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


		this.listarPorEstado = function (estado) {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.post("/app/logos/estado", {
				estado: estado
			}).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

		this.vendidosPorCliente = function (idCLiente) {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.get("/app/logos/" + idCLiente + "/vendidos")
				.then(function (res) {
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
				})
				.then(function (res) {
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
				.catch(function () {
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
				.catch(function () {

					defered.reject();
				});

			return promise;

		};

		this.datos = function (idLogo) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/" + idLogo)

				.then(function (res) {

					defered.resolve(res.data);

				})
				.catch(function () {

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
				.catch(function () {

					defered.reject();
				});

			return promise;
		};


		this.listarFreelancers = function () {
			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/clientes/freelancers")

				.then(function (res) {
					defered.resolve(res.data);
				})
				.catch(function () {
					defered.reject();
				});

			return promise;
		};

		this.logosVendidos = function () {
			var defered = $q.defer();
			var promise = defered.promise;

			$http.get("/app/clientes/freelancers")

				.then(function (res) {
					defered.resolve(res.data);
				})
				.catch(function () {
					defered.reject();
				});

			return promise;
		};

		this.correoDisponible = function (correo) {
			var defered = $q.defer();
			var promise = defered.promise;

			$http.post("/app/cliente/email", {
					email: correo
				})

				.then(function () {
					defered.reject();
				})
				.catch(function (res) {
					if (res.status == 404) {
						defered.resolve();
					} else {
						defered.reject();
					}

				});

			return promise;
		};

	}]);