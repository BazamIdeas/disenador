var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

//rutas de peticion clientes.

router.get('/clientes', controllers.clientes.listaClientes);
router.get('/cliente/:id', controllers.clientes.datosCliente);
router.get('/cliente/borrar/:id', controllers.clientes.borrarCliente);
router.post("/cliente", controllers.clientes.nuevoCliente);
<<<<<<< HEAD

//rutas de peticion de usuarios.

router.get('/usuarios',controllers.usuarios.listaUsuarios);


=======
router.post("/cliente/modificar/", controllers.clientes.modificarCliente);
>>>>>>> origin/backend
module.exports = router;
