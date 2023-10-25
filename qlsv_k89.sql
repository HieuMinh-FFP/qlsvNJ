/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MariaDB
 Source Server Version : 100408
 Source Host           : localhost:3306
 Source Schema         : qlsv_k89

 Target Server Type    : MariaDB
 Target Server Version : 100408
 File Encoding         : 65001

 Date: 25/10/2023 09:49:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for register
-- ----------------------------
DROP TABLE IF EXISTS `register`;
CREATE TABLE `register`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `score` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_2`(`student_id`) USING BTREE,
  INDEX `fk_3`(`subject_id`) USING BTREE,
  CONSTRAINT `fk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_3` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of register
-- ----------------------------
INSERT INTO `register` VALUES (1, 1, 1, 8);
INSERT INTO `register` VALUES (2, 14, 3, 8);
INSERT INTO `register` VALUES (3, 3, 2, 7.74);
INSERT INTO `register` VALUES (6, 14, 1, 6);
INSERT INTO `register` VALUES (11, 14, 3, NULL);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, 'Tý', '2017-01-14', 'nam');
INSERT INTO `student` VALUES (3, 'Dần', '2016-05-05', 'nữ');
INSERT INTO `student` VALUES (14, 'Adamthe', '2023-07-20', 'nam');
INSERT INTO `student` VALUES (17, 'Xu', '2023-07-14', 'nam');
INSERT INTO `student` VALUES (18, 'Sinh', '2023-07-06', 'nam');
INSERT INTO `student` VALUES (19, 'tinthe', '2023-06-28', 'khac');
INSERT INTO `student` VALUES (21, 'huynh', '2023-07-08', 'nam');
INSERT INTO `student` VALUES (23, 'SinhHà', '2007-06-21', 'nữ');
INSERT INTO `student` VALUES (24, 'SinhThu', '2023-08-12', 'nữ');
INSERT INTO `student` VALUES (25, 'Thanh The', '2023-10-13', 'nam');

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `number_of_credit` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES (1, 'Toán', 3);
INSERT INTO `subject` VALUES (2, 'Lý', 6);
INSERT INTO `subject` VALUES (3, 'Hóa', 2);
INSERT INTO `subject` VALUES (5, 'Sinh', 8);

SET FOREIGN_KEY_CHECKS = 1;
