CREATE TABLE   IF NOT EXISTS  `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` json DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `desciption` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;