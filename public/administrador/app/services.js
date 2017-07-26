angular.module("administrador")

    .value("monedasValue", ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR", "ZMW"])
    .value("paisesValue", {
        "AF": "Afghanistan",
        "AX": "Åland Islands",
        "AL": "Albania",
        "DZ": "Algeria",
        "AS": "American Samoa",
        "AD": "Andorra",
        "AO": "Angola",
        "AI": "Anguilla",
        "AQ": "Antarctica",
        "AG": "Antigua and Barbuda",
        "AR": "Argentina",
        "AM": "Armenia",
        "AW": "Aruba",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "BS": "Bahamas",
        "BH": "Bahrain",
        "BD": "Bangladesh",
        "BB": "Barbados",
        "BY": "Belarus",
        "BE": "Belgium",
        "BZ": "Belize",
        "BJ": "Benin",
        "BM": "Bermuda",
        "BT": "Bhutan",
        "BO": "Bolivia",
        "BA": "Bosnia and Herzegovina",
        "BW": "Botswana",
        "BV": "Bouvet Island",
        "BR": "Brazil",
        "IO": "British Indian Ocean Territory",
        "BN": "Brunei Darussalam",
        "BG": "Bulgaria",
        "BF": "Burkina Faso",
        "BI": "Burundi",
        "KH": "Cambodia",
        "CM": "Cameroon",
        "CA": "Canada",
        "CV": "Cape Verde",
        "KY": "Cayman Islands",
        "CF": "Central African Republic",
        "TD": "Chad",
        "CL": "Chile",
        "CN": "China",
        "CX": "Christmas Island",
        "CC": "Cocos (Keeling) Islands",
        "CO": "Colombia",
        "KM": "Comoros",
        "CG": "Congo",
        "CD": "Congo, The Democratic Republic of the",
        "CK": "Cook Islands",
        "CR": "Costa Rica",
        "CI": "Cote D'Ivoire",
        "HR": "Croatia",
        "CU": "Cuba",
        "CY": "Cyprus",
        "CZ": "Czech Republic",
        "DK": "Denmark",
        "DJ": "Djibouti",
        "DM": "Dominica",
        "DO": "Dominican Republic",
        "EC": "Ecuador",
        "EG": "Egypt",
        "SV": "El Salvador",
        "GQ": "Equatorial Guinea",
        "ER": "Eritrea",
        "EE": "Estonia",
        "ET": "Ethiopia",
        "FK": "Falkland Islands (Malvinas)",
        "FO": "Faroe Islands",
        "FJ": "Fiji",
        "FI": "Finland",
        "FR": "France",
        "GF": "French Guiana",
        "PF": "French Polynesia",
        "TF": "French Southern Territories",
        "GA": "Gabon",
        "GM": "Gambia",
        "GE": "Georgia",
        "DE": "Germany",
        "GH": "Ghana",
        "GI": "Gibraltar",
        "GR": "Greece",
        "GL": "Greenland",
        "GD": "Grenada",
        "GP": "Guadeloupe",
        "GU": "Guam",
        "GT": "Guatemala",
        "GG": "Guernsey",
        "GN": "Guinea",
        "GW": "Guinea-Bissau",
        "GY": "Guyana",
        "HT": "Haiti",
        "HM": "Heard Island and Mcdonald Islands",
        "VA": "Holy See (Vatican City State)",
        "HN": "Honduras",
        "HK": "Hong Kong",
        "HU": "Hungary",
        "IS": "Iceland",
        "IN": "India",
        "ID": "Indonesia",
        "IR": "Iran, Islamic Republic Of",
        "IQ": "Iraq",
        "IE": "Ireland",
        "IM": "Isle of Man",
        "IL": "Israel",
        "IT": "Italy",
        "JM": "Jamaica",
        "JP": "Japan",
        "JE": "Jersey",
        "JO": "Jordan",
        "KZ": "Kazakhstan",
        "KE": "Kenya",
        "KI": "Kiribati",
        "KP": "Democratic People's Republic of Korea",
        "KR": "Korea, Republic of",
        "XK": "Kosovo",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Lao People's Democratic Republic",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LS": "Lesotho",
        "LR": "Liberia",
        "LY": "Libyan Arab Jamahiriya",
        "LI": "Liechtenstein",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MO": "Macao",
        "MK": "Macedonia, The Former Yugoslav Republic of",
        "MG": "Madagascar",
        "MW": "Malawi",
        "MY": "Malaysia",
        "MV": "Maldives",
        "ML": "Mali",
        "MT": "Malta",
        "MH": "Marshall Islands",
        "MQ": "Martinique",
        "MR": "Mauritania",
        "MU": "Mauritius",
        "YT": "Mayotte",
        "MX": "Mexico",
        "FM": "Micronesia, Federated States of",
        "MD": "Moldova, Republic of",
        "MC": "Monaco",
        "MN": "Mongolia",
        "ME": "Montenegro",
        "MS": "Montserrat",
        "MA": "Morocco",
        "MZ": "Mozambique",
        "MM": "Myanmar",
        "NA": "Namibia",
        "NR": "Nauru",
        "NP": "Nepal",
        "NL": "Netherlands",
        "AN": "Netherlands Antilles",
        "NC": "New Caledonia",
        "NZ": "New Zealand",
        "NI": "Nicaragua",
        "NE": "Niger",
        "NG": "Nigeria",
        "NU": "Niue",
        "NF": "Norfolk Island",
        "MP": "Northern Mariana Islands",
        "NO": "Norway",
        "OM": "Oman",
        "PK": "Pakistan",
        "PW": "Palau",
        "PS": "Palestinian Territory, Occupied",
        "PA": "Panama",
        "PG": "Papua New Guinea",
        "PY": "Paraguay",
        "PE": "Peru",
        "PH": "Philippines",
        "PN": "Pitcairn",
        "PL": "Poland",
        "PT": "Portugal",
        "PR": "Puerto Rico",
        "QA": "Qatar",
        "RE": "Reunion",
        "RO": "Romania",
        "RU": "Russian Federation",
        "RW": "Rwanda",
        "SH": "Saint Helena",
        "KN": "Saint Kitts and Nevis",
        "LC": "Saint Lucia",
        "PM": "Saint Pierre and Miquelon",
        "VC": "Saint Vincent and the Grenadines",
        "WS": "Samoa",
        "SM": "San Marino",
        "ST": "Sao Tome and Principe",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SC": "Seychelles",
        "SL": "Sierra Leone",
        "SG": "Singapore",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SB": "Solomon Islands",
        "SO": "Somalia",
        "ZA": "South Africa",
        "GS": "South Georgia and the South Sandwich Islands",
        "ES": "Spain",
        "LK": "Sri Lanka",
        "SD": "Sudan",
        "SR": "Suriname",
        "SJ": "Svalbard and Jan Mayen",
        "SZ": "Swaziland",
        "SE": "Sweden",
        "CH": "Switzerland",
        "SY": "Syrian Arab Republic",
        "TW": "Taiwan",
        "TJ": "Tajikistan",
        "TZ": "Tanzania, United Republic of",
        "TH": "Thailand",
        "TL": "Timor-Leste",
        "TG": "Togo",
        "TK": "Tokelau",
        "TO": "Tonga",
        "TT": "Trinidad and Tobago",
        "TN": "Tunisia",
        "TR": "Turkey",
        "TM": "Turkmenistan",
        "TC": "Turks and Caicos Islands",
        "TV": "Tuvalu",
        "UG": "Uganda",
        "UA": "Ukraine",
        "AE": "United Arab Emirates",
        "GB": "United Kingdom",
        "US": "United States",
        "UM": "United States Minor Outlying Islands",
        "UY": "Uruguay",
        "UZ": "Uzbekistan",
        "VU": "Vanuatu",
        "VE": "Venezuela",
        "VN": "Viet Nam",
        "VG": "Virgin Islands, British",
        "VI": "Virgin Islands, U.S.",
        "WF": "Wallis and Futuna",
        "EH": "Western Sahara",
        "YE": "Yemen",
        "ZM": "Zambia",
        "ZW": "Zimbabwe"
    })

    /* SERVICIO DE LOGIN */

    .service('clientesService', ['$http', '$q', '$window', '$rootScope', function ($http, $q, $window, $rootScope) {


        this.registrar = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/usuario", datos).then(function (res) {

                    defered.resolve(res);

                })
                .catch(function (res) {

                    defered.reject(res);
                })

            return promise;


        }

        this.login = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/usuario/login", datos).then(function (res) {

                    $window.localStorage.setItem('bzToken', JSON.stringify(res.data));
                    $rootScope.objectoCliente = res.data;

                    defered.resolve();

                })
                .catch(function (res) {
                    $window.localStorage.removeItem('bzToken');
                    defered.reject()
                })


            return promise;

        }

        this.autorizado = function () {

            if ($rootScope.objectoCliente) {

                return $rootScope.objectoCliente;

            } else {

                if ($window.localStorage.getItem('bzToken')) {

                    $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('bzToken'));

                    return $rootScope.objectoCliente;

                } else {

                    return false;

                }

            }

        }

        this.salir = function () {

            $rootScope.objectoCliente = false;
            $window.localStorage.removeItem('bzToken');

        }

        this.modificarU = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            datos.idUsuario = 1;

            $http.post("/app/usuario/modificar", datos).then(function (res) {

                    defered.resolve(res);

                })
                .catch(function (res) {

                    defered.reject(res);
                })

            return promise;


        }


    }])

    /* SERVICIO PARA PROCESO DE CLIENTES */

    .service('clientesServiceAdmin', ['$http', '$q', function ($http, $q) {

        /* MODULO DE CLIENTES */
        this.listarClientes = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/clientes').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

        this.borrarCliente = function (id) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/cliente/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

        /* MODULO DE USUARIOS */

        this.listarUsuarios = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/usuarios').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

    }])

    /* SERVICIO PARA PROCESO DE PEDIDOS */


    .service('pedidosService', ['$http', '$q', function ($http, $q) {

        /* LISTAR TODOS LOS PEDIDOS */

        this.listarPedidos = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/pedidos').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        /* DATOS DE UN PEDIDO */

        this.datosPedido = function (id) {

            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('/app/pedido/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        /* LISTAR LOS PEDIDOS DE UN CLIENTE */

        this.pedidosCliente = function (id) {

            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/pedidos/cliente/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        /* CAMBIAR ESTADO DE UN PEDIDO */

        this.cambiarEstado = function (id, estadoP) {

            var defered = $q.defer();
            var promise = defered.promise;

            var datos = {
                idPedido: id,
                estado: estadoP,
            }

            $http.post('/app/pedido/cambiar/', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }


    }])

    /* SERVICIO PARA PROCESO DE CATEGORIAS */


    .service('categoriasService', ['$http', '$q', function ($http, $q) {

        /* CATEGORIAS */

        this.listarCategorias = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get("/app/categorias").then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.modificarCategoria = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/categoria/modificar/', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.nuevaCategoria = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/categoria', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.eliminarCategoria = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/categoria/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        /* PREFERENCIAS */

        this.listarPreferencias = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get("/app/preferencias").then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.modificarPreferencia = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/preferencia/modificar/', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.nuevaPreferencia = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/preferencia', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.eliminarPreferencia = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/preferencia/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

    }])

    /* SERVICIO PARA ICONOS */

    .service('iconoFuente', ['$http', 'Upload', '$q', function ($http, Upload, $q) {

        this.nuevoIcono = function (datos) {

            var archivo = datos.misvg;
            delete datos.misvg;

            var defered = $q.defer();
            var promise = defered.promise;

            Upload.upload({
                url: '/app/elemento/icono',
                method: 'POST',
                file: {
                    misvg: archivo
                },
                data: datos
            }).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        this.nuevaFuente = function (datos) {
            datos.mifuente.type = "application/x-font-ttf";
            var archivo = datos.mifuente;

            console.log(datos.mifuente)
            delete datos.mifuente;

            var defered = $q.defer();
            var promise = defered.promise;

            Upload.upload({
                url: '/app/elemento/fuente',
                method: 'POST',
                file: {
                    mifuente: archivo
                },
                data: datos
            }).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

    }])


    /* SERVICIO PARA ADMINISTRAR */

    .service('administrarService', ['$http', '$q', function ($http, $q) {

        /* LISTAR*/

        this.listar = function (opcion) {
            var defered = $q.defer();
            var promise = defered.promise;

            if (opcion == 'planes') {
                var ruta = "/app/planes/";
            } else if (opcion == 'impuestos') {
                var ruta = "/app/impuestos/";
            }

            $http.get(ruta).then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res.data.msg);
            })
            return promise;
        }

        /* AGREGAR IMPUESTO */

        this.agregar = function (opcion, datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            if (opcion == 'plan') {
                var ruta = '/app/plan';
            } else if (opcion == 'impuesto') {
                var ruta = '/app/impuesto';
            } else if (opcion == 'nuevoPrecioPlan') {
                var ruta = '/app/plan/precios';
            }

            $http.post(ruta, datos).then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        /* MODIFICAR IMPUESTO Y PRECIO DE UN PLAN */

        this.modificar = function (opcion, datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            if (opcion == 'precioPlan') {
                var ruta = '/app/precio/modificar/';
            } else if (opcion == 'impuesto') {
                var ruta = '/app/impuesto/modificar/';
            }

            $http.post(ruta, datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

        /* ELIMINAR IMPUESTO */

        this.eliminarImpuesto = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/impuesto/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

    }])


    .factory('AuthInterceptor', function ($window, $q, $rootScope) {
        function salir() {
            $rootScope.objectoCliente = false;
            $window.localStorage.removeItem('bzToken');
        }

        function autorizado() {
            if ($rootScope.objectoCliente) {
                return $rootScope.objectoCliente;
            } else {
                if ($window.localStorage.getItem('bzToken')) {
                    $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('bzToken'));
                    return $rootScope.objectoCliente;
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
                if (response.status === 401 || response.status === 403) {
                    salir();
                }
                return response || $q.when(response);
            }
        };
    });