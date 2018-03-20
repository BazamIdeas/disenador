angular.module("disenador-de-logos")

	.value("coloresValue", [
		["#DDA8BC", "#8D4B97", "#007688"],
		["#EEE3F2", "#9D4E98", "#9A3089 "],
		["#B785BA", "#363F4C", "#0F2F30 "],
		["#BFC1BF", "#65246F", "#A01874"],

		["#FFE5BE", "#63380E", "#06672F"],
		["#EEF2CA", "#49AF57", "#E8452F "],
		["#FFFDF6", "#B01919", "#911913"],
		["#F6EF99", "#A71916", "#D92B15"],

		["#FACDC6", "#B9163A", "#E40921"],
		["#E9F5F4", "#0B5126", "#004C46 "],
		["#D6EADD", "#002F2F", "#097533"],
		["#D0D3EC", "#7D388D", "#A31569"],

		["#FCD6B5", "#443D17", "#846816"],
		["#ADD8C5", "#0E0D08", "#293377"],
		["#C2E6FB", "#028374", "#5F2160"],
		["#FDF083", "#0078B3", "#212C56"],

		["#CDE9F5", "#0078B3", "#007259"],
		["#DCEEFC", "#263470", "#B21921"],
		["#E1AED1", "#E40921", "#A51916"],
		["#E6F2EA", "#2FA836", "#4756A2"]
	])

	.factory("coloresFactory", ["coloresValue", function (coloresValue) {

		/*var obtenerArrayRandom = function (indice) {

			var coloresCopia = angular.copy(coloresValue[indice]);
			var colores = [];

			angular.forEach(coloresCopia, function (color) {

				var limite = 3;
				var base = 0;
				var i;

				var continuar = true;

				while (continuar) {

					i = Math.floor(Math.random() * limite) + base;

					if (!colores[i]) {
						colores[i] = color;
						return;
					}

				}

			});

			return colores;

		};*/
		var indiceColores = function (coloresBuscados) {

			var indiceBuscado;

			angular.forEach(coloresValue, function (color, indice) {
				if (angular.equals(coloresBuscados, color)) {
					indiceBuscado = indice;
				}
			});

			return indiceBuscado;
		};


		return function (coloresArrays) {
			var i = Math.floor(Math.random() * coloresArrays.length) + 0;
			return coloresArrays[i];
		};

	}])


	.value("paisesValue", {
		"BD": "Bangladesh",
		"BE": "Belgium",
		"BF": "Burkina Faso",
		"BG": "Bulgaria",
		"BA": "Bosnia and Herzegovina",
		"BB": "Barbados",
		"WF": "Wallis and Futuna",
		"BL": "Saint Barthelemy",
		"BM": "Bermuda",
		"BN": "Brunei",
		"BO": "Bolivia",
		"BH": "Bahrain",
		"BI": "Burundi",
		"BJ": "Benin",
		"BT": "Bhutan",
		"JM": "Jamaica",
		"BV": "Bouvet Island",
		"BW": "Botswana",
		"WS": "Samoa",
		"BQ": "Bonaire, Saint Eustatius and Saba ",
		"BR": "Brazil",
		"BS": "Bahamas",
		"JE": "Jersey",
		"BY": "Belarus",
		"BZ": "Belize",
		"RU": "Russia",
		"RW": "Rwanda",
		"RS": "Serbia",
		"TL": "East Timor",
		"RE": "Reunion",
		"TM": "Turkmenistan",
		"TJ": "Tajikistan",
		"RO": "Romania",
		"TK": "Tokelau",
		"GW": "Guinea-Bissau",
		"GU": "Guam",
		"GT": "Guatemala",
		"GS": "South Georgia and the South Sandwich Islands",
		"GR": "Greece",
		"GQ": "Equatorial Guinea",
		"GP": "Guadeloupe",
		"JP": "Japan",
		"GY": "Guyana",
		"GG": "Guernsey",
		"GF": "French Guiana",
		"GE": "Georgia",
		"GD": "Grenada",
		"GB": "United Kingdom",
		"GA": "Gabon",
		"SV": "El Salvador",
		"GN": "Guinea",
		"GM": "Gambia",
		"GL": "Greenland",
		"GI": "Gibraltar",
		"GH": "Ghana",
		"OM": "Oman",
		"TN": "Tunisia",
		"JO": "Jordan",
		"HR": "Croatia",
		"HT": "Haiti",
		"HU": "Hungary",
		"HK": "Hong Kong",
		"HN": "Honduras",
		"HM": "Heard Island and McDonald Islands",
		"VE": "Venezuela",
		"PR": "Puerto Rico",
		"PS": "Palestinian Territory",
		"PW": "Palau",
		"PT": "Portugal",
		"SJ": "Svalbard and Jan Mayen",
		"PY": "Paraguay",
		"IQ": "Iraq",
		"PA": "Panama",
		"PF": "French Polynesia",
		"PG": "Papua New Guinea",
		"PE": "Peru",
		"PK": "Pakistan",
		"PH": "Philippines",
		"PN": "Pitcairn",
		"PL": "Poland",
		"PM": "Saint Pierre and Miquelon",
		"ZM": "Zambia",
		"EH": "Western Sahara",
		"EE": "Estonia",
		"EG": "Egypt",
		"ZA": "South Africa",
		"EC": "Ecuador",
		"IT": "Italy",
		"VN": "Vietnam",
		"SB": "Solomon Islands",
		"ET": "Ethiopia",
		"SO": "Somalia",
		"ZW": "Zimbabwe",
		"SA": "Saudi Arabia",
		"ES": "Spain",
		"ER": "Eritrea",
		"ME": "Montenegro",
		"MD": "Moldova",
		"MG": "Madagascar",
		"MF": "Saint Martin",
		"MA": "Morocco",
		"MC": "Monaco",
		"UZ": "Uzbekistan",
		"MM": "Myanmar",
		"ML": "Mali",
		"MO": "Macao",
		"MN": "Mongolia",
		"MH": "Marshall Islands",
		"MK": "Macedonia",
		"MU": "Mauritius",
		"MT": "Malta",
		"MW": "Malawi",
		"MV": "Maldives",
		"MQ": "Martinique",
		"MP": "Northern Mariana Islands",
		"MS": "Montserrat",
		"MR": "Mauritania",
		"IM": "Isle of Man",
		"UG": "Uganda",
		"TZ": "Tanzania",
		"MY": "Malaysia",
		"MX": "Mexico",
		"IL": "Israel",
		"FR": "France",
		"IO": "British Indian Ocean Territory",
		"SH": "Saint Helena",
		"FI": "Finland",
		"FJ": "Fiji",
		"FK": "Falkland Islands",
		"FM": "Micronesia",
		"FO": "Faroe Islands",
		"NI": "Nicaragua",
		"NL": "Netherlands",
		"NO": "Norway",
		"NA": "Namibia",
		"VU": "Vanuatu",
		"NC": "New Caledonia",
		"NE": "Niger",
		"NF": "Norfolk Island",
		"NG": "Nigeria",
		"NZ": "New Zealand",
		"NP": "Nepal",
		"NR": "Nauru",
		"NU": "Niue",
		"CK": "Cook Islands",
		"XK": "Kosovo",
		"CI": "Ivory Coast",
		"CH": "Switzerland",
		"CO": "Colombia",
		"CN": "China",
		"CM": "Cameroon",
		"CL": "Chile",
		"CC": "Cocos Islands",
		"CA": "Canada",
		"CG": "Republic of the Congo",
		"CF": "Central African Republic",
		"CD": "Democratic Republic of the Congo",
		"CZ": "Czech Republic",
		"CY": "Cyprus",
		"CX": "Christmas Island",
		"CR": "Costa Rica",
		"CW": "Curacao",
		"CV": "Cape Verde",
		"CU": "Cuba",
		"SZ": "Swaziland",
		"SY": "Syria",
		"SX": "Sint Maarten",
		"KG": "Kyrgyzstan",
		"KE": "Kenya",
		"SS": "South Sudan",
		"SR": "Suriname",
		"KI": "Kiribati",
		"KH": "Cambodia",
		"KN": "Saint Kitts and Nevis",
		"KM": "Comoros",
		"ST": "Sao Tome and Principe",
		"SK": "Slovakia",
		"KR": "South Korea",
		"SI": "Slovenia",
		"KP": "North Korea",
		"KW": "Kuwait",
		"SN": "Senegal",
		"SM": "San Marino",
		"SL": "Sierra Leone",
		"SC": "Seychelles",
		"KZ": "Kazakhstan",
		"KY": "Cayman Islands",
		"SG": "Singapore",
		"SE": "Sweden",
		"SD": "Sudan",
		"DO": "Dominican Republic",
		"DM": "Dominica",
		"DJ": "Djibouti",
		"DK": "Denmark",
		"VG": "British Virgin Islands",
		"DE": "Germany",
		"YE": "Yemen",
		"DZ": "Algeria",
		"US": "United States",
		"UY": "Uruguay",
		"YT": "Mayotte",
		"UM": "United States Minor Outlying Islands",
		"LB": "Lebanon",
		"LC": "Saint Lucia",
		"LA": "Laos",
		"TV": "Tuvalu",
		"TW": "Taiwan",
		"TT": "Trinidad and Tobago",
		"TR": "Turkey",
		"LK": "Sri Lanka",
		"LI": "Liechtenstein",
		"LV": "Latvia",
		"TO": "Tonga",
		"LT": "Lithuania",
		"LU": "Luxembourg",
		"LR": "Liberia",
		"LS": "Lesotho",
		"TH": "Thailand",
		"TF": "French Southern Territories",
		"TG": "Togo",
		"TD": "Chad",
		"TC": "Turks and Caicos Islands",
		"LY": "Libya",
		"VA": "Vatican",
		"VC": "Saint Vincent and the Grenadines",
		"AE": "United Arab Emirates",
		"AD": "Andorra",
		"AG": "Antigua and Barbuda",
		"AF": "Afghanistan",
		"AI": "Anguilla",
		"VI": "U.S. Virgin Islands",
		"IS": "Iceland",
		"IR": "Iran",
		"AM": "Armenia",
		"AL": "Albania",
		"AO": "Angola",
		"AQ": "Antarctica",
		"AS": "American Samoa",
		"AR": "Argentina",
		"AU": "Australia",
		"AT": "Austria",
		"AW": "Aruba",
		"IN": "India",
		"AX": "Aland Islands",
		"AZ": "Azerbaijan",
		"IE": "Ireland",
		"ID": "Indonesia",
		"UA": "Ukraine",
		"QA": "Qatar",
		"MZ": "Mozambique"
	})


	/*-------------------------- Services --------------------------*/

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

		this.loadEtiquetas = function (arr, v) {

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


	/***************************/
	/*******CATEGORIAS**********/
	/***************************/

	.service("categoriasService", ["$http", "$q", function ($http, $q) {

		this.listaCategorias = function (tipo) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/categorias", {
					tipo: tipo
				})
				.then(function (res) {
					defered.resolve(res.data);
				})
				.catch(function () {
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
				})
				.then(function (res) {
					defered.resolve(res.data);
				})
				.catch(function () {
					defered.reject();
				});

			return promise;

		};


	}])



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


	/***************************/
	/*********ELEMENTOS*********/
	/***************************/



	.service("elementosService", ["$http", "$q", function ($http, $q) {

		this.listaFuentesSegunPref = function (idCategoria, preferencias, limit) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/elementos/busqueda/fuentes", {
					categoria: idCategoria,
					preferencias: preferencias,
					tipo: "FUENTE",
					limit: limit
				})
				.then(function (res) {
					defered.resolve(res.data);
				})
				.catch(function (res) {
					defered.reject(res);
				});

			return promise;
		};

		this.listarIconosSegunTags = function (tags, idCategoria, ids, limit) {
			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/elementos/busqueda/iconos", {
					tags: tags,
					categoria: idCategoria,
					ids: ids,
					limit: limit
				})
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

	/***************************************/
	/***************CLIENTES****************/
	/***************************************/

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
	/***** facebook ******/
	/*********************/

	.service("facebookService", ["$http", "$q", function ($http, $q) {

		this.compartir = function (datos) {

			var defered = $q.defer();
			var promise = defered.promise;

			FB.getLoginStatus(function (response) {
				if (response.status === 'connected') {
					FB.ui({
							method: 'share',
							href: 'https://developers.facebook.com/docs/'
						},
						function (response) {
							if (response && !response.error_code) {
								if (typeof response != 'undefined') {
									defered.resolve(response);
								}
							} else {
								defered.reject(response);
							}
						});
				} else {
					FB.login(function (response) {
						FB.ui({
								method: 'share',
								href: 'https://developers.facebook.com/docs/'
							},
							function (response) {
								return console.log(response)
								if (response && !response.error_code) {
									if (typeof response != 'undefined') {
										defered.resolve(response);
									}
								} else {
									defered.reject(response);
								}
							});
					});
				}
			});

			return promise;
		};

	}])

	.service("clientesService", ["$http", "$q", "$window", "$rootScope", "clienteDatosFactory", "Upload", function ($http, $q, $window, $rootScope, clienteDatosFactory, Upload) {

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

		this.datos = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/datos")

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

		this.avatar = function (imagen) {
			var defered = $q.defer();
			var promise = defered.promise;

			Upload.upload({
				url: "/app/cliente/avatar",
				data: {
					avatar: imagen
				},
			}).then(function (res) {

				defered.resolve(res.data.foto);

			}).catch(function () {

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

	/*--------------------------- Factories aislados ------------------*/

	.factory("compararLogosFactory", [function () {

		var logos = {

			comparar: [],
			comprar: ""

		};

		var informacion = {

			definir: function (valor, tipo) {

				if (tipo == "comprar") {

					logos.comprar = valor;

				} else if (tipo == "comparar")

				{
					logos.comparar.push(valor);
				}

			},

			obtener: function (tipo) {

				if (tipo == "comprar") {

					return logos.comprar;

				} else if (tipo == "comparar") {
					return logos.comparar;
				}
			}

		};

		return informacion;

	}])

	.factory("compartirFactory", [function () {
		var estados = [];
		var informacion = {
			definir: function (nombre, valor) {
				estados[nombre] = valor;
			},
			obtener: function (nombre) {
				return estados[nombre];
			}
		};
		return informacion;
	}])

	.factory("crearLogoFactory", [function () {

		return function (iconos, fuentes) {

			var logos = [];

			angular.forEach(fuentes, function (fuente) {

				angular.forEach(iconos, function (icono) {

					//if (icono.estado == true) {

					var logo = {
						icono: icono,
						fuente: fuente
					};

					logos.push(logo);
					//}
				});

			});

			//localStorage.setItem("combinaciones",angular.toJson({nombre: "prueba",logos:logos}));

			return logos;

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



	/*********************/
	/***** Logos *********/
	/*********************/

	.service("logosService", ["$http", "$q", function ($http, $q) {

		this.calificar = function (idLogo, calificacion, comentario) {

			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {
				calificacion: calificacion,
				comentario: comentario,
				idLogo: idLogo
			};

			$http.post("/app/logo/calificar-cliente", datos).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

		this.guardarLogo = function (logo, tipoLogo, idElemento, fuentePrincipalId, fuenteEsloganId, logoPadreId) {

			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {
				logo: logo,
				tipoLogo: tipoLogo,
				idElemento: idElemento,
				atributos: {
					principal: fuentePrincipalId
				}
			};

			if (fuenteEsloganId) {
				datos.atributos.eslogan = fuenteEsloganId;
			}

			if (logoPadreId) {
				datos.atributos.padre = logoPadreId;
			}

			$http.post("/app/logo/guardar", datos).then(function (res) {

				defered.resolve(res.data.insertId);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

		this.modificarLogo = function (logo, idlogo, fuentePrincipalId, fuenteEsloganId) {

			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {
				logo: logo,
				idLogo: idlogo,
				atributos: {
					principal: fuentePrincipalId
				}
			};

			if (fuenteEsloganId) {
				datos.atributos.eslogan = fuenteEsloganId;
			}

			$http.post("/app/logo/modificar", datos).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

		this.mostrarGuardados = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/logos/guardados/").then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;

		};

		this.mostrarComprados = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/logos/descargables/").then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;

		};

		this.mostrarAprobados = function (idLogo) {

			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {};

			if (idLogo) {

				datos.idLogo = idLogo;
			}

			$http.post("/app/logos/aprobados", datos).then(function (res) {

				defered.resolve(res.data);


			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

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

		this.descargarLogo = function (idLogo, ancho, nombre, tipo) {

			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {
				idLogo: idLogo,
				ancho: ancho,
				descarga: nombre,
				tipo: tipo
			};

			$http.post("/app/logo/zip/", datos).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

		this.dispararDescarga = function (imgURI, nombre, ancho) {

			var evento = new MouseEvent("click", {
				view: window,
				bubbles: false,
				cancelable: true

			});

			var a = document.createElement("a");
			a.setAttribute("download", nombre + "@" + ancho + "x" + ancho);
			a.setAttribute("href", imgURI);
			a.setAttribute("target", "_blank");
			a.dispatchEvent(evento);

		};

		this.obtenerPorId = function (idLogo) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/logo/" + idLogo).then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;

		};

		this.borrarLogo = function (idLogo) {


			var defered = $q.defer();

			var promise = defered.promise;


			$http.get("/app/logo/borrar/" + idLogo).then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;

		};

		this.manualMarca = function (id) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/manual/" + id).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

	}])

	/*********************/
	/***** planes ********/
	/*********************/

	.service("planesService", ["$http", "$q", function ($http, $q) {

		this.listar = function () {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.get("/app/planesAll").then(function (res) {
				defered.resolve(res.data);
			}).catch(function (res) {
				defered.reject(res);
			});
			return promise;
		};

		this.porLogo = function (idLogo) {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.post("/app/logo/plan/caracteristicas", {
					idLogo: idLogo
				})
				.then(function (res) {
					defered.resolve(res.data);
				}).catch(function (res) {
					defered.reject(res);
				});

			return promise;

		};


		this.aumentarPlan = function (idPlan) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/planes/aumentar", {
					idPlan: idPlan
				})
				.then(function (res) {

					defered.resolve(res.data);

				}).catch(function (res) {

					defered.reject(res);

				});

			return promise;

		};

	}])


	.factory("AuthInterceptor", function ($window, $q, $rootScope, clienteDatosFactory) {
		function salir() {
			$window.localStorage.removeItem("bzToken");
			clienteDatosFactory.eliminar();
			$rootScope.$broadcast("sesionExpiro", "true");
		}

		function autorizado() {
			if (clienteDatosFactory.obtener()) {
				//$rootScope.$broadcast('sesionInicio', "true")
				return clienteDatosFactory.obtener();
			} else {
				if ($window.localStorage.getItem("bzToken")) {

					clienteDatosFactory.definir(angular.fromJson($window.localStorage.getItem("bzToken")));
					//$rootScope.$broadcast('sesionInicio', "true")
					return clienteDatosFactory.obtener();
				} else {
					return false;
				}
			}
		}
		return {
			request: function (config) {


				config.headers = config.headers || {};
				if (autorizado()) {
					config.headers.auth = autorizado().token;
				}

				return config || $q.when(config);


			},
			response: function (response) {

				return response || $q.when(response);
			},

			responseError: function (response) {

				if (response.status === 401 || response.status === 403) {
					salir();

				}
				return $q.reject(response);

			}
		};
	})

	.factory("arrayToJsonMetasFactory", [function () {

		return function (arrayMetas) {

			var jsonMetas = {};

			angular.forEach(arrayMetas, function (meta) {

				jsonMetas[meta.clave] = meta.valor;

			});

			return jsonMetas;

		};

	}])

	.factory("mostrarPopAyudaFactory", ["$rootScope", function ($rootScope) {

		return function (indice) {

			$rootScope.$broadcast("bazamAyuda:mostrar", {
				indice: indice
			});

		};

	}])

	.factory("mostrarPasoPopAyudaFactory", ["$rootScope", function ($rootScope) {

		var accion = true;

		return function () {
			$rootScope.$broadcast("bazamPasoAyuda:mostrar", accion);

			accion = !accion;
		};

	}])

	.factory("verificarBase64Factory", [function () {

		return function (cadena) {

			return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(cadena);

		};
	}])

	.factory("fontFactory", ["$document", function ($document) {



		return {
			check: function (fuente) {
				return $document[0].fonts.check("200px " + fuente);
			},
			load: function (fuente, url) {
				var newFuente = new FontFace(fuente, 'url(' + url + ')');

				$document[0].fonts.add(newFuente);

				return newFuente.load()

			}
		}

	}])

	.service("fontService", ["$q", "$document", "fontFactory", function ($q, $document, fontFactory) {

		this.preparar = function (fuente, url) {

			var defered = $q.defer();
			var promise = defered.promise;

			if (fontFactory.check(fuente)) {

				defered.resolve({
					fuente: fuente,
					url: url
				})

			} else {

				fontFactory.load(fuente, url)
					.then(function () {
						defered.resolve({
							fuente: fuente,
							url: url
						});
					})
					.catch(function () {
						defered.reject();
					})

			}

			return promise;
		};

	}]);