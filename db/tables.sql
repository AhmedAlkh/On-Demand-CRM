CREATE TABLE `customers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(30) NOT NULL,
	`last_name` VARCHAR(30) NOT NULL,
	`industry` VARCHAR(50) NOT NULL,
	`job_title` VARCHAR(50),
	`website` VARCHAR(50),
	`email` VARCHAR(50) NOT NULL,
	`phone_number` VARCHAR(15) NOT NULL,
	`instagram` VARCHAR(30),
	`linkedin` VARCHAR(50),
	`notes` TEXT(255),
	PRIMARY KEY (`id`)
);