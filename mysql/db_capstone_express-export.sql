/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `binh_luan`;
CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `noi_dung` text NOT NULL,
  `ngay_binh_luan` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hinh_anh`;
CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) NOT NULL,
  `duong_dan` varchar(255) NOT NULL,
  `public_id` varchar(255) DEFAULT NULL,
  `mo_ta` text,
  `nguoi_dung_id` int NOT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `luu_anh`;
CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(100) NOT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nguoi_dung_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `noi_dung`, `ngay_binh_luan`) VALUES
(3, 5, 10, 'Bức ảnh đẹp quá!', '2025-10-22 05:19:30'),
(6, 7, 11, 'Mình thấy bức ảnh này rất nghệ thuật!', '2025-10-22 05:29:10'),
(7, 6, 11, 'Quá đẹp!', '2025-10-22 10:52:18'),
(9, 6, 11, 'Mình thấy bức ảnh này rất nghệ thuật!', '2025-10-22 19:17:16');
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `public_id`, `mo_ta`, `nguoi_dung_id`, `ngay_tao`) VALUES
(10, 'v bts.jpg', 'https://res.cloudinary.com/dl6bbkdmh/image/upload/v1761072801/images/sd120vbihsv2l2mclueq.jpg', 'images/sd120vbihsv2l2mclueq', '\"Ảnh V BTS\"', 5, '2025-10-21 18:53:21'),
(11, 'BongSon.jpg', 'https://res.cloudinary.com/dl6bbkdmh/image/upload/v1761072897/images/rph6tateh7u0hp1mblzr.jpg', 'images/rph6tateh7u0hp1mblzr', '\"Ảnh phong cảnh Bồng Sơn\"', 5, '2025-10-21 18:54:58');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(4, 10, '2025-10-22 08:43:57'),
(4, 11, '2025-10-22 08:44:05'),
(5, 10, '2025-10-22 10:23:13'),
(6, 10, '2025-10-22 17:41:28'),
(7, 11, '2025-10-22 09:59:30'),
(14, 10, '2025-10-23 19:46:57');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `ngay_tao`) VALUES
(4, 'thanhhien@gmail.com', '$2b$10$Hh92Zx/1O6a3E1mDf.YCduDFfArLp598Mvgjc.ayY8BFAH4UjbEJS', 'Hien', 22, NULL, '2025-10-21 17:37:38'),
(5, 'thanhhien7a5@gmail.com', '$2b$10$aYp/Xo0kbOU4rXr8H7blYevOVLUUygz.qqsc/qF75HDPkbSBieX22', 'Hien7a5', 22, 'images/twvrpbiqipd1euhk0eu9', '2025-10-21 18:13:50'),
(6, 'nguyenvanb@gmail.com', '$2b$10$ZZChX.dUD/0CCBgBXHeequVzLtj31p1S95SQGaoEND1lE7Pv/JZQO', 'Nguyen Van B', 28, NULL, '2025-10-22 05:05:09'),
(7, 'bapbap@gmail.com', '$2b$10$N1rnOgxFx0/Nxyq8XeMxIOIgTw5OXjpREnhJfe55mQTomFlTaDcra', 'Bap', 22, NULL, '2025-10-22 05:23:08'),
(9, 'nguyenvana@gmail.com', '$2b$10$swl/RsaKjh5QaZG8ed.XVuXeIT1IhO8PMMi.Oj4wbd4W5yb3VTsX2', 'Nguyen Van A', 21, NULL, '2025-10-22 18:02:06'),
(11, 'thanhhien1732@gmail.com', '$2b$10$HVtGAl9JrsV7MTFVvqfUkO74/GA50C9Hnn5l3VzHtYB0L3N0PIFjK', 'Hien1732', 22, NULL, '2025-10-23 18:48:59'),
(13, 'haha@gmail.com', '$2b$10$f9Zr0Lkv3URfWhGHMZb.H.9j5wf14.tyyN3Ils4/fBMlYxb46inJK', 'Haha', 14, 'images/aygpgbt6sjsivtacqjql', '2025-10-23 19:26:29'),
(14, 'user@gmail.com', '$2b$10$iI6VX9nMxpFkPvR991.nSOcwlHl1JWgllHDh1UKeuDPOaE9m.wHCy', 'Nguyen Van A', 25, NULL, '2025-10-23 19:42:43');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;