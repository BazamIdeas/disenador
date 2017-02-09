var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

//MODULO CLIENTES

router.get('/clientes', controllers.clientes.listaClientes);
router.get('/cliente/:id', controllers.clientes.datosCliente);
router.get('/cliente/borrar/:id', controllers.clientes.borrarCliente);
router.post("/cliente", controllers.clientes.nuevoCliente);
router.post("/cliente/modificar/", controllers.clientes.modificarCliente);

//MODULO USUARIOS

router.get('/usuarios',controllers.usuarios.listaUsuarios);


//MODULO PEDIDOS
router.get('/pedidos', controllers.pedidos.listaPedidos);

router.get('/pedido/:id', controllers.pedidos.datosPedido);
router.get('/pedido/borrar/:id', controllers.pedidos.borrarPedido);
router.post("/pedido", controllers.pedidos.nuevoPedido);
router.post("/pedido/modificar/", controllers.pedidos.modificarPedido);





module.exports = router;
