angular.module("disenador-de-logos")
	.controller("papeleriaEditorController", ["papeleriaResolve", "logoResolve", "$base64", "$scope", "elementosService", "fontService", function (papeleriaResolve, logoResolve, $base64, $scope, elementosService, fontService) {

		var bz = this;

		bz.base64 = $base64;

		//bz.papeleria = papeleriaResolve;
		bz.logo = logoResolve;

<<<<<<< HEAD
		elementosService.listarFuentes().then(function(res){
			fontService.agregarGeneral(bz.fuentes);
			bz.fuentes = res;			
=======
		elementosService.listarFuentes().then(function (res) {
			bz.fuentes = res;
>>>>>>> 0eca2508cad55be30bbf7dc62d4aa8f3ed242a6d
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
							<g id="Layer_2" data-name="Layer 2">
								<g id="Layer_1-2" data-name="Layer 1">
									<rect x="0.5" y="0.5" width="240.94" height="155.91" style="fill:#5a5a5a;stroke:#b6b7b7;stroke-miterlimit:10"/>
									
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
											//"fill": "white"
										}
									}
								], //items
								limite: 1, //limite de items
								tamanoTexto: "10px",
								orientacion: "left",
								fuente: {
									nombre: "BalooPaaji",
									url: "/fuentes/BalooPaaji-Regular.ttf",
									fill: "#0080c0"
								}
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
											//"fill": "white"
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
											//"fill": "white"
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
											//"fill": "white"
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
											//"fill": "white"
										}
									}

								], //items
								limite: 4, //limite de items
								orientacion: "right",
								tamanoTexto: "7px",
								fuente: {
									url: "/fuentes/Chewy-Regular.ttf",
									nombre: "Chevy",
									fill: "white"
								}
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
							//"fill": "#1d1d1b"
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
							//"fill": "#1d1d1b"
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
							//"fill": "#1d1d1b"
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
							//"fill": "#1d1d1b"
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
							//"fill": "#1d1d1b"
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
							//"fill": "#1d1d1b"
						}
					}
				}
			}
		}


	}]);