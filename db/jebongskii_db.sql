-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 30, 2023 at 01:17 PM
-- Server version: 8.0.32
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jebongskiii_ojt`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(82) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `first_name`, `middle_name`, `last_name`, `email`, `password`) VALUES
(1, 'Cody', 'Garret', 'Runnels', 'codyrhodes@gmail.com', 'cody123'),
(2, 'Colby', 'Daniel', 'Lopez', 'sethfrknrollins@gmail.com', 'colby123'),
(3, 'Christopher', 'Keith', 'Irvine', 'chrisjericho@gmail.com', 'chris123'),
(4, 'Adam', 'Joseph', 'Copeland', 'edge@gmail.com', 'adam123');

-- --------------------------------------------------------

--
-- Table structure for table `admin_contacts`
--

DROP TABLE IF EXISTS `admin_contacts`;
CREATE TABLE IF NOT EXISTS `admin_contacts` (
  `admin_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `contact1` varchar(100) NOT NULL,
  `contact2` varchar(100) NOT NULL,
  `contact3` varchar(100) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin_contacts`
--

INSERT INTO `admin_contacts` (`admin_id`, `contact1`, `contact2`, `contact3`) VALUES
(1, '+63 912 345 6789', '+63 922 987 6543', '+63 933 111 2222'),
(2, '+63 915 555 4321', '+63 917 222 3333', '+63 999 555 5555'),
(3, '+63 920 123 4567', '+63 921 234 5678', '+63 922 666 6666'),
(4, '+63 920 6969 6969', '+63 969 4220 420', '+63 91 2321 091');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `comp_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` varchar(250) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  PRIMARY KEY (`comp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`comp_id`, `company_name`, `address`, `email`, `phone_no`) VALUES
(1, 'Accenture', 'Makati City', 'info@accenture.com', '+63 2 123 4567'),
(2, 'Trend Micro', 'Taguig City', 'info@trendmicro.com', '+63 2 987 6543'),
(3, 'Converge', 'Quezon City', 'info@converge.com', '+63 2 333 3333'),
(4, 'Ubisoft', 'Pasig City', 'info@ubisoft.com', '+63 2 444 4444');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `stud_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `course_year` varchar(20) NOT NULL,
  `classcode` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `password` varchar(82) NOT NULL,
  `advisor` int UNSIGNED DEFAULT NULL,
  `supervisor` int UNSIGNED DEFAULT NULL,
  `remark` varchar(20) NOT NULL,
  PRIMARY KEY (`stud_id`),
  KEY `advisor` (`advisor`),
  KEY `supervisor` (`supervisor`)
) ENGINE=InnoDB AUTO_INCREMENT=2230002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`stud_id`, `first_name`, `middle_name`, `last_name`, `course_year`, `classcode`, `birthday`, `gender`, `password`, `advisor`, `supervisor`, `remark`) VALUES
(2220002, 'Nikola', 'Tesla', 'Alexander', 'BSCS-3', '9069', '2000-08-22', 'M', '123', 1, 1, ''),
(2220003, 'Alexander', 'Bell', 'Graham', 'BSCS-3', '9069', '1999-09-30', 'M', '123', 1, 4, ''),
(2220004, 'Marie', 'Curie', 'Elizabeth', 'BSCS-3', '9069', '2001-03-14', 'F', '123', 1, 2, ''),
(2220005, 'Leonardo', 'DaVinci', 'Paul', 'BSCS-3', '9069', '2000-06-28', 'M', '123', 1, 4, ''),
(2220006, 'Steve', 'Jobs', 'Paul', 'BSCS-3', '9069', '2002-11-09', 'M', '123', 1, 4, ''),
(2220007, 'James', 'Watt', 'Matthew', 'BSCS-3', '9069', '2002-07-23', 'M', '123', 1, 4, ''),
(2220008, 'Johannes', 'Gutenberg', 'Christoph', 'BSCS-3', '9069', '2001-05-05', 'M', '123', 1, 4, ''),
(2220009, 'Eli', 'Whitney', 'George', 'BSCS-3', '9069', '2000-02-11', 'M', '123', 1, 4, ''),
(2220010, 'George', 'Washington', 'Carver', 'BSCS-3', '9069', '1999-10-15', 'M', '123', 1, 4, ''),
(2220011, 'Albert', 'Einstein', 'Michael', 'BSCS-3', '9070', '2002-11-27', 'M', '123', 2, 3, ''),
(2220012, 'Isaac', 'Newton', 'John', 'BSCS-3', '9070', '1998-12-19', 'M', '123', 2, 3, ''),
(2220013, 'Charles', 'Darwin', 'Robert', 'BSCS-3', '9070', '2002-02-25', 'M', '123', 2, 3, ''),
(2220014, 'Galileo', 'di Vincenzo', 'Bonaulti Galilei', 'BSCS-3', '9070', '2003-01-18', 'M', '123', 2, 3, ''),
(2220015, 'Jane', 'Goodall', 'Valerie', 'BSCS-3', '9070', '2002-08-12', 'F', '123', 2, 3, ''),
(2220016, 'Stephen', 'Hawking', 'William', 'BSCS-3', '9070', '2000-09-21', 'M', '123', 2, 3, ''),
(2220017, 'Richard', 'Feynman', 'Phillip', 'BSCS-3', '9070', '2001-06-30', 'M', '123', 2, 3, ''),
(2220018, 'Rosalind', 'Franklin', 'Marie', 'BSCS-3', '9070', '2002-12-02', 'F', '123', 2, 3, ''),
(2220019, 'Neil', 'Tyson', 'deGrasse', 'BSCS-3', '9070', '2000-01-23', 'M', '123', 2, 3, ''),
(2220020, 'Sherlock', 'Holmes', 'Arthur', 'BSCS-3', '9070', '2001-02-14', 'M', '123', 2, 3, ''),
(2230001, 'Thomas', 'Edison', 'Alfred', 'BSCS-3', '9069', '2001-05-17', 'M', '123', 1, 4, '');

-- --------------------------------------------------------

--
-- Table structure for table `student_checklists`
--

DROP TABLE IF EXISTS `student_checklists`;
CREATE TABLE IF NOT EXISTS `student_checklists` (
  `stud_id` int UNSIGNED NOT NULL,
  `moa` date DEFAULT NULL,
  `medical` date DEFAULT NULL,
  `waiver` date DEFAULT NULL,
  PRIMARY KEY (`stud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student_checklists`
--

INSERT INTO `student_checklists` (`stud_id`, `moa`, `medical`, `waiver`) VALUES
(2220002, NULL, NULL, NULL),
(2220003, NULL, NULL, NULL),
(2220004, NULL, NULL, NULL),
(2220005, NULL, NULL, NULL),
(2220006, NULL, NULL, NULL),
(2220007, NULL, NULL, NULL),
(2220008, NULL, NULL, NULL),
(2220009, NULL, NULL, NULL),
(2220010, NULL, NULL, NULL),
(2220011, NULL, NULL, NULL),
(2220012, NULL, NULL, NULL),
(2220013, NULL, NULL, NULL),
(2220014, NULL, NULL, NULL),
(2220015, NULL, NULL, NULL),
(2220016, NULL, NULL, NULL),
(2220017, NULL, NULL, NULL),
(2220018, NULL, NULL, NULL),
(2220019, NULL, NULL, NULL),
(2220020, NULL, NULL, NULL),
(2230001, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_report_log`
--

DROP TABLE IF EXISTS `student_report_log`;
CREATE TABLE IF NOT EXISTS `student_report_log` (
  `log_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `stud_id` int UNSIGNED NOT NULL,
  `hrs_rendered` tinyint UNSIGNED NOT NULL,
  `verified` tinyint NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `stud_id_report` (`stud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student_report_log`
--

INSERT INTO `student_report_log` (`log_id`, `stud_id`, `hrs_rendered`, `verified`) VALUES
(1, 2230001, 20, 1),
(2, 2220002, 15, 1),
(3, 2220003, 25, 0),
(4, 2220004, 18, 1),
(5, 2220005, 22, 1),
(6, 2220006, 30, 0),
(7, 2220007, 26, 1),
(8, 2220008, 16, 1),
(9, 2220009, 19, 0),
(10, 2220010, 24, 1),
(11, 2220011, 28, 1),
(12, 2220012, 12, 0),
(13, 2220013, 23, 1),
(14, 2220014, 17, 1),
(15, 2220015, 21, 0),
(16, 2220016, 27, 1),
(17, 2220017, 14, 1),
(18, 2220018, 20, 0),
(19, 2220019, 25, 1),
(20, 2220020, 18, 1);

-- --------------------------------------------------------

--
-- Table structure for table `supervisors`
--

DROP TABLE IF EXISTS `supervisors`;
CREATE TABLE IF NOT EXISTS `supervisors` (
  `sup_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `company` int UNSIGNED NOT NULL,
  PRIMARY KEY (`sup_id`),
  KEY `company` (`company`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `supervisors`
--

INSERT INTO `supervisors` (`sup_id`, `first_name`, `middle_name`, `last_name`, `role`, `company`) VALUES
(1, 'Jonathan', 'David', 'Good', 'Internship Manager', 1),
(2, 'Maxwell', 'Friedman', 'Jacob', 'Internship Manager', 2),
(3, 'Allan', 'Jones', 'Neal', 'Internship Manager', 3),
(4, 'Bryan', 'Danielson', 'Lloyd', 'Internship Manager', 4);

-- --------------------------------------------------------

--
-- Table structure for table `supervisor_contacts`
--

DROP TABLE IF EXISTS `supervisor_contacts`;
CREATE TABLE IF NOT EXISTS `supervisor_contacts` (
  `sup_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `contact1` varchar(100) NOT NULL,
  `contact2` varchar(100) NOT NULL,
  `contact3` varchar(100) NOT NULL,
  PRIMARY KEY (`sup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `supervisor_contacts`
--

INSERT INTO `supervisor_contacts` (`sup_id`, `contact1`, `contact2`, `contact3`) VALUES
(1, '+63 912 345 6789', '+63 922 987 6543', '+63 933 111 2222'),
(2, '+63 915 555 4321', '+63 917 222 3333', '+63 999 555 5555'),
(3, '+63 920 123 4567', '+63 921 234 5678', '+63 922 666 6666'),
(4, '+63 920 6969 6969', '+63 969 4220 420', '+63 91 2321 091');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_contacts`
--
ALTER TABLE `admin_contacts`
  ADD CONSTRAINT `admin_contacts` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `advisor` FOREIGN KEY (`advisor`) REFERENCES `admins` (`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `supervisor` FOREIGN KEY (`supervisor`) REFERENCES `supervisors` (`sup_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `student_checklists`
--
ALTER TABLE `student_checklists`
  ADD CONSTRAINT `stud_id_checklists` FOREIGN KEY (`stud_id`) REFERENCES `students` (`stud_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `student_report_log`
--
ALTER TABLE `student_report_log`
  ADD CONSTRAINT `stud_id` FOREIGN KEY (`stud_id`) REFERENCES `students` (`stud_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `supervisors`
--
ALTER TABLE `supervisors`
  ADD CONSTRAINT `company` FOREIGN KEY (`company`) REFERENCES `companies` (`comp_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `supervisor_contacts`
--
ALTER TABLE `supervisor_contacts`
  ADD CONSTRAINT `supervisor_contacts` FOREIGN KEY (`sup_id`) REFERENCES `supervisors` (`sup_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
