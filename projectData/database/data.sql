-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: meow_db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE `meow_db` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `meow_db`;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(50) NOT NULL,
  `productPrice` decimal(10,0) NOT NULL,
  `shortDescription` varchar(120) NOT NULL,
  `nutritionalDetail` varchar(500) NOT NULL,
  `productCategory` varchar(50) NOT NULL,
  `productImage` varchar(50) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Products`
--
INSERT INTO products (product_id, productName, productPrice, shortDescription, nutritionalDetail, productCategory, productImage) VALUES
(1, 'Pescado', 590, 'Trocitos de la mejor variedad de pescados con una deliciosa salsa ligera, 100% húmedo y sabroso!', 'Es un alimento completo y balanceado, 100% húmedo y sabroso! Está hecho con trocitos de la mejor variedad de pescados con una deliciosa salsa ligera, que aportan a tu gato los nutrientes que necesita para mantenerse sano y fuerte. Además, su textura y sabor son ideales para aquellos que tienen el paladar exigente.', 'cachorro', 'pescado.jpeg'),
(2, 'Salmon', 600, 'Sabrosos trocitos de salmón horneado a fuego lento, que tu gato no podrá resistirse.', 'Es un alimento húmedo 100% super sabroso, completo y balanceado. Hecho de delicados trozos de salmón, sumergidos en una abundante salsa ligera y deliciosa. Es ideal para los gatos fanáticos y para aquellos que tienen el paladar exigente. Aporta a tu gato los nutrientes que necesita para mantenerse sano y fuerte!', 'adulto', 'salmon.jpeg'),
(3, 'Carne', 500, 'Suaves trocitos de la mejor carne de vaca cocidos al vapor con salsa, 100% húmedo y sabroso!', 'Es un alimento completo y equilibrado, 100% húmedo que contiene suaves trocitos de carne de vaca cocidos al vapor con salsa. Formulado con proteínas de origen animal que ayudan a proporcionar los nutrientes que tu gato necesita todos los días para estar saludable. Cada porción contribuye con la vitalidad y energía necesarias para explorar el mundo!', 'senior', 'carne.jpeg'),
(4, 'Vegetales', 490, 'La mejor selección de vegetales para lograr un balance perfecto en la alimentación de tu gato.', 'Es un alimento completo y equilibrado que ayuda a mantener un buen estado de salud. Los mejores vegetales seleccionados cuidadosamente para lograr un balance perfecto en la alimentación de tu gato. Proporciona un aporte calórico moderado perfectamente adaptado a las necesidades del gato con actividad moderada, que ayuda a mantener un buen estado de salud.', 'adulto', 'vegetariano.jpeg'),
(5, 'Pollo', 360, 'Deliciosos trocitos de pollo con abundante salsa, para que tu gato disfrute en cualquier momento.', 'Es un alimento completo y equilibrado, 100% húmedo super sabroso. Cada porción combina un sabor delicado, que lo hace delicioso y nutritivo! Formulado con proteínas de pollo, 90% de pechuga y muslo con abundante salsa, para que tu gato disfrute en cualquier momento. Proporciona un aporte calórico moderado perfectamente adaptado a las necesidades del gato con actividad moderada, que ayuda a mantener un buen estado de salud.', 'senior', 'pollo.jpeg'),
(6, 'Atún', 390, 'Delicados trozos de atún con una deliciosa salsa, ideal para aquellos que tienen el paladar exigente.', 'Es un alimento húmedo 100% super sabroso, completo y balanceado. Hecho de delicados trozos de atún, sumergidos en una abundante salsa ligera y deliciosa. Es ideal para los gatos fanáticos de las salsas y para aquellos que tienen el paladar exigente. Aporta a tu gato los nutrientes que necesita para mantenerse sano y fuerte!', 'cachorro', 'atun.jpeg'),
(7, 'Mix Saludable', 700, 'La mejor selección Mix Saludable para lograr un balance perfecto en la alimentación de tu gato.', 'Es un alimento completo y equilibrado, 100% húmedo super sabroso. Cada porción combina un sabor delicado, que lo hace delicioso y nutritivo! Formulado con la mejor selección de productos y con abundante salsa, para que tu gato disfrute en cualquier momento. Proporciona un aporte calórico moderado perfectamente adaptado a las necesidades del gato con actividad moderada, que ayuda a mantener un buen estado de salud.', 'adulto','mixsaludable.jpeg'),
(8, 'Mix Keto', 860, 'La mejor selección Mix Saludable para lograr un balance perfecto en la alimentación de tu gato.', 'Es un alimento completo y equilibrado, 100% húmedo super sabroso. Cada porción combina alimentos ricos en grasas buenas y proteínas, como pescado, aguacate, aceite de coco y de oliva, que lo hace delicioso y nutritivo! Formulado con la mejor selección de productos y con abundante salsa, para que tu gato disfrute en cualquier momento.', 'senior', 'mixketo.jpeg' );

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `confirmPassword` varchar(100) NOT NULL,
  `image` varchar(50) NOT NULL,
  `rights` varchar(3),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
--
-- Dumping data for table `Users`
--
INSERT INTO users (user_id, name, email, password, confirmpassword, image, rights) VALUES
(1,'Administrador', 'mariano@meow.com.ar', '$2b$10$.J53TYq7.2gb/lHQZjroO.7pxVLj/jK4wIrG3d87dUCwIBIO83H/m', '$2b$10$.J53TYq7.2gb/lHQZjroO.7pxVLj/jK4wIrG3d87dUCwIBIO83H/m', 'avatar-1632319528085.png', '2'),
(2,'Administrador', 'analia@meow.com.ar', '$2b$10$.J53TYq7.2gb/lHQZjroO.7pxVLj/jK4wIrG3d87dUCwIBIO83H/m', '$2b$10$.J53TYq7.2gb/lHQZjroO.7pxVLj/jK4wIrG3d87dUCwIBIO83H/m', 'avatar-1632313845304.jpg', '2'),
(3,'Administrador', 'natalia@meow.com.ar', '$2b$10$.J53TYq7.2gb/lHQZjroO.7pxVLj/jK4wIrG3d87dUCwIBIO83H/m', '$2b$10$.J53TYq7.2gb/lHQZjroO.7pxVLj/jK4wIrG3d87dUCwIBIO83H/m', 'avatar-1632322870487.jpg', '2');

--
-- Table structure for table `carts`
--
DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `orderNumber` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `payment` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `items_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;