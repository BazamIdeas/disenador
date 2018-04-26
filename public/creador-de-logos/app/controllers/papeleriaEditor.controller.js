angular.module("disenador-de-logos")
	.controller("papeleriaEditorController", ["papeleriaResolve", "logoResolve", "$base64", function (papeleriaResolve, logoResolve, $base64) {

		var bz = this;

		bz.base64 = $base64;

		//bz.papeleria = papeleriaResolve;
		bz.logo = logoResolve;

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
					tipo: "text",
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
				caras: [{
					nombre: 'frontal',
					svg: "<svg></svg>",
					// Contenedores que puede tener
					hooks: [{
						id: "Header",
						caracteristicas: {
							"x": "666",
							"y": "666",
							"width": "666",
							"height": "666"
						},
						items: [{
							tipo: "text",
							tag: "text", //"text", "g", etc.
							nombre: "nombre",
							icono: {
								svg: "<svg></svg>",
								direccion: "right"
							},
							caracteristicas: {
								"x": "666",
								"y": "666",
								"width": "666",
								"height": "666",
								"font-style": "satan-Regular",
								"fill": "red",
							}
						}, {
							tipo: "email",
							tag: "email", //"text", "g", etc.
							nombre: "email",
							icono: {
								svg: "<svg></svg>",
								direccion: "right"
							},
							caracteristicas: {
								"x": "666",
								"y": "666",
								"width": "666",
								"height": "666",
								"font-style": "satan-Regular",
								"fill": "red",
							}
						}], //items
						limite: 5 //limite de items
					}],
					logos: [{
						clases: ["blanco", "opaco"],
						caracteristicas: {
							"x": "666",
							"y": "666",
							"width": "666",
							"height": "666"
						}
					}]
				}, {
					nombre: 'trasera',
					svg: "<svg></svg>",
					// Contenedores que puede tener
					hooks: [{
						id: "A",
						caracteristicas: {
							"x": "666",
							"y": "666",
							"width": "666",
							"height": "666"
						},
						items: [{
							tipo: "email",
							tag: "text", //"text", "g", etc.
							valor: "nombre",
							icono: {
								svg: "<svg></svg>",
								direccion: "right"
							},
							caracteristicas: {
								"x": "666",
								"y": "666",
								"width": "666",
								"height": "666",
								"font-style": "satan-Regular",
								"fill": "red",
							}
						}], //items
						limite: 5 //limite de items
					}, ],
					logos: [{
						clases: ["blanco", "opaco"],
						caracteristicas: {
							"x": "666",
							"y": "666",
							"width": "666",
							"height": "666"
						}
					}]
				}]
			}
		}
	}]);