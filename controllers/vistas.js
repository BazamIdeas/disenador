exports.ViewCategorias = function (req, res) {

	let data = { root: __dirname, title: req.body.categoriaSeleccionada ? req.body.categoriaSeleccionada.nombreCategoria : 'destacados', categorias: req.body.categorias, categoriaSeleccionada: req.body.categoriaSeleccionada };

	res.render('categorias.html', data);

};