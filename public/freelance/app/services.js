angular.module("disenador-de-logos")

	.value("coloresValue",{
		"#F5D327": "#14263D",
		"#70C041": "#63246A",
		"#51A7F9": "#320D29",
		"#B36AE2": "#151616",
		"#000000": "#8CB7C7",
		"blanco" : "white",
		"negro" : "black"
	
	}).factory("coloresFactory", ["coloresValue", function(coloresValue){
		return function(primario){
			if(coloresValue[primario]){
				return coloresValue[primario];
			}else{
				return coloresValue["negro"];
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


/*********************/
/********PEDIDOS******/
/*********************/

	.service("pedidosService", ["$http", "$q", function ($http, $q) {

		/*
        this.listarPlanes = function () {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get("/app/planes/comprar").then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject(res);

            })


            return promise;

        }

        this.listarPasarelas = function (idMoneda) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/pasarelas/moneda", {
                idMoneda: idMoneda
            }).then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;

        }


        this.pagar = {
            paypal: function (idElemento, idFuente, idFuenteEslogan, logo, idPrecio, tipoLogo, idPasarela) {


                var defered = $q.defer();

                var promise = defered.promise;

                var datos = {
                    idElemento: idElemento,
                    logo: logo,
                    idPrecio: idPrecio,
                    tipoLogo: tipoLogo,
                    idPasarela: idPasarela,
                    atributos: {
                        principal: idFuente
                    }
                }
                
                if(idFuenteEslogan){
                   datos.atributos.eslogan =  idFuenteEslogan;
                }

                $http.post("/app/pedido", datos).then(function (res) {

                    defered.resolve(res.data);

                }).catch(function (res) {

                    defered.reject(res);

                })


                return promise;

            }
        }

*/
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

	.service("clientesService", ["$http", "$q", "$window", "$rootScope", "clienteDatosFactory", "Upload", function ($http, $q, $window, $rootScope, clienteDatosFactory, Upload) {

		this.avatar = function(imagen){
			var defered = $q.defer();
			var promise = defered.promise;

			Upload.upload({
				url: "/app/cliente/avatar",
				data: {
					avatar: imagen
				},
			}).then(function (res) {

				defered.resolve(res.data.foto);

			}).catch(function(){

			});

			return promise;
		};

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

		this.datos = function (facturacion) {

			var defered = $q.defer();

			var promise = defered.promise;

			var pedirFacturacion = facturacion ? true : false;

			$http.get("/app/cliente/datos?facturacion=" + pedirFacturacion)

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


		this.nuevaFacturacion = function (metodo, correo) {


			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {
				medio: metodo,
				correo: correo
			};

			$http.post("/app/cliente/facturacion", datos).then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;

		};
        
		this.eliminarFacturacion = function(idFacturacion){
            
			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/facturacion/"+idFacturacion+"/borrar").then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;
		};

		this.listaPagos = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/pagos").then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;
		};

		this.saldo = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/cliente/saldo-personal").then(function (res) {

				defered.resolve(res.data);

			}).catch(function () {

				defered.reject();

			});

			return promise;
		};

		this.correoDisponible = function (correo) {
			var defered = $q.defer();
			var promise = defered.promise;

			$http.post("/app/cliente/email", {email: correo})

				.then(function () {
					defered.reject();
				})
				.catch(function (res) {
					if(res.status == 404){
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

				if (fuente.estado == true) {

					angular.forEach(iconos, function (icono) {

						if (icono.estado == true) {

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

	.factory("LS", ["$window", "$rootScope", function ($window) {
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

		this.publicar = function (idLogo, colores) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/logo/por-aprobar", {
				idLogo: idLogo,
				colores: colores
			}).then(function () {

				defered.resolve();

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;
		};

		this.guardarLogo = function (logo, tipoLogo, idElemento, fuentePrincipalId, fuenteEsloganId, estado) {

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

			if (estado) {
				datos.estado = estado;
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
		/*
        this.descargarLogo = function (idLogo, ancho, nombre, tipo) {

            var defered = $q.defer();

            var promise = defered.promise;

            var datos = {
                idLogo: idLogo,
                ancho: ancho,
                descarga: nombre,
                tipo: tipo
            }

            $http.post("/app/logo/zip/", datos).then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;

        }
        */

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

	.factory("verificarBase64Factory", [function () {
		
		return function (cadena) {
			
			return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(cadena);

		};
	}]);
