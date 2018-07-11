var logo = require("../modelos/logosModelo.js");
var atributo = require("../modelos/atributosModelo.js");
var async = require("async");
var base64 = require("base-64");

exports.ViewCategorias = function (req, res) {

	var nombreCategoria = req.body.categoriaSeleccionada.nombreCategoria != 'Sin categoria' ? req.body.categoriaSeleccionada.nombreCategoria : 'destacados';
	var idLogo = req.body.idLogo ? req.body.idLogo : 0;
	var idCategoria = req.body.categoriaSeleccionada.idCategoria ? req.body.categoriaSeleccionada.idCategoria : 0;

	let dataEnviar = { root: __dirname, title: nombreCategoria, categorias: req.body.categorias, categoriaSeleccionada: req.body.categoriaSeleccionada };

	logo.getLogosAprobados(idLogo, idCategoria, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			async.forEachOf(data, (logo, key, callback) => {

				logo.svg = base64.decode(logo.logo);

				logo.svg = logo.svg.replace(/"/g, "'");
				
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

			}, (err) => {

				if (err) res.status(402).json(err);

				dataEnviar.logosPredisenados = data;
				
				res.render('categorias.html', dataEnviar);
			});
		}else {

			console.log("No hay logos aprobados");

			res.redirect(301, '/logos-destacados');

		}
	});

};