var cliente = require('../modelos/clientesModelo.js');
var facturacion = require('../modelos/facturacionesModelo.js');
var services = require('../services');
var Email     = require("../services/emailServices.js");
var fs = require('fs');
var crypto = require('crypto');
var pago = require('../modelos/pagosModelo.js');
var logos = require('../modelos/logosModelo.js');
var atributo = require('../modelos/atributosModelo.js');
var elemento = require("../modelos/elementosModelo.js");
var config = require('../configuracion/configuracion.js');
var async = require('async');
var pdf = require('html-pdf');
var base64 = require("base-64");
var FB = require('fb').Facebook;
const https = require("https");
var passwordHash = require('password-hash');
const os = require('os');



exports.login = function (req, res, next) {
    //creamos un objeto con los datos a insertar del usuario

    var clienteData = [req.body.correo];

    cliente.verificarCliente(clienteData, function (error, data) {
        //si el usuario existe  
        if (typeof data !== 'undefined' && data.length > 0) {

            //console.log(data[0])

            if(passwordHash.verify(req.body.pass, data[0].pass)){

                res.status(200).json({
                    'nombre': data[0].nombreCliente,
                    'foto': data[0].foto,
                    'token': services.authServices.crearToken(data[0].idCliente, "cliente"),
                    //'idCliente':data[0].idCliente
                })
                //res.status(200).json(data)
            } else {
                res.status(404).json({msg: "La combinacion de datos es incorrecta"});
            }

        }
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
                                   /* if (err) console.error(err.message);*/

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

    var hashedPassword = passwordHash.generate(req.body.pass);

    var clienteData = {
        nombreCliente: req.body.nombreCliente,
        correo: req.body.correo,
        pass: hashedPassword,
        telefono: req.body.telefono,
        pais: req.body.pais,
        foto:               "iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAACXBIWXMAAAtIAAALSAE/nOCzAAAFLklEQVRo3tWaPWxbVRTHfzZxaiWD35IoAqlxhlZVG7VGKMULidXJSxIPHVoLEUMyksbiQwwIbCdsLI7asWkdkFwGBiddTECqnclpBNgRRRGVil2VCAoSNlKqfAkz+Ob12bHj9+WQHulJ1vN7597/O/97zj3nXEu5XMYs8UeSPsAFeMStoTqP5YAikAKyQCoe8hbNGN9iFIw/kgwAPmDUgJocEAUSRoDpAuOPJCUgKC4H5kkJiAFhPaA0gxGWiJoMoh6oaDzkDbcEjLBGosE6aJXkgEA85M2qediqEogHyB8xEIALwI+CDcbBCEX3WkyrZnLbH0lGDdFMALnN8ZH5eMgb0GyZYwgEYMwfSYY1WcYfSbpEUHNwPOXteMgbawpGeK0s0MvxlRLgioe8eeXNtjoPhtUCScU+Nn2WLu8EUk9fs8ccIrh6GoIR9JpSO/Cf+Z9MB7O7tan20SF/JBlQ0q3WAUR5sSRc15uJwDj0goHpVQZUpWUCZo4yODTId/e+Zbe8XXUNDg22zDqWcrm878H+1qpFuWb2drbIfP05eztbOBwOvs+u0us86EcK+QKvuQYolUq0tdtxX/6Qtna7/L/U04fN3ql1Kq/GQ97svmV8ej5Jl7Nfvv54lGVvZwuAa8HJukAAep29fBr+RP4Aj35YqtKjA4jMKkNglBZ6mLkLwPkL5+XJNpJrwUmZbhvrK/y2njFKNZ8SjMeIpvuJWfn3rdhNVe/cit3E4ahsMFYTs1pcciNH4HzpF4vbCXykV8uD1B021lcAmJx6l7HAW6rekyQJu93O0jdL/Lu3yz9/PeFk/xtGAKWtgFPv28Xff+Xn1FeVT9N7sim9Wkw3l1VUU3RJNvmcUnOxOSRJ0qyjlm6bxad6pyNZAUnPmw8zi7JrHhkdZsijL34ovdvu1jNWFetPj2U0y2bxKQ9Sdyo7PoeDOZWLXg3dKp5xUZceXWA21jPsbj0DYNQ3cii9psMz2CwnsFlONHEIxlMnXWBOuUfkbfoX81+STi0bmsRCYpHFhbtyID7lHjk6MAADvueZwnhgnGJRXyGyWCwyHpgAwGbvqNKrUfJWkR5rdx09fZz1XKnstwqPmQ7P6JrBeGCCUqkkW7xT6jYERndt97R7hA4x+PXZG5rplk4ty/SSevo457lqhK15q9pqYT2x2Tu5qKDFe8H3NdJrvC5t9Ya9/TWT1quhsmCHAVjLramm23R4hkLhMQBnPVfU5P2HFjiUKUDCiKZznqsy3WYin5HL5prS6/rsDbPoJc/fFDC1dHtHeKcjolc1GFF/ShvR1uXsx+m61JRuJtNrn2KJ2jgTM6PmZbN3yHQr5AsN6dUhdXNaZ3BsVFGSwYj6U8Eo3QYOoZvS2130TelNkausUheMkKBR7a+ccfPymdcBWE4vs5K5L/+3llsTwXGYLme/KVZRtgurwAjupY2OUPnqHYJa1eo6pG4zvBeCRdFme7OAMJ8pdNve3q4DtNMMMIHaJu4BMMKzmUK3WiqZSK9IPORNqdo1C2cwa3TEAd8Ube2VPMbaZjOLXguNutANU4B4yBsE5o2M2il103/pTQDclz8wg145DikjN22d+yPJGDBmZAYPM4u6E64aIJ7DDjuoOgcg+ogh/j85tDGrCYwA5BF7oKPsc5aoHD1R1TdSnTYL7+E0uo605G5U+paqG2B6DwJ5qPRFWtGcygHBeq63JWAUoFwiJvlMoN88ENMDwhQwday1f7lUgEsjDs9h0gE6i5knARsAPJCrm3Xyr1b+A7jcE0G6ztWWAAAAAElFTkSuQmCC"
    };

    cliente.insertCliente(clienteData, function (error, data) {
        //si el cliente se ha insertado correctamente mostramos su info
        if (data && data.insertId) {
            res.status(200).json({
                'nombre': req.body.nombreCliente,
                'foto': req.body.foto,
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

exports.cambiarContrasena = function (req, res, next) {



    var datos = [
        passwordHash.generate(req.body.pass),
        req.idCliente
    ]

    cliente.getCliente(req.idCliente, function (error, data) {
        //console.log(data)
        //si el usuario existe 
        if (typeof data !== "undefined" && data.length > 0) {

            if (passwordHash.verify(req.body.passVieja, data[0].pass)) {

                cliente.changePassword(datos, function (error, datau) {
                    //si el cliente se ha modificado correctamente
                    if (datau) {

                        res.status(200).json(datau);
                    } else {

                        res.status(500).json({
                            "msg": "Algo ocurrio"
                        });
                    }
                });

            } else {
                res.status(500).json({
                    "msg": "Las contraseñan no coinciden"
                });
            }

        } else {

            res.status(500).json({
                "msg": "No existe"
            });
        }
    });

}

exports.nuevoClienteRed = async function (req, res) 
{
    const token = req.body.token;
    const origen = req.body.origen;
    let e = "";
    let dataCliente = {};

    var iso = services.geoipServices.iso(req.headers["x-forwarder-for"]);

    switch (origen) {
        case "facebook":

            var fb = new FB({
                accessToken: token,
                appId: "152803392097078",
                appSecret: "ce44f8c52ea64637a1fb084066af58ac",
            });
        
            await new Promise(resolve => { 
                fb.api('me', { fields: 'id,email,cover,name,first_name,last_name,age_range,link,gender,locale,picture.type(large),timezone,updated_time,verified' }, function(response) {
                    
                    

                    if(response.error) {

                        e = "Token invalido o expiro";
                        resolve('error');
                        return
                    }

                    dataCliente.nombreCliente = response.name;
                    dataCliente.correo = response.email;
                    if (response.picture.data.url) {
                        dataCliente.foto = response.picture.data.url;
                    }
                    resolve('ok');

                })
            });

            break;
        case "google" :

            await new Promise(resolve => { 
                https.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+token, response => {
                    response.setEncoding("utf8");
                    response.on("data", r => {

                        r = JSON.parse(r);
                        
                        if(r.error_description) {
                            e = "Token invalido o expiro";
                            resolve('error');
                            return
                        }

                        dataCliente.nombreCliente = r.name;
                        dataCliente.correo = r.email;
                        if (r.picture) {
                            dataCliente.foto = r.picture;
                        }
                        resolve('ok');
                    })
                })
            });

            break;

        default:
            return res.status(500).json({msg: "El origen no es valido"});
    }

    if(Object.keys(dataCliente).length && !e.length) {

        dataCliente.pais = iso;
        dataCliente.origen = origen;

        var pass = crypto.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16).toUpperCase()

        dataCliente.pass = passwordHash.generate(pass);



        cliente.getClienteByEmail(dataCliente.correo, function (error, row) {
            if (typeof row !== 'undefined' && row.length > 0) {
    
                var c = row[0];
    
                res.status(200).json({
                    'nombre': c.nombreCliente,
                    'foto': c.foto,
                    'token': services.authServices.crearToken(c.idCliente, "cliente"),
                    'msg' : ""
                })
    
            } else {
                cliente.insertCliente(dataCliente, function (error, data) {
                    //si el cliente se ha insertado correctamente mostramos su info
                    if (data && data.insertId) {

                        const emailOptions = {
                            to: dataCliente.correo, // receptor o receptores
                            subject: 'Bienvenido a LogoPro (Registro por "'+origen+'")', // Asunto del correo
                        }

                        let email = new Email(emailOptions,{pass: pass});
                        email.setHtml("clienteRegistradoPorRedes.html")
                            .send((err,res) => {
                                //if(err) console.log(err);
                                //console.log(res);
                            });

                        res.status(200).json({
                            'nombre': dataCliente.nombreCliente,
                            'foto': dataCliente.foto,
                            'token': services.authServices.crearToken(data.insertId, "cliente"),
                            'msg': "se ha enviado un correo con una contraseña provisional"
                        })
                    } else {
                        res.status(500).json(data)
                    }
                });  
            }
        });

         
    } else {
        res.status(500).json({msg: e});            
    }

}


exports.manualCliente = function (req, res, next) {

    var par = [req.idCliente, req.params.id];

    logos.getLogo(par, function (error, data) {
        //si el pedido existe 

        if (typeof data !== "undefined" && data.length > 0) {
            var logo = data[0];
            //logo.logo = "";
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
                                        url: element.url.replace('/fuentes', 'fuentes')
                                    };
                                }

                                if (element.idElemento == logo.tieneNombre) {

                                    logo["tipografia_p"] = {
                                        nombre: element.nombre,
                                        url: element.url.replace('/fuentes', 'fuentes')
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

                            /* remplazamos los datos  */

                            var keys = Object.keys(datos);

                            for (var key in keys) {
                                if(keys[key] == 'tipografia_p' || keys[key] == 'tipografia_s'){
                                    while (template.indexOf("{#" + keys[key] +  "_url#}") != -1) {
                                        template = template.replace("{#" + keys[key] + "_url#}", datos[keys[key]].url);
                                    }

                                    while (template.indexOf("{#" + keys[key] + "_nombre#}") != -1) {
                                        template = template.replace("{#" + keys[key] + "_nombre#}", datos[keys[key]].nombre);
                                    }
                                }
                                while (template.indexOf("{#" + keys[key] + "#}") != -1) {
                                    
                                    template = template.replace("{#" + keys[key] + "#}", datos[keys[key]]);
                                }
                            }


                            url = __dirname.replace('controllers', '')

                            url = 'file:///' + url + "/";


                            //console.log(url)
                            //console.log(template)


                            var plataforma = os.platform();

                            var configuracion = {
                                "height": "11in",
                                "width": "8.5in",
                                "base": url,
                                "type": "pdf",
                                "renderDelay": 2000
                            }

                            if (plataforma != 'win32') {
                                template = template.replace('${zoom}', '0.75');
                            }

                            var nombreManual = './public/tmp/manual-marcas-' + req.params.id + '.pdf';

                            pdf.create(template, configuracion).toFile(nombreManual, function (err, data) {

                                if (err) throw err;

                                data = {
                                    nombreArchivo: 'Manual de marca ' + req.params.id + '.pdf',
                                    url: '/tmp/manual-marcas-' + req.params.id + '.pdf'
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
        if(rgb.startsWith('#')){
            return rgb;
        }
        rgb = rgb.slice(4, -1);
        args = rgb.split(', ');

        var integer = ((Math.round(args[0]) & 0xFF) << 16) +
            ((Math.round(args[1]) & 0xFF) << 8) +
            (Math.round(args[2]) & 0xFF);

        var string = integer.toString(16).toUpperCase();
        return '#' + '000000'.substring(string.length) + string;
    }

}