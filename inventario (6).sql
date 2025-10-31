-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2025 a las 21:16:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `id` bigint(20) NOT NULL,
  `producto_nombre` varchar(100) NOT NULL,
  `tipo` enum('Ingreso','Salida') NOT NULL,
  `cantidad` int(11) NOT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `proveedor` varchar(255) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`id`, `producto_nombre`, `tipo`, `cantidad`, `detalle`, `proveedor`, `fecha`) VALUES
(22, 'Oreos Mangeku', 'Ingreso', 100, 'Producto en perfecta calidad', 'WhistonCandys', '2025-10-31 02:25:45'),
(23, 'Trululu Max', 'Ingreso', 100, 'Producto en perfecta calidad', 'WhistonCandys', '2025-10-31 02:28:08'),
(24, 'Chocolate Sublime', 'Ingreso', 100, 'Producto en perfecta calidad', 'Haribo', '2025-10-31 02:28:17'),
(25, 'Inka Kola 500ml', 'Ingreso', 100, 'Producto en perfecta calidad', 'WhistonCandys', '2025-10-31 02:28:36'),
(26, 'Cheetos Queso', 'Ingreso', 100, 'Producto en perfecta calidad', 'Coca Cola Perú', '2025-10-31 02:28:50'),
(27, 'Agua San Luis 625ml', 'Ingreso', 100, 'Producto en perfecta calidad', 'Nestlé Perú', '2025-10-31 02:29:09'),
(28, 'Galletas Morochas', 'Ingreso', 100, 'Producto en perfecta calidad', 'WhistonCandys', '2025-10-31 02:29:20'),
(29, 'Gomitas Trolli', 'Ingreso', 100, 'Producto en perfecta calidad', 'WhistonCandys', '2025-10-31 02:29:57'),
(30, 'Pringles Original', 'Ingreso', 100, 'Producto en perfecta calidad', 'WhistonCandys', '2025-10-31 02:30:08'),
(31, 'Monster Energy', 'Ingreso', 100, 'Producto en perfecta calidad', 'Nestlé Perú', '2025-10-31 02:30:16'),
(32, 'Café Altomayo', 'Ingreso', 100, 'Producto en perfecta calidad', 'Altomayo', '2025-10-31 02:30:29'),
(33, 'Downy', 'Ingreso', 100, 'Producto en perfecta calidad', 'Nestlé Perú', '2025-10-31 02:30:53'),
(35, 'Oreos Mangeku', 'Salida', 20, 'Producto entregado en correcta calidad', NULL, '2025-10-31 05:03:35'),
(36, 'Oreos Mangeku', 'Ingreso', 20, 'Producto en perfecta calidad', 'WhistonCandys', '2025-10-31 05:04:09'),
(37, 'Oreos Mangeku', 'Salida', 10, 'Producto entregado en correcta calidad', NULL, '2025-10-31 05:05:06'),
(38, 'Trululu Max', 'Salida', 11, 'Producto entregado en correcta calidad', NULL, '2025-10-31 05:05:12'),
(39, 'Chocolate Sublime', 'Salida', 12, 'Producto entregado en correcta calidad', NULL, '2025-10-31 05:05:20'),
(40, 'Inka Kola 500ml', 'Salida', 13, 'Producto entregado en correcta calidad', NULL, '2025-10-31 05:05:27'),
(41, 'Cheetos Queso', 'Salida', 14, 'Producto entregado en correcta calidad', NULL, '2025-10-31 05:05:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `proveedor1` varchar(255) DEFAULT NULL,
  `proveedor2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `proveedor1`, `proveedor2`) VALUES
(1, 'Oreos Mangeku', 'Disney', 16.99, 90, 'WhistonCandys', 'molitalia'),
(2, 'Trululu Max', 'pollonet', 5.99, 89, 'WhistonCandys', 'Haribo'),
(3, 'Chocolate Sublime', 'Tableta de chocolate con maní 30g', 2.5, 88, 'Nestlé Perú', 'Haribo'),
(4, 'Inka Kola 500ml', 'Gaseosa peruana de sabor inconfundible', 3.5, 87, 'WhistonCandys', 'Altomayo'),
(5, 'Cheetos Queso', 'Snack de maíz sabor queso 90g', 4.2, 86, 'Coca Cola Perú', ''),
(6, 'Agua San Luis 625ml', 'Agua mineral sin gas', 2, 100, 'Nestlé Perú', 'WhistonCandys'),
(7, 'Galletas Morochas', 'Galleta con cobertura de chocolate', 3, 100, 'WhistonCandys', 'Coca Cola Perú'),
(8, 'Gomitas Trolli', 'Gomitas surtidas 100g', 4.5, 100, 'WhistonCandys', 'Haribo'),
(9, 'Pringles Original', 'Snack de papa sabor original', 7, 100, 'WhistonCandys', 'Altomayo'),
(10, 'Monster Energy', 'Bebida energética lata 473ml', 9, 100, 'Nestlé Perú', 'Altomayo'),
(11, 'Café Altomayo', 'Café molido peruano 250g', 18.99, 100, 'Coca Cola Perú', 'Altomayo'),
(12, 'Downy', '', 2, 100, 'Nestlé Perú', 'Altomayo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `contacto`, `telefono`) VALUES
(2, 'WhistonCandys', 'AV. Garcilazo Puno 789, Lima', '987267845'),
(3, 'Nestlé Perú', 'Av. Javier Prado 456, Lima', '987654321'),
(4, 'Coca Cola Perú', 'Av. Argentina 1200, Callao', '976543210'),
(5, 'FritoLay', 'Av. Industrial 789, Lima', '945123678'),
(6, 'Haribo', 'Av. Los Rosales 789, Arequipa', '954789123'),
(8, 'Monster Co.', 'Av. Principal 987, Lima', '978654321'),
(9, 'Altomayo', 'Av. Amazonas 654, Chiclayo', '934567890'),
(10, 'molitalia', 'garzon usuares av', '987678567');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `password`, `rol`) VALUES
(3, 'Ashton', 'Jara', 'vera@gmail.com', '123456', 'vendedor'),
(14, 'Carlos', 'Ramírez', 'carlos.ramirez@gmail.com', '123456', 'vendedor'),
(15, 'Lucía', 'Fernández', 'lucia.fernandez@gmail.com', '123456', 'admin'),
(16, 'Pedro', 'Castro', 'pedro.castro@gmail.com', '123456', 'vendedor'),
(17, 'Ana', 'Lopez', 'ana.lopez@gmail.com', '123456', 'vendedor'),
(18, 'Jorge', 'Torres', 'jorge.torres@gmail.com', '123456', 'cliente'),
(19, 'Sofía', 'Martínez', 'sofia.martinez@gmail.com', '123456', 'cliente'),
(20, 'Luis', 'Gutiérrez', 'luis.gutierrez@gmail.com', '123456', 'cliente'),
(21, 'Juana', 'Lima', 'veraaaaa@gmail.com', '123456', 'admin'),
(25, 'Jeremy', 'Prueba', 'jeremy@gmail.com', '123456', 'ADMIN'),
(28, 'Admin', 'Principal', 'admin@gmail.com', '123456', 'ADMIN');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
