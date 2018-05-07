var express = require("express");
var router = express.Router();
var controllers = require(".././controllers");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var middleware = require("./middleware");

//MODULO CLIENTES
//no espera parametros
router.get("/clientes", middleware.validarAdministrador, controllers.clientes.listaClientes);
router.get("/clientes/freelancer", middleware.validarAdministrador, controllers.clientes.listaClientesFreelancer);
router.get("/clientes/freelancers", controllers.clientes.listaClientesFreelancer);
router.get("/cliente/saldo-personal", middleware.validarCliente, controllers.pagos.SaldoPorCliente);
router.get("/cliente/saldo", middleware.validarAdministrador, controllers.pagos.SaldoPorCliente);
//parametro por get que debe ser el id del cliente.
router.get("/cliente/datos", middleware.validarCliente, controllers.clientes.Datos);

router.post("/cliente/avatar", multipartMiddleware, middleware.validarCliente, controllers.clientes.Avatar);

router.get("/cliente/pagos", middleware.validarCliente, controllers.pagos.ObtenerPorCliente);
router.post("/cliente/pago", middleware.validarAdministrador, controllers.pagos.Nuevo);
router.get("/cliente/:id/pagos", middleware.validarAdministrador, controllers.pagos.ObtenerPorCliente);
router.get("/cliente/bloquear/:id", middleware.validarAdministrador, controllers.clientes.Bloquear);


router.post("/cliente/facturacion", middleware.validarCliente, controllers.facturacion.Nuevo);
router.get("/cliente/facturacion/:idFacturacion/borrar", middleware.validarCliente, controllers.facturacion.Eliminar);

//'valor'	
//nombreCliente : valor,correo : valor,pass : valor,telefono : valor	,pais : valor
router.post("/cliente", multipartMiddleware, controllers.clientes.nuevoCliente);

router.post("/cliente/social", controllers.clientes.nuevoClienteRed);

//los mismos datos que la ruta /cliente
router.post("/cliente/modificar", middleware.validarCliente, controllers.clientes.modificarCliente);
router.post("/cliente/cambiar-contrasena", middleware.validarCliente, controllers.clientes.cambiarContrasena);
//correo, contraseña => email, pass
router.post("/cliente/login", controllers.clientes.login);

router.get("/cliente/pedidos", middleware.validarCliente, controllers.pedidos.PedidosCliente); //muestra la lista de pedidos de un cliente
router.get("/cliente/:id", controllers.clientes.datosCliente);
router.post("/cliente/email", controllers.clientes.datosClientePorEmail);


//los mismos datos que la ruta /cliente
router.get("/cliente/manual/:id", middleware.validarCliente, controllers.clientes.manualCliente);

//MODULO USUARIOS
//
//no espera parametros
router.get("/usuarios", middleware.validarAdministrador, controllers.usuarios.listaUsuarios);
//parametro por get que debe ser el id del cliente.
router.get("/usuario/:id", middleware.validarAdministrador, controllers.usuarios.datosUsuario);
//parametro por get que debe ser el id del cliente.
router.get("/usuario/borrar/:id", middleware.validarAdministrador, controllers.usuarios.borrarUsuario);
// idUsuario : valor,nombreUser : valor,correo : valor,	pass : valor
router.post("/usuario", controllers.usuarios.nuevoUsuario);
//los mismos datos que la ruta /usuario
router.post("/usuario/modificar", middleware.validarAdministrador, controllers.usuarios.modificarUsuario);
router.post("/usuario/login", controllers.usuarios.login);

//MODULO PEDIDOS
router.get("/pedidos", middleware.validarAdministrador, controllers.pedidos.listaPedidos); //lista todos los pedidos
router.get("/pedidos/pais/:iso", middleware.validarAdministrador, controllers.pedidos.ListarPorPais); //lista todos los pedidos
router.get("/pedido/:id", middleware.validarAdministrador, controllers.pedidos.datosPedido); //muestra los datos de un pedido por su id
router.get("/pedidos/cliente/:id", middleware.validarAdministrador, controllers.pedidos.datosPedidosCliente); //muestra la lista de pedidos de un cliente
router.get("/pedido/borrar/:id", middleware.validarAdministrador, controllers.pedidos.borrarPedido); //borra un pedido
router.post("/pedido", middleware.validarCliente, controllers.pedidos.nuevoPedido); //crea un pedido primero guardando el logo 
router.post("/pedido/aumentar", middleware.validarCliente, controllers.pedidos.aumentarPlan);
router.post("/pedido/guardado", middleware.validarCliente, controllers.pedidos.nuevoPedidoGuardado); //crea un pedido de un logo ya guardado
router.post("/pedido/modificar", middleware.validarCliente, controllers.pedidos.modificarPedido); // modifica los datos de un pedido
router.post("/pedido/cambiar", middleware.validarCliente, controllers.pedidos.cambiarEstado); // cambia de estado al pedido
router.get("/pedido/pagado/:idElemento/:idLogo/:tipo/:tk/:idPedido/:padre?", controllers.pedidos.cambioEstadoPagado);
router.get("/pedido/aumento/pagado/:idElemento/:idLogo/:tipo/:tk/:idPedido/:idPedidoViejo", controllers.pedidos.cambioEstadoPagadoAumentoPlan);

//RUTAS INTERNAS
router.get("/pedido/no/pago/:tk", controllers.pedidos.noPago); // RUTAS INTERNAS

//MODULO CATEGORIAS
router.post("/categorias", controllers.categorias.listaCategorias);
router.get("/categoria/iconos/:id", controllers.categorias.ListarIconos);
router.get("/categoria/fuentes/:id", controllers.categorias.ListarFuentes);
router.post("/categoria", middleware.validarAdministrador, controllers.categorias.nuevaCategoria);
router.post("/categoria/modificar", middleware.validarAdministrador, controllers.categorias.modificarCategoria);
router.get("/categoria/borrar/:id", middleware.validarAdministrador, controllers.categorias.borrarCategoria);

//MODULO PREFERENCIA
router.get("/preferencias", controllers.preferencias.listaPreferencias);
router.post("/preferencia", middleware.validarAdministrador, controllers.preferencias.nuevaPreferencia);
router.post("/preferencia/modificar", middleware.validarAdministrador, controllers.preferencias.modificarPreferencia);
router.get("/preferencia/borrar/:id", middleware.validarAdministrador, controllers.preferencias.borrarPreferencia);

//MODULO ETIQUETAS
router.get("/etiquetas", controllers.etiquetas.ObtenerTodos);
router.post("/etiquetas", controllers.etiquetas.GuardarEtiquetas);
router.post("/etiquetas/modificar", controllers.etiquetas.Actualizar);
router.post("/etiquetas/iconos", controllers.etiquetas.AsignarIconos);
router.post("/etiquetas/:_id/iconos/desasignar", controllers.etiquetas.DesasignarIcono);
router.get("/etiquetas/borrar/:_id", controllers.etiquetas.Borrar);
router.get("/iconos/:id/etiquetas", controllers.etiquetas.ObtenerPorIcono);

//MODULO IDIOMAS
router.get("/idiomas", controllers.idiomas.ObtenerTodos);
router.post("/idiomas", controllers.idiomas.Guardar);
router.post("/idiomas/modificar", controllers.idiomas.Actualizar);
router.get("/idiomas/borrar/:_id", controllers.idiomas.Borrar);


//MODULO ELEMENTOS
router.post("/elementos/busqueda/fuentes", controllers.elementos.listaSegunPref);
router.post("/elementos/busqueda/iconos", controllers.elementos.listaSegunTagCat);
router.post("/elementos/categorias", controllers.elementos.listaElemCategoria); // iconos en editor
router.post("/elementos/categoria", controllers.elementos.listaElemCat); //iconos back
router.post("/elemento/icono", multipartMiddleware, controllers.elementos.nuevoElementoIcono); //ruta para icono
router.get("/elementos/fuente", controllers.elementos.ListarFuentes);
router.post("/elemento/fuente", multipartMiddleware, controllers.elementos.nuevoElementoFuente);
router.post("/elemento/preferencias/modificar", /*middleware.validarAdministrador,*/ controllers.elementos.ModificarPreferencias);
router.post("/elementos/iniciales", controllers.elementos.ListaIniciales);


//MODULO PAISES
router.get("/paises", /*middleware.validarAdministrador,*/ controllers.paises.Listar);
router.get("/pais", /*middleware.validarAdministrador,*/ controllers.paises.Obtener);
router.post("/pais", /*middleware.validarAdministrador,*/ controllers.paises.Nuevo);
router.post("/pais/moneda", /*middleware.validarAdministrador,*/ controllers.paises.AsignarMoneda);
router.post("/pais/moneda/desasignar", /*middleware.validarAdministrador,*/ controllers.paises.DesasignarMoneda);
router.get("/pais/monedas/:id", /*middleware.validarAdministrador,*/ controllers.paises.ListarMonedas);
router.get("/pais/planes/:iso", /*middleware.validarAdministrador,*/ controllers.paises.ListarPlanes);
router.post("/pais/modificar", /*middleware.validarAdministrador,*/ controllers.paises.Modificar);
//router.get('/pais/borrar/:id', /*middleware.validarAdministrador,*/ controllers.paises.Borrar);


//MODULO MONEDAS
router.get("/monedas", /*middleware.validarAdministrador,*/ controllers.monedas.Listar);
router.post("/moneda", /*middleware.validarAdministrador,*/ controllers.monedas.Nuevo);
//router.post('/pais/modificar', /*middleware.validarAdministrador,*/ controllers.paises.modificarPais);
//router.get('/moneda/borrar/:id', /*middleware.validarAdministrador,*/ controllers.monedas.borrarMoneda);


//PASARELAS
router.get("/pasarelas", /*middleware.validarAdministrador,*/ controllers.pasarelas.Listar);
router.post("/pasarelas/moneda", /*middleware.validarAdministrador,*/ controllers.pasarelas.ListarPorMoneda);
router.post("/pasarela", /*middleware.validarAdministrador,*/ controllers.pasarelas.Nuevo);
router.post("/pasarela/modificar", /*middleware.validarAdministrador,*/ controllers.pasarelas.Modificar);
router.post("/pasarela/moneda", /*middleware.validarAdministrador,*/ controllers.pasarelas.AsignarMoneda);
router.post("/pasarela/moneda/desasignar", /*middleware.validarAdministrador,*/ controllers.pasarelas.DesasignarMoneda);
router.get("/pasarela/monedas/:id", /*middleware.validarAdministrador,*/ controllers.pasarelas.ListarMonedas);
//router.get('/pasarela/borrar/:id', /*middleware.validarAdministrador,*/ controllers.pasarelas.Borrar);


//MODULO DE PLANES
router.get("/planes/comprar", controllers.planes.ListarFront);
router.post("/planes/aumentar", middleware.validarCliente, controllers.planes.PlanesSuperiores);
router.get("/planes", middleware.validarAdministrador, controllers.planes.ListarBack);
router.get("/plan/precios/:id", middleware.validarAdministrador, controllers.planes.ListarPrecios); // lista precios activos
router.post("/plan", middleware.validarAdministrador, controllers.planes.Nuevo); // ingresar Nuevo y un precio
router.post("/plan/caracteristicas", middleware.validarAdministrador, controllers.caracteristicas.Nuevos);
router.post("/plan/bloquear", middleware.validarAdministrador, controllers.planes.Bloquear);
router.post("/plan/modificar", middleware.validarAdministrador, controllers.planes.Modificar);



//MODULO DE PRECIOS
router.post("/precio", /*middleware.validarAdministrador,*/ controllers.precios.Nuevo); // inserta nuevos precio para un plan seleccionado
router.post("/precio/modificar", /*middleware.validarAdministrador,*/ controllers.precios.Modificar);
//router.get('/plan/borrar/:id', controllers.planes.borrarPlan);

router.get("/comisiones", controllers.pagos.ObtenerComisiones);

//MODULO LOGOS
router.post("/logos/estado", middleware.validarCliente, controllers.logos.listaLogosPorEstado);
router.post("/logos/por-aprobar", middleware.validarAdministrador, controllers.logos.listaLogosPorAprobar);
router.post("/logos/aprobados", controllers.logos.listaLogosAprobados);
router.get("/logos/:id/aprobados", middleware.validarAdministrador, controllers.logos.listaLogosAprobadosPorCliente);
router.get("/logos/:id/vendidos", controllers.logos.listaLogosVendidosPorCliente);
router.post("/logos/aprobados/destacados", controllers.logos.listaLogosAprobadosDestacados);
router.post("/logos/guardados", middleware.validarCliente, controllers.logos.listaLogosGuardados);
router.post("/logos/descargables", middleware.validarCliente, controllers.logos.listaLogosDescargables);
router.get("/logo/zip", middleware.validarCliente, controllers.logos.zip);
router.get("/logo/descargar", middleware.validarCliente, controllers.logos.descargar);
router.post("/logo/compartir-email", middleware.validarCliente, controllers.logos.enviarPorEmail);
router.get("/logo/compartido/:id", controllers.logos.obtenerBinario);
//router.get("/logo/compartir/:id", controllers.logos.htmlShare);
router.get("/logo/:id", middleware.validarCliente, controllers.logos.datosLogo); //muestra los datos de un logo por su id
router.post("/logo/guardar", middleware.validarCliente, controllers.logos.guardar);
router.post("/logo/plan/caracteristicas", middleware.validarCliente, controllers.caracteristicas.PlanConCaracteristicas);
//Usuario diseñador
router.post("/logo/por-aprobar", middleware.validarCliente, controllers.logos.porAprobar);
//Administrador
router.post("/logo/aprobar", middleware.validarAdministrador, controllers.logos.aprobar);
router.post("/logo/destacar", middleware.validarAdministrador, controllers.logos.Destacar);

router.post("/logo/calificar-admin", middleware.validarAdministrador, controllers.atributos.CalificarAdministrador);
router.post("/logo/calificar-cliente", middleware.validarCliente, controllers.atributos.CalificarCliente);

router.post("/logo/modificar", middleware.validarCliente, controllers.logos.modificarLogo);
router.get("/logo/borrar/:id", controllers.logos.Borrar);



//MODULO PAPELERIA
router.get("/papeleria/usuario", middleware.validarCliente, controllers.papeleria.ObtenerPorUsuario)

router.get("/papeleria/tipos", controllers.tipos.ObtenerTodos);
router.get("/papeleria/tipos/:id/modelos", controllers.modelos.ObtenerPorTipo);

router.post("/papeleria/pieza", middleware.validarCliente ,controllers.papeleria.Guardar);

//RECUPERAR CONTRASEÑA
router.post("/recuperar-password", controllers.password.enviarToken); //enviar campo tipo 
router.get("/recuperar-password/:tk", controllers.password.confirmarToken);
router.post("/cambiar-password", controllers.password.cambiar);

//PARA PRUEBAS
router.post("/prueba", middleware.pruebas);


module.exports = router;