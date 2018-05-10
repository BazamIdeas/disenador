const Pieza = require('../modelos/piezasModelo.js');
const Modelo = require('../modelos/modelosModelo.js');
const Tipo = require('../modelos/tiposModelo.js');
const async = require("async");
var pdf = require('html-pdf');
var os = require('os');
var base64 = require("base-64");
var fs = require('fs');

exports.ObtenerTodos = (req, res) => {
    Modelo.ObtenerTodos((err, data) => {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({
                'msg': 'No hay modelos en la base de datos'
            });
        }
    });
}

exports.ObtenerTodoPorUsuario = (req, res) => {
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
            res.status(404).json({
                'msg': 'No hay modelos en la base de datos'
            });
        }
    })
}


exports.ObtenerPiezaPorUsuario = (req, res) => {
    const _id = req.params._id

    Pieza.ObtenerPorIDyUsuario(_id, req.idCliente, (err, piezas) => {
        if (piezas.length) {
            res.status(200).json(piezas[0]);
        } else {
            res.status(404).json({
                'msg': 'No hay piezas en la base de datos'
            });
        }
    })
}

exports.EliminarPieza = (req, res) => {
    const _id = req.params._id

    Pieza.Eliminar(_id, req.idCliente, (err, data) => {
        if (data !== null && data.affectedRow) {
            res.status(200).json(data);
        } else {
            res.status(500).json({
                'msg': 'Algo ocurrio',
            });
        }
    })
}

exports.Guardar = (req, res) => {
    const tipo = req.body.tipo;
    const modelo = req.body.modelo;
    const pieza = req.body.pieza;
    pieza.cliente = req.idCliente;

    Modelo.ObtenerPorNombreyTipo(modelo, tipo, (err, data) => {

        if (data.length) {

            pieza.modelo = data[0]._id
            pieza.tipo = data[0].tipo[0]._id

            Pieza.Guardar(pieza, (err, data) => {
                if (typeof data !== 'undefined' && data.insertId || typeof data !== 'undefined' && data.affectedRow) {
                    res.status(200).json(data);
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

    const _id = req.body._id;

    var piezaUsuario;

    Pieza.ObtenerPorIDyUsuario(_id, req.idCliente, (err, piezas) => {
        if (piezas.length) {

            piezaUsuario = piezas;

            var papeleria = {
                pieza: {
                    caras: piezaUsuario[0].caras
                },
                tipo: piezaUsuario[0].tipo[0].tipo,
                modelo: piezaUsuario[0].modelo[0].nombre
            }

            papeleria.modelo = papeleria.modelo.replace(' ', '_');

            /* Buscamos la plantilla a utilizar */

            var ubicacionPlantilla = './plantillas-papeleria/' + papeleria.tipo + '/';

            var template = fs.readFileSync(ubicacionPlantilla + 'index.html', 'utf8', (err, data) => {
                if (err) throw err;
            });

            /* Colocamos los datos en la plantilla de papeleria */

            var caras =  papeleria.pieza.caras;

            for (let i = 0; i < caras.length; i++) {
                /* Si queremos saber el nombre de la cara */
                //console.log(papeleria.pieza.caras[i].nombre)

                /* Colocamos las fuentes */

                if(caras[i].hooks.length > 0){
                    for (let e = 0; e < caras[i].hooks.length; e++) {
                        var fuente = caras[i].hooks[e].fuente;
                        var keyfonts = Object.keys(fuente);
                        for (var key in keyfonts) {
                            if(keyfonts[key] === 'url'){
                                while (template.indexOf("${" + keyfonts[key] +'-'+ key + "-link}") != -1) {

                                    var tipo = fuente[keyfonts[key]].substr(-3);
                                    switch (tipo) {
                                        case 'ttf':
                                            fuente[keyfonts[key]] = fuente[keyfonts[key]].replace('/fuentes/', '');
                                            fuente[keyfonts[key]] = "url('"+fuente[keyfonts[key]] + "') format('truetype')";
                                            break;
                                    
                                        default:
                                            break;
                                    }

                                    template = template.replace("${" + keyfonts[key] +'-'+ key + "-link}", fuente[keyfonts[key]]);
                                }

                                while (template.indexOf("${" + keyfonts[key] +'-'+ key + "}") != -1) {
                                    template = template.replace("${"+ keyfonts[key] +'-'+ key +"}", fuente['nombre']);
                                }
                            }
                        }
                    }
                }

                /* Colocamos los svg */

                caras[i].tipo = papeleria.tipo;
                var datos = caras[i];

                var keys = Object.keys(datos);
                for (var key in keys) {
                    if (keys[key] == 'svg') {
                        while (template.indexOf("${" + keys[key] + '-' + datos[keys[1]] + "}") != -1) {
                            template = template.replace("${" + keys[key] + '-' + datos[keys[1]] + "}", datos[keys[key]]);
                        }
                    }

                    while (template.indexOf("${" + keys[key] + "}") != -1) {
                        template = template.replace("${" + keys[key] + "}", datos[keys[key]]);
                    }
                }
            }

           console.log(template)

            /* ********************************* */

            url = __dirname.replace('controllers', '')

            url = 'file:///' + url + ubicacionPlantilla + '../../fuentes/';

            var plataforma = os.platform();

            var tamanosPapeleria = {
                "tarjeta": {
                    windows: {
                        "height": "55mm",
                        "width": "85mm",
                        "base": url,
                        "type": "pdf",
                        "renderDelay": 3000,
                        "border": "0"
                    }
                }
            };

            if (plataforma != 'win32') {
                template = template.replace('${zoom}', '0.75');
            } else {
                var configuracion = tamanosPapeleria[papeleria.tipo].windows;
            }

            papeleria.modelo = papeleria.modelo.replace(/[^a-zA-Z0-9-_]/g, '');
            
            var nombre = './public/tmp/papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '.pdf';

            pdf.create(template, configuracion).toFile(nombre, function (err, data) {

                if (err) throw err;

                data = {
                    nombreArchivo: 'papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '.pdf',
                    url: '/tmp/papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '.pdf'
                };

                res.status(200).json(data)
            });
        } else {
            res.status(404).json({
                'msg': 'No hay piezas en la base de datos'
            });
        }
    })
}