var express = require('express');
var router = express.Router();
var fs=require('fs');
var controllers = require('.././controllers');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var middleware = require('./middleware');
var configuracion=require('../configuracion.js');


//MODULO CLIENTES
//no espera parametros
router.get('/clientes',  middleware.validar, controllers.clientes.listaClientes);
//parametro por get que debe ser el id del cliente.
router.get('/cliente/:id', middleware.validar, controllers.clientes.datosCliente);
//parametro por get que debe ser el id del cliente.
router.post('/cliente/borrar/:id', middleware.validar, controllers.clientes.borrarCliente);
//"valor"	
//nombreCliente : valor,correo : valor,pass : valor,telefono : valor	,pais : valor
router.post("/cliente", controllers.clientes.nuevoCliente);
//los mismos datos que la ruta /cliente
router.post("/cliente/modificar", middleware.validar, controllers.clientes.modificarCliente);
//correo, contraseña => email, pass
router.post("/cliente/login",controllers.clientes.login);




//MODULO USUARIOS
//
//no espera parametros
router.get('/usuarios', middleware.validar, controllers.usuarios.listaUsuarios);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/:id', middleware.validar, controllers.usuarios.datosUsuario);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/borrar/:id', middleware.validar, controllers.usuarios.borrarUsuario);
// idUsuario : valor,nombreUser : valor,correo : valor,	pass : valor
router.post("/usuario", controllers.usuarios.nuevoUsuario);
//los mismos datos que la ruta /usuario
router.post("/usuario/modificar/", controllers.usuarios.modificarUsuario);
router.post("/usuario/login",controllers.usuarios.login);

//MODULO PEDIDOS
router.get('/pedidos', middleware.validar, controllers.pedidos.listaPedidos);//lista todos los pedidos
router.get('/pedido/:id', middleware.validar, controllers.pedidos.datosPedido);//muestra los datos de un pedido por su id
router.get('/pedidos/cliente/:id', middleware.validar, controllers.pedidos.datosPedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/pedido/borrar/:id', middleware.validar, controllers.pedidos.borrarPedido);//borra un pedido
router.post("/pedido", middleware.validar, controllers.pedidos.nuevoPedido);//crea un pedido primero guardando el logo 
router.post("/pedido/guardado/", middleware.validar, controllers.pedidos.nuevoPedidoGuardado);//crea un pedido de un logo ya guardado
router.post("/pedido/modificar/", middleware.validar, controllers.pedidos.modificarPedido);// modifica los datos de un pedido
router.post("/pedido/cambiar/", middleware.validar, controllers.pedidos.cambiarEstado);// cambia de estado al pedido
router.get("/pedido/pagado/:idElemento/:idLogo/:tipo/:tk", controllers.pedidos.cambioEstadoPagado);//RUTAS INTERNAS
router.get("/pedido/no/pago/:tk", controllers.pedidos.noPago);// RUTAS INTERNAS


//MODULO CATEGORIAS

router.get('/categorias', controllers.categorias.listaCategorias);
router.post("/categoria", controllers.categorias.nuevaCategoria);
router.post("/categoria/modificar/", middleware.validar, controllers.categorias.modificarCategoria);
router.get('/categoria/borrar/:id', middleware.validar, controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA

router.get('/preferencias', controllers.preferencias.listaPreferencias);
router.post("/preferencia", controllers.preferencias.nuevaPreferencia);
router.post("/preferencia/modificar/", middleware.validar, controllers.preferencias.modificarPreferencia);
router.get('/preferencia/borrar/:id', middleware.validar, controllers.preferencias.borrarPreferencia);

//etiquetas

router.get('/etiquetas', middleware.validar, controllers.etiquetas.listaEtiquetas);
router.post("/etiqueta", middleware.validar, controllers.etiquetas.nuevaEtiqueta);
router.post("/etiqueta/modificar/", middleware.validar, controllers.etiquetas.modificarEtiqueta);
router.get('/etiqueta/borrar/:id', middleware.validar, controllers.etiquetas.borrarEtiqueta);

//Envio de emails
router.get('/email', middleware.validar,controllers.emails.enviar_email);


//MODULO ELEMENTOSS
router.post('/elementos/busqueda', controllers.elementos.listaSegunPref);
router.post("/elementos/categorias", controllers.elementos.listaElemCat);
router.post("/elemento/icono", controllers.elementos.nuevoElementoIcono); //ruta para icono
router.post("/elemento/fuente", multipartMiddleware, controllers.elementos.nuevoElementoFuente);

//MODULO PRECIOS
router.get('/impuestos', controllers.impuestos.listaImpuesto);
router.post("/impuesto", controllers.impuestos.nuevoImpuesto);
router.post("/impuesto/modificar/", controllers.impuestos.modificarImpuesto);
router.get('/impuesto/borrar/:id', controllers.impuestos.borrarImpuesto);

//MODULO  DE PLANES

router.get("/planes/precios", controllers.planes.listarPlanes);// lista planes y precios
router.post("/plan", controllers.planes.nuevoPlan); // ingresar Nuevo y un precio
router.get ("/planes", controllers.planes.selectPlan);// selecciona plan
router.post("/plan/precios", controllers.planes.nuevoPrecio); // inserta nuevos precio para un plan seleccionado
router.post("/plan/modificar/", controllers.planes.modificarPlan);
//router.get('/plan/borrar/:id', controllers.planes.borrarPlan);


//MODULO LOGOS
router.post('/logos/guardados/', middleware.validar, controllers.logos.listaLogosGuardados);
router.post('/logos/descargables/', middleware.validar, controllers.logos.listaLogosDescargables);
router.get('/logo/:id', middleware.validar, controllers.logos.datosLogo);//muestra los datos de un logo por su id
router.post("/logo/guardar/",  middleware.validar,controllers.logos.guardar);
router.post("/logo/modificar/", middleware.validar, controllers.logos.modificarLogo);
router.post("/logo/descargar/", middleware.validar, controllers.logos.descargar);

//PARA PRUEBAS
router.get("/prueba", middleware.decodificar);


module.exports = router;
