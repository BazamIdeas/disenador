const Pieza = require('../modelos/piezasModelo.js');
const Modelo = require('../modelos/modelosModelo.js');
const Tipo = require('../modelos/tiposModelo.js');
const Logo = require('../modelos/logosModelo.js');
const atributo = require('../modelos/atributosModelo.js');
var elemento = require("../modelos/elementosModelo.js");
const async = require("async");
var pdf = require('html-pdf');
var os = require('os');
var base64 = require("base-64");
var fs = require('fs');
var archiver = require("archiver");
const fse = require('fs-extra')

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

exports.ObtenerTodoPorLogo = (req, res) => {

    Logo.getLogo([req.idCliente, req.params.idLogo], (error, data) => {
        if (typeof data !== "undefined" && data.length > 0) {

            Tipo.ObtenerTodos((err, tipos) => {
                if (tipos.length) {

                    async.forEachOf(tipos, (tipo, keyTipo, callback) => {

                        Modelo.ObtenerPorTipo(tipo._id, (err, modelos) => {

                            if (modelos.length) {

                                async.forEachOf(modelos, (modelo, keyModelo, callback) => {

                                    Pieza.ObtenerPorModeloyLogo(modelo._id, req.params.idLogo, (err, piezas) => {
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

        } else {

            res.status(500).json(err);

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

    Pieza.Borrar(_id, req.idCliente, (err, data) => {
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

    Logo.getLogo([req.idCliente, pieza.logo], (error, data) => {
        if (typeof data !== "undefined" && data.length > 0) {

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

        } else {

            res.status(404).json({
                msg: "El logo no existe"
            });

        }
    });

}

exports.descargarPapeleria = function (req, res, next) {

    var par = [req.idCliente, req.body.idLogo];

    var fuentesLogo = [];

    Logo.getLogo(par, function (error, data) {
        //si el pedido existe 

        if (typeof data !== "undefined" && data.length > 0) {
            var datosLogo = data[0];

            atributo.ObtenerPorLogo(req.body.idLogo, function (error, data) {
                //console.log(data)
                if (typeof data !== "undefined" && data.length > 0) {
                    datosLogo["atributos"] = data;
                    elemento.ListarFuentes(function (error, data) {
                        if (typeof data !== "undefined" && data.length > 0) {
                            data.forEach(fuente => {
                                datosLogo['atributos'].forEach(attrLogo => {
                                    if (fuente.idElemento == attrLogo.valor) {
                                        fuentesLogo.push({
                                            nombre: fuente.nombre,
                                            url: fuente.url
                                        });
                                    }
                                });
                            });

                            ObtenerPieza();
                        }
                    });
                }
            });
        }
        //no existe
        else {
            res.status(404).json({
                "msg": "No existe el logo o no le pertenece al cliente"
            });

        }
    });

    /* FUNCION PAPELERIA */

    const _id = req.body._id;
    var piezaUsuario;

    function ObtenerPieza() {
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

                var ubicacionPlantilla = './plantillas-papeleria/'+ papeleria.tipo + '.html';

                var template = fs.readFileSync(ubicacionPlantilla, 'utf8', (err, data) => {
                    if (err) throw err;
                });

                /* Colocamos los datos en la plantilla de papeleria */

                /* Colocamos las fuentes del logo */

                for (let e = 0; e < fuentesLogo.length; e++) {
                    var fuente = fuentesLogo[e];
                    var keyfonts = Object.keys(fuente);

                    for (var key in keyfonts) {
                        if (keyfonts[key] === 'url') {
                            while (template.indexOf("${" + keyfonts[key] + '-' + key + "-link-logo}") != -1) {

                                var tipo = fuente[keyfonts[key]].substr(-3);
                                fuente[keyfonts[key]] = fuente[keyfonts[key]].replace('/fuentes/', '');

                                switch (tipo) {
                                    case 'ttf':
                                        fuente[keyfonts[key]] = "url('" + fuente[keyfonts[key]] + "') format('truetype')";
                                        break;

                                    default:
                                        break;
                                }

                                template = template.replace("${" + keyfonts[key] + '-' + key + "-link-logo}", fuente[keyfonts[key]]);
                            }

                            while (template.indexOf("${" + keyfonts[key] + '-' + key + "-logo}") != -1) {
                                template = template.replace("${" + keyfonts[key] + '-' + key + "-logo}", fuente['nombre']);
                            }
                        }
                    }
                }

                var caras = papeleria.pieza.caras;

                for (let i = 0; i < caras.length; i++) {
                    /* Si queremos saber el nombre de la cara */
                    //console.log(papeleria.pieza.caras[i].nombre)

                    /* Colocamos las fuentes de la plantilla */

                    if (caras[i].hooks.length > 0) {
                        for (let e = 0; e < caras[i].hooks.length; e++) {
                            var fuente = caras[i].hooks[e].fuente;
                            var keyfonts = Object.keys(fuente);
                            for (var key in keyfonts) {
                                if (keyfonts[key] === 'url') {
                                    while (template.indexOf("${" + keyfonts[key] + '-' + key + "-link}") != -1) {

                                        var tipo = fuente[keyfonts[key]].substr(-3);
                                        fuente[keyfonts[key]] = fuente[keyfonts[key]].replace('/fuentes/', '');

                                        switch (tipo) {
                                            case 'ttf':
                                                fuente[keyfonts[key]] = "url('" + fuente[keyfonts[key]] + "') format('truetype')";
                                                break;

                                            default:
                                                break;
                                        }

                                        template = template.replace("${" + keyfonts[key] + '-' + key + "-link}", fuente[keyfonts[key]]);
                                    }

                                    while (template.indexOf("${" + keyfonts[key] + '-' + key + "}") != -1) {
                                        template = template.replace("${" + keyfonts[key] + '-' + key + "}", fuente['nombre']);
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
                            while (template.indexOf("${" + keys[key] + '-' + i + "}") != -1) {
                                template = template.replace("${" + keys[key] + '-' + i + "}", datos[keys[key]]);
                            }
                        }
                    }
                }

                while (template.indexOf("url('/fuentes/") != -1) {
                    template = template.replace("url('/fuentes/", "url('");
                }

                /* ********************************* */

                url = 'file:///' + __dirname.replace('controllers', '')  + 'fuentes/';

                var plataforma = os.platform();

                var tamanosPapeleria = {
                    "tarjeta": {
                            "height": "55mm",
                            "width": "85mm",
                            "base": url,
                            "type": "pdf",
                            "renderDelay": 3000,
                            "border": "0"
                    },
                    "hoja": {
                        "height": "297mm",
                        "width": "216mm",
                        "base": url,
                        "type": "pdf",
                        "renderDelay": 3000,
                        "border": "0"
                    }
                };
                var configuracion = tamanosPapeleria[papeleria.tipo];

                if (plataforma != 'win32') {
                    template = template.replace('${zoom}', '0.75');
                }

                papeleria.modelo = papeleria.modelo.replace(/[^a-zA-Z0-9-_]/g, '');

                var nombre = './public/tmp/' + papeleria.tipo + '-' + papeleria.modelo + '-' + req.body.idLogo + '.pdf';


                var nombres = {
                    papeleria: '',
                    informacion: ''
                };

                pdf.create(template, configuracion).toFile(nombre, function (err, data) {

                    if (err) throw err;

                    data = {
                        nombreArchivo:  papeleria.tipo + '-' + papeleria.modelo + '-' + req.body.idLogo + '.pdf',
                        url: '/tmp/' + papeleria.tipo + '-' + papeleria.modelo + '-' + req.body.idLogo + '.pdf'
                    };

                    //console.log('PDF1')
                    nombres.papeleria = data;

                    /**
                     * CREAR DOCUMENTACION Y ZIP
                     */

                    var ubicacionPlantilla = './plantillas-papeleria/informacion/informacion.html';

                    url = 'file:///' + __dirname.replace('controllers', '') + './plantillas-papeleria/informacion/';

                    var template = fs.readFileSync(ubicacionPlantilla, 'utf8', (err, data) => {
                        if (err) throw err;
                    });

                    /* REMPLAZAMO LAS VARIABLES */
                    var keys = Object.keys(piezaUsuario[0].tipo[0]);
                    for (var key in keys) {
                        while (template.indexOf("${" + keys[key] + "}") != -1) {
                           
                            template = template.replace("${" + keys[key] + "}", datos[keys[key]]);
                        }
                    }

                    if (plataforma != 'win32') {
                        template = template.replace('${zoom}', '0.75');
                    }

                    var nombre = './public/tmp/documentacion.pdf';

                    pdf.create(template, {
                        "base": url,
                        "type": "pdf",
                        "renderDelay": 3000,
                        "border": "0"
                    }).toFile(nombre, function (err, data) {

                        if (err) throw err;

                        data = {
                            nombreArchivo: 'documentacion.pdf',
                            url: '/tmp/documentacion.pdf'
                        };

                        //console.log('PDF2')

                        nombres.informacion = data;

                        /**
                         * COMPRIMIR DOCUMENTO Y DESCARGAR
                         */

                        var ubicacionArchivoNuevo = __dirname.replace('controllers', '') + '/public/tmp/papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '-' + req.body.idLogo + '.zip';

                        var output = fs.createWriteStream(ubicacionArchivoNuevo);

                        var archive = archiver("zip", {
                            zlib: {
                                level: 9
                            }
                        });

                        archive.pipe(output);


                        /**
                         * Agregamos los pdfs al ZIP
                         */

                        archive.file(__dirname.replace('controllers', '') + '/public/' + nombres.informacion.url, {
                            name: nombres.informacion.nombreArchivo
                        });

                        archive.file(__dirname.replace('controllers', '') + '/public/' + nombres.papeleria.url, {
                            name: nombres.papeleria.nombreArchivo
                        });

                        output.on('close', () => {
                            /**
                             * Removemos los pdfs de la carpeta temporal
                             */
                            fse.removeSync(__dirname.replace('controllers', '') + '/public/'+nombres.informacion.url);
                            fse.removeSync(__dirname.replace('controllers', '') + '/public/'+nombres.papeleria.url);

                            data = {
                                nombreArchivo: 'papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '-' + req.body.idLogo + '.zip',
                                url: '/tmp/papeleria-' + papeleria.tipo + '-' + papeleria.modelo + '-' + req.body.idLogo + '.zip'
                            };

                            res.status(202).json(data);
        
                            //res.download(ubicacionArchivoNuevo);
                        })

                        archive.finalize();
                    });

                });

            } else {
                res.status(404).json({
                    'msg': 'No hay piezas en la base de datos'
                });
            }
        })
    }
}