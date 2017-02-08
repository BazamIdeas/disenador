var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');


router.get('/clientes', controllers.clientes.listaClientes);
router.get('/cliente/:id', controllers.clientes.datosCliente);
router.get('/cliente/borrar/:id', controllers.clientes.borrarCliente);
router.post("/cliente", controllers.clientes.nuevoCliente);
router.post("/cliente/modificar/", controllers.clientes.modificarCliente);
module.exports = router;
