-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: 25beneficios
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `canjes`
--

LOCK TABLES `canjes` WRITE;
/*!40000 ALTER TABLE `canjes` DISABLE KEYS */;
INSERT INTO `canjes` (`id`, `cupon_id`, `codigo_canjeado`, `fecha_canje`, `fecha_creacion`, `fecha_actualizacion`, `usuario_id`) VALUES (1,1,'8450','2025-09-26 01:16:05','2025-09-26 01:16:05','2025-09-26 01:16:05',3);
/*!40000 ALTER TABLE `canjes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cupones`
--

LOCK TABLES `cupones` WRITE;
/*!40000 ALTER TABLE `cupones` DISABLE KEYS */;
INSERT INTO `cupones` (`id`, `codigo`, `descripcion`, `valor`, `fecha_expiracion`, `estado`, `fecha_creacion`, `fecha_actualizacion`) VALUES (1,'8450','Descuento del 60%',60.00,'2028-01-17 00:00:00',3,'2025-09-25 15:28:53','2025-09-26 01:16:02'),(2,'7802','Cupón del 30%',20.00,'2025-11-15 00:00:00',1,'2025-09-25 20:22:45','2025-09-26 00:36:22');
/*!40000 ALTER TABLE `cupones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `estados_cupon`
--

LOCK TABLES `estados_cupon` WRITE;
/*!40000 ALTER TABLE `estados_cupon` DISABLE KEYS */;
INSERT INTO `estados_cupon` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES (1,'Activo','2025-09-25 15:27:00','2025-09-25 15:27:00'),(2,'Inactivo','2025-09-25 15:27:00','2025-09-25 15:27:00'),(3,'Canjeado','2025-09-25 15:27:00','2025-09-25 15:27:00'),(4,'expirado','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `estados_cupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `nombre`, `descripcion`, `createdAt`, `updatedAt`, `fecha_creacion`, `fecha_actualizacion`, `estado`) VALUES (1,'Super Admin','Administrador con todos los permisos del sistema','2025-09-25 13:30:50','2025-09-25 13:30:50','2025-09-25 20:48:08','2025-09-25 20:48:08',1),(3,'Cliente','Usuario cliente del sistema','0000-00-00 00:00:00','0000-00-00 00:00:00','2025-09-25 20:49:43','2025-09-25 20:51:08',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `username`, `password`, `id_rol`, `fecha_creacion`, `fecha_actualizacion`, `estado`) VALUES (2,'Santino','$2b$10$lqnCZjlBWxgGsSmcCktKuuUy4Fr7Opnb2SDpk5ZOn8C/krjkILnt6',1,'2025-09-25 20:48:07','2025-09-26 00:26:38',1),(3,'Eliseo','$2b$10$EYxAxdIWFoXLEWDcvZnynOMAjmVeL3C9DmuXbOx/Oxwpa6KgOF1IO',3,'2025-09-25 20:51:27','2025-09-26 00:23:20',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-26  3:26:17
