const Pieza = require('../modelos/piezasModelo.js');
const Modelo = require('../modelos/modelosModelo.js');
const Tipo = require('../modelos/tiposModelo.js');
const async = require("async");
var pdf = require('html-pdf');
var os = require('os');
var base64 = require("base-64");
var fs = require('fs');

exports.ObtenerTodos = (req, res) =>
{
	Modelo.ObtenerTodos((err, data) => { 
		if (data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({'msg':'No hay modelos en la base de datos'});
		}
	});
}

exports.ObtenerTodoPorUsuario = (req, res) =>
{
	Tipo.ObtenerTodos((err, tipos) => { 
		if (tipos.length) {
            
            async.forEachOf(tipos, (tipo, keyTipo, callback) => {

                Modelo.ObtenerPorTipo(tipo._id, (err, modelos) => {
                    
                    if (modelos.length) {

                        async.forEachOf(modelos, (modelo, keyModelo, callback) => {

                            Pieza.ObtenerPorModeloyUsuario(modelo._id, req.idCliente, (err, piezas) => {
                                if (piezas.length) {

                                    delete modelos[keyModelo]._id;
                                    modelos[keyModelo].piezas = piezas;
                                    callback();

                                } else {
                                    callback();
                                }
                            })

                        }, (err) => {

                            delete tipos[keyTipo]._id;
                            tipos[keyTipo].modelos = modelos;
                            callback()

                        })

                    } else {
                        callback();
                    }
                })

            }, (err) => {

                res.status(200).json(tipos);

            })

		} else {
			res.status(404).json({'msg':'No hay modelos en la base de datos'});
		}
	})
}


exports.ObtenerPiezaPorUsuario = (req, res) =>
{
    const _id = req.params._id

    Pieza.ObtenerPorIDyUsuario(_id, req.idCliente, (err, piezas) => {
        if (piezas.length) {
            res.status(200).json(piezas[0]);
        } else {
            res.status(404).json({'msg':'No hay piezas en la base de datos'});
        }
    })
}

exports.Guardar = (req, res) => 
{
	const tipo = req.body.tipo;
	const modelo = req.body.modelo;
	const pieza = req.body.pieza;
	pieza.cliente = req.idCliente;

	Modelo.ObtenerPorNombreyTipo(modelo, tipo, (err, data) => {

		if (data.length) {
            
            pieza.modelo = data[0]._id
            pieza.tipo = data[0].tipo[0]._id

            Pieza.Guardar(pieza, (err, data) => {
                if (typeof data !== 'undefined' && data.insertId) {
					res.status(200).json({
                        insertId: data.insertId
                    });
				} else {
					res.status(500).json({
                        'msg': 'Hubo un error'
                    });
				}
            })

		} else {
			res.status(404).json({
				'msg': 'No hay modelos en la base de datos'
			});
		}
	})
}

exports.descargarPapeleria = function (req, res, next) {

    var papeleria = {
        tipo: 'tarjeta',
        modelo: 'C6',
        pieza: {
            caras: [{
                    nombre: "delantera",
                    svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 241.94 156.91\" class=\"cara\" data-index=\"0\"><style class=\"estilos-cara\">.total-blanco, .total-blanco * {\n\t\t\t\t\t\t\tstroke: white !important;\n\t\t\t\t\t\t\tfill: white !important;\n\t\t\t\t\t\t}</style>\n                                        <g id=\"Layer_2\" data-name=\"Layer 2\">\n                                            <g id=\"Layer_1-2\" data-name=\"Layer 1\">\n                                                <rect x=\"0.5\" y=\"0.5\" width=\"240.94\" height=\"155.91\" style=\"fill:#fff;stroke:#b6b7b7;stroke-miterlimit:10\"></rect>\n                                                <path id=\"_Path_\" data-name=\"<Path>\" d=\"M.5,156.41H53.66a99.07,99.07,0,0,0,5-31.77,105.3,105.3,0,0,0-2.78-21.78C44.64,89.74,33.73,76.59,29.4,62.06c-4-13.43-2-27.23,3.93-40.44-.18-2.78-.24-5.58-.14-8.39A66.3,66.3,0,0,1,34.87.5H.5\" style=\"fill: rgb(128, 255, 207);\" class=\"color-primario\"></path>\n                                                <g id=\"_Group_\" data-name=\"<Group>\" class=\"color-secundario\" style=\"fill: rgb(64, 127, 103);\">\n                                                    <path d=\"M45.25,69.08C39.77,53.78,34.38,37.95,33.33,21.62c-5.91,13.22-7.93,27-3.93,40.44,4.32,14.53,15.24,27.67,26.49,40.79C53.28,91.35,49.2,80.13,45.25,69.08Z\"></path>\n                                                </g>\n                                                <g id=\"_Group_2\" data-name=\"<Group>\" class=\"color-secundario\" style=\"fill: rgb(64, 127, 103);\">\n                                                    <path d=\"M89.07,156.41a92.72,92.72,0,0,0-12.31-27.27c-5.91-9-13.47-17.64-20.87-26.28a105.29,105.29,0,0,1,2.78,21.78,99.07,99.07,0,0,1-5,31.77Z\"></path>\n                                                </g>\n                                                <g id=\"_Group_3\" data-name=\"<Group>\" class=\"color-secundario\" style=\"fill: rgb(64, 127, 103);\">\n                                                    <path d=\"M34.87.5a66.3,66.3,0,0,0-1.68,12.73c-.09,2.81,0,5.61.14,8.39A103.94,103.94,0,0,1,46.27.5Z\"></path>\n                                                </g>\n                                                <!--<rect x=\"104.31\" y=\"44.17\" width=\"56.69\" height=\"56.69\" style=\"fill:transparent\" class=\"logo\"></rect>-->\n                                            </g>\n                                        </g>\n                                    <g class=\"contenedor-logo\"><svg viewBox=\"0 0 100 100\" x=\"95\" y=\"40\" width=\"70\" height=\"70\"><style> @font-face { font-family: 'CevicheOne'; src: url('/fuentes/CevicheOne-Regular.ttf')}  </style><g class=\"contenedor-icono\"><svg fill=\"#80FFCF\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"8.374999944830094\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\" xml:space=\"preserve\" height=\"50px\"><path fill=\"#F5D327\" d=\"M19.9,6.6C19.8,6.3,19.4,6,19,6h-6.2l-1.9-5.3C10.8,0.3,10.4,0,10,0C9.6,0,9.2,0.3,9.1,0.7L7.2,6H1  C0.6,6,0.2,6.3,0.1,6.6C-0.1,7,0,7.4,0.3,7.7l5.1,4.8l-1.9,6.2c-0.1,0.4,0,0.9,0.4,1.1c0.4,0.3,0.8,0.2,1.2,0l5-3.7l5,3.7  c0.2,0.1,0.7,0.4,1.2,0c0.4-0.2,0.5-0.7,0.4-1.1l-1.9-6.2l5.1-4.8C20,7.4,20.1,7,19.9,6.6z M12.8,11.5c-0.3,0.3-0.4,0.7-0.3,1  l1.2,3.8L10.6,14c-0.2-0.1-0.4-0.2-0.6-0.2c-0.2,0-0.4,0.1-0.6,0.2l-3.1,2.3l1.2-3.8c0.1-0.4,0-0.8-0.3-1L3.5,8h4.4  c0.4,0,0.8-0.3,0.9-0.7L10,4l1.2,3.3C11.3,7.7,11.7,8,12.1,8h4.4L12.8,11.5z\" data-indice=\"0\"></path></svg></g><text x=\"50\" text-anchor=\"middle\" font-family=\"CevicheOne\" class=\"textoPrincipal\" style=\"fill: rgb(64, 127, 103); font-size: 32px;\" y=\"83.95192310662995px\">Mi logo</text></svg></g></svg>"
                },
                {
                    "nombre": "frontal",
                    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 241.94 156.91\" class=\"cara\" data-index=\"1\" style=\"z-index: -1;\"><style class=\"estilos-cara\">.total-blanco, .total-blanco * {\n\t\t\t\t\t\t\tstroke: white !important;\n\t\t\t\t\t\t\tfill: white !important;\n\t\t\t\t\t\t}</style>\n                                    <g id=\"Layer_2\" data-name=\"Layer 2\">\n                                        <g id=\"Layer_1-2\" data-name=\"Layer 1\">\n                                            <rect x=\"0.5\" y=\"0.5\" width=\"240.94\" height=\"155.91\" style=\"fill:#5a5a5a;stroke:#b6b7b7;stroke-miterlimit:10\"></rect>\n                                            \n                                            <path id=\"_Path_5\" data-name=\"<Path>\" d=\"M.5,156.41H53.66a99.07,99.07,0,0,0,5-31.77,105.3,105.3,0,0,0-2.78-21.78C44.64,89.74,33.73,76.59,29.4,62.06c-4-13.43-2-27.23,3.93-40.44-.18-2.78-.24-5.58-.14-8.39A66.3,66.3,0,0,1,34.87.5H.5\" style=\"fill: rgb(128, 255, 207);\" class=\"color-primario\"></path>\n                                            <g id=\"_Group_4\" data-name=\"<Group>\" class=\"color-secundario\" style=\"fill: rgb(64, 127, 103);\">\n                                                <path d=\"M45.25,69.08C39.77,53.78,34.38,37.95,33.33,21.62c-5.91,13.22-7.93,27-3.93,40.44,4.32,14.53,15.24,27.67,26.49,40.79C53.28,91.35,49.2,80.13,45.25,69.08Z\"></path>\n                                            </g>\n                                            <g id=\"_Group_5\" data-name=\"<Group>\" class=\"color-secundario\" style=\"fill: rgb(64, 127, 103);\">\n                                                <path d=\"M89.07,156.41a92.72,92.72,0,0,0-12.31-27.27c-5.91-9-13.47-17.64-20.87-26.28a105.29,105.29,0,0,1,2.78,21.78,99.07,99.07,0,0,1-5,31.77Z\"></path>\n                                            </g>\n                                            <g id=\"_Group_6\" data-name=\"<Group>\" class=\"color-secundario\" style=\"fill: rgb(64, 127, 103);\">\n                                                <path d=\"M34.87.5a66.3,66.3,0,0,0-1.68,12.73c-.09,2.81,0,5.61.14,8.39A103.94,103.94,0,0,1,46.27.5Z\"></path>\n                                            </g>\n                                            \n                                        </g>\n                                    </g>\n                                <g class=\"contenedor-logo total-blanco\"><svg viewBox=\"0 0 100 100\" x=\"11.36\" y=\"109.46\" width=\"28.35\" height=\"28.35\"><style> @font-face { font-family: 'CevicheOne'; src: url('/fuentes/CevicheOne-Regular.ttf')}  </style><g class=\"contenedor-icono\"><svg fill=\"#80FFCF\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"8.374999944830094\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\" xml:space=\"preserve\" height=\"50px\"><path fill=\"#F5D327\" d=\"M19.9,6.6C19.8,6.3,19.4,6,19,6h-6.2l-1.9-5.3C10.8,0.3,10.4,0,10,0C9.6,0,9.2,0.3,9.1,0.7L7.2,6H1  C0.6,6,0.2,6.3,0.1,6.6C-0.1,7,0,7.4,0.3,7.7l5.1,4.8l-1.9,6.2c-0.1,0.4,0,0.9,0.4,1.1c0.4,0.3,0.8,0.2,1.2,0l5-3.7l5,3.7  c0.2,0.1,0.7,0.4,1.2,0c0.4-0.2,0.5-0.7,0.4-1.1l-1.9-6.2l5.1-4.8C20,7.4,20.1,7,19.9,6.6z M12.8,11.5c-0.3,0.3-0.4,0.7-0.3,1  l1.2,3.8L10.6,14c-0.2-0.1-0.4-0.2-0.6-0.2c-0.2,0-0.4,0.1-0.6,0.2l-3.1,2.3l1.2-3.8c0.1-0.4,0-0.8-0.3-1L3.5,8h4.4  c0.4,0,0.8-0.3,0.9-0.7L10,4l1.2,3.3C11.3,7.7,11.7,8,12.1,8h4.4L12.8,11.5z\" data-indice=\"0\"></path></svg></g><text x=\"50\" text-anchor=\"middle\" font-family=\"CevicheOne\" class=\"textoPrincipal\" style=\"fill: rgb(64, 127, 103); font-size: 32px;\" y=\"83.95192310662995px\">Mi logo</text></svg></g><foreignObject id=\"B\" x=\"105\" y=\"40\" width=\"120\" height=\"70\" style=\"font-family: Chevy; fill: rgb(0, 128, 192);\"><svg style=\"width:100%; height: 100%;\"><g style=\"font-size: 7px;\"><text text-anchor=\"end\" x=\"100.69999999999999\" y=\"9.25\">+549336451810</text><foreignObject height=\"14\" width=\"14\" x=\"106\" y=\"0\"><svg viewBox=\"0 0 100 100\" class=\"color-secundario\" height=\"100%\" width=\"100%\" style=\"fill: rgb(64, 127, 103);\"><circle cx=\"50\" cy=\"50\" r=\"45\"></circle></svg></foreignObject></g><g style=\"font-size: 7px;\"><text text-anchor=\"end\" x=\"100.69999999999999\" y=\"23.25\">www.logo.pro</text><foreignObject height=\"14\" width=\"14\" x=\"106\" y=\"14\"><svg viewBox=\"0 0 100 100\" class=\"color-primario\" height=\"100%\" width=\"100%\" style=\"fill: rgb(128, 255, 207);\"><circle cx=\"50\" cy=\"50\" r=\"45\"></circle></svg></foreignObject></g><g style=\"font-size: 7px;\"><text text-anchor=\"end\" x=\"100.69999999999999\" y=\"37.25\">xarias13@gmail.com</text><foreignObject height=\"14\" width=\"14\" x=\"106\" y=\"28\"><svg viewBox=\"0 0 100 100\" class=\"color-primario\" height=\"100%\" width=\"100%\" style=\"fill: rgb(128, 255, 207);\"><circle cx=\"50\" cy=\"50\" r=\"45\"></circle></svg></foreignObject></g><g style=\"font-size: 4.66667px;\"><text text-anchor=\"end\" y=\"49\"><tspan x=\"100.69999999999999\" dy=\"0\">Av alguna,</tspan><tspan x=\"100.69999999999999\" dy=\"7\">San Nicolas de los arroyos,</tspan><tspan x=\"100.69999999999999\" dy=\"7\">Buenos Aires</tspan></text><foreignObject height=\"14\" width=\"14\" x=\"106\" y=\"47\"><svg viewBox=\"0 0 100 100\" class=\"color-primario\" height=\"100%\" width=\"100%\" style=\"fill: rgb(128, 255, 207);\"><circle cx=\"50\" cy=\"50\" r=\"45\"></circle></svg></foreignObject></g></svg></foreignObject><foreignObject id=\"A\" x=\"50\" y=\"10\" width=\"80\" height=\"30\" style=\"font-family: BalooPaaji; fill: rgb(0, 128, 192);\"><svg style=\"width:100%; height: 100%;\"><g style=\"font-size: 10px;\"><text text-anchor=\"start\" x=\"0%\" y=\"18\">Nombre</text></g></svg></foreignObject></svg>"
                }
            ]
        }
    };

    /* Buscamos la plantilla a utilizar */

    var ubicacionPlantilla = './plantillas-papeleria/' + papeleria.tipo + '/' + papeleria.modelo + '/';

    var template = fs.readFileSync(ubicacionPlantilla + 'index.html', 'utf8', (err, data) => {
        if (err) throw err;
    });

    /* Colocamos los datos en la plantilla de papeleria */

    for (let i = 0; i < papeleria.pieza.caras.length; i++) {
        var datos = papeleria.pieza.caras[i];
        var keys = Object.keys(papeleria.pieza.caras[i]);
        for (var key in keys) {
            while (template.indexOf("${" + keys[key] + "}") != -1) {
                template = template.replace("${" + keys[key] + "}", datos[keys[key]]);
            }
        }
    }


    /* ********************************* */

    url = __dirname.replace('controllers', '')

    url = 'file:///' + url + ubicacionPlantilla + '/assets/style.css';

    var plataforma = os.platform();

    var tamanosPapeleria = {
        tarjeta: {
            C6: {
                windows: {
                    "height": "220mm",
                    "width": "280mm",
                    "base": url,
                    "type": "pdf",
                    "renderDelay": 3000
                }
            }
        },
    };

    if (plataforma != 'win32') {
        template = template.replace('${zoom}', '0.75');
    } else {
        var configuracion = tamanosPapeleria[papeleria.tipo][papeleria.modelo].windows;
    }

    var nombre = './public/tmp/papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '.pdf';

    pdf.create(template, configuracion).toFile(nombre, function (err, data) {

        if (err) throw err;

        data = {
            nombreArchivo: 'papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '.pdf',
            url: '/tmp/papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '.pdf'
        };

        res.status(200).json(data)
    });
}