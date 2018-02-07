angular.module("disenador-de-logos")

	.value("coloresValue",{
		"#ffffff": [
			"#d5d5d5",
			"#d5d5d5",
			"#d5d5d5",
			"#d5d5d5",
			"#d5d5d5",
		],
		"#cccccc": [
			"#d5d5d5",
			"#d5d5d5",
			"#d5d5d5",
			"#d5d5d5",
			"#d5d5d5",			
		],
		"#000000": [
			"blue",
			"yellow",
			"red",
			"green",
			"purple",			
		]
	}).factory("coloresFactory", ["coloresValue", function(coloresValue){
		return function(primario){
			if(coloresValue[primario]){
				return coloresValue[primario][Math.floor(Math.random() * 4) + 1];
			}else{
				return coloresValue["#000000"][Math.floor(Math.random() * 4) + 1];
			}
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


			}).catch(function (res) {

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


			}).catch(function (res) {

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


			}).catch(function (res) {

				defered.reject();

			});

			return promise;

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

				.catch(function (res) {



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


/*********************/
/********PEDIDOS******/
/*********************/

	.service("pedidosService", ["$http", "$q", "$rootScope", function ($http, $q, $rootScope) {


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

			angular.forEach(iconos, function (icono, indice) {

				if (icono.estado == true) {

					angular.forEach(fuentes, function (fuente, indice) {

						if (fuente.estado == true) {

							var logo = {
								icono: icono,
								fuente: fuente
							};

							logos.push(logo);
						}
					});

				}

			});

			return logos;

		};

	}])

	.factory("LS", ["$window", "$rootScope", function ($window, $rootScope) {
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

			}).catch(function (res) {

				defered.reject();

			});

			return promise;

		};

		this.mostrarComprados = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/logos/descargables/").then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

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


		this.obtenerPorId = function (idLogo) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/logo/" + idLogo).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject();

			});

			return promise;

		};

		this.borrarLogo = function (idLogo) {


			var defered = $q.defer();

			var promise = defered.promise;


			$http.get("/app/logo/borrar/" + idLogo).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject();

			});

			return promise;

		};

		this.manualMarca = function (d) {

			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {
				logo: d 
			};

			$http.post("/app/cliente/manual", datos).then(function (res) {

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

			$http.post("/app/logo/plan/caracteristicas", {idLogo: idLogo})
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

	.factory("arrayToJsonMetasFactory", [function(){
    
		return function(arrayMetas){
        
			var jsonMetas = {};
        
			angular.forEach(arrayMetas, function(meta, indice){
            
				jsonMetas[meta.clave] = meta.valor;
            
			});
        
			return jsonMetas;
        
		};
    
	}])

	.factory("mostrarPopAyudaFactory", ["$rootScope", function ($rootScope) {

		return function (indice) {

			$rootScope.$broadcast("bazamAyuda:mostrar", {indice: indice});

		};

	}])

	.factory("mostrarPasoPopAyudaFactory", ["$rootScope", function ($rootScope) {

		var accion = true;

		return function () {
			console.log(accion)
			$rootScope.$broadcast("bazamPasoAyuda:mostrar", accion);

			accion = !accion;
		};

	}]);
