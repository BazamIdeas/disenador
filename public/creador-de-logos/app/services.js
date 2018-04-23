angular.module("disenador-de-logos")

	.value("coloresValue", [

		["#FFF9D6", "#FFED7E", "#7F721C"],
		["#FBFFD3", "#F3FF7B", "#767F1B"],
		["#FFE7A4", "#FFD458", "#7F6A2F"],

		["#FFDAB8", "#FFB26C", "#7F4917"],
		["#FFD6C6", "#FF9F7A", "#7F3A1E"],
		["#FFCDC9", "#FF857C", "#7F2620"],
		["#FF9193", "#FF393D", "#7F0A0C"],

		["#FFC1E9", "#FF75CE", "#7F1C5C"],
		["#FFBDFA", "#FF71F5", "#7F1A78"],
		["#F0BBFF", "#DF6FFF", "#69197F"],
		["#D9C3FF", "#A977FF", "#411D7F"],

		["#CFCAFF", "#897EFF", "#29207F"],
		["#D3D8FF", "#8794FF", "#252F7F"],
		["#D8E3FF", "#8BACFF", "#17357F"],
		["#C9E0FF", "#7CB4FF", "#103F7F"],

		["#D1F3FF", "#84DFFF", "#13637F"],
		["#CDFFEC", "#80FFCF", "#407F67"],
		["#DBFFCD", "#A5FF80", "#547F43 "],
	])

	.factory("coloresFactory", [function () {
		return function (coloresArrays) {
			var i = Math.floor(Math.random() * coloresArrays.length) + 0;
			return coloresArrays[i];
		};

	}])

	.value("coloresPaletaValue", ["#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#ffcdd2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2", "#FFCCBC", "#D7CCC8", "#FFFFFF", "#CFD8DC", "#ef9a9a", "#F48FB1", "#CE93D8", "#B39DDB", "#9FA8DA", "#90CAF9", "#81D4FA", "#80DEEA", "#80CBC4", "#A5D6A7", "#C5E1A5", "#E6EE9C", "#FFF59D", "#FFE082", "#FFCC80", "#FFAB91", "#BCAAA4", "#EEEEEE", "#B0BEC5", "#e57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB", "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784", "#AED581", "#DCE775", "#FFF176", "#FFD54F", "#FFB74D", "#FF8A65", "#A1887F", "#E0E0E0", "#90A4AE", "#ef5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C", "#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#e53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", "#F4511E", "#6D4C41", "#757575", "#546E7A", "#d32f2f", "#C2185B", "#7B1FA2", "#512DA8", "#303F9F", "#1976D2", "#0288D1", "#0097A7", "#00796B", "#388E3C", "#689F38", "#AFB42B", "#FBC02D", "#FFA000", "#F57C00", "#E64A19", "#5D4037", "#616161", "#455A64", "#c62828", "#AD1457", "#6A1B9A", "#4527A0", "#283593", "#1565C0", "#0277BD", "#00838F", "#00695C", "#2E7D32", "#558B2F", "#9E9D24", "#F9A825", "#FF8F00", "#EF6C00", "#D84315", "#4E342E", "#424242", "#37474F", "#b71c1c", "#880E4F", "#4A148C", "#311B92", "#1A237E", "#0D47A1", "#01579B", "#006064", "#004D40", "#1B5E20", "#33691E", "#827717", "#F57F17", "#FF6F00", "#E65100", "#BF360C", "#3E2723", "#212121", "#263238"])

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


	/*-------------------------- Services --------------------------*/

	/*********************/
	/********ETIQUETAS****/
	/*********************/

	/* SERVICIO PARA ETIQUETAS */

	.service("etiquetasService", ["$http", "$q", function ($http, $q) {

		/***************************/
		/**********LOGOS***********/
		/***************************/

		this.listarLogos = function (datos) {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.post("/app/elementos/categoria", datos).then(function (res) {
				if (res == undefined) {
					return defered.reject(res);
				}
				defered.resolve(res);
			}).catch(function (res) {
				defered.reject(res);
			});

			return promise;
		};

		/* ETIQUETAS*/


		this.listarEtiquetas = function () {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.get("/app/etiquetas").then(function (res) {
				defered.resolve(res);
			}).catch(function (res) {
				defered.reject(res.data.msg);
			});

			return promise;
		};

		this.loadEtiquetas = function (arr) {

			var etiquetas = [];

			angular.forEach(arr, function (valor) {
				etiquetas.push({
					_id: valor._id,
					traduccion: valor.traducciones[0]
				});
			});

			return etiquetas.map(function (et) {
				et.traduccion._lowername = et.traduccion.valor.toLowerCase();
				return et;
			});
		};

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
			};

		};

		this.querySearch = function (query, etiquetas) {
			var results = query ? etiquetas.filter(createFilterFor(query)) : [];
			return results;
		};

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

			},

			stripe: function (idElemento, atributos, logo, idPrecio, tipoLogo, idPasarela, tokenStripe) {

				var defered = $q.defer();
				var promise = defered.promise;

				var datos = {
					idElemento: idElemento,
					logo: logo,
					idPrecio: idPrecio,
					tipoLogo: tipoLogo,
					idPasarela: idPasarela,
					atributos: atributos,
					stripeToken: tokenStripe
				};

				$http.post("/app/pedido", datos)
					.then(function (res) {
						defered.resolve(res.data);
					})
					.catch(function (res) {
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
							origen: "facebook",
							token: response.authResponse.accessToken
						}).then(function (res) {

							$window.localStorage.setItem("bzToken", angular.toJson(res.data));
							clienteDatosFactory.definir(res.data);
							defered.resolve(res);

						}).catch(function (res) {
							$window.localStorage.removeItem("bzToken");
							defered.reject(res);
						});

					}, {
						scope: "email,user_friends,user_location,user_likes"
					});

					return promise;
				}

				$http.post("/app/cliente/social", {
						origen: "facebook",
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
							origen: "google",
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
					defered.reject(res);
				});

				return promise;
			}

			var datosUsuario = GoogleAuth.currentUser.get();

			$http.post("/app/cliente/social", {
					origen: "google",
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

	}])



	/*********************/
	/***** facebook ******/
	/*********************/

	.service("facebookService", ["$http", "$q", function ($http, $q) {

		this.compartir = function () {

			var defered = $q.defer();
			var promise = defered.promise;

			FB.getLoginStatus(function (response) {
				if (response.status === "connected") {
					FB.ui({
							method: "share",
							href: "http://test.logo.pro/",
							source: "http://test.logo.pro/logo.pro.svg"
						},
						function (response) {
							if (response && !response.error_code) {
								if (typeof response != "undefined") {
									defered.resolve();
								}
							} else {
								defered.reject(response);
							}
						});
				} else {
					FB.login(function (response) {
						FB.ui({
								method: "share",
								href: "http://test.logo.pro/",
							source: "http://test.logo.pro/"
							},
							function (response) {
								if (response && !response.error_code) {
									if (typeof response != "undefined") {
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
					defered.reject(res);
				});

			return promise;

		};

		this.confirmarToken = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/recuperar-password/" + datos)
				.then(function (res) {
					defered.resolve(res);
				})
				.catch(function (res) {
					defered.reject(res);
				});

			return promise;

		};

		this.cambiarContrasena = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/cambiar-password", datos)
				.then(function (res) {
					defered.resolve(res);
				})
				.catch(function (res) {
					defered.reject(res);
				});

			return promise;

		};

		this.verificarCambiaContrasena = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/cliente/cambiar-contrasena", datos)
				.then(function (res) {
					defered.resolve(res);
				})
				.catch(function (res) {
					defered.reject(res);
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
			/*
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

			*/

			angular.forEach(iconos, function(icono, indice){

				var logo = {
					icono: iconos[indice],
					fuente: fuentes[indice]
				};

				logos.push(logo);

			});

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

	.service("logosService", ["$http", "$q", "$httpParamSerializer", function ($http, $q, $httpParamSerializer) {

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

			$http.get("/app/logo/zip/", {
				params: datos,
				responseType: "arraybuffer"
			}).then(function (res) {

				defered.resolve({
					data: res.data,
					headers: res.headers()
				});

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

		};

		this.descargarTodo = function (idLogo, formatosPNG) {

			var defered = $q.defer();

			var promise = defered.promise;

			var datos = {
				idLogo: idLogo,
				formatos: formatosPNG
			};

			$http.get("/app/logo/descargar/", {
				params: datos,
				responseType: "arraybuffer"
			}).then(function (res) {

				defered.resolve({
					data: res.data,
					headers: res.headers()
				});

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


		this.enviarPorEmail = function (idLogo, email, url) {

			var defered = $q.defer();
			var promise = defered.promise;

			$http.post("/app/logo/compartir-email", {
					idLogo: idLogo,
					email: email,
					url: url
				})
				.then(function (res) {
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

		this.aumentarPedidoPlan = function (datos) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/pedido/aumentar", datos)
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

				if (!$document[0].fonts) {
					return false;
				}

				return $document[0].fonts.check("200px " + fuente);
			},
			load: function (fuente, url) {

				if (!$document[0].fonts) {
					var nombreFuente = fuente.replace(/\s/g, "-");
					if (!angular.element("." + nombreFuente).length) {
						angular.element("html head").append("<style class='" + nombreFuente + "'>@font-face {font-family: " + fuente + ";src: url('" + url + "');}</style>");
					}
					return false;
				}

				var newFuente = new FontFace(fuente, "url(" + url + ")");

				$document[0].fonts.add(newFuente);

				return newFuente.load();

			}
		};

	}])

	.service("fontService", ["$q", "$document", "fontFactory", "$timeout", function ($q, $document, fontFactory, $timeout) {

		this.preparar = function (fuente, url) {

			if(!url){
				url = "/fuentes/"+fuente+".ttf";
			}

			var defered = $q.defer();
			var promise = defered.promise;

			if (fontFactory.check(fuente)) {

				defered.resolve({
					fuente: fuente,
					url: url
				});

			} else {

				$q.race([$timeout(function () {
						return "exceso";
					}, 10000), fontFactory.load(fuente, url)])
					.then(function (res) {
						if (res === "exceso") {
							defered.reject();
						} else {
							defered.resolve({
								fuente: fuente,
								url: url
							});
						}
					})
					.catch(function () {
						defered.reject();
					});

			}

			return promise;
		};

		this.agregarGeneral = function (fuentes) {

			var fontService = this;

			angular.forEach(fuentes, function (fuente) {
				fontService.preparar(fuente.nombre, fuente.url)
					.catch(function () {
						//console.log(res);
					});
			});

		};

	}])

	.service("papeleriaService", ["$q", "$http",  function($q, $http){

		this.listarTipos = function(){
			var defered = $q.defer();
			var promise = defered.promise;

			var prueba = [
				{
					_id: "unavainaahitodoloca",
					nombre: "unnombrearrecho",
					meta: [
						"nombre",
						"cargo",
						"direccion",
						"web",
						"telefono"
					]
				
				}
			];

			defered.resolve();
			
			return promise;
		};

	}]);