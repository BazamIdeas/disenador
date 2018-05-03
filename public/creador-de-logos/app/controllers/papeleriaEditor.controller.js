angular.module("disenador-de-logos")
	.controller("papeleriaEditorController", ["papeleriaResolve", "logoResolve", "$base64", "$scope", "elementosService", function (papeleriaResolve, logoResolve, $base64, $scope, elementosService) {

		var bz = this;

		bz.base64 = $base64;

		//bz.papeleria = papeleriaResolve;
		bz.logo = logoResolve;

		elementosService.listarFuentes().then(function (res) {
			bz.fuentes = res;
		})

		bz.papeleria = {
			tipo: "tarjeta", //tarjeta, carta, sobre
			items: [
				//items permitidos para esta papeleria
				{
					nombre: "nombre",
					tipo: "text",
					tag: "text",
					icono: ""
				},
				{
					nombre: "cargo",
					tipo: "text",
					tag: "text",
					icono: ""
				},
				{
					nombre: "direccion",
					tipo: "textarea",
					tag: "text",
					icono: ""
				},
				{
					nombre: "email",
					tipo: "email",
					tag: "text",
					icono: ""
				},
				{
					nombre: "telefono",
					tipo: "tel",
					tag: "text",
					icono: ""
				},
				{
					nombre: "web",
					tipo: "text",
					tag: "text",
					icono: ""
				}
			],
			modelo: {
				nombre: "modelo #1",
				iconos: [{
					orientacion: "right",
					svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
					clases: ["color-secundario"]
				}, {
					orientacion: "right",
					svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
					clases: ["color-secundario"]
				}, {
					orientacion: "right",
					svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
					clases: ["color-secundario"]
				}],
				caras: [{
						nombre: 'delantera',
						svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.94 156.91">
								<!--<style>.blanco, .blanco *{
									fill: white !important;
									stroke: white !important;
								}</style>-->
								<g id="Layer_2" data-name="Layer 2">
									<g id="Layer_1-2" data-name="Layer 1">
										<rect x="0.5" y="0.5" width="240.94" height="155.91" style="fill:#fff;stroke:#b6b7b7;stroke-miterlimit:10"/>
										<path id="_Path_" data-name="&lt;Path&gt;" d="M.5,156.41H53.66a99.07,99.07,0,0,0,5-31.77,105.3,105.3,0,0,0-2.78-21.78C44.64,89.74,33.73,76.59,29.4,62.06c-4-13.43-2-27.23,3.93-40.44-.18-2.78-.24-5.58-.14-8.39A66.3,66.3,0,0,1,34.87.5H.5" style="fill:#162259" class="color-primario"/>
										<g id="_Group_" data-name="&lt;Group&gt;" class="color-secundario">
											<path d="M45.25,69.08C39.77,53.78,34.38,37.95,33.33,21.62c-5.91,13.22-7.93,27-3.93,40.44,4.32,14.53,15.24,27.67,26.49,40.79C53.28,91.35,49.2,80.13,45.25,69.08Z"/>
										</g>
										<g id="_Group_2" data-name="&lt;Group&gt;" class="color-secundario">
											<path d="M89.07,156.41a92.72,92.72,0,0,0-12.31-27.27c-5.91-9-13.47-17.64-20.87-26.28a105.29,105.29,0,0,1,2.78,21.78,99.07,99.07,0,0,1-5,31.77Z"/>
										</g>
										<g id="_Group_3" data-name="&lt;Group&gt;" class="color-secundario">
											<path d="M34.87.5a66.3,66.3,0,0,0-1.68,12.73c-.09,2.81,0,5.61.14,8.39A103.94,103.94,0,0,1,46.27.5Z"/>
										</g>
										<!--<rect x="104.31" y="44.17" width="56.69" height="56.69" style="fill:transparent" class="logo"/>-->
									</g>
								</g>
							</svg>`,
						// Contenedores que puede tener
						hooks: [],
						logos: [{
							clases: [],
							caracteristicas: {
								x: "95",
								y: "40",
								width: "70",
								height: "70"
							}
						}]
					},
					{
						nombre: "frontal",
						svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.94 156.91">
							<title>Asset 3</title>
							<g id="Layer_2" data-name="Layer 2">
								<g id="Layer_1-2" data-name="Layer 1">
									<rect x="0.5" y="0.5" width="240.94" height="155.91" style="fill:#fff;stroke:#b6b7b7;stroke-miterlimit:10"/>
									<rect x="152.47" y="36.06" width="72.67" height="20.25" style="fill:#fafafa"/>
									<rect x="152.47" y="36.06" width="72.67" height="20.25" style="fill:#fff"/>
									<rect x="152.14" y="56.23" width="72.67" height="20.25" style="fill:#fafafa"/>
									<rect x="152.14" y="56.23" width="72.67" height="20.25" style="fill:#fff"/>
									<rect x="152.14" y="75.04" width="72.67" height="20.25" style="fill:#fafafa"/>
									<rect x="152.14" y="75.04" width="72.67" height="20.25" style="fill:#fff"/>
									<rect x="152.47" y="95.9" width="72.67" height="20.25" style="fill:#fafafa"/>
									<rect x="152.47" y="95.9" width="72.67" height="20.25" style="fill:#fff"/>
								
									<g id="_Group_" data-name="&lt;Group&gt;">
										<path id="_Compound_Path_" data-name="&lt;Compound Path&gt;" d="M214.91,87.57a1.19,1.19,0,0,1-.15.58l-3-3.4,3-2.63a1.19,1.19,0,0,1,.19.64Zm-4.81-2.2,4.18-3.66a1.18,1.18,0,0,0-.57-.15H206.5a1.18,1.18,0,0,0-.57.15Zm1.17-.22-1,.85a.3.3,0,0,1-.4,0l-1-.85-3.08,3.44a1.19,1.19,0,0,0,.63.18h7.21a1.19,1.19,0,0,0,.63-.18Zm-5.79-3a1.19,1.19,0,0,0-.19.64v4.81a1.19,1.19,0,0,0,.15.58l3-3.4Zm0,0" style="fill:#fff"/>
									</g>
									<g id="_Group_2" data-name="&lt;Group&gt;">
										<path id="_Compound_Path_2" data-name="&lt;Compound Path&gt;" d="M210.44,101.22a3.19,3.19,0,0,0-3.18,3.18,8.81,8.81,0,0,0,1.38,3.52c.66,1.18,1.3,2.16,1.33,2.2l.47.72.47-.72s.67-1,1.33-2.2a8.81,8.81,0,0,0,1.38-3.52,3.19,3.19,0,0,0-3.18-3.18Zm0,4.81a1.65,1.65,0,1,1,1.65-1.65,1.65,1.65,0,0,1-1.65,1.65Zm0,0" style="fill:#fff"/>
									</g>
									<path id="_Compound_Path_3" data-name="&lt;Compound Path&gt;" d="M214.91,48.94a.47.47,0,0,1-.14.41l-1.36,1.35a.76.76,0,0,1-.24.17,1,1,0,0,1-.29.09h-.19a4.69,4.69,0,0,1-.63-.07,4.75,4.75,0,0,1-1.06-.33,8.91,8.91,0,0,1-1.42-.78,10.59,10.59,0,0,1-1.69-1.43A11.17,11.17,0,0,1,206.71,47a9.59,9.59,0,0,1-.75-1.19,6.4,6.4,0,0,1-.43-1,5.26,5.26,0,0,1-.19-.76,2.53,2.53,0,0,1,0-.5q0-.18,0-.2a1,1,0,0,1,.09-.29.76.76,0,0,1,.17-.24l1.36-1.36a.45.45,0,0,1,.33-.14.38.38,0,0,1,.23.08.71.71,0,0,1,.17.19l1.09,2.07a.5.5,0,0,1,.05.36.63.63,0,0,1-.17.33l-.5.5a.17.17,0,0,0,0,.07.25.25,0,0,0,0,.08,1.84,1.84,0,0,0,.18.49,4.5,4.5,0,0,0,.38.6,6.61,6.61,0,0,0,.72.81,6.73,6.73,0,0,0,.82.73,4.72,4.72,0,0,0,.6.38,1.59,1.59,0,0,0,.37.15l.13,0,.07,0,.07,0,.58-.59a.62.62,0,0,1,.43-.16.53.53,0,0,1,.27.06h0l2,1.16a.51.51,0,0,1,.25.34Zm0,0" style="fill:#fff"/>
									<g id="_Group_3" data-name="&lt;Group&gt;">
										<path id="_Compound_Path_4" data-name="&lt;Compound Path&gt;" d="M210.1,60.85a4.81,4.81,0,1,0,4.81,4.81,4.83,4.83,0,0,0-4.81-4.81Zm3.32,2.89H212a7.5,7.5,0,0,0-.67-1.73,3.86,3.86,0,0,1,2.07,1.73Zm-3.32-1.92a6.44,6.44,0,0,1,.91,1.92h-1.83a7,7,0,0,1,.91-1.92Zm-3.7,4.81a3.31,3.31,0,0,1,0-1.93H208a6.56,6.56,0,0,0,0,1c0,.34,0,.62,0,1Zm.38,1h1.4a7.49,7.49,0,0,0,.67,1.73,3.86,3.86,0,0,1-2.07-1.73Zm1.4-3.85h-1.4A4,4,0,0,1,208.85,62a7.49,7.49,0,0,0-.67,1.73Zm1.92,5.77a6.44,6.44,0,0,1-.91-1.92H211a7,7,0,0,1-.91,1.92Zm1.11-2.88H209a4.87,4.87,0,0,1,0-1.93h2.26a6.73,6.73,0,0,1,.09,1,6.54,6.54,0,0,1-.14,1Zm.14,2.69a6.76,6.76,0,0,0,.67-1.73h1.4a3.86,3.86,0,0,1-2.07,1.73Zm.87-2.69a6.33,6.33,0,0,0,0-1c0-.34,0-.62,0-1h1.63a3.26,3.26,0,0,1,0,1.93Zm0,0" style="fill:#fff"/>
									</g>
									<path id="_Path_5" data-name="&lt;Path&gt;" d="M.5,156.41H53.66a99.07,99.07,0,0,0,5-31.77,105.3,105.3,0,0,0-2.78-21.78C44.64,89.74,33.73,76.59,29.4,62.06c-4-13.43-2-27.23,3.93-40.44-.18-2.78-.24-5.58-.14-8.39A66.3,66.3,0,0,1,34.87.5H.5" style="fill:#162259" class="color-primario"/>
									<g id="_Group_4" data-name="&lt;Group&gt;" class="color-secundario">
										<path d="M45.25,69.08C39.77,53.78,34.38,37.95,33.33,21.62c-5.91,13.22-7.93,27-3.93,40.44,4.32,14.53,15.24,27.67,26.49,40.79C53.28,91.35,49.2,80.13,45.25,69.08Z"/>
									</g>
									<g id="_Group_5" data-name="&lt;Group&gt;"  class="color-secundario">
										<path d="M89.07,156.41a92.72,92.72,0,0,0-12.31-27.27c-5.91-9-13.47-17.64-20.87-26.28a105.29,105.29,0,0,1,2.78,21.78,99.07,99.07,0,0,1-5,31.77Z" />
									</g>
									<g id="_Group_6" data-name="&lt;Group&gt;"  class="color-secundario">
										<path d="M34.87.5a66.3,66.3,0,0,0-1.68,12.73c-.09,2.81,0,5.61.14,8.39A103.94,103.94,0,0,1,46.27.5Z" />
									</g>
									
								</g>
							</g>
						</svg>`,
						// Contenedores que puede tener
						hooks: [{
								id: "A",
								caracteristicas: {
									"x": "50",
									"y": "10",
									"width": "80",
									"height": "30"
								},
								items: [{
										tipo: "text",
										tag: "text", //"text", "g", etc.
										valor: "Nombre",
										nombre: "nombre",
										icono: null,
										caracteristicas: {
											"fill": "#1d1d1b"
										}
									},
									{
										tipo: "text",
										tag: "text", //"text", "g", etc.
										valor: "Cargo",
										nombre: "cargo",
										icono: null
											/*{
										svg: "<svg></svg>",
										direccion: "right"
									}*/
											,
										caracteristicas: {
											"fill": "#1d1d1b"
										}
									}
								], //items
								limite: 5, //limite de items
								tamanoTexto: "10px",
								orientacion: "left",
							},
							{
								id: "B",
								caracteristicas: {
									"x": "105",
									"y": "40",
									"width": "120",
									"height": "70"
								},
								items: [{
										tipo: "text",
										tag: "text", //"text", "g", etc.
										valor: "+549336451810",
										nombre: "telefono",
										icono: {
											orientacion: "right",
											svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
											clases: ["color-secundario"]
										},
										caracteristicas: {
											"fill": "#1d1d1b"
										}
									},
									{
										tipo: "text",
										tag: "text", //"text", "g", etc.
										valor: "www.logo.pro",
										nombre: "web",
										icono: {
											orientacion: "right",
											svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
											clases: ["color-primario"]
										},
										caracteristicas: {
											"fill": "#1d1d1b"
										}
									},
									{
										tipo: "text",
										tag: "text", //"text", "g", etc.
										valor: "xarias13@gmail.com",
										nombre: "email",
										icono: {
											orientacion: "right",
											svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
											clases: ["color-primario"]
										},
										caracteristicas: {
											"fill": "#1d1d1b"
										}
									},
									{
										tipo: "textarea",
										tag: "text", //"text", "g", etc.
										valor: ["Av alguna,", "San Nicolas de los arroyos,", "Buenos Aires"],
										nombre: "direccion",
										icono: {
											orientacion: "right",
											svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
											clases: ["color-primario"]
										},
										caracteristicas: {
											"fill": "#1d1d1b"
										}
									}

								], //items
								limite: 5, //limite de items
								orientacion: "right",
								tamanoTexto: "7px"
							}
						],
						logos: [{
							clases: ["total-blanco"],
							caracteristicas: {
								x: "11.36",
								y: "109.46",
								width: "28.35",
								height: "28.35"
							}
						}]
					},
				],
				itemsDefaults: {
					nombre: {
						valor: "Nombre Def",
						icono: null,
						caracteristicas: {
							"fill": "#1d1d1b"
						}
					},
					web: {
						valor: "www.algo.com",
						icono: {
							orientacion: "right",
							svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
							clases: ["color-primario"]
						},
						caracteristicas: {
							"fill": "#1d1d1b"
						}
					},
					email: {
						valor: "algo@gmail.com",
						icono: {
							orientacion: "right",
							svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
							clases: ["color-primario"]
						},
						caracteristicas: {
							"fill": "#1d1d1b"
						}
					},
					cargo: {
						valor: "cargo",
						icono: {
							orientacion: "right",
							svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
							clases: ["color-primario"]
						},
						caracteristicas: {
							"fill": "#1d1d1b"
						}
					},
					direccion: {
						valor: ["av algo", "calle algo", "aaalgo"],
						icono: {
							orientacion: "right",
							svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
							clases: ["color-primario"]
						},
						caracteristicas: {
							"fill": "#1d1d1b"
						}
					},
					telefono: {
						valor: "32454356",
						icono: {
							orientacion: "right",
							svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
							clases: ["color-primario"]
						},
						caracteristicas: {
							"fill": "#1d1d1b"
						}
					}
				}
			}
		}

	}]);