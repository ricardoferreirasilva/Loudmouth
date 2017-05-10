-- MySQL dump 10.13  Distrib 5.5.50, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: loudmouth
-- ------------------------------------------------------
-- Server version	5.5.50-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `loudmouth`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `loudmouth` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `loudmouth`;

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatroom` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator_id` bigint(20) unsigned NOT NULL,
  `chat_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `chatroom_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom`
--

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;
INSERT INTO `chatroom` VALUES (2,2,'Happy chat.');
/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invite`
--

DROP TABLE IF EXISTS `invite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invite` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `chat_room` bigint(20) unsigned NOT NULL,
  `inviter` bigint(20) unsigned NOT NULL,
  `invitee` bigint(20) unsigned NOT NULL,
  `send_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `chat_room` (`chat_room`),
  KEY `inviter` (`inviter`),
  KEY `invitee` (`invitee`),
  CONSTRAINT `invite_ibfk_1` FOREIGN KEY (`chat_room`) REFERENCES `chatroom` (`id`),
  CONSTRAINT `invite_ibfk_2` FOREIGN KEY (`inviter`) REFERENCES `user` (`id`),
  CONSTRAINT `invite_ibfk_3` FOREIGN KEY (`invitee`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite`
--

LOCK TABLES `invite` WRITE;
/*!40000 ALTER TABLE `invite` DISABLE KEYS */;
/*!40000 ALTER TABLE `invite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` bigint(20) unsigned NOT NULL,
  `chat_id` bigint(20) unsigned NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `send_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chatroom` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,2,2,'I have send the first message!','2017-04-27 16:51:43');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','Ricardo','Silva','shadilay',NULL),(2,'john','John','Smith','carlgustav18',NULL),(3,'mike18','Mike','Dasley','marcheist',NULL),(23,'tansvanio@hotmail.com','Ricardo','Ferreira da Silva','sha1$f19528de$1$59462301b5ccdc11b79cfb54dc649bd067',NULL),(25,'teste@hotmail.com','Quim','Barreiros','sha1$18f239d5$1$c94d4d6ea707c687ea34f751b02e652ec2',NULL),(26,'asdasd','diogoasdasda','asdasdasdasd','sha1$7ae81fae$1$d5914f6187abefeb0085813660da1b66a8',NULL),(27,'qweqweqweq','qweqweqweq','qweqweqweqweqweqw','sha1$6edbf1ef$1$ff4200cee3a2a99d096f0fbbfd6a2ba182',NULL),(28,'diogo@coise.html','diogo','cruz','sha1$91f29479$1$a772468fa2a4e41c0a0ae2817ed56f5421',NULL),(29,'asdajdlaljkd','askjsdlakdjals','ajskdlkkasdjaklsd','sha1$52344ae7$1$9f2ccd26b8cd2bf8d778e188d61731ff85',NULL),(30,'asdasdasd','asdasdasdasdadad','asdasdasd','sha1$d003d754$1$58f35e5d4f04b14244531828bcc66600c1',NULL),(31,'asdkjlasjdaskl','kjlasdjklasdjklas','asjkldaskjdalskj','sha1$4cf73c86$1$eeaba446c04202f7bd95e81c859c5f2889',NULL),(32,'helder_antunes-@hotmail.com','Helder','Antunes','sha1$a7f4b6ad$1$f7f3454849ae89c750342ed89721ae9e10',NULL),(33,'diogo','diogo','diogo','sha1$62962bcc$1$04b6f4a7e18325aeb0f10088c0cbd5e06b',NULL),(34,'diogo2','diogo2','diogo2','sha1$dc085e7c$1$31f50fc0169f2951f5ec922f0ef71d4df8b172c9',NULL),(35,'asd','asd','asd','asd',NULL),(36,'vegetinha','asd','asd','sha1$319aaad2$1$12f84e53b08a42d7d8742ac359614e352493e102',NULL),(37,'john@gmail.com','John','Silver','sha1$9dd71c12$1$639e7363ff5a6058c176b9febb05ddc41345bf44','mVNPr3Ej2L5BI6CX'),(38,NULL,'','',NULL,'PCXC5LaMVrPC7kYg'),(39,NULL,'','',NULL,'Sm4qww5CSE4ySxo2'),(40,'a','Ricardo','Silva','sha1$895ec087$1$e49733089515989fb876fd8ca7f330f7260068d9','pjDfaNdop5tVCBeW');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userchat`
--

DROP TABLE IF EXISTS `userchat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userchat` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `chat_room` bigint(20) unsigned NOT NULL,
  `user` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `chat_room` (`chat_room`),
  KEY `user` (`user`),
  CONSTRAINT `userchat_ibfk_1` FOREIGN KEY (`chat_room`) REFERENCES `chatroom` (`id`),
  CONSTRAINT `userchat_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userchat`
--

LOCK TABLES `userchat` WRITE;
/*!40000 ALTER TABLE `userchat` DISABLE KEYS */;
INSERT INTO `userchat` VALUES (3,2,40);
/*!40000 ALTER TABLE `userchat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-10 15:33:23
