const traducciones = require("../langs").categories;

exports.formatearCategorias = (categorias, lang) => {

    /* Espera un array de categorias */

    categorias.forEach(categoria => {

        let nombre;

        if (traducciones[categoria.idCategoria]) {
            categoria.traducciones = traducciones[categoria.idCategoria];

            for(key in traducciones[categoria.idCategoria]){
                let t = traducciones[categoria.idCategoria][key].label;

                while (t.indexOf(' ') != -1) {
                    t = t.replace(' ', '-');
                }
    
                var specialChars = "!@#$^&%*()+=[]\/{}|:<>?,.";
    
                // Los eliminamos todos
                for (let i = 0; i < specialChars.length; i++) {
                    t = t.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
                }
    
                t = t.replace(/á/gi, "a");
                t = t.replace(/é/gi, "e");
                t = t.replace(/í/gi, "i");
                t = t.replace(/ó/gi, "o");
                t = t.replace(/ú/gi, "u");
                t = t.replace(/ñ/gi, "n");
    
                t = t.toLowerCase();

                traducciones[categoria.idCategoria][key].labelFormateado = t;
            }

            categoria.traduccion = traducciones[categoria.idCategoria][lang];
            nombre = categoria.traduccion.label;

            while (nombre.indexOf(' ') != -1) {
                nombre = nombre.replace(' ', '-');
            }

            var specialChars = "!@#$^&%*()+=[]\/{}|:<>?,.";

            // Los eliminamos todos
            for (let i = 0; i < specialChars.length; i++) {
                nombre = nombre.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
            }

            nombre = nombre.replace(/á/gi, "a");
            nombre = nombre.replace(/é/gi, "e");
            nombre = nombre.replace(/í/gi, "i");
            nombre = nombre.replace(/ó/gi, "o");
            nombre = nombre.replace(/ú/gi, "u");
            nombre = nombre.replace(/ñ/gi, "n");

            nombre = nombre.toLowerCase();

            categoria.categoriaFormateada = nombre;
        }

    });

    return categorias;

}