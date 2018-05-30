angular.module("landing")
	.value("rutasValue", {
		cliente: {
			base: "creador-de-logos/",
			estado: {
				editor: "editor/",
				logos: "cliente/logos/",
				cuenta: "cliente/cuenta/"
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

	.factory("LS", ["$window", function ($window) {
		return {
			definir: function (llave, valor) {

				$window.localStorage.setItem(llave, angular.toJson(valor));

			},
			obtener: function (llave) {

				return angular.fromJson($window.localStorage.getItem(llave));
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

		this.listaFuentesSegunPref = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/elementos/busqueda/fuentes", datos)
				.then(function (res) {
					defered.resolve(res.data);
				})
				.catch(function (res) {
					defered.reject(res);
				});

			return promise;
		};

		this.listarIconosSegunTags = function (datos) {
			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/elementos/busqueda/iconos", datos)
				.then(function (res) {
					defered.resolve(res.data);
				})
				.catch(function (res) {
					defered.reject(res);
				});

			return promise;
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

	.value("coloresPaletteValue", [
		[
			["#009aa6", "#e6e6e6", "#000000", "#ffed00", "#aafc00"],
			["#008b00", "#e6e6e6", "#000000", "#ffed00", "#aafc00"],
			["#74cb00", "#ffffff", "#000000", "#ffed00", "#a67848"],
			["#ffc700", "#ffffff", "#000000", "#0071bc", "#c20000"],
			["#ff4200", "#ffffff", "#e6e6e6", "#000000", "#0071bc"],
			["#740000", "#ffffff", "#e6e6e6", "#00e0cd", "#ffde00"],
			["#890054", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
			["#8400a5", "#ffffff", "#e6e6e6", "#ffed00", "#aafc00"],
			["#4500d4", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
			["#0042ff", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
		],
		[
			["#00bfc2", "#ffffff", "#000000", "#ffed00", "#a67848"],
			["#00cc51", "#ffffff", "#000000", "#ffed00", "#a67848"],
			["#83de00", "#ffffff", "#000000", "#ffed00", "#a67848"],
			["#ffde00", "#ffffff", "#000000", "#0071bc", "#c20000"],
			["#ff5000", "#ffffff", "#e6e6e6", "#000000", "#0071bc"],
			["#9f0000", "#ffffff", "#e6e6e6", "#00e0cd", "#ffde00"],
			["#b80060", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
			["#a700b8", "#ffffff", "#e6e6e6", "#ffed00", "#aafc00"],
			["#6129ff", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
			["#0072ff", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
		],
		[
			["#00d6c2", "#ffffff", "#000000", "#666666", "#a67848"],
			["#00db75", "#ffffff", "#000000", "#666666", "#a67848"],
			["#8bf300", "#ffffff", "#000000", "#666666", "#a67848"],
			["#ffed00", "#000000", "#666666", "#0071bc", "#7a00000"],
			["#ff7b00", "#ffffff", "#000000", "#ffed00", "#00d6c2"],
			["#c20000", "#ffffff", "#cccccc", "#00e0cd", "#ffde00"],
			["#db006b", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
			["#e700db", "#ffffff", "#000000", "#00dbff", "#ffde00"],
			["#9256ff", "#ffffff", "#000000", "#e6e6e6", "#aafc00"],
			["#009fff", "#ffffff", "#e6e6e6", "#aafc00", "#ffed00"],
		],
		[
			["#00f4de", "#ffffff", "#000000", "#666666", "#a67848"],
			["#00ec93", "#ffffff", "#000000", "#666666", "#a67848"],
			["#b3fc00", "#ffffff", "#000000", "#666666", "#a67848"],
			["#e5ff00", "#000000", "#666666", "#0071bc", "#7a00000"],
			["#ff9700", "#ffffff", "#000000", "#ffed00", "#00d6c2"],
			["#e00000", "#ffffff", "#cccccc", "#00e0cd", "#ffde00"],
			["#fd0081", "#ffffff", "#e6e6e6", "#00dbff", "#aafc00"],
			["#ff00ea", "#ffffff", "#000000", "#00dbff", "#ffde00"],
			["#ae77ff", "#ffffff", "#000000", "#e6e6e6", "#b3fc00"],
			["#00dbff", "#ffffff", "#000000", "#666666", "#4500d4"],
		]
	])

	.value("estaticosLandingValue", {
		caracteristicas: [{
			titulo: "De inmediato",
			descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			icono: ["bg-carac-1", "right-bottom"]
		}, {
			titulo: "Más de 1 millon de logos",
			descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			icono: ["bg-carac-2", "b-bottom"]
		}, {
			titulo: "Archivos en alta resolución",
			descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			icono: ["bg-carac-3", "right-bottom"]
		}, {
			titulo: "Inteligencia artificial",
			descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			icono: ["bg-carac-4", "b-bottom"]
		}, {
			titulo: "Gratis",
			descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			icono: ["bg-carac-5", "b-right"]
		}, {
			titulo: "Múltiples aplicaciones",
			descripcion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			icono: ["bg-carac-6", ""]
		}],
		testimonios: [{
			descripcion: "Es la segunda vez que me hago un logo y estoy super contento",
			logo: "/landing/assets/img/c4.png",
				color: '#51a7f9',
				client: {
					name: 'Logo Pro',
					ocupation: ''
				}
			}
		],
		preguntas: [{
			pregunta: "¿Cuanto cuesta el servicio?",
			respuesta: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Architecto nobis molestias consectetur numquam ducimus dolorum inventore.Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium."
		}, {
			pregunta: "¿Cómo puedo pagarlo?",
			respuesta: "2."
		}, {
			pregunta: "¿Puedo cambiar el diseño después de comprar?",
			respuesta: "3."
		}, {
			pregunta: "¿Dónde lo puedo descargar?",
			respuesta: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Architecto nobis molestias consectetur numquam ducimus dolorum inventore.Modi at quisquam fugit quae aut est ea dolorum dolor, ipsum doloremque minus praesentium."
		}, {
			pregunta: "¿En que formato puedo descargar el logo?",
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

	/***************************/
	/******PREFERENCIAS*********/
	/***************************/

	.service("preferenciasService", ["$http", "$q", function ($http, $q) {

		this.listaPreferencias = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/preferencias").then(function (res) {

				defered.resolve(res.data);


			}).catch(function () {

				defered.reject();

			});

			return promise;

		};

	}])

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

	/*********************/
	/********PEDIDOS******/
	/*********************/

	.service("pedidosService", ["$http", "$q", function ($http, $q) {


		this.listarPlanes = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/planes/comprar").then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});


			return promise;

		};

		this.listarPasarelas = function (idMoneda) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/pasarelas/moneda", {
				idMoneda: idMoneda
			}).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};


		this.pagar = {
			paypal: function (idElemento, atributos, logo, idPrecio, tipoLogo, idPasarela) {


				var defered = $q.defer();

				var promise = defered.promise;

				var datos = {
					idElemento: idElemento,
					logo: logo,
					idPrecio: idPrecio,
					tipoLogo: tipoLogo,
					idPasarela: idPasarela,
					atributos: atributos
				};

				$http.post("/app/pedido", datos).then(function (res) {

					defered.resolve(res.data);

				}).catch(function (res) {

					defered.reject(res);

				});

				return promise;

			}
		};


		this.listarPedidos = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/pedidos").then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

	}])

	/*********************/
	/********ETIQUETAS****/
	/*********************/

	/* SERVICIO PARA ETIQUETAS */

	.service('etiquetasService', ['$http', '$q', function ($http, $q) {

		/***************************/
		/**********LOGOS***********/
		/***************************/

		this.listarLogos = function (datos) {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.post('/app/elementos/categoria', datos).then(function (res) {
				if (res == undefined) {
					return defered.reject(res);
				}
				defered.resolve(res);
			}).catch(function (res) {
				defered.reject(res);
			})

			return promise;
		}

		/* ETIQUETAS*/


		this.listarEtiquetas = function () {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.get('/app/etiquetas').then(function (res) {
				if (res == undefined) {
					return defered.reject(res);
				}
				defered.resolve(res);
			}).catch(function (res) {
				defered.reject(res);
			})

			return promise;
		}

		this.loadEtiquetas = function (arr) {

			var etiquetas = [];

			angular.forEach(arr, function (valor) {
				etiquetas.push({
					_id: valor._id,
					traduccion: valor.traducciones[0]
				});
			})

			return etiquetas.map(function (et) {
				et.traduccion._lowername = et.traduccion.valor.toLowerCase();
				return et;
			});
		}

		this.transformChip = function (chip) {

			// If it is an object, it's already a known chip
			if (angular.isObject(chip)) {
				return chip;
			}

			// Otherwise, create a new one
			return {
				traduccion: {
					valor: chip
				}
			}

		}

		this.querySearch = function (query, etiquetas) {
			var results = query ? etiquetas.filter(createFilterFor(query)) : [];
			return results;
		}

		function createFilterFor(query) {
			var lowercaseQuery = query.toLowerCase();

			return function filterFn(etiqueta) {
				return (etiqueta.traduccion._lowername.indexOf(lowercaseQuery) === 0);
			};

		}

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

		this.forgotPass = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/recuperar-password", datos)
				.then(function (res) {
					defered.resolve(res);
				})
				.catch(function (res) {
					defered.reject(res)
				})

			return promise;

		}

		this.confirmarToken = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/recuperar-password/" + datos)
				.then(function (res) {
					defered.resolve(res);
				})
				.catch(function (res) {
					defered.reject(res)
				})

			return promise;

		}

		this.cambiarContrasena = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/cambiar-password", datos)
				.then(function (res) {
					defered.resolve(res);
				})
				.catch(function (res) {
					defered.reject(res)
				})

			return promise;

		}

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

	}])

	/*********************/
	/*** SOCIAL LOGIN ****/
	/*********************/

	.service("socialAuth", ["$http", "$q", "$window", "clienteDatosFactory", function ($http, $q, $window, clienteDatosFactory) {

		this.facebook = function () {

			var defered = $q.defer();
			var promise = defered.promise;

			FB.getLoginStatus(function (response) {

				var datosUsuario = response.authResponse;

				if (response.status != "connected") {
					FB.login(function (response) {

						$http.post("/app/cliente/social", {
								origen: 'facebook',
								token: response.authResponse.accessToken
							}).then(function (res) {

								$window.localStorage.setItem("bzToken", angular.toJson(res.data));
								clienteDatosFactory.definir(res.data);
								defered.resolve(res);

							})
							.catch(function (res) {
								$window.localStorage.removeItem("bzToken");
								defered.reject(res);
							});
					}, {
						scope: 'email,user_friends,user_location'
					});

					return promise;
				}

				$http.post("/app/cliente/social", {
						origen: 'facebook',
						token: datosUsuario.accessToken
					}).then(function (res) {

						$window.localStorage.setItem("bzToken", angular.toJson(res.data));
						clienteDatosFactory.definir(res.data);
						defered.resolve(res);

					})
					.catch(function (res) {
						$window.localStorage.removeItem("bzToken");
						defered.reject(res);
					});
			});

			return promise;
		};


		this.google = function () {

			var defered = $q.defer();
			var promise = defered.promise;

			var GoogleAuth = gapi.auth2.getAuthInstance();


			if (!GoogleAuth.isSignedIn.get()) {
				GoogleAuth.signIn().then(function (res) {

					$http.post("/app/cliente/social", {
							origen: 'google',
							token: res.Zi.id_token
						}).then(function (res) {
							$window.localStorage.setItem("bzToken", angular.toJson(res.data));
							clienteDatosFactory.definir(res.data);
							defered.resolve(res);

						})
						.catch(function (res) {
							$window.localStorage.removeItem("bzToken");
							defered.reject(res);
						});
				}).catch(function (res) {
					defered.reject(res)
				});

				return promise;
			}

			var datosUsuario = GoogleAuth.currentUser.get();

			$http.post("/app/cliente/social", {
					origen: 'google',
					token: datosUsuario.Zi.id_token
				}).then(function (res) {

					$window.localStorage.setItem("bzToken", angular.toJson(res.data));
					clienteDatosFactory.definir(res.data);
					defered.resolve(res);

				})
				.catch(function (res) {
					$window.localStorage.removeItem("bzToken");
					defered.reject(res);
				});

			return promise;

		};

	}]);