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
            data.categorias = data;
            res.render('index', data);
		}
	});

};