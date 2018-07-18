var atributo = require("../modelos/atributosModelo.js");
var async = require("async");
var base64 = require("base-64");
var fs = require('fs');
const svg2png = require("svg2png");
var async = require("async");

exports.formatearCategorias = (categorias) => {

    /* Espera un array de categorias */

    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i].nombreCategoria;

        while (categoria.indexOf(' ') != -1) {
            categoria = categoria.replace(' ', '-');
        }

        var specialChars = "!@#$^&%*()+=[]\/{}|:<>?,.";

        // Los eliminamos todos
        for (let i = 0; i < specialChars.length; i++) {
            categoria = categoria.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
        }

        categoria = categoria.replace(/á/gi, "a");
        categoria = categoria.replace(/é/gi, "e");
        categoria = categoria.replace(/í/gi, "i");
        categoria = categoria.replace(/ó/gi, "o");
        categoria = categoria.replace(/ú/gi, "u");
        categoria = categoria.replace(/ñ/gi, "n");

        categoria = categoria.toLowerCase();

        categorias[i].categoriaFormateada = categoria;

    }

    return categorias;

}

exports.bufferAndAttrs = (data) => {
    async.forEachOf(data, (logo, key, callback) => {

        logo.svg = base64.decode(logo.logo);
        logo.svg = logo.svg.replace(/"/g, "'");
        let nombre = logo.idLogo + ".svg";
        const path = "public/tmp/shared/";
        let ancho = 200;
        var buffer = new Buffer(base64.decode(logo.logo).replace("/fuentes/", req.protocol + "://" + req.headers.host + "/fuentes/"));

        if(logo.nombreCategoria){
            logo.categoriaFormateada = formatearCategorias([{nombreCategoria: logo.nombreCategoria}])[0].categoriaFormateada;
        }

        fs.open(path + nombre, "w", (err, fd) => {
            if (err) throw "error al crear svg " + err;

            fs.write(fd, buffer, 0, buffer.length, null, err => {
                if (err) throw "error al escribir " + err;

                let svg = path + nombre;

                var pngout = svg.replace("svg", "jpg");

                fs.readFile(svg, (err, svgbuffer) => {
                    if (err) throw err;
                    svg2png(svgbuffer, {
                        width: ancho
                    })
                        .then(buffer => {
                            fs.writeFile(pngout, buffer, (err) => {
                                setTimeout(() => {
                                    logo.imgSrc = nombre.replace("svg", "jpg");

                                    //console.log(logo)

                                    atributo.ObtenerPorLogo(logo.idLogo, function (err, dataAttrs) {

                                        if (err) return callback(err);

                                        try {

                                            if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {
                                                data[key]["atributos"] = dataAttrs;
                                            }

                                        } catch (e) {
                                            return callback(e);
                                        }

                                        callback();

                                    });
                                }, 1000)
                            });
                        })
                        .catch(e => console.log('error'));
                });

                fs.close(fd);
            });
        });

    }, (err) => {

        return data;

    });
}