CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.28

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

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Daniel','Sternin','admin@admin.com','a0b512b11a82449ba05c0b58bebb45e0','ADMIN'),(2,'Daniel','','user@user.com','9339c43bb00cbf8627c85976b2c4ba61','USER'),(3,'Elon','Musk','elon.musk@tesla.com','04e0cd15adbe4545dd2a8251a4a4b862','USER'),(4,'Eden','','eden@gmail.com','a0b512b11a82449ba05c0b58bebb45e0','USER'),(5,'Lior','Aviv','lior.aviv@gmail.com','c2e6b430f82200b85e47044fe015ac88','USER'),(6,'Tomer','Cohen','tomerc@walla.com','eaadea2d447d6da701aceb07e01e0f5f','USER'),(7,'Maya','','maya@gmail.com','c2e6b430f82200b85e47044fe015ac88','USER'),(8,'Tal','Levi','tal.levi@gmail.com','c2e6b430f82200b85e47044fe015ac88','USER'),(9,'Shimi','Gabon','shimiii@walla.com','a0b512b11a82449ba05c0b58bebb45e0','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation_likes`
--

DROP TABLE IF EXISTS `vacation_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation_likes` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `user_id_fk_idx` (`user_id`),
  KEY `vacation_id_fk_idx` (`vacation_id`),
  CONSTRAINT `FK_userId` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_vacationId` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation_likes`
--

LOCK TABLES `vacation_likes` WRITE;
/*!40000 ALTER TABLE `vacation_likes` DISABLE KEYS */;
INSERT INTO `vacation_likes` VALUES (2,3),(2,4),(2,5),(2,6),(3,7),(4,2),(4,3),(4,4),(5,1),(5,2),(5,3),(5,4),(5,6),(6,3),(7,1),(7,3),(7,5),(7,6),(7,7),(8,2),(8,3),(8,5),(9,2),(9,3),(9,4);
/*!40000 ALTER TABLE `vacation_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image_url` varchar(200) NOT NULL,
  `price` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Dubai','United Arab Emirates','Once a small fishing village in the Arabian Gulf, Dubai is today one of the most cosmopolitan cities in the world. One of the seven emirates that make up the United Arab Emirates, the city is home to more than 200 nationalities and offers an unforgettable experience to all visitors. Whether it is by the banks of the Creek, or at the top of the Burj Khalifa, the world’s tallest building, Dubai lives and breathes a sense of possibility and innovation.','/images/vacations/dubai.png',499,'2022-05-05','2022-05-09'),(2,'London','England','London is a megalopolis of people, ideas and frenetic energy. The capital and largest city of both England and of the United Kingdom, it is also the largest city in Western Europe. Situated on the River Thames in South-East England, Greater London has an official population of a little over 8 million. However, London\'s urban area stretched to 9,787,426 in 2011, while the figure of 14 million for the city\'s wider metropolitan area more accurately reflects its size and importance.','/images/vacations/london.jpg',599,'2022-05-01','2022-05-07'),(3,'Paris','France','For centuries Paris has been one of the world’s most important and attractive cities. It is appreciated for the opportunities it offers for business and commerce, for study, for culture, and for entertainment; its haute couture, painting, literature, and intellectual community especially enjoy an enviable reputation. Its sobriquet “the City of Light” earned during the Enlightenment, remains appropriate, for Paris has retained its importance as a centre for education and intellectual pursuits.','/images/vacations/paris.jpg',395,'2022-04-25','2022-04-29'),(4,'Las Vegas','United States','The only major city in the American West to have been founded in the 20th century, Las Vegas grew from a tiny, desert-bound railroad service centre at the outset of the 20th century to the country’s fastest-growing metropolis at century’s end. Las Vegas is the Entertainment Capital of the World. It is located in the Mojave Desert of Southern Nevada.','/images/vacations/vegas.jpg',949,'2022-06-04','2022-06-18'),(5,'Madrid','Spain','Madrid’s status as the national capital reflects the centralizing policy of the 16th-century Spanish king Philip II and his successors. The choice of Madrid, however, was also the result of the city’s previous obscurity and neutrality: it was chosen because it lacked ties with an established nonroyal power rather than because of any strategic, geographic, or economic considerations. Indeed, Madrid is deficient in other characteristics that might qualify it for a leading role.','/images/vacations/madrid.jpg',549,'2022-05-11','2022-05-21'),(6,'Athens','Greece','Athens is the capital city of Greece with a registered metropolitan population of 3.7 million inhabitants, but indeed there are 5 million people estimated. It is in many ways the birthplace of Classical Greece and a large part of Western civilization. The design of the city is marked by Ottoman, Byzantine and Roman civilizations. Today, greater Athens is by far the economic, political and cultural center of modern Greece, with nearly half of the country\'s population.','/images/vacations/athens.jpeg',359,'2022-06-11','2022-06-17'),(7,'Mars','The Sun','Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often called the \"Red Planet\". The latter refers to the effect of the iron oxide prevalent on Mars\'s surface, which gives it a striking reddish appearance in the sky. Mars is a terrestrial planet with a thin atmosphere, with surface features such as impact craters, valleys, dunes, and polar ice caps.','/images/vacations/mars.jpg',50000,'2026-01-01','2026-06-30');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-23 23:28:09
