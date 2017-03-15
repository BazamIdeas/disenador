var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

//MODULO CLIENTES

router.get('/clientes', controllers.clientes.listaClientes);
router.get('/cliente/:id', controllers.clientes.datosCliente);
router.get('/cliente/borrar/:id', controllers.clientes.borrarCliente);
router.post("/cliente", controllers.clientes.nuevoCliente);
router.post("/cliente/modificar/", controllers.clientes.modificarCliente);
router.post('/loginClientes',controllers.clientes.login);

//MODULO USUARIOS
router.post('/loginUsuarios',controllers.usuarios.login);
//router.get('/private',controllers.tokenMiddleware.autentificarToken);
router.get('/usuarios',controllers.usuarios.listaUsuarios);
router.get('/usuario/:id', controllers.usuarios.datosUsuario);
router.get('/usuario/borrar/:id', controllers.usuarios.borrarUsuario);
router.post("/usuario", controllers.usuarios.nuevoUsuario);
router.post("/usuario/modificar/", controllers.usuarios.modificarUsuario);

//MODULO PEDIDOS
router.get('/pedidos', controllers.pedidos.listaPedidos);
router.get('/pedido/:id', controllers.pedidos.datosPedido);
router.get('/pedidosCliente/:id', controllers.pedidos.datosPedidosCliente);
router.get('/pedido/borrar/:id', controllers.pedidos.borrarPedido);
router.post("/pedido", controllers.pedidos.nuevoPedido);
router.post("/pedido/guardado/", controllers.pedidos.nuevoPedidoGuardado);
router.post("/pedido/modificar/", controllers.pedidos.modificarPedido);
router.post("/pedido/cambiar/", controllers.pedidos.cambiarEstado);


//MODULO CATEGORIAS

router.get('/categorias', controllers.categorias.listaCategorias);
router.post("/categoria", controllers.categorias.nuevaCategoria);
router.post("/categoria/modificar/", controllers.categorias.modificarCategoria);
router.get('/categoria/borrar/:id', controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA

router.get('/preferencias', controllers.preferencias.listaPreferencias);
router.post("/preferencia", controllers.preferencias.nuevaPreferencia);
router.post("/preferencia/modificar/", controllers.preferencias.modificarPreferencia);
router.get('/preferencia/borrar/:id', controllers.preferencias.borrarPreferencia);

//etiquetas

router.get('/etiquetas', controllers.etiquetas.listaEtiquetas);
router.post("/etiqueta", controllers.etiquetas.nuevaEtiqueta);
router.post("/etiqueta/modificar/", controllers.etiquetas.modificarEtiqueta);
router.get('/etiqueta/borrar/:id', controllers.etiquetas.borrarEtiqueta);

//Envio de emails
router.get('/email',controllers.emails.enviar_email);


//MODULO ELEMENTOS
router.get('/elementos/iconos', controllers.elementos.listaIconosPref);
//router.post("/preferencia", controllers.preferencias.nuevaPreferencia);
//router.post("/preferencia/modificar/", controllers.preferencias.modificarPreferencia);
//router.get('/preferencia/borrar/:id', controllers.preferencias.borrarPreferencia);

//MODULO LOGOS
router.get('/logos/guardados/:id', controllers.logos.listaLogosGuardados);



module.exports = router;
