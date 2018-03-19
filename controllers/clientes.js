var cliente = require('../modelos/clientesModelo.js');
var facturacion = require('../modelos/facturacionesModelo.js');
var services = require('../services');
var fs = require('fs');
var crypto = require('crypto');
var pago = require('../modelos/pagosModelo.js');
var logos = require('../modelos/logosModelo.js');
var atributo = require('../modelos/atributosModelo.js');
var elemento = require("../modelos/elementosModelo.js");
var config = require('../configuracion.js');
var async = require('async');
var pdf = require('html-pdf');
var base64 = require("base-64");


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

                var calificacionesAdmin = 0;
                var calificacionesCliente = 0;


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

                                var total = 0;

                                async.forEachOf(data, function (val, key, callback) {

                                    atributo.ObtenerPorLogo(data[key].idLogo, function (err, data) {

                                        if (typeof data !== 'undefined' && data.length > 0) {

                                            var cal = {};

                                            for (var key in data) {

                                                if (data[key].clave == "calificacion-admin") {

                                                    cal.moderador = data[key].valor;
                                                    calificacionesAdmin = calificacionesAdmin + parseInt(data[key].valor);
                                                    vendido = vendido + config.freelancer["moderador"][data[key].valor];
                                                }

                                                if (data[key].clave == "calificacion-cliente") {
                                                    cal.cliente = data[key].valor;
                                                }

                                            }

                                            if (cal.cliente) {
                                                vendido = vendido + config.freelancer["cliente"][cal.cliente];
                                                calificacionesCliente = calificacionesCliente + parseInt(cal.cliente);
                                            } else if (cal.moderador) {
                                                vendido = vendido + config.freelancer["cliente"][cal.moderador];
                                                calificacionesCliente = calificacionesCliente + parseInt(cal.moderador);
                                            }

                                            if (cal.moderador) {
                                                total = total + 1;
                                            }

                                            callback();

                                        }
                                    });
                                }, function (err) {
                                    if (err) console.error(err.message);

                                    callback(null, [vendido, total, calificacionesAdmin, calificacionesCliente]);


                                })
                            } else {

                                callback(null, [vendido, total, calificacionesAdmin, calificacionesCliente])
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
                    clientes[key].logosVendidos = results.vendido[1];

                    if (results.metodos.length) {
                        clientes[key].facturacion = results.metodos;
                    }

                    clientes[key].promedioCalAdmin = 0;
                    clientes[key].promedioCalCliente = 0;


                    if (results.vendido[1] > 0) {
                        clientes[key].promedioCalAdmin = Math.round(results.vendido[2] / results.vendido[1]);
                        clientes[key].promedioCalCliente = Math.round(results.vendido[3] / results.vendido[1]);
                    }

                    clientes[key].promedioCal = Math.round((clientes[key].promedioCalAdmin + clientes[key].promedioCalCliente) / 2);

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

            if (req.query.facturacion) {
                facturacion.ObtenerPorCliente(req.params.id, function (err, data) {
                    if (typeof data !== 'undefined' && data.length) {
                        cliente.facturacion = data;
                        res.status(200).json(cliente)
                    } else {
                        res.status(200).json(cliente)
                    }
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

exports.datosClientePorEmail = function (req, res, next) {
    //id del cliente

    var id = req.body.email;
    cliente.getClienteByEmail(id, function (error, data) {
        //si el usuario existe 
        if (typeof data !== 'undefined' && data.length > 0) {

            var cliente = data[0];

            res.status(200).json(cliente)

        } else {
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
        pais: req.body.pais,
        foto: "PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6IzcxRTJFRjsiIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzM4QzZEOTsiIGQ9Ik01MDkuOTMxLDI4OC42OTZMMzQ1LjA2OSwxMjMuODMzbC03OC4xNSw3Ny4wMDJsNy41MjEsMzEwLjQ5OA0KCUMzOTYuMzM2LDUwMi42NTYsNDk0LjYzOSw0MDguNjQ3LDUwOS45MzEsMjg4LjY5NnoiLz4NCjxyZWN0IHg9IjIxMy4zMzMiIHk9IjI5Mi4yMTkiIHN0eWxlPSJmaWxsOiNGQ0QwODg7IiB3aWR0aD0iODUuMzMzIiBoZWlnaHQ9Ijg1LjMzMyIvPg0KPHJlY3QgeD0iMjU1LjQzMSIgeT0iMjkyLjIxOSIgc3R5bGU9ImZpbGw6I0RCQUY3MTsiIHdpZHRoPSI0My4yMzYiIGhlaWdodD0iODUuMzMzIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRjlGNUU4OyIgZD0iTTE5OS4xMTEsMzUxLjAxbC00NS40OTYsOS4wOTljLTIzLjE2NCw0LjYzNC0zOS44MzgsMjQuOTcyLTM5LjgzOCw0OC41OTV2NjAuMTc1DQoJQzE1NC40NTcsNDk2LjEwOSwyMDMuMzcxLDUxMiwyNTYsNTEyczEwMS41NDMtMTUuODkxLDE0Mi4yMjItNDMuMTIydi02MC4xNzVjMC0yMy42MjMtMTYuNjc0LTQzLjk2MS0zOS44MzgtNDguNTkzbC00NS40OTYtOS4wOTkNCglsLTguMDQtMTEuNzM2Yy0xLjUwNS0yLjE5Ni00LjM1My0zLjAyNC02LjgwMS0xLjk3N2wtNDIuMzM0LDE4LjExNWwtNDEuNTA4LTE4LjA5OGMtMi40MzEtMS4wNi01LjI3LTAuMjY0LTYuNzk2LDEuOTA1DQoJTDE5OS4xMTEsMzUxLjAxeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0UyREVENTsiIGQ9Ik0zNTguMzg0LDM2MC4xMDhsLTQ1LjQ5Ni05LjA5OWwtOC4wNC0xMS43MzZjLTEuNTA1LTIuMTk2LTQuMzUzLTMuMDI0LTYuODAxLTEuOTc3bC00Mi4zMzQsMTguMTE1DQoJbC0wLjI4OC0wLjEyNnYxNTYuNzAzYzAuMTkxLDAsMC4zODEsMC4wMSwwLjU3NCwwLjAxYzUyLjYyOSwwLDEwMS41NDMtMTUuODkxLDE0Mi4yMjItNDMuMTIydi02MC4xNzMNCglDMzk4LjIyMiwzODUuMDgxLDM4MS41NDksMzY0Ljc0MiwzNTguMzg0LDM2MC4xMDh6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZFREI1OyIgZD0iTTM0OS45NTMsMTkyLjY2OWMwLDU0Ljk4Mi00Mi4wNjMsMTI4LTkzLjk1MywxMjhzLTkzLjk1My03My4wMTYtOTMuOTUzLTEyOA0KCVMyMDQuMTEsOTMuMTEzLDI1Niw5My4xMTNTMzQ5Ljk1MywxMzcuNjg3LDM0OS45NTMsMTkyLjY2OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFMkNBODg7IiBkPSJNMjU2LDkzLjExM2MtMC4xOTMsMC0wLjM4MSwwLjAxNC0wLjU3NCwwLjAxNnYyMjcuNTI4YzAuMTkxLDAuMDAyLDAuMzgzLDAuMDEyLDAuNTc0LDAuMDEyDQoJYzUxLjg5LDAsOTMuOTUzLTczLjAxOCw5My45NTMtMTI4UzMwNy44OSw5My4xMTMsMjU2LDkzLjExM3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM2MzQyMDA7IiBkPSJNMjY2LjM0Myw4NS4zNTZjLTEwNi41OTQtMS43MjQtMTQyLjc5Niw5My45NTMtMTEzLjc3OCwxNDkuOThjMCwwLDIuMDkxLTEuODE1LDUuMzc5LTQuOTg2DQoJYzQuMzQ0LDExLjMzNSwxMC45NzMsMjIuMjE0LDIwLjkxMSwyNS42NWMwLDAtOS4xODgtMjEuMzk1LTUuMjg0LTQyLjM0NGMxNC42OTMtMTcuNDExLDMwLjgxOC00Mi4zNzIsMjUuNTQtNjMuNjUzDQoJYzAsMCw0My41MDYsNTEuNjEsMTQwLjk1OSw1Ni43NzJjNy44NDUsMjIuODU0LTMuNDc3LDQ5LjIyNi0zLjQ3Nyw0OS4yMjZjMTcuMzY1LTYuMDAzLDI0LjY1LTM0LjcxNCwyNy4yMzEtNDguOTA3DQoJYzEuOTY3LTAuMDUsMy45NDktMC4xMTQsNS45NTQtMC4yMDJDMzY5Ljc3OCwyMDYuODkxLDM3Mi45MzgsODcuMDgsMjY2LjM0Myw4NS4zNTZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNEMzMTAyOyIgZD0iTTI2Ni4zNDMsODUuMzU2Yy0zLjcyOS0wLjA2LTcuMzYxLDAuMDEtMTAuOTE3LDAuMTgzdjEwMi4yMDMNCgljMjEuNTc2LDkuMzA3LDQ5LjYwNCwxNy4xNzUsODQuNjQ0LDE5LjAzMmM3Ljg0NSwyMi44NTQtMy40NzcsNDkuMjI2LTMuNDc3LDQ5LjIyNmMxNy4zNjUtNi4wMDMsMjQuNjUtMzQuNzE0LDI3LjIzMS00OC45MDcNCgljMS45NjctMC4wNSwzLjk0OS0wLjExNCw1Ljk1NC0wLjIwMkMzNjkuNzc4LDIwNi44OTEsMzcyLjkzOCw4Ny4wOCwyNjYuMzQzLDg1LjM1NnoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiM0NDJGMTU7IiBkPSJNMTk5LjA5NCwzNTEuMDEzbC00NS40NzcsOS4wOTVjLTIzLjE2Niw0LjYzNC0zOS44MzksMjQuOTcyLTM5LjgzOSw0OC41OTV2NjAuMTc1DQoJCWMzMi4wMjIsMjEuNDM3LDY5LjE1OCwzNS44MDIsMTA5LjE4LDQwLjk2M0wxOTkuMDk0LDM1MS4wMTN6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzQ0MkYxNTsiIGQ9Ik0zNTguMzg0LDM2MC4xMDhsLTQ1LjQ3Ny05LjA5NWwtMjMuODY0LDE1OC44MjljNDAuMDIyLTUuMTYxLDc3LjE1OS0xOS41MjgsMTA5LjE4LTQwLjk2M3YtNjAuMTc1DQoJCUMzOTguMjIyLDM4NS4wODEsMzgxLjU0OSwzNjQuNzQyLDM1OC4zODQsMzYwLjEwOHoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiM5NDAwMzA7IiBkPSJNMjUxLjY1NywzNjUuOTAxbC0yOS43MzYtMTEuODkzYy0zLjkwOC0xLjU2NC04LjE1OSwxLjMxNS04LjE1OSw1LjUyM3YzMi4zODUNCgkJYzAsNC4yMSw0LjI1MSw3LjA4Nyw4LjE1OSw1LjUyM2wyOS43MzYtMTEuODkzYzIuMjU4LTAuOTAzLDMuNzM5LTMuMDkxLDMuNzM5LTUuNTIzdi04LjU5Nw0KCQlDMjU1LjM5OCwzNjguOTkyLDI1My45MTgsMzY2LjgwNCwyNTEuNjU3LDM2NS45MDF6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6Izk0MDAzMDsiIGQ9Ik0yNjAuMzQyLDM2NS45MDFsMjkuNzM2LTExLjg5M2MzLjkwOC0xLjU2NCw4LjE1OSwxLjMxNSw4LjE1OSw1LjUyM3YzMi4zODUNCgkJYzAsNC4yMS00LjI1MSw3LjA4Ny04LjE1OSw1LjUyM2wtMjkuNzM2LTExLjg5M2MtMi4yNTgtMC45MDMtMy43MzktMy4wOTEtMy43MzktNS41MjN2LTguNTk3DQoJCUMyNTYuNjAyLDM2OC45OTIsMjU4LjA4MiwzNjYuODA0LDI2MC4zNDIsMzY1LjkwMXoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjBGMjc7IiBkPSJNMjUxLjA0NiwzODguMzk0aDkuOTA5YzQuMjYyLDAsNy43MTYtMy40NTUsNy43MTYtNy43MTZ2LTkuOTA5YzAtNC4yNjItMy40NTUtNy43MTYtNy43MTYtNy43MTYNCgkJaC05LjkwOWMtNC4yNjEsMC03LjcxNiwzLjQ1NS03LjcxNiw3LjcxNnY5LjkwOUMyNDMuMzI5LDM4NC45NCwyNDYuNzg0LDM4OC4zOTQsMjUxLjA0NiwzODguMzk0eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjBGMjc7IiBkPSJNMjUxLjA0NiwzNjMuMDUzYy00LjI2MSwwLTcuNzE2LDMuNDU1LTcuNzE2LDcuNzE2djkuOTA5YzAsNC4yNjIsMy40NTUsNy43MTYsNy43MTYsNy43MTZoNC4zOA0KCQl2LTI1LjM0MUgyNTEuMDQ2eiIvPg0KPC9nPg0KPHBhdGggc3R5bGU9ImZpbGw6I0UyMTAyRTsiIGQ9Ik0yNjAuOTU0LDM2My4wNTNoLTUuNTI5djI1LjM0MWg1LjUyOWM0LjI2MSwwLDcuNzE2LTMuNDU1LDcuNzE2LTcuNzE2di05LjkwOQ0KCUMyNjguNjcxLDM2Ni41MDgsMjY1LjIxNiwzNjMuMDUzLDI2MC45NTQsMzYzLjA1M3oiLz4NCjxnPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0MxQzFDMTsiIGN4PSIyNTYiIGN5PSI0MDQuNjg3IiByPSI1LjE3MiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0MxQzFDMTsiIGN4PSIyNTYiIGN5PSI0MzAuODM5IiByPSI1LjE3MiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0MxQzFDMTsiIGN4PSIyNTYiIGN5PSI0NTYuOTczIiByPSI1LjE3MiIvPg0KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0MxQzFDMTsiIGN4PSIyNTYiIGN5PSI0ODMuMTI1IiByPSI1LjE3MiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+"
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

    var nombre = crypto.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16).toUpperCase();
    var tmp_path = req.files.avatar.path;
    var target_path = '/avatares/' + nombre + '.' + req.files.avatar.type.split('/')[1];

    if (req.files.avatar.type.indexOf('image') == -1) {

        res.status(500).json({
            'msg': 'No subio una imagen'
        })

    } else {

        cliente.getCliente(id, function (error, data) {
            fs.rename(tmp_path, '.' + target_path, function (err) {

                if (err) throw err;

                var cli = data[0];
                if (fs.existsSync('.' + cli.foto)) {

                    fs.unlink('.' + cli.foto, function (err) {
                        if (err) throw err;

                    })
                }

                data = [target_path, id];
                cliente.Avatar(data, function (error, data) {
                    if (err) throw err;
                    if (typeof data !== "undefined" && data.affectedRows) {
                        res.status(200).json({
                            foto: target_path
                        });
                    } else {
                        res.status(500).json({
                            "msg": "Algo ocurrio"
                        })
                    }
                })
            });
        });
    }
}


exports.manualCliente = function (req, res, next) {

    var par = [req.idCliente, req.params.id];

    logos.getLogo(par, function (error, data) {
        //si el pedido existe 

        if (typeof data !== "undefined" && data.length > 0) {
            var logo = data[0];

            atributo.ObtenerPorLogo(req.params.id, function (error, data) {

                //console.log(data)
                if (typeof data !== "undefined" && data.length > 0) {
                    logo["atributos"] = data;

                    data.forEach(element => {
                        if (element.clave == 'eslogan') {
                            logo.tieneEslogan = element.valor;
                        }

                        if (element.clave == 'principal') {
                            logo.tieneNombre = element.valor;
                        }
                    });

                    elemento.ListarFuentes(function (error, data) {
                        if (typeof data !== "undefined" && data.length > 0) {

                            data.forEach(element => {
                                if (element.idElemento == logo.tieneEslogan) {
                                    logo["tipografia_s"] = {
                                        nombre: element.nombre,
                                        url: element.url
                                    };
                                }

                                if (element.idElemento == logo.tieneNombre) {
                                    
                                    logo["tipografia_p"] = {
                                        nombre: element.nombre,
                                        url: element.url
                                    };
                                }
                                
                            });

                            /*-- PDF --*/

                            var datos = {
                                logo: base64.decode(logo.logo),
                                tipografia_p: logo.tipografia_p,
                            }

                            for (var attr in logo.atributos) {
                                if (logo.atributos[attr].clave == 'color-icono') {
                                    datos.color_principal = logo.atributos[attr].valor
                                    datos.fuente_c_hexa_p = toHexa(logo.atributos[attr].valor)
                                    datos.fuente_c_rgb_p = logo.atributos[attr].valor
                                }

                                if (logo.atributos[attr].clave == 'color-nombre') {
                                    datos.fuente_c_hexa_n = toHexa(logo.atributos[attr].valor)
                                    datos.fuente_c_rgb_n = logo.atributos[attr].valor
                                }
                            }

                            var template;

                            /* SI EXISTE EL ESLOGAN */

                            if (logo.tieneEslogan) {

                                template = fs.readFileSync('./manual-marcas/index.html', 'utf8', (err, data) => {
                                    if (err) throw err;
                                });

                                for (attr in logo.atributos) {
                                    if (logo.atributos[attr].clave == 'color-eslogan') {
                                        datos.fuente_c_hexa_e = toHexa(logo.atributos[attr].valor),
                                            datos.fuente_c_rgb_e = logo.atributos[attr].valor
                                    }
                                }

                                datos.tipografia_s = logo.tipografia_s;

                            } else {
                                template = fs.readFileSync('./manual-marcas/index.1.html', 'utf8', (err, data) => {
                                    if (err) throw err;
                                });
                            }

                            /* ********************************* */

                            for (i = 0; i <= 6; i++) {
                                template = template.replace('{#fuente_c_hexa_p#}', datos.fuente_c_hexa_p);
                                template = template.replace('{#fuente_c_rgb_p#}', datos.fuente_c_rgb_p);
                                template = template.replace('{#fuente_c_hexa_n#}', datos.fuente_c_hexa_n);
                                template = template.replace('{#fuente_c_rgb_n#}', datos.fuente_c_rgb_n);
                                template = template.replace('{#tipografia_p_url#}', datos.tipografia_p.url);
                                template = template.replace('{#tipografia_p_nombre#}', datos.tipografia_p.nombre);
                                template = template.replace('{#color_principal#}', datos.color_principal);
                            }

                            if (logo.tieneEslogan) {
                                for (i = 0; i <= 6; i++) {
                                    template = template.replace('{#tipografia_s_nombre#}', datos.tipografia_s.nombre);
                                    template = template.replace('{#tipografia_s_url#}', datos.tipografia_s.url);
                                    template = template.replace('{#fuente_c_hexa_e#}', datos.fuente_c_hexa_e);
                                    template = template.replace('{#fuente_c_rgb_e#}', datos.fuente_c_rgb_e);
                                }
                            }

                            for (i = 0; i <= 11; i++) {
                                template = template.replace('{#logo#}', datos.logo);
                            }

                            url = __dirname.replace('controllers', '')

                            url = 'file:///' + url + "manual-marcas/assets";

                            if (config.servidor == "Produccion") {
                                var configuracion = {
                                    "height": "14.66in",
                                    "width": "11.305in",
                                    "base": url,
                                    "type": "pdf",
                                    "renderDelay": 3000
                                }
                            }

                            else {
                                var configuracion = {
                                    "height": "11in",
                                    "width": "8.5in",
                                    "base": url,
                                    "type": "pdf",
                                    "renderDelay": 2000
                                }
                            }

                            var nombreEmpresa = 'LL';

                            pdf.create(template, configuracion).toFile('./public/tmp/manual-marcas-' + nombreEmpresa + '.pdf', function (err, data) {

                                if (err) throw err;

                                data = {
                                    nombreArchivo: 'Manual de marca ' + nombreEmpresa + '.pdf',
                                    url: '/tmp/manual-marcas-' + nombreEmpresa + '.pdf'
                                };

                                res.status(200).json(data)
                            });

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

    /* UTILITARIOS */

    function toHexa(rgb) {
        rgb = rgb.slice(4, -1);
        args = rgb.split(', ');

        var integer = ((Math.round(args[0]) & 0xFF) << 16) +
            ((Math.round(args[1]) & 0xFF) << 8) +
            (Math.round(args[2]) & 0xFF);

        var string = integer.toString(16).toUpperCase();
        return '#' + '000000'.substring(string.length) + string;
    }

}