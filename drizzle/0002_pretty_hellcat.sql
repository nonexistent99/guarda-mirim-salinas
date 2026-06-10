CREATE TABLE `inscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inscriptionNumber` varchar(20) NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`birthDate` varchar(10) NOT NULL,
	`cpf` varchar(14) NOT NULL,
	`address` text NOT NULL,
	`city` varchar(100) NOT NULL,
	`state` varchar(2) NOT NULL,
	`zipCode` varchar(10) NOT NULL,
	`schoolName` varchar(255) NOT NULL,
	`schoolGrade` varchar(50) NOT NULL,
	`parentName` varchar(255) NOT NULL,
	`parentPhone` varchar(20) NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `inscriptions_inscriptionNumber_unique` UNIQUE(`inscriptionNumber`),
	CONSTRAINT `inscriptions_cpf_unique` UNIQUE(`cpf`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL,
	`value` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_key_unique` UNIQUE(`key`)
);
