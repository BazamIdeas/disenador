var fs = require("fs");
var path = require("path");

var archivos = fs.readdirSync(__dirname);

archivos.forEach(function(archivo) {

	var nombreArchivo = path.basename(archivo, ".js");

	if (nombreArchivo !== "index") {
		exports[nombreArchivo] = require("./"+ nombreArchivo);
	}

});