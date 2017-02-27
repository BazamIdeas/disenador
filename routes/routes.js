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
router.get('/login',controllers.usuarios.login)
router.get('/usuarios',controllers.usuarios.listaUsuarios);
router.get('/usuario/:id', controllers.usuarios.datosUsuario);
router.get('/usuario/borrar/:id', controllers.usuarios.borrarUsuario);
router.post("/usuario", controllers.usuarios.nuevoUsuario);
router.post("/usuario/modificar/", controllers.usuarios.modificarUsuario);

//MODULO PEDIDOS
router.get('/pedidos', controllers.pedidos.listaPedidos);
router.get('/pedido/:id', controllers.pedidos.datosPedido);
router.get('/pedido/borrar/:id', controllers.pedidos.borrarPedido);
router.post("/pedido", controllers.pedidos.nuevoPedido);
router.post("/pedido/modificar/", controllers.pedidos.modificarPedido);

//MODULO CATEGORIAS

router.get('/categorias', controllers.categorias.listaCategorias);
router.post("/categorias", controllers.categorias.nuevaCategoria);
router.post("/categoria/modificar/", controllers.categorias.modificarCategoria);
router.get('/categoria/borrar/:id', controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA

router.get('/preferencias', controllers.preferencias.listaPreferencias);
router.post("/preferencias", controllers.preferencias.nuevaPreferencia);
router.post("/preferencia/modificar/", controllers.preferencias.modificarPreferencia);
router.get('/preferencia/borrar/:id', controllers.preferencias.borrarPreferencia);


module.exports = router;
