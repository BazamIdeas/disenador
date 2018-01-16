var express             = require('express');
var router              = express.Router();
var fs                  = require('fs');
var controllers         = require('.././controllers');
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var middleware          = require('./middleware');
var configuracion       = require('../configuracion.js');

//MODULO CLIENTES
//no espera parametros
router.get('/clientes', middleware.validarAdministrador, controllers.clientes.listaClientes);
//parametro por get que debe ser el id del cliente.
router.get('/cliente/datos', middleware.validarCliente, controllers.clientes.Datos);

router.post('/cliente/borrar/:id', middleware.validarAdministrador, controllers.clientes.borrarCliente);
//'valor'	
//nombreCliente : valor,correo : valor,pass : valor,telefono : valor	,pais : valor
router.post('/cliente', multipartMiddleware, controllers.clientes.nuevoCliente);
//los mismos datos que la ruta /cliente
router.post('/cliente/modificar', middleware.validarCliente, controllers.clientes.modificarCliente);
//correo, contraseña => email, pass
router.post('/cliente/login',controllers.clientes.login);

router.get('/cliente/pedidos', middleware.validarCliente, controllers.pedidos.PedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/cliente/:id', controllers.clientes.datosCliente);

//MODULO USUARIOS
//
//no espera parametros
router.get('/usuarios', middleware.validarAdministrador, controllers.usuarios.listaUsuarios);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/:id', middleware.validarAdministrador, controllers.usuarios.datosUsuario);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/borrar/:id', middleware.validarAdministrador, controllers.usuarios.borrarUsuario);
// idUsuario : valor,nombreUser : valor,correo : valor,	pass : valor
router.post('/usuario', controllers.usuarios.nuevoUsuario);
//los mismos datos que la ruta /usuario
router.post('/usuario/modificar', middleware.validarAdministrador, controllers.usuarios.modificarUsuario);
router.post('/usuario/login',controllers.usuarios.login);

//MODULO PEDIDOS
router.get('/pedidos', middleware.validarAdministrador, controllers.pedidos.listaPedidos);//lista todos los pedidos
router.get('/pedidos/pais/:iso', middleware.validarAdministrador, controllers.pedidos.ListarPorPais);//lista todos los pedidos
router.get('/pedido/:id',  middleware.validarAdministrador, controllers.pedidos.datosPedido);//muestra los datos de un pedido por su id
router.get('/pedidos/cliente/:id', middleware.validarAdministrador, controllers.pedidos.datosPedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/pedido/borrar/:id', middleware.validarAdministrador, controllers.pedidos.borrarPedido);//borra un pedido
router.post('/pedido', middleware.validarCliente, controllers.pedidos.nuevoPedido);//crea un pedido primero guardando el logo 
router.post('/pedido/guardado', middleware.validarCliente, controllers.pedidos.nuevoPedidoGuardado);//crea un pedido de un logo ya guardado
router.post('/pedido/modificar', middleware.validarCliente, controllers.pedidos.modificarPedido);// modifica los datos de un pedido
router.post('/pedido/cambiar', middleware.validarCliente, controllers.pedidos.cambiarEstado);// cambia de estado al pedido
router.get('/pedido/pagado/:idElemento/:idLogo/:tipo/:tk/:idPedido/:padre?', controllers.pedidos.cambioEstadoPagado);//RUTAS INTERNAS
router.get('/pedido/no/pago/:tk', controllers.pedidos.noPago);// RUTAS INTERNAS

//MODULO CATEGORIAS

router.post('/categorias', controllers.categorias.listaCategorias);
router.get('/categoria/iconos/:id', controllers.categorias.ListarIconos);
router.get('/categoria/fuentes/:id', controllers.categorias.ListarFuentes);
router.post('/categoria', middleware.validarAdministrador, controllers.categorias.nuevaCategoria);
router.post('/categoria/modificar', middleware.validarAdministrador, controllers.categorias.modificarCategoria);
router.get('/categoria/borrar/:id', middleware.validarAdministrador, controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA

router.get('/preferencias', controllers.preferencias.listaPreferencias);
router.post('/preferencia', middleware.validarAdministrador, controllers.preferencias.nuevaPreferencia);
router.post('/preferencia/modificar', middleware.validarAdministrador, controllers.preferencias.modificarPreferencia);
router.get('/preferencia/borrar/:id', middleware.validarAdministrador, controllers.preferencias.borrarPreferencia);

//etiquetas

router.get('/etiquetas',  controllers.etiquetas.listaEtiquetas);
router.post('/etiqueta',  controllers.etiquetas.nuevaEtiqueta);
router.post('/etiqueta/modificar', middleware.validarAdministrador, controllers.etiquetas.modificarEtiqueta);
router.get('/etiqueta/borrar/:id', middleware.validarAdministrador, controllers.etiquetas.borrarEtiqueta);

//MODULO ELEMENTOS
router.post('/elementos/busqueda', controllers.elementos.listaSegunPref);
router.post('/elementos/categorias', controllers.elementos.listaElemCat);
router.post('/elemento/icono', multipartMiddleware, controllers.elementos.nuevoElementoIcono); //ruta para icono
router.get('/elementos/fuente', controllers.elementos.ListarFuentes);
router.post('/elemento/fuente', multipartMiddleware, controllers.elementos.nuevoElementoFuente);
router.post('/elemento/preferencias/modificar', /*middleware.validarAdministrador,*/ controllers.elementos.ModificarPreferencias);
router.post('/elementos/iniciales', controllers.elementos.ListaIniciales);


//MODULO PAISES
router.get('/paises', /*middleware.validarAdministrador,*/ controllers.paises.Listar);
router.get('/pais', /*middleware.validarAdministrador,*/ controllers.paises.Obtener);
router.post('/pais', /*middleware.validarAdministrador,*/ controllers.paises.Nuevo);
router.post('/pais/moneda', /*middleware.validarAdministrador,*/ controllers.paises.AsignarMoneda);
router.post('/pais/moneda/desasignar', /*middleware.validarAdministrador,*/ controllers.paises.DesasignarMoneda);
router.get('/pais/monedas/:id', /*middleware.validarAdministrador,*/ controllers.paises.ListarMonedas);
router.get('/pais/planes/:iso', /*middleware.validarAdministrador,*/ controllers.paises.ListarPlanes);
router.post('/pais/modificar', /*middleware.validarAdministrador,*/ controllers.paises.Modificar);
//router.get('/pais/borrar/:id', /*middleware.validarAdministrador,*/ controllers.paises.Borrar);


//MODULO MONEDAS
router.get('/monedas', /*middleware.validarAdministrador,*/ controllers.monedas.Listar);
router.post('/moneda', /*middleware.validarAdministrador,*/ controllers.monedas.Nuevo);
//router.post('/pais/modificar', /*middleware.validarAdministrador,*/ controllers.paises.modificarPais);
//router.get('/moneda/borrar/:id', /*middleware.validarAdministrador,*/ controllers.monedas.borrarMoneda);


//PASARELAS
router.get('/pasarelas', /*middleware.validarAdministrador,*/ controllers.pasarelas.Listar);
router.post('/pasarelas/moneda', /*middleware.validarAdministrador,*/ controllers.pasarelas.ListarPorMoneda);
router.post('/pasarela', /*middleware.validarAdministrador,*/ controllers.pasarelas.Nuevo);
router.post('/pasarela/modificar', /*middleware.validarAdministrador,*/ controllers.pasarelas.Modificar);
router.post('/pasarela/moneda', /*middleware.validarAdministrador,*/ controllers.pasarelas.AsignarMoneda);
router.post('/pasarela/moneda/desasignar', /*middleware.validarAdministrador,*/ controllers.pasarelas.DesasignarMoneda);
router.get('/pasarela/monedas/:id', /*middleware.validarAdministrador,*/ controllers.pasarelas.ListarMonedas);
//router.get('/pasarela/borrar/:id', /*middleware.validarAdministrador,*/ controllers.pasarelas.Borrar);


//MODULO DE PLANES
router.get('/planes/comprar', controllers.planes.ListarFront);
router.get('/planes', /*middleware.validarAdministrador,*/ controllers.planes.ListarBack);
router.get('/plan/precios/:id', /*middleware.validarAdministrador,*/ controllers.planes.ListarPrecios); // lista precios activos
router.post('/plan', /*middleware.validarAdministrador,*/ controllers.planes.Nuevo); // ingresar Nuevo y un precio
router.post('/plan/bloquear', /*middleware.validarAdministrador,*/ controllers.planes.Bloquear);
router.post('/plan/modificar', /*middleware.validarAdministrador,*/ controllers.planes.Modificar);

//MODULO DE PRECIOS
router.post('/precio', /*middleware.validarAdministrador,*/ controllers.precios.Nuevo); // inserta nuevos precio para un plan seleccionado
router.post('/precio/modificar', /*middleware.validarAdministrador,*/ controllers.precios.Modificar);
//router.get('/plan/borrar/:id', controllers.planes.borrarPlan);


//MODULO LOGOS
router.post('/logos/estado/:estado', middleware.validarCliente, controllers.logos.listaLogosPorEstado);
router.post('/logos/guardados', middleware.validarCliente, controllers.logos.listaLogosGuardados);
router.post('/logos/descargables',  middleware.validarCliente, controllers.logos.listaLogosDescargables);
router.get('/logo/:id', middleware.validarCliente, controllers.logos.datosLogo); //muestra los datos de un logo por su id
router.post('/logo/guardar', middleware.validarCliente, controllers.logos.guardar);
//Usuario diseñador
router.post('/logo/por-aprobar',  middleware.validarCliente, controllers.logos.porAprobar);
//Administrador
router.post('/logo/aprobar',  middleware.validarAdministrador, controllers.logos.aprobar);

router.post('/logo/modificar',  middleware.validarCliente, controllers.logos.modificarLogo);
router.post('/logo/descargar',  controllers.logos.descargar);
router.get('/logo/borrar/:id',  controllers.logos.Borrar);
router.post('/logo/zip',  middleware.validarCliente, controllers.logos.zip);


//RECUPERAR CONTRASEÑA
router.post('/recuperar-password', controllers.password.enviarToken); //enviar campo tipo 
router.get('/recuperar-password/:tk', controllers.password.confirmarToken);
router.post('/cambiar-password', controllers.password.cambiar);

//PARA PRUEBAS
router.get('/prueba', middleware.decodificar);


module.exports = router;