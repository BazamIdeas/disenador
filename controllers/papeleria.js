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

     const _id = req.params._id;

     var piezaUsuario;

     Pieza.ObtenerPorIDyUsuario(_id, req.idCliente, (err, piezas) => {
         if (piezas.length) {
             piezaUsuario = piezas;
         } else {
             res.status(404).json({
                 'msg': 'No hay piezas en la base de datos'
             });
         }
     })

     return console.log(piezaUsuario)

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
            if (keys[key] == 'svg') {
                while (template.indexOf("${" + keys[key] + '-' + datos[keys[0]] + "}") != -1) {
                    template = template.replace("${" + keys[key] + '-' + datos[keys[0]] + "}", datos[keys[key]]);
                }
            }

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