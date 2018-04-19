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
			["#C9CBCC", "#660000", "#660000"],
			["#E9EBAD", "#662400", "#662400"],
			["#C9CBCC", "#664B00", "#664B00"],
			["#F2EFD0", "#5C6600", "#5C6600"],
			["#EFEA9D", "#4D6600", "#4D6600"],
			["#B6CED4", "#0D6600", "#0D6600"],
			["#C2D1AE", "#006618", "#006618"],
			["#50A273", "#00663F", "#00663F"],
			["#AFA3CD", "#006666", "#006666"],
			["#A399C7", "#004266", "#004266"],
			["#A2CFE5", "#001B66", "#001B66"],
			["#595D96", "#0A0066", "#0A0066"],
			["#63569C", "#320066", "#320066"],
			["#79A33E", "#590066", "#590066"],
			["#AFA3CD", "#66004E", "#66004E"],
			["#EEEEF6", "#660027", "#660027"],
		],
		[
			["#FFFFFF", "#CC2929", "#CC2929"],
			["#1C1E32", "#CC6329", "#CC6329"],
			["#4072A3", "#CCA129", "#CCA129"],
			["#8A3343", "#BDCC29", "#BDCC29"],
			["#302418", "#A1CC29", "#A1CC29"],
			["#572868", "#3ECC29", "#3ECC29"],
			["#2A1E3F", "#29CC4F", "#29CC4F"],
			["#273759", "#29CC8E", "#29CC8E"],
			["#A76B42", "#29CCCC", "#29CCCC"],
			["#415968", "#2992CC", "#2992CC"],
			["#252B49", "#2954CC", "#2954CC"],
			["#BCBA5C", "#3829CC", "#3829CC"],
			["#CAC546", "#7829CC", "#7829CC"],
			["#273759", "#B729CC", "#B729CC"],
			["#245D34", "#CC29A6", "#CC29A6"],
			["#232B45", "#CC2967", "#CC2967"],
		],
		[
			["#552D1C", "#CC7A7A", "#CC7A7A"],
			["#2D3C54", "#CC977A", "#CC977A"],
			["#233C3B", "#CCB67A", "#CCB67A"],
			["#2D3C54", "#C4CC7A", "#C4CC7A"],
			["#34522C", "#A4CC7A", "#A4CC7A"],
			["#2B332A", "#85CC7A", "#85CC7A"],
			["#1C251C", "#7ACC92", "#7ACC92"],
			["#1D2235", "#7ACCAD", "#7ACCAD"],
			["#2D4A3F", "#7ACCCC", "#7ACCCC"],
			["#2E142C", "#7AAFCC", "#7AAFCC"],
			["#2C1520", "#7A90CC", "#7A90CC"],
			["#2C1520", "#827ACC", "#827ACC"],
			["#371E43", "#A27ACC", "#A27ACC"],
			["#1D2235", "#C27ACC", "#C27ACC"],
			["#2D4A3F", "#CC7AB9", "#CC7AB9"],
			["#2E142C", "#CC7A9A", "#CC7A9A"],
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
				descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda delectus debitis?",
				logo: "/landing/assets/img/c4.png",
				color: '#51a7f9',
				client: {
					name: 'Harry Potter',
					ocupation: 'Empresario magico'
				}
			}, {
				descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda delectus debitis?",
				logo: "/landing/assets/img/c4.png",
				color: '#51a7f9',
				client: {
					name: 'Harry Potter',
					ocupation: 'Empresario magico'
				}
			},
			{
				descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda delectus debitis?",
				logo: "/landing/assets/img/c4.png",
				color: '#51a7f9',
				client: {
					name: 'Harry Potter',
					ocupation: 'Empresario magico'
				}
			},
			{
				descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eius odio magnam maiores blanditiis? Odit enim corrupti magnam, deserunt earum optio nemo distinctio ipsam incidunt, vel ratione assumenda delectus debitis?",
				logo: "/landing/assets/img/c4.png",
				color: '#51a7f9',
				client: {
					name: 'Harry Potter',
					ocupation: 'Empresario magico'
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
		}],
		posts: [{
			title: 'Prueba Post',
			description: 'Descripcion',
			img: '/landing/assets/img/c4.png'
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
			var lowercaseQuery = angular.lowercase(query);

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