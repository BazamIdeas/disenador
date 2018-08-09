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

	.service("cookie", ["$window", function ($window) {

		this.getCookie = function (cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

	}])

	.service("idiomaService", ["$http", "$q", function ($http, $q, $window) {

		this.idioma = function (codigo) {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.get("/app/idioma/" + codigo).then(function (res) {

				defered.resolve(res.data);

			}).catch(function (res) {

				defered.reject(res);

			});

			return promise;

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

			$http.post("/app/elementos/busqueda/iconos/noun", datos)
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
		logoSVG: `<?xml version="1.0" encoding="utf-8"?>
		<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 300 93.3" style="enable-background:new 0 0 300 93.3;" xml:space="preserve">
		<style type="text/css">
			.st0{fill:#030104;}
			.st1{fill:#5981BC;}
			.st2{fill:#FFFFFF;stroke:#030104;stroke-width:6.063;stroke-miterlimit:10;}
			.st3{fill:none;stroke:#030104;stroke-width:6.2782;stroke-miterlimit:10;}
		</style>
		<path class="st0" d="M5.2,13.9c1.1-0.9,2.5-1.3,4.2-1.3c1.9,0,3.4,0.5,4.4,1.4s1.5,2.4,1.5,4.2C15.1,29.9,15,43.1,15,57.8
			c0,1.2,0,2.9,0.1,5.2c0.1,2.2,0.1,3.8,0.1,4.8c-0.1,1.7-0.5,3-1.2,3.7c-0.8,0.8-2.2,1.3-4.2,1.5c-4.2,0.4-6.3-2.2-6.4-7.7
			c-0.2-8.1-0.2-24,0.1-47.5C3.5,16.1,4.1,14.8,5.2,13.9z"/>
		<path class="st0" d="M45.5,34.1c5.1,0.8,9,3,11.6,6.7c2.7,3.7,4,7.9,4,12.6c0,5.8-1.9,10.5-5.8,14.3c-3.9,3.7-8.8,5.6-14.7,5.6
			c-5.4,0-10-1.7-13.8-5.2c-3.8-3.5-5.7-8-5.7-13.5c0-6.2,1.9-11.2,5.8-15c3.9-3.8,9.1-5.7,15.8-5.9C43.9,33.6,44.9,33.8,45.5,34.1z
			 M47.5,46.4c-1.6-1.9-3.6-2.9-6.2-3c-2.8,0.1-5,1.1-6.6,3c-1.6,1.9-2.4,4.6-2.4,8c0,2.5,0.8,4.7,2.5,6.4c1.6,1.7,3.5,2.6,5.6,2.6
			c2.6,0,4.8-1,6.6-2.9c1.8-1.9,2.7-4.4,2.7-7.5C49.8,50.5,49.1,48.3,47.5,46.4z"/>
		<path class="st0" d="M90.5,78.8c1.9-1.7,2.9-3.8,2.9-6.4v-4.1c-0.9,1.4-2.3,2.6-4.2,3.5c-1.8,0.9-3.8,1.3-5.8,1.3
			c-5.5,0-10-1.9-13.4-5.6c-3.5-3.7-5.2-8.2-5.2-13.4c0-5.8,1.8-10.7,5.4-14.6c3.6-3.9,8.2-5.9,13.7-5.9c4.3,0,7.6,1.7,10.1,5.2
			l0.2-1.6c0.2-0.9,0.7-1.7,1.7-2.3c1-0.6,2.1-0.9,3.5-0.9c1.6,0,2.9,0.5,3.9,1.4c1,0.9,1.5,2.1,1.5,3.6c-0.1,12.1-0.2,20.4-0.2,25.1
			l0.1,8.6c0.1,5.4-1.8,10-5.8,13.8S90,92.2,84,92.2c-5,0-9-0.8-11.9-2.3c-2.3-1.2-3.5-2.9-3.5-5.2c0-1.5,0.5-2.8,1.5-3.9
			c1-1.1,2.1-1.7,3.4-1.7c0.5,0,1.8,0.4,3.8,1.1c2.3,0.8,4.4,1.2,6.4,1.2C86.3,81.4,88.6,80.5,90.5,78.8z M78.8,60.6
			c1.7,1.7,3.7,2.6,6.2,2.6c2.4,0,4.5-0.8,6.2-2.5c1.7-1.7,2.6-4.1,2.6-7.2s-0.8-5.6-2.5-7.3c-1.7-1.7-3.7-2.5-6-2.5
			c-2.6-0.1-4.8,0.9-6.4,2.7c-1.7,1.9-2.5,4.4-2.5,7.5C76.3,56.6,77.1,58.9,78.8,60.6z"/>
		<path class="st0" d="M134.8,34.1c5.1,0.8,9,3,11.6,6.7c2.7,3.7,4,7.9,4,12.6c0,5.8-1.9,10.5-5.8,14.3c-3.9,3.7-8.8,5.6-14.7,5.6
			c-5.4,0-10-1.7-13.8-5.2c-3.8-3.5-5.7-8-5.7-13.5c0-6.2,1.9-11.2,5.8-15c3.9-3.8,9.1-5.7,15.8-5.9C133.2,33.6,134.1,33.8,134.8,34.1
			z M136.8,46.4c-1.6-1.9-3.6-2.9-6.2-3c-2.8,0.1-5,1.1-6.6,3c-1.6,1.9-2.4,4.6-2.4,8c0,2.5,0.8,4.7,2.5,6.4c1.6,1.7,3.5,2.6,5.6,2.6
			c2.6,0,4.8-1,6.6-2.9c1.8-1.9,2.7-4.4,2.7-7.5C139.1,50.5,138.3,48.3,136.8,46.4z"/>
		<path class="st1" d="M159.9,71.3c-1.2-1.2-1.8-2.7-1.8-4.6c0-1.9,0.7-3.5,2-4.8c1.3-1.2,3-1.9,4.9-1.9c1.9,0,3.4,0.6,4.7,1.7
			c1.2,1.2,1.9,2.7,1.9,4.7c0,2-0.7,3.6-2,4.8c-1.3,1.2-3,1.8-5.1,1.8C162.6,73.1,161.1,72.5,159.9,71.3z"/>
		<path class="st0" d="M190.2,33.7c2.5,0,4.1,1.1,4.7,3.4l0.2,2.7c1.2-1.9,2.9-3.5,4.9-4.6c2.1-1.1,4.4-1.7,6.9-1.7
			c5.5,0,9.8,1.8,13,5.5c3.2,3.7,4.8,8.3,4.8,14c0,5.8-1.8,10.6-5.5,14.5c-3.7,3.8-8.3,5.7-14,5.7c-4.3,0-7.5-1.4-9.7-4.2
			c0,0.4,0,1.3,0,2.9c0,1.5,0,2.7,0,3.4c0,0.6,0,2.1,0.1,4.5c0.1,2.4,0.1,4.3,0.1,5.8c0,3.7-2.1,5.5-6.4,5.5c-3.4,0-5.1-1.7-5.1-5.2
			l0.2-32.4l-0.1-14.8C184.5,35.4,186.4,33.7,190.2,33.7z M211,46.1c-1.7-1.8-3.7-2.7-6.1-2.7c-2.5,0-4.7,0.9-6.6,2.8
			c-1.8,1.9-2.7,4.3-2.7,7.2c0,3.2,0.8,5.7,2.3,7.4c1.5,1.7,3.7,2.6,6.5,2.6c2.6,0,4.8-1,6.5-3c1.7-2,2.6-4.5,2.6-7.6
			C213.6,50.2,212.7,47.9,211,46.1z"/>
		<path class="st0" d="M236.6,34.1c2.3,0,3.7,1.1,4.2,3.2l0.5,3.3c0.9-2.1,2.4-3.8,4.3-5c1.9-1.2,3.9-1.9,5.9-1.9
			c3.4,0,5.1,1.7,5.1,5.2c0,1.5-0.4,2.8-1.2,3.9c-0.8,1.1-1.9,1.6-3.3,1.6h-1.2c-2.7,0-4.8,1-6.4,3c-1.6,2-2.4,4.9-2.4,8.9
			c0,0.4,0,2.4,0.1,5.9c0.1,3.5,0.1,5.5,0,6.2c-0.1,3.1-2,4.7-5.7,4.7c-1.8,0-3.2-0.4-4.2-1.2c-0.9-0.8-1.4-2.3-1.4-4.4
			c0-2.2,0-5.6,0.1-10.2c0.1-4.6,0.1-7.9,0.1-9.8c0-0.9,0-2.2,0-4.1c0-1.8,0-3.2,0-4.1C231,35.8,232.9,34.1,236.6,34.1z"/>
		<path class="st0" d="M281.5,34.1c5.1,0.8,9,3,11.6,6.7c2.7,3.7,4,7.9,4,12.6c0,5.8-1.9,10.5-5.8,14.3c-3.9,3.7-8.8,5.6-14.7,5.6
			c-5.4,0-10-1.7-13.8-5.2c-3.8-3.5-5.7-8-5.7-13.5c0-6.2,1.9-11.2,5.8-15c3.9-3.8,9.1-5.7,15.8-5.9C279.9,33.6,280.8,33.8,281.5,34.1
			z M283.5,46.4c-1.6-1.9-3.6-2.9-6.2-3c-2.8,0.1-5,1.1-6.6,3c-1.6,1.9-2.4,4.6-2.4,8c0,2.5,0.8,4.7,2.5,6.4c1.6,1.7,3.5,2.6,5.6,2.6
			c2.6,0,4.8-1,6.6-2.9c1.8-1.9,2.7-4.4,2.7-7.5C285.8,50.5,285,48.3,283.5,46.4z"/>
		<rect x="146.4" y="2.2" class="st0" width="36.2" height="7.9"/>
		<g>
			<polygon class="st2" points="169.6,6.1 182.6,25.4 164.2,53.5 146.3,25.9 158.7,6.4 	"/>
			<line class="st3" x1="164.6" y1="25.7" x2="164.6" y2="53.5"/>
		</g>
		</svg>
		`,
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
			descripcion: "Es la segunda vez que hago un logo y estoy super contento",
			logo: "/landing/assets/img/logo.pro.svg",
			color: '#51a7f9',
			client: {
				name: 'Logo Pro',
				ocupation: ''
			}
		}
		],
		preguntas: [{
			pregunta: "¿Cuanto cuesta el servicio?",
			respuesta: `Logopro ofrece excelentes opciones de planes para la compra: el Plan básico de logotipo y el  Plan Profesional.<br/> <br/>
			
			Puede comprar sus archivos de logotipo por $9.9 por logo como parte de nuestro Plan básico, o elija el Plan Profesional $36, que le ofrece nuestra completa solución de marca y contiene una amplia gama de increíbles herramientas , archivos y características, ¡lo que le permite impulsar, construir y mejorar su marca realmente!
			<br/> <br/>
			
			Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
		}, {
			pregunta: "¿Cómo puedo pagarlo?",
			respuesta: `Logopro le da la facilidad mediante su tarjeta de credito o por paypal si asi lo desea.<br/> <br/>
			
			Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
		}, {
			pregunta: "¿Puedo cambiar el diseño después de comprar?",
			respuesta: `
			En sus logos guardados aparecerá el logo que acaba de comprar y podrá editarlo ilimitadamente. 
			<br/> <br/>
			
			Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a <a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
		}, {
			pregunta: "¿Dónde lo puedo descargar?",
			respuesta: `Igresando al sitio con su cuenta, podrá ir a sus logos comprados presionando el icono del menu.<br /><br /><div class='flex --row --center'><img src='landing/assets/img/tus-logos.jpg'></div>
			<br/> <br/>
			Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
			<a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
		}, {
			pregunta: "¿En que formato puedo descargar el logo?",
			respuesta: `Al momento de descargar su logo, este viene dentro de
			un archivo comprimido en formato PNG y adecuado en varios tamaños listo para redes sociales, papeleria y publicidad.<br/> <br/>
			
			Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
			<a href="mailto:info@logo.pro">info@logo.pro</a>.<br/> `
		},
		{
			pregunta: "¿Poseo los derechos plenos de mi logotipo comprado?",
			respuesta: `Usted es libre de usar su logotipo comprado  para cualquier uso comercial o no comercial sin permiso adicional. Si desea colocar una marca comercial en su diseño, deberá hacerlo con la ayuda de un abogado familiarizado con las leyes de su estado o país en este momento.<br/> <br/>
			Para obtener más información, comuníquese con nuestro equipo de Atención al cliente a 
			<a href="mailto:info@logo.pro">info@logo.pro</a>`
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
		this.mostrarAprobados = function () {

			var defered = $q.defer();

			var promise = defered.promise;

			$http.post("/app/logos/aprobados").then(function (res) {

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

		var bz = this;
		
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

			$http.get("/app/etiquetas/idioma").then(function (res) {
				defered.resolve(res);
			}).catch(function (res) {
				defered.reject(res.data.msg);
			});

			return promise;
		};

		this.loadEtiquetas = function (arr) {

			return arr.map(function (et) {

				for (let i = 0; i < et.traducciones.length; i++) {
					const element = et.traducciones[i];
					element._lowername = element.valor.toLowerCase();
				}

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
				traducciones: [{
					valor: chip
				}]
			};

		};

		this.querySearch = function (query) {

			if (bz.peticion) return;
			if (query.length < 3) return;
			bz.peticion = true;

			return $http.get("/app/etiquetas/" + query.toLowerCase()).then(function (res) {

				var etiquetas = bz.loadEtiquetas(res.data);

				var results = query ? etiquetas.filter(createFilterFor(query)) : [];

				return results;

			}).finally(function(){
				bz.peticion = false;
			});

		};

		function createFilterFor(query) {
			var lowercaseQuery = query.toLowerCase();

			return function filterFn(etiqueta) {
				return (etiqueta.traducciones[0]._lowername.indexOf(lowercaseQuery) === 0);
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