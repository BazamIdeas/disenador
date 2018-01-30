var cliente = require('../modelos/clientesModelo.js');
var facturacion = require('../modelos/facturacionesModelo.js');
var services = require('../services');
var fs = require('fs');
var crypto = require('crypto');
var pago = require('../modelos/pagosModelo.js');
var logos = require('../modelos/logosModelo.js');
var atributo = require('../modelos/atributosModelo.js');
var config = require('../configuracion.js');
var async = require('async');


exports.login = function (req, res, next) {
    //creamos un objeto con los datos a insertar del usuario

    var clienteData = [req.body.correo, req.body.pass];
    cliente.verificarCliente(clienteData, function (error, data) {
        //si el usuario existe  
        if (typeof data !== 'undefined' && data.length > 0) {

            res.status(200).json({
                'nombre': data[0].nombreCliente,
                'token': services.authServices.crearToken(data[0].idCliente, "cliente"),
                //'idCliente':data[0].idCliente
            })
            //res.status(200).json(data)

        }
        //no existe
        else {
            res.status(404).json(data);
        }
    });
}


exports.listaClientes = function (req, res) {
    cliente.getClientes(function (error, data) {
        //si el usuario existe 
        if (typeof data !== 'undefined' && data.length > 0) {
            res.status(200).json(data);
        }
        //no existe
        else {
            res.status(404).json({
                "msg": "No hay clientes registrados"
            })
        }
    });

}

exports.listaClientesFreelancer = function (req, res) {
    cliente.getClientes(function (error, clientes) {

        if (typeof clientes !== 'undefined' && clientes.length > 0) {

            async.forEachOf(clientes, (cliente, key, callback) => {

                var pagado = 0;
                var vendido = 0;

                var logosVendidos = 0;
                var logosPorAprobar = 0;
                var logosAprobados = 0;


                var par = ["", cliente.idCliente];

                async.series({

                    pagado: function (callback) {
                        pago.ObtenerPorCliente(cliente.idCliente, function (error, data) {

                            if (typeof data !== 'undefined' && data.length) {

                                for (var key in data) {

                                    pagado = pagado + data[key].monto;

                                }

                            }

                            callback(null, pagado);

                        });
                    },

                    vendido: function (callback) {

                        par[0] = "Vendido";

                        logos.getLogosTipo(par, function (error, data) {

                            if (typeof data !== 'undefined' && data.length) {

                                async.forEachOf(data, function (val, key, callback) {

                                    atributo.ObtenerPorLogo(data[key].idLogo, function (err, data) {

                                        if (typeof data !== 'undefined' && data.length > 0) {

                                            logosVendidos = data.length;

                                            var cal = {};

                                            for (var key in data) {

                                                if (data[key].clave == "calificacion-admin") {

                                                    cal.moderador = data[key].valor;
                                                    vendido = vendido + config.freelancer["moderador"][data[key].valor];
                                                }

                                                if (data[key].clave == "calificacion-cliente") {
                                                    cal.cliente = data[key].valor;
                                                }

                                            }

                                            if (cal.cliente) {
                                                vendido = vendido + config.freelancer["cliente"][cal.cliente];
                                            } else if (cal.moderador) {
                                                vendido = vendido + config.freelancer["cliente"][cal.moderador];
                                            }

                                            callback();

                                        }
                                    });
                                }, function (err) {
                                    if (err) console.error(err.message);

                                    callback(null, [vendido, logosVendidos]);


                                })
                            } else {

                                callback(null, [vendido, logosVendidos])
                            }
                        });
                    },

                    publicado: function (callback) {

                        par[0] = "Por Aprobar";

                        logos.getLogosTipo(par, function (error, data) {

                            if (typeof data !== 'undefined' && data.length) {

                                logosPorAprobar = data.length;
                                callback(null, logosPorAprobar);

                            } else {

                                callback(null, logosPorAprobar)
                            }
                        });
                    },


                    aprobado: function (callback) {

                        par[0] = "Aprobado";

                        logos.getLogosTipo(par, function (error, data) {

                            if (typeof data !== 'undefined' && data.length) {

                                logosAprobados = data.length;
                                callback(null, logosAprobados);

                            } else {
                                callback(null, logosAprobados)
                            }
                        });
                    },

                    metodos: function (callback) {
                        facturacion.ObtenerPorCliente(cliente.idCliente, function (err, data) {
                            if (typeof data !== 'undefined' && data.length) {
                                callback(null, data);
                            } else {
                                callback(null, data);
                            }
                        })
                    }

                }, function (err, results) {

                    if (err) res.status(500).json({
                        msg: "Algo ocurrio"
                    });

                    var data = {
                        pagado: results.pagado,
                        vendido: results.vendido[0],
                        deuda: results.vendido[0] - results.pagado
                    }

                    clientes[key].deuda = data;
                    clientes[key].logosAprobados = results.aprobado;
                    clientes[key].logosPorAprobar = results.publicado;
                    clientes[key].logosVendidos = results.vendido[0];

                    if (results.metodos.length) {
                        clientes[key].facturacion = results.metodos;
                    }

                    callback()
                });



            }, (err) => {

                if (err) res.status(500).json({
                    msg: "Algo ocurrio"
                });

                res.status(200).json(clientes);

            });

        } else {

            res.status(404).json({
                "msg": "No hay clientes registrados"
            })

        }
    });

}

exports.datosCliente = function (req, res, next) {
    //id del cliente

    var id = req.params.id;
    cliente.getCliente(id, function (error, data) {
        //si el usuario existe 
        if (typeof data !== 'undefined' && data.length > 0) {

            var cliente = data[0];

            if (req.params.facturacion) {
                facturacion.ObtenerPorCliente(req.params.id, function (err, data) {
                    if (typeof data !== 'undefined' && data.length) {
                        cliente.facturacion = data;
                        res.status(200).json([cliente])
                    } else {
                        res.status(200).json([cliente])
                    }
                })
            } else {
                res.status(200).json([cliente])
            }
        }
        //no existe
        else {
            res.status(404).json({
                "msg": "No Encontrado"
            })
        }
    });

}

exports.Datos = function (req, res, next) {
    //id del cliente

    var id = req.idCliente;
    cliente.getCliente(id, function (error, data) {
        //si el usuario existe 
        if (typeof data !== 'undefined' && data.length > 0) {

            var cliente = data[0];

            if (req.query.facturacion) {
                facturacion.ObtenerPorCliente(id, function (err, data) {
                    if (typeof data !== 'undefined' && data.length) {
                        cliente.facturacion = data;
                    }
                    res.status(200).json(cliente)
                })
            } else {
                res.status(200).json(cliente)
            }
        }
        //no existe
        else {
            res.status(404).json({
                "msg": "No Encontrado"
            })
        }
    });

}


exports.Bloquear = function (req, res, next) {
    var id = req.params.id;

    cliente.Bloquear(id, function (error, data) {
        if (typeof data !== "undefined" && data.affectedRows) {
            res.status(200).json(data);
        } else {
            res.status(500).json({
                "msg": "Algo ocurrio"
            })
        }
    })
}


exports.nuevoCliente = function (req, res, next) {

    var clienteData = {
        nombreCliente: req.body.nombreCliente,
        correo: req.body.correo,
        pass: req.body.pass,
        telefono: req.body.telefono,
        pais: req.body.pais
    };

    cliente.insertCliente(clienteData, function (error, data) {
        //si el cliente se ha insertado correctamente mostramos su info
        if (data && data.insertId) {
            res.status(200).json({
                'nombre': req.body.nombreCliente,
                'token': services.authServices.crearToken(data.insertId, "cliente")
            })
        } else {
            res.status(500).json(data)
        }
    });
}

exports.modificarCliente = function (req, res) {

    req.body.idCliente = req.idCliente;

    cliente.getCliente(req.body.idCliente, function (error, data) {
        //si el usuario existe 
        if (typeof data !== 'undefined' && data.length > 0) {
            //creamos un array con los datos a modificar del cliente
            //var clienteData = [req.body.nombreCliente, req.body.pass, req.body.telefono, req.body.pais, idCliente];

            cliente.updateCliente(req.body, req.body.passActual, function (error, data) {
                //si el cliente se ha modificado correctamente
                if (typeof data !== 'undefined' && data.affectedRows) {
                    res.status(200).json(data);
                } else {
                    res.status(500).json({
                        "msg": "Algo ocurrio"
                    })
                }
            });
        } else {
            res.status(500).json({
                "msg": "No existe"
            })
        }
    });
}

exports.borrarCliente = function (req, res, next) {
    //id del cliente
    var id = req.params.id;
    cliente.deleteCliente(id, function (error, data) {
        res.status(200).json(data);
    });

}

exports.Avatar = function (req, res, next) {

    var id = req.idCliente;

    var nombre = crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len).toUpperCase();
    var tmp_path = req.files.avatar.path;
    var target_path = './avatares/' + nombre;

    if (req.files.avatar.type.indexOf('image') == -1) {

        res.status(500).json({
            'msg': 'No subio una imagen'
        })

    } else {

        cliente.getCliente(id, function (error, data) {

            fs.rename(tmp_path, target_path, function (err) {
                if (err) throw err;

                var cliente = data[0];

                if (fs.existsSync(cliente.avatar)) {

                    fs.unlink(cliente.avatar, function (err) {
                        if (err) throw err;

                        fs.unlink(tmp_path, function (err) {
                            if (err) throw err;

                            data = [target_path, id];
                            cliente.Avatar(data, function (error, data) {
                                if (err) throw err;
                                if (typeof data !== "undefined" && data.affectedRows) {
                                    res.status(200).json(data);
                                } else {
                                    res.status(500).json({
                                        "msg": "Algo ocurrio"
                                    })
                                }
                            })
                        });
                    })
                }
            });
        });
    }
}