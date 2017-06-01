var express = require('express');
var router = express.Router();
var fs=require('fs');
var controllers = require('.././controllers');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart;

//MODULO CLIENTES

//no espera parametros
router.post('/clientes', controllers.clientes.listaClientes);
//parametro por get que debe ser el id del cliente.
router.post('/cliente/:id',controllers.firebase.comprobarEstado, controllers.clientes.datosCliente);
//parametro por get que debe ser el id del cliente.
router.post('/cliente/borrar/:id',controllers.firebase.comprobarEstado, controllers.clientes.borrarCliente);
//"valor"	
//nombreCliente : valor,correo : valor,pass : valor,telefono : valor	,pais : valor
router.post("/cliente", controllers.clientes.nuevoCliente);
//los mismos datos que la ruta /cliente
router.post("/cliente/modificar/",controllers.firebase.comprobarEstado, controllers.clientes.modificarCliente);
//correo, contraseña => email, pass




//MODULO USUARIOS
//
//no espera parametros
router.get('/usuarios',controllers.firebase.comprobarEstado, controllers.usuarios.listaUsuarios);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/:id',controllers.firebase.comprobarEstado, controllers.usuarios.datosUsuario);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/borrar/:id',controllers.firebase.comprobarEstado, controllers.usuarios.borrarUsuario);
// idUsuario : valor,nombreUser : valor,correo : valor,	pass : valor
router.post("/usuario", controllers.usuarios.nuevoUsuario);
//los mismos datos que la ruta /usuario
router.post("/usuario/modificar/", controllers.usuarios.modificarUsuario);


//MODULO PEDIDOS
router.get('/pedidos',controllers.firebase.comprobarEstado, controllers.pedidos.listaPedidos);//lista todos los pedidos
router.get('/pedido/:id',controllers.firebase.comprobarEstado, controllers.pedidos.datosPedido);//muestra los datos de un pedido por su id
router.get('/pedidosCliente/:id',controllers.firebase.comprobarEstado, controllers.pedidos.datosPedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/pedido/borrar/:id',controllers.firebase.comprobarEstado, controllers.pedidos.borrarPedido);//borra un pedido
router.post("/pedido",controllers.firebase.comprobarEstado, controllers.pedidos.nuevoPedido);//crea un pedido primero guardando el logo 
router.post("/pedido/guardado/",controllers.firebase.comprobarEstado, controllers.pedidos.nuevoPedidoGuardado);//crea un pedido de un logo ya guardado
router.post("/pedido/modificar/",controllers.firebase.comprobarEstado, controllers.pedidos.modificarPedido);// modifica los datos de un pedido
router.post("/pedido/cambiar/",controllers.firebase.comprobarEstado, controllers.pedidos.cambiarEstado);// cambia de estado al pedido
router.get("/pedido/pagado/:idElemento/:idLogo/", controllers.pedidos.cambioEstadoPagado);// cambia de estado al pedido
router.get("/pedido/noPago/", controllers.pedidos.noPago);// cambia de estado al pedido


//MODULO CATEGORIAS

router.get('/categorias', controllers.categorias.listaCategorias);
router.post("/categoria", controllers.categorias.nuevaCategoria);
router.post("/categoria/modificar/",controllers.firebase.comprobarEstado, controllers.categorias.modificarCategoria);
router.get('/categoria/borrar/:id',controllers.firebase.comprobarEstado, controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA

router.get('/preferencias', controllers.preferencias.listaPreferencias);
router.post("/preferencia", controllers.preferencias.nuevaPreferencia);
router.post("/preferencia/modificar/",controllers.firebase.comprobarEstado, controllers.preferencias.modificarPreferencia);
router.get('/preferencia/borrar/:id',controllers.firebase.comprobarEstado, controllers.preferencias.borrarPreferencia);

//etiquetas

router.get('/etiquetas',controllers.firebase.comprobarEstado, controllers.etiquetas.listaEtiquetas);
router.post("/etiqueta",controllers.firebase.comprobarEstado, controllers.etiquetas.nuevaEtiqueta);
router.post("/etiqueta/modificar/",controllers.firebase.comprobarEstado, controllers.etiquetas.modificarEtiqueta);
router.get('/etiqueta/borrar/:id',controllers.firebase.comprobarEstado, controllers.etiquetas.borrarEtiqueta);

//Envio de emails
router.get('/email',controllers.firebase.comprobarEstado,controllers.emails.enviar_email);


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
router.post('/logos/guardados/',controllers.firebase.comprobarEstado, controllers.logos.listaLogosGuardados);
router.post('/logos/descargables/',controllers.firebase.comprobarEstado, controllers.logos.listaLogosDescargables);
router.get('/logo/:id',controllers.firebase.comprobarEstado, controllers.logos.datosLogo);//muestra los datos de un logo por su id
router.post("/logo/guardar/", controllers.firebase.comprobarEstado,controllers.logos.guardar);
router.post("/logo/modificar/",controllers.firebase.comprobarEstado, controllers.logos.modificarLogo);
router.post("/logo/descargar/",controllers.firebase.comprobarEstado, controllers.logos.descargar);

//PARA PRUEBAS
//router.post("/logos/prueba/", controllers.logos.prueba);


module.exports = router;
