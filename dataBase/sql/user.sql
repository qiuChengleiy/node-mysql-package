CREATE TABLE   IF NOT EXISTS  `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `detail_info` json DEFAULT NULL,
  `love` varchar(20) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `degree` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` set email='xiaoming', password='123';
INSERT INTO `user` set email='xiaohong', password='123';
INSERT INTO `user` set email='xiaobing', password='123';
