-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2017 a las 11:15:26
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'Negocio'),
(2, 'Ingenieria'),
(3, 'Abstractos');

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
  `pais` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `nombreCliente`, `correo`, `pass`, `telefono`, `pais`) VALUES
(1, 'Cliente 1', 'correo@gmail.com', 'passssssssss', '0909090090090', 'Haiti'),
(2, 'Cliente 2', 'correo2@gmail.com', 'paaaassss2', '34534455555', 'Colombia');

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

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`idElemento`, `nombre`, `url`, `svg`, `color`, `tipo`, `comprado`, `categorias_idCategoria`) VALUES
(1, 'Elemento-1', 'url-1', NULL, NULL, 'ICONO', 0, 1),
(2, 'Elemento-2', 'url-2', NULL, NULL, 'ICONO', 0, 1),
(3, 'Elemento-3', 'url-3', NULL, NULL, 'ICONO', 0, 2),
(4, 'Elemento-4', 'url-4', NULL, NULL, 'ICONO', 0, 2),
(5, 'Elemento-5', 'url-5', NULL, NULL, 'ICONO', 0, 1),
(6, 'Elemento-6', 'url-6', NULL, NULL, 'ICONO', 0, 1),
(7, 'Elemento-7', 'url-7', NULL, NULL, 'ICONO', 0, 2),
(8, 'Elemento-8', 'url-8', NULL, NULL, 'ICONO', 0, 2);

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

--
-- Volcado de datos para la tabla `elementos_has_preferencias`
--

INSERT INTO `elementos_has_preferencias` (`elementos_idElemento`, `preferencias_idPreferencia`, `valor`) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 0),
(1, 4, 1),
(1, 5, 2),
(1, 6, 0),
(1, 7, 1),
(2, 1, 1),
(2, 2, 2),
(2, 3, 0),
(2, 4, 1),
(2, 5, 2),
(2, 6, 0),
(2, 7, 1),
(3, 1, 1),
(3, 2, 2),
(3, 3, 0),
(3, 4, 1),
(3, 5, 2),
(3, 6, 0),
(3, 7, 1),
(4, 1, 2),
(4, 2, 1),
(4, 3, 0),
(4, 4, 2),
(4, 5, 1),
(4, 6, 1),
(4, 7, 2),
(5, 1, 2),
(5, 2, 1),
(5, 3, 0),
(5, 4, 2),
(5, 5, 1),
(5, 6, 1),
(5, 7, 2),
(6, 1, 2),
(6, 2, 1),
(6, 3, 0),
(6, 4, 2),
(6, 5, 1),
(6, 6, 1),
(6, 7, 2),
(7, 1, 2),
(7, 2, 1),
(7, 3, 0),
(7, 4, 2),
(7, 5, 1),
(7, 6, 1),
(7, 7, 2),
(8, 1, 2),
(8, 2, 2),
(8, 3, 0),
(8, 4, 2),
(8, 5, 1),
(8, 6, 1),
(8, 7, 2);

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
-- Estructura de tabla para la tabla `logos`
--

CREATE TABLE `logos` (
  `idLogo` int(11) NOT NULL,
  `tipoLogo` enum('Editable','Descargable') NOT NULL,
  `logo` text NOT NULL,
  `clientes_idCliente` int(11) NOT NULL,
  `elementos_idElemento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `logos`
--

INSERT INTO `logos` (`idLogo`, `tipoLogo`, `logo`, `clientes_idCliente`, `elementos_idElemento`) VALUES
(1, 'Descargable', 'LOGO1 ', 1, 1),
(2, 'Editable', 'LOGO 2', 1, 2),
(3, 'Editable', 'LOGO 3', 2, 3),
(4, 'Descargable', 'LOGO 4', 2, 4),
(5, 'Descargable', 'Logo 5', 2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` enum('EN ESPERA','CANCELADO','COMPLETADO','EN PROCESO') NOT NULL,
  `tipoP` int(11) NOT NULL,
  `logos_idLogo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `fecha`, `estado`, `tipoP`, `logos_idLogo`) VALUES
(1, '2017-03-01', 'EN ESPERA', 1, 1),
(2, '2017-03-01', 'EN ESPERA', 1, 4),
(3, '2017-03-03', 'EN ESPERA', 2, 5);

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
(1, 'Femenino', 'Masculino'),
(2, 'Economico', 'Lujoso'),
(3, 'Clasico', 'Moderno'),
(4, 'Sutil', 'Evidente'),
(5, 'Simple', 'Detallado'),
(6, 'Joven', 'Adulto'),
(7, 'Formal', 'Divertido');

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
-- Índices para tablas volcadas
--

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
-- Indices de la tabla `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`idLogo`,`elementos_idElemento`),
  ADD KEY `fk_logos_clientes_idx` (`clientes_idCliente`),
  ADD KEY `fk_logos_elementos1_idx` (`elementos_idElemento`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `fk_pedidos_logos1_idx` (`logos_idLogo`);

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
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `idElemento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `idEtiqueta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `logos`
--
ALTER TABLE `logos`
  MODIFY `idLogo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `idPreferencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

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
-- Filtros para la tabla `logos`
--
ALTER TABLE `logos`
  ADD CONSTRAINT `fk_logos_clientes` FOREIGN KEY (`clientes_idCliente`) REFERENCES `clientes` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_logos_elementos1` FOREIGN KEY (`elementos_idElemento`) REFERENCES `elementos` (`idElemento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_logos1` FOREIGN KEY (`logos_idLogo`) REFERENCES `logos` (`idLogo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
