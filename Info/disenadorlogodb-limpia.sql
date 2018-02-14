-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2018 a las 17:14:39
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `disenadorlogodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributos`
--

CREATE TABLE `atributos` (
  `idAtributo` int(11) NOT NULL,
  `clave` varchar(45) NOT NULL,
  `valor` varchar(255) NOT NULL,
  `logos_idLogo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas`
--

CREATE TABLE `caracteristicas` (
  `idCaracteristica` int(11) NOT NULL,
  `clave` varchar(45) NOT NULL,
  `valor` text NOT NULL,
  `descripcion` text,
  `planes_idPlan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `caracteristicas`
--

INSERT INTO `caracteristicas` (`idCaracteristica`, `clave`, `valor`, `descripcion`, `planes_idPlan`) VALUES
(1, 'resolucion', '1', 'Logo en Alta Resolución.', 1),
(2, 'png', '1', 'Archivo Png Transparente.', 1),
(3, 'editable', '0', 'Archivo editable con la  tipografia incluida.', 1),
(4, 'manual', '0', 'Manual de marca.', 1),
(5, 'tamanios', '1', 'Tamaño del logo adaptado a papeleria y redes sociales.', 1),
(6, 'copia', '1', 'Copia de seguridad de por vida.', 1),
(7, 'licencia', '1', 'Licencia comercial.', 1),
(8, 'editable', '1', 'Archivo editable con la  tipografia incluida.', 2),
(9, 'resolucion', '1', 'Logo en Alta Resolución.', 2),
(10, 'manual', '1', 'Manual de marca.', 2),
(11, 'png', '1', 'Archivo Png Transparente.', 2),
(12, 'licencia', '1', 'Licencia comercial.', 2),
(13, 'copia', '1', 'Copia de seguridad de por vida.', 2),
(14, 'tamanios', '1', 'Tamaño del logo adaptado a papeleria y redes sociales.', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(45) NOT NULL,
  `tipo` enum('ICONO','FUENTE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `nombreCategoria`, `tipo`) VALUES
(1, 'Clasicas', 'FUENTE'),
(2, 'Llamativas', 'FUENTE'),
(3, 'Minimalista', 'FUENTE'),
(4, 'Moderna', 'FUENTE'),
(5, 'Abstractos', 'ICONO'),
(6, 'Agricultura y Ganaderia', 'ICONO'),
(7, 'Animales y Mascotas', 'ICONO'),
(8, 'Arte, Fotografía, Diseño', 'ICONO'),
(9, 'Automatizacion y Transporte', 'ICONO'),
(10, 'Belleza, Moda y Glamour', 'ICONO'),
(11, 'Comercio y Logistica', 'ICONO'),
(12, 'Construccion y arquitectura', 'ICONO'),
(13, 'Consultoria y Asesoramiento', 'ICONO'),
(14, 'Educacion y Formacion', 'ICONO'),
(15, 'Informatica y Sistemas', 'ICONO'),
(16, 'Jardin, Hogar y Naturaleza', 'ICONO'),
(17, 'Juegos y Deportes', 'ICONO'),
(18, 'Medicina y Farmacia', 'ICONO'),
(19, 'Musica, Entretenimiento', 'ICONO'),
(20, 'Religion y Espiritualidad', 'ICONO'),
(21, 'Comida, Restaurante, Hotel y Turismo', 'ICONO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL,
  `nombreCliente` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `bloqueado` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `nombreCliente`, `correo`, `pass`, `telefono`, `pais`, `foto`, `bloqueado`) VALUES
(1, 'cliente', 'cliente@gmail.com', '123456789', '123456789', 'AR', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `idElemento` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `url` varchar(100) DEFAULT NULL,
  `svg` text,
  `color` varchar(45) DEFAULT NULL,
  `tipo` enum('FUENTE','ICONO') NOT NULL,
  `comprado` int(11) NOT NULL,
  `categorias_idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_has_etiquetas`
--

CREATE TABLE `elementos_has_etiquetas` (
  `elementos_idElemento` int(11) NOT NULL,
  `etiquetas_idEtiqueta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_has_preferencias`
--

CREATE TABLE `elementos_has_preferencias` (
  `elementos_idElemento` int(11) NOT NULL,
  `preferencias_idPreferencia` int(11) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `idEtiqueta` int(11) NOT NULL,
  `nombreEtiqueta` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacion`
--

CREATE TABLE `facturacion` (
  `idFacturacion` int(11) NOT NULL,
  `medio` enum('Paypal','Uphold') NOT NULL,
  `correo` varchar(45) NOT NULL,
  `clientes_idCliente` int(11) NOT NULL,
  `borrado` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logos`
--

CREATE TABLE `logos` (
  `idLogo` int(11) NOT NULL,
  `estado` enum('Borrador','Por Aprobar','Aprobado','Editable','Descargable','Vendido') NOT NULL,
  `logo` text NOT NULL,
  `tipoLogo` enum('Logo y nombre','Tipografico','Solo nombre','') NOT NULL,
  `clientes_idCliente` int(11) NOT NULL,
  `elementos_idElemento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas`
--

CREATE TABLE `monedas` (
  `idMoneda` int(11) NOT NULL,
  `moneda` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `monedas`
--

INSERT INTO `monedas` (`idMoneda`, `moneda`) VALUES
(1, 'USD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas_has_paises`
--

CREATE TABLE `monedas_has_paises` (
  `monedas_idMoneda` int(11) NOT NULL,
  `paises_idPais` int(11) NOT NULL,
  `principal` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `monedas_has_paises`
--

INSERT INTO `monedas_has_paises` (`monedas_idMoneda`, `paises_idPais`, `principal`) VALUES
(1, 1, 1),
(1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `idPago` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` float NOT NULL,
  `facturacion_idFacturacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `idPais` int(11) NOT NULL,
  `iso` varchar(2) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `impuesto` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`idPais`, `iso`, `nombre`, `impuesto`) VALUES
(1, 'AR', 'Argentina', 0),
(2, 'US', 'Estados Unidos', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasarelas`
--

CREATE TABLE `pasarelas` (
  `idPasarela` int(11) NOT NULL,
  `pasarela` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pasarelas`
--

INSERT INTO `pasarelas` (`idPasarela`, `pasarela`) VALUES
(1, 'Paypal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasarelas_has_monedas`
--

CREATE TABLE `pasarelas_has_monedas` (
  `pasarelas_idPasarela` int(11) NOT NULL,
  `monedas_idMoneda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pasarelas_has_monedas`
--

INSERT INTO `pasarelas_has_monedas` (`pasarelas_idPasarela`, `monedas_idMoneda`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` enum('EN ESPERA','CANCELADO','COMPLETADO','EN PROCESO') NOT NULL,
  `logos_idLogo` int(11) NOT NULL,
  `precios_idPrecio` int(11) NOT NULL,
  `impuesto` float NOT NULL,
  `descuento` float DEFAULT NULL,
  `pasarelas_idPasarela` int(11) NOT NULL,
  `iso` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `idPlan` int(11) NOT NULL,
  `plan` varchar(45) NOT NULL,
  `status` int(1) NOT NULL,
  `info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`idPlan`, `plan`, `status`, `info`) VALUES
(1, 'Plan Básico', 1, 'Información del plan Básico'),
(2, 'Plan Profesional', 1, 'Descripción del plan profesional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `idPrecio` int(11) NOT NULL,
  `precio` float NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `planes_idPlan` int(11) NOT NULL,
  `monedas_idMoneda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`idPrecio`, `precio`, `status`, `planes_idPlan`, `monedas_idMoneda`) VALUES
(1, 9.9, 1, 1, 1),
(2, 36, 1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `idPreferencia` int(11) NOT NULL,
  `nombre1` varchar(45) NOT NULL,
  `nombre2` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`idPreferencia`, `nombre1`, `nombre2`) VALUES
(1, 'Simple', 'Detallado'),
(2, 'Sutil', 'Evidente'),
(3, 'Femenino', 'Masculino'),
(4, 'Economico', 'Lujoso'),
(5, 'Clásico', 'Moderno'),
(6, 'Formal', 'Divertido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUser` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `pass` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUser`, `correo`, `pass`) VALUES
(1, 'admin', 'admin@gmail.com', '123456789');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atributos`
--
ALTER TABLE `atributos`
  ADD PRIMARY KEY (`idAtributo`),
  ADD KEY `fk_atributos_logos1_idx` (`logos_idLogo`);

--
-- Indices de la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  ADD PRIMARY KEY (`idCaracteristica`),
  ADD KEY `fk_caracteristicas_planes1_idx` (`planes_idPlan`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`idElemento`),
  ADD KEY `fk_elementos_categorias1_idx` (`categorias_idCategoria`);

--
-- Indices de la tabla `elementos_has_etiquetas`
--
ALTER TABLE `elementos_has_etiquetas`
  ADD PRIMARY KEY (`elementos_idElemento`,`etiquetas_idEtiqueta`),
  ADD KEY `fk_elementos_has_categorias_categorias1_idx` (`etiquetas_idEtiqueta`),
  ADD KEY `fk_elementos_has_categorias_elementos1_idx` (`elementos_idElemento`);

--
-- Indices de la tabla `elementos_has_preferencias`
--
ALTER TABLE `elementos_has_preferencias`
  ADD PRIMARY KEY (`elementos_idElemento`,`preferencias_idPreferencia`),
  ADD KEY `fk_elementos_has_preferencias_preferencias1_idx` (`preferencias_idPreferencia`),
  ADD KEY `fk_elementos_has_preferencias_elementos1_idx` (`elementos_idElemento`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`idEtiqueta`);

--
-- Indices de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD PRIMARY KEY (`idFacturacion`),
  ADD KEY `fk_facturacion_clientes1_idx` (`clientes_idCliente`);

--
-- Indices de la tabla `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`idLogo`),
  ADD KEY `fk_logos_clientes_idx` (`clientes_idCliente`),
  ADD KEY `fk_logos_elementos1_idx` (`elementos_idElemento`);

--
-- Indices de la tabla `monedas`
--
ALTER TABLE `monedas`
  ADD PRIMARY KEY (`idMoneda`);

--
-- Indices de la tabla `monedas_has_paises`
--
ALTER TABLE `monedas_has_paises`
  ADD PRIMARY KEY (`monedas_idMoneda`,`paises_idPais`),
  ADD KEY `fk_monedas_has_paises_paises1_idx` (`paises_idPais`),
  ADD KEY `fk_monedas_has_paises_monedas1_idx` (`monedas_idMoneda`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `fk_pagos_facturacion1_idx` (`facturacion_idFacturacion`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`idPais`);

--
-- Indices de la tabla `pasarelas`
--
ALTER TABLE `pasarelas`
  ADD PRIMARY KEY (`idPasarela`);

--
-- Indices de la tabla `pasarelas_has_monedas`
--
ALTER TABLE `pasarelas_has_monedas`
  ADD PRIMARY KEY (`pasarelas_idPasarela`,`monedas_idMoneda`),
  ADD KEY `fk_pasarelas_has_monedas_monedas1_idx` (`monedas_idMoneda`),
  ADD KEY `fk_pasarelas_has_monedas_pasarelas1_idx` (`pasarelas_idPasarela`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `fk_pedidos_logos1_idx` (`logos_idLogo`),
  ADD KEY `fk_pedidos_precios1_idx` (`precios_idPrecio`),
  ADD KEY `fk_pedidos_pasarelas1_idx` (`pasarelas_idPasarela`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`idPlan`);

--
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`idPrecio`),
  ADD KEY `fk_precios_planes1_idx` (`planes_idPlan`),
  ADD KEY `fk_precios_monedas1_idx` (`monedas_idMoneda`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`idPreferencia`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atributos`
--
ALTER TABLE `atributos`
  MODIFY `idAtributo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  MODIFY `idCaracteristica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `idElemento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `idEtiqueta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturacion`
--
ALTER TABLE `facturacion`
  MODIFY `idFacturacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logos`
--
ALTER TABLE `logos`
  MODIFY `idLogo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `monedas`
--
ALTER TABLE `monedas`
  MODIFY `idMoneda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `idPais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pasarelas`
--
ALTER TABLE `pasarelas`
  MODIFY `idPasarela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `idPlan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `precios`
--
ALTER TABLE `precios`
  MODIFY `idPrecio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `idPreferencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atributos`
--
ALTER TABLE `atributos`
  ADD CONSTRAINT `fk_atributos_logos1` FOREIGN KEY (`logos_idLogo`) REFERENCES `logos` (`idLogo`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  ADD CONSTRAINT `fk_caracteristicas_planes1` FOREIGN KEY (`planes_idPlan`) REFERENCES `planes` (`idPlan`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD CONSTRAINT `fk_elementos_categorias1` FOREIGN KEY (`categorias_idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `elementos_has_etiquetas`
--
ALTER TABLE `elementos_has_etiquetas`
  ADD CONSTRAINT `fk_elementos_has_categorias_categorias1` FOREIGN KEY (`etiquetas_idEtiqueta`) REFERENCES `etiquetas` (`idEtiqueta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_elementos_has_categorias_elementos1` FOREIGN KEY (`elementos_idElemento`) REFERENCES `elementos` (`idElemento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `elementos_has_preferencias`
--
ALTER TABLE `elementos_has_preferencias`
  ADD CONSTRAINT `fk_elementos_has_preferencias_elementos1` FOREIGN KEY (`elementos_idElemento`) REFERENCES `elementos` (`idElemento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_elementos_has_preferencias_preferencias1` FOREIGN KEY (`preferencias_idPreferencia`) REFERENCES `preferencias` (`idPreferencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturacion`
--
ALTER TABLE `facturacion`
  ADD CONSTRAINT `fk_facturacion_clientes1` FOREIGN KEY (`clientes_idCliente`) REFERENCES `clientes` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `logos`
--
ALTER TABLE `logos`
  ADD CONSTRAINT `fk_logos_clientes` FOREIGN KEY (`clientes_idCliente`) REFERENCES `clientes` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_logos_elementos1` FOREIGN KEY (`elementos_idElemento`) REFERENCES `elementos` (`idElemento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `monedas_has_paises`
--
ALTER TABLE `monedas_has_paises`
  ADD CONSTRAINT `fk_monedas_has_paises_monedas1` FOREIGN KEY (`monedas_idMoneda`) REFERENCES `monedas` (`idMoneda`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_monedas_has_paises_paises1` FOREIGN KEY (`paises_idPais`) REFERENCES `paises` (`idPais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `fk_pagos_facturacion1` FOREIGN KEY (`facturacion_idFacturacion`) REFERENCES `facturacion` (`idFacturacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pasarelas_has_monedas`
--
ALTER TABLE `pasarelas_has_monedas`
  ADD CONSTRAINT `fk_pasarelas_has_monedas_monedas1` FOREIGN KEY (`monedas_idMoneda`) REFERENCES `monedas` (`idMoneda`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pasarelas_has_monedas_pasarelas1` FOREIGN KEY (`pasarelas_idPasarela`) REFERENCES `pasarelas` (`idPasarela`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_logos1` FOREIGN KEY (`logos_idLogo`) REFERENCES `logos` (`idLogo`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedidos_pasarelas1` FOREIGN KEY (`pasarelas_idPasarela`) REFERENCES `pasarelas` (`idPasarela`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedidos_precios1` FOREIGN KEY (`precios_idPrecio`) REFERENCES `precios` (`idPrecio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `precios`
--
ALTER TABLE `precios`
  ADD CONSTRAINT `fk_precios_monedas1` FOREIGN KEY (`monedas_idMoneda`) REFERENCES `monedas` (`idMoneda`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_precios_planes1` FOREIGN KEY (`planes_idPlan`) REFERENCES `planes` (`idPlan`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
