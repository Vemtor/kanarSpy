CREATE DATABASE  IF NOT EXISTS `kanar_directory`;
USE `kanar_directory`;

--
-- Table structure for table `kanar`
--

DROP TABLE IF EXISTS `kanar`;

CREATE TABLE `kanar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `birth_time` time DEFAULT null,
  `line` int DEFAULT NULL,
  `stop` varchar(45) DEFAULT NULL,
  `coordinates` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


--
-- Data for table `kanar`
--

INSERT INTO `kanar` VALUES 
	(1,'08:30:00','21','czarnowiejska', null),
	(2,'15:45:00','15','wieliczka', null),
	(3,'17:45:23','17','teatr bagatela',null);


