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
router.get('/clientes', middleware.validarUsuario, controllers.clientes.listaClientes);
//parametro por get que debe ser el id del cliente.
router.get('/cliente/datos', middleware.validar, controllers.clientes.Datos);

router.post('/cliente/borrar/:id', middleware.validarUsuario, controllers.clientes.borrarCliente);
//'valor'	
//nombreCliente : valor,correo : valor,pass : valor,telefono : valor	,pais : valor
router.post('/cliente', multipartMiddleware, controllers.clientes.nuevoCliente);
//los mismos datos que la ruta /cliente
router.post('/cliente/modificar', middleware.validar, controllers.clientes.modificarCliente);
//correo, contraseña => email, pass
router.post('/cliente/login',controllers.clientes.login);

router.get('/cliente/pedidos', middleware.validar, controllers.pedidos.PedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/cliente/:id', middleware.validarUsuario, controllers.clientes.datosCliente);

//MODULO USUARIOS
//
//no espera parametros
router.get('/usuarios', middleware.validarUsuario, controllers.usuarios.listaUsuarios);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/:id', middleware.validarUsuario, controllers.usuarios.datosUsuario);
//parametro por get que debe ser el id del cliente.
router.get('/usuario/borrar/:id', middleware.validarUsuario, controllers.usuarios.borrarUsuario);
// idUsuario : valor,nombreUser : valor,correo : valor,	pass : valor
router.post('/usuario', controllers.usuarios.nuevoUsuario);
//los mismos datos que la ruta /usuario
router.post('/usuario/modificar', middleware.validarUsuario, controllers.usuarios.modificarUsuario);
router.post('/usuario/login',controllers.usuarios.login);

//MODULO PEDIDOS
router.get('/pedidos', middleware.validarUsuario, controllers.pedidos.listaPedidos);//lista todos los pedidos
router.get('/pedidos/pais/:iso', middleware.validarUsuario, controllers.pedidos.ListarPorPais);//lista todos los pedidos
router.get('/pedido/:id',  middleware.validarUsuario, controllers.pedidos.datosPedido);//muestra los datos de un pedido por su id
router.get('/pedidos/cliente/:id', middleware.validarUsuario, controllers.pedidos.datosPedidosCliente);//muestra la lista de pedidos de un cliente
router.get('/pedido/borrar/:id', middleware.validarUsuario, controllers.pedidos.borrarPedido);//borra un pedido
router.post('/pedido', middleware.validar, controllers.pedidos.nuevoPedido);//crea un pedido primero guardando el logo 
router.post('/pedido/guardado', middleware.validar, controllers.pedidos.nuevoPedidoGuardado);//crea un pedido de un logo ya guardado
router.post('/pedido/modificar', middleware.validar, controllers.pedidos.modificarPedido);// modifica los datos de un pedido
router.post('/pedido/cambiar', middleware.validar, controllers.pedidos.cambiarEstado);// cambia de estado al pedido
router.get('/pedido/pagado/:idElemento/:idLogo/:tipo/:tk/:idPedido/:padre?', controllers.pedidos.cambioEstadoPagado);//RUTAS INTERNAS
router.get('/pedido/no/pago/:tk', controllers.pedidos.noPago);// RUTAS INTERNAS

//MODULO CATEGORIAS

router.post('/categorias', controllers.categorias.listaCategorias);
router.get('/categoria/iconos/:id', controllers.categorias.ListarIconos);
router.get('/categoria/fuentes/:id', controllers.categorias.ListarFuentes);
router.post('/categoria', middleware.validarUsuario, controllers.categorias.nuevaCategoria);
router.post('/categoria/modificar', middleware.validarUsuario, controllers.categorias.modificarCategoria);
router.get('/categoria/borrar/:id', middleware.validarUsuario, controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA

router.get('/preferencias', controllers.preferencias.listaPreferencias);
router.post('/preferencia', middleware.validarUsuario, controllers.preferencias.nuevaPreferencia);
router.post('/preferencia/modificar', middleware.validarUsuario, controllers.preferencias.modificarPreferencia);
router.get('/preferencia/borrar/:id', middleware.validarUsuario, controllers.preferencias.borrarPreferencia);

//etiquetas

router.get('/etiquetas',  controllers.etiquetas.listaEtiquetas);
router.post('/etiqueta',  controllers.etiquetas.nuevaEtiqueta);
router.post('/etiqueta/modificar', middleware.validarUsuario, controllers.etiquetas.modificarEtiqueta);
router.get('/etiqueta/borrar/:id', middleware.validarUsuario, controllers.etiquetas.borrarEtiqueta);

//MODULO ELEMENTOS
router.post('/elementos/busqueda', controllers.elementos.listaSegunPref);
router.post('/elementos/categorias', controllers.elementos.listaElemCat);
router.post('/elemento/icono', multipartMiddleware, controllers.elementos.nuevoElementoIcono); //ruta para icono
router.get('/elementos/fuente', controllers.elementos.ListarFuentes);
router.post('/elemento/fuente', multipartMiddleware, controllers.elementos.nuevoElementoFuente);
router.post('/elemento/preferencias/modificar', /*middleware.validarUsuario,*/ controllers.elementos.ModificarPreferencias);
router.post('/elementos/iniciales', controllers.elementos.ListaIniciales);


//MODULO PAISES
router.get('/paises', /*middleware.validarUsuario,*/ controllers.paises.Listar);
router.get('/pais', /*middleware.validarUsuario,*/ controllers.paises.Obtener);
router.post('/pais', /*middleware.validarUsuario,*/ controllers.paises.Nuevo);
router.post('/pais/moneda', /*middleware.validarUsuario,*/ controllers.paises.AsignarMoneda);
router.post('/pais/moneda/desasignar', /*middleware.validarUsuario,*/ controllers.paises.DesasignarMoneda);
router.get('/pais/monedas/:id', /*middleware.validarUsuario,*/ controllers.paises.ListarMonedas);
router.get('/pais/planes/:iso', /*middleware.validarUsuario,*/ controllers.paises.ListarPlanes);
router.post('/pais/modificar', /*middleware.validarUsuario,*/ controllers.paises.Modificar);
//router.get('/pais/borrar/:id', /*middleware.validarUsuario,*/ controllers.paises.Borrar);


//MODULO MONEDAS
router.get('/monedas', /*middleware.validarUsuario,*/ controllers.monedas.Listar);
router.post('/moneda', /*middleware.validarUsuario,*/ controllers.monedas.Nuevo);
//router.post('/pais/modificar', /*middleware.validarUsuario,*/ controllers.paises.modificarPais);
//router.get('/moneda/borrar/:id', /*middleware.validarUsuario,*/ controllers.monedas.borrarMoneda);


//PASARELAS
router.get('/pasarelas', /*middleware.validarUsuario,*/ controllers.pasarelas.Listar);
router.post('/pasarelas/moneda', /*middleware.validarUsuario,*/ controllers.pasarelas.ListarPorMoneda);
router.post('/pasarela', /*middleware.validarUsuario,*/ controllers.pasarelas.Nuevo);
router.post('/pasarela/modificar', /*middleware.validarUsuario,*/ controllers.pasarelas.Modificar);
router.post('/pasarela/moneda', /*middleware.validarUsuario,*/ controllers.pasarelas.AsignarMoneda);
router.post('/pasarela/moneda/desasignar', /*middleware.validarUsuario,*/ controllers.pasarelas.DesasignarMoneda);
router.get('/pasarela/monedas/:id', /*middleware.validarUsuario,*/ controllers.pasarelas.ListarMonedas);
//router.get('/pasarela/borrar/:id', /*middleware.validarUsuario,*/ controllers.pasarelas.Borrar);


//MODULO DE PLANES
router.get('/planes/comprar', controllers.planes.ListarFront);
router.get('/planes', /*middleware.validarUsuario,*/ controllers.planes.ListarBack);
router.get('/plan/precios/:id', /*middleware.validarUsuario,*/ controllers.planes.ListarPrecios); // lista precios activos
router.post('/plan', /*middleware.validarUsuario,*/ controllers.planes.Nuevo); // ingresar Nuevo y un precio
router.post('/plan/bloquear', /*middleware.validarUsuario,*/ controllers.planes.Bloquear);
router.post('/plan/modificar', /*middleware.validarUsuario,*/ controllers.planes.Modificar);

//MODULO DE PRECIOS
router.post('/precio', /*middleware.validarUsuario,*/ controllers.precios.Nuevo); // inserta nuevos precio para un plan seleccionado
router.post('/precio/modificar', /*middleware.validarUsuario,*/ controllers.precios.Modificar);
//router.get('/plan/borrar/:id', controllers.planes.borrarPlan);


//MODULO LOGOS
router.post('/logos/estado/:estado', middleware.validar, controllers.logos.listaLogosPorEstado);
router.post('/logos/guardados', middleware.validar, controllers.logos.listaLogosGuardados);
router.post('/logos/descargables',  middleware.validar, controllers.logos.listaLogosDescargables);
router.get('/logo/:id', middleware.validar, controllers.logos.datosLogo); //muestra los datos de un logo por su id
router.post('/logo/guardar', middleware.validar, controllers.logos.guardar);
router.post('/logo/modificar',  middleware.validar, controllers.logos.modificarLogo);
router.post('/logo/descargar',  controllers.logos.descargar);
router.get('/logo/borrar/:id',  controllers.logos.Borrar);
router.post('/logo/zip',  middleware.validar, controllers.logos.zip);


//RECUPERAR CONTRASEÑA
router.post('/recuperar-password', controllers.password.enviarToken); //enviar campo tipo 
router.get('/recuperar-password/:tk', controllers.password.confirmarToken);
router.post('/cambiar-password', controllers.password.cambiar);

//PARA PRUEBAS
router.get('/prueba', middleware.decodificar);


module.exports = router;