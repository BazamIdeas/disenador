var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

//MODULO CLIENTES

router.post('/clientes/',controllers.firebase.comprobarEstadoCliente, controllers.clientes.listaClientes);
router.get('/cliente/:id', controllers.clientes.datosCliente);
router.get('/cliente/borrar/:id', controllers.clientes.borrarCliente);
router.post("/cliente", controllers.clientes.nuevoCliente,controllers.firebase.crearCliente);
router.post("/cliente/modificar/", controllers.clientes.modificarCliente);
router.post('/loginCliente',controllers.clientes.login,controllers.firebase.autenticarCliente);

//router.post('/salirCliente',controllers.firebase.salirSesion);
//LOGIN PARA CLIENTE 
/*
router.post('/crearCliente',,controllers.firebase.crearUsuario);
router.post('/entrarCliente',controllers.clientes.login,controllers.firebase.autenticarUsuario);
router.post('/salirCliente',controllers.firebase.salirSesion);
router.post('/loginClientes',controllers.clientes.login,);
*/
//MODULO USUARIOS
router.post('/loginUsuarios',controllers.usuarios.login);
//router.get('/private',controllers.tokenMiddleware.autentificarToken);
router.get('/usuarios',controllers.usuarios.listaUsuarios);
router.get('/usuario/:id', controllers.usuarios.datosUsuario);
router.get('/usuario/borrar/:id', controllers.usuarios.borrarUsuario);
router.post("/usuario", controllers.usuarios.nuevoUsuario);
router.post("/usuario/modificar/", controllers.usuarios.modificarUsuario);

//MODULO PEDIDOS
router.get('/pedidos', controllers.pedidos.listaPedidos);//lista todos los pedidos
router.get('/pedido/:id', controllers.pedidos.datosPedido);//muestra los datos de un pedido por su id
router.get('/pedidosCliente/:id', controllers.pedidos.datosPedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/pedido/borrar/:id', controllers.pedidos.borrarPedido);//borra un pedido
router.post("/pedido", controllers.pedidos.nuevoPedido);//crea un pedido primero guardando el logo 
router.post("/pedido/guardado/", controllers.pedidos.nuevoPedidoGuardado);//crea un pedido de un logo ya guardado
router.post("/pedido/modificar/", controllers.pedidos.modificarPedido);// modifica los datos de un pedido
router.post("/pedido/cambiar/", controllers.pedidos.cambiarEstado);// cambia de estado al pedido


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
router.post('/elementos/busqueda', controllers.elementos.listaSegunPref);
router.post("/elementos/categorias", controllers.elementos.listaElemCat);

//MODULO LOGOS
router.get('/logos/guardados/:id', controllers.logos.listaLogosGuardados);
router.get('/logos/descargables/:id', controllers.logos.listaLogosDescargables);
router.get('/logo/:id', controllers.logos.datosLogo);//muestra los datos de un logo por su id
router.post("/logo/guardar/", controllers.logos.guardar);
router.post("/logo/modificar/", controllers.logos.modificarLogo);
router.post("/logo/descargar/", controllers.logos.descargar);

//PARA PRUEBAS
//router.post("/logos/prueba/", controllers.logos.prueba);


module.exports = router;
