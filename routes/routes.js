var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

//MODULO CLIENTES

//no espera parametros
router.get('/clientes',controllers.firebase.comprobarEstadoCliente, controllers.clientes.listaClientes);
//parametro por get que debe ser el id del cliente.
router.get('/cliente/:id',controllers.firebase.comprobarEstadoCliente, controllers.clientes.datosCliente);
//parametro por get que debe ser el id del cliente.
router.get('/cliente/borrar/:id',controllers.firebase.comprobarEstadoCliente, controllers.clientes.borrarCliente);
//"valor"	
//nombreCliente : valor,correo : valor,pass : valor,telefono : valor	,pais : valor
router.post("/cliente", controllers.clientes.nuevoCliente);
//los mismos datos que la ruta /cliente
router.post("/cliente/modificar/",controllers.firebase.comprobarEstadoCliente, controllers.clientes.modificarCliente);
//correo, contraseña => email, pass




//MODULO USUARIOS
//
//no espera parametros
router.get('/usuarios',controllers.firebase.comprobarEstadoClientecontrollers.usuarios.listaUsuarios);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/:id',controllers.firebase.comprobarEstadoCliente, controllers.usuarios.datosUsuario);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/borrar/:id',controllers.firebase.comprobarEstadoCliente, controllers.usuarios.borrarUsuario);
// idUsuario : valor,nombreUser : valor,correo : valor,	pass : valor
router.post("/usuario", controllers.usuarios.nuevoUsuario);
//los mismos datos que la ruta /usuario
router.post("/usuario/modificar/", controllers.usuarios.modificarUsuario);


//MODULO PEDIDOS
router.get('/pedidos',controllers.firebase.comprobarEstadoCliente, controllers.pedidos.listaPedidos);//lista todos los pedidos
router.get('/pedido/:id',controllers.firebase.comprobarEstadoCliente, controllers.pedidos.datosPedido);//muestra los datos de un pedido por su id
router.get('/pedidosCliente/:id',controllers.firebase.comprobarEstadoCliente, controllers.pedidos.datosPedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/pedido/borrar/:id',controllers.firebase.comprobarEstadoCliente, controllers.pedidos.borrarPedido);//borra un pedido
router.post("/pedido",controllers.firebase.comprobarEstadoCliente, controllers.pedidos.nuevoPedido);//crea un pedido primero guardando el logo 
router.post("/pedido/guardado/",controllers.firebase.comprobarEstadoCliente, controllers.pedidos.nuevoPedidoGuardado);//crea un pedido de un logo ya guardado
router.post("/pedido/modificar/",controllers.firebase.comprobarEstadoCliente, controllers.pedidos.modificarPedido);// modifica los datos de un pedido
router.post("/pedido/cambiar/",controllers.firebase.comprobarEstadoCliente, controllers.pedidos.cambiarEstado);// cambia de estado al pedido


//MODULO CATEGORIAS

router.get('/categorias',controllers.firebase.comprobarEstadoCliente, controllers.categorias.listaCategorias);
router.post("/categoria",controllers.firebase.comprobarEstadoCliente, controllers.categorias.nuevaCategoria);
router.post("/categoria/modificar/",controllers.firebase.comprobarEstadoCliente, controllers.categorias.modificarCategoria);
router.get('/categoria/borrar/:id',controllers.firebase.comprobarEstadoCliente, controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA

router.get('/preferencias',controllers.firebase.comprobarEstadoCliente, controllers.preferencias.listaPreferencias);
router.post("/preferencia",controllers.firebase.comprobarEstadoCliente, controllers.preferencias.nuevaPreferencia);
router.post("/preferencia/modificar/",controllers.firebase.comprobarEstadoCliente, controllers.preferencias.modificarPreferencia);
router.get('/preferencia/borrar/:id',controllers.firebase.comprobarEstadoCliente, controllers.preferencias.borrarPreferencia);

//etiquetas

router.get('/etiquetas',controllers.firebase.comprobarEstadoCliente, controllers.etiquetas.listaEtiquetas);
router.post("/etiqueta",controllers.firebase.comprobarEstadoCliente, controllers.etiquetas.nuevaEtiqueta);
router.post("/etiqueta/modificar/",controllers.firebase.comprobarEstadoCliente, controllers.etiquetas.modificarEtiqueta);
router.get('/etiqueta/borrar/:id',controllers.firebase.comprobarEstadoCliente, controllers.etiquetas.borrarEtiqueta);

//Envio de emails
router.get('/email',controllers.firebase.comprobarEstadoCliente,controllers.emails.enviar_email);


//MODULO ELEMENTOS
router.post('/elementos/busqueda',controllers.firebase.comprobarEstadoCliente, controllers.elementos.listaSegunPref);
router.post("/elementos/categorias",controllers.firebase.comprobarEstadoCliente, controllers.elementos.listaElemCat);

//MODULO LOGOS
router.get('/logos/guardados/:id',controllers.firebase.comprobarEstadoCliente, controllers.logos.listaLogosGuardados);
router.get('/logos/descargables/:id',controllers.firebase.comprobarEstadoCliente, controllers.logos.listaLogosDescargables);
router.get('/logo/:id',controllers.firebase.comprobarEstadoCliente, controllers.logos.datosLogo);//muestra los datos de un logo por su id
router.post("/logo/guardar/", controllers.firebase.comprobarEstadoCliente,controllers.logos.guardar);
router.post("/logo/modificar/",controllers.firebase.comprobarEstadoCliente, controllers.logos.modificarLogo);
router.post("/logo/descargar/",controllers.firebase.comprobarEstadoCliente, controllers.logos.descargar);

//PARA PRUEBAS
//router.post("/logos/prueba/", controllers.logos.prueba);


module.exports = router;
