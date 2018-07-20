var atributo = require("../modelos/atributosModelo.js");
var base64 = require("base-64");
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