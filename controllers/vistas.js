var categoria=require("../modelos/categoriasModelo.js");

exports.ViewCategorias = function(req, res)
{

    let data = { root: __dirname, title: req.params.categoria };
    
    var tipo = ["Iniciales", 'ICONO'];

	categoria.getCategorias(tipo,function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0)
		{
			let categorias = [];

			for (let i = 0; i <= 5; i++) {
				categorias.push(data[i])
			}

            data.categorias = categorias;
            res.render('categorias', data);
		}
	});

};