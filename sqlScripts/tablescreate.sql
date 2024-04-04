CREATE TABLE `users` (
	`userID` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
	`email` VARCHAR(50),
    `phone` INT(10),
    `zip` INT(5),
	`locationname` VARCHAR(255),
    `usertype` VARCHAR(50),   
	`joindate` DATE,
	PRIMARY KEY (`userID`)
);


CREATE TABLE `items` (
	`itemID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
	`description` VARCHAR(255),
	`category` VARCHAR(50),
    `msrp` DECIMAL(10,2),
	`price` DECIMAL(10,2),
	`count` INT(100),
	`expiration` DATE,
	`location` VARCHAR(100),
	`status` VARCHAR(20),
    `img` VARCHAR(255),
    `listeddate` DATE,
	PRIMARY KEY (`itemID`)
);


-- Create the listing table
CREATE TABLE `listing` (
    `listingID` INT NOT NULL AUTO_INCREMENT,
    `itemID` INT,
    `sellerID` INT,
    `createdate` DATE,
    FOREIGN KEY (`itemID`) REFERENCES items(`itemID`),
    FOREIGN KEY (`sellerID`) REFERENCES users(`userID`),
    PRIMARY KEY (`listingID`)
);

-- Create the reserved table
CREATE TABLE `reserved` (
    `reservationID` INT NOT NULL AUTO_INCREMENT,
    `buyerID` INT,
    `itemID` INT,
    `reservationdate` DATE,
    `status` VARCHAR(50),
    FOREIGN KEY (`buyerID`) REFERENCES users(`userID`),
    FOREIGN KEY (`itemID`) REFERENCES items(`itemID`),
    PRIMARY KEY (`reservationID`)
);

CREATE TABLE `locations` (
    `locationID` INT NOT NULL AUTO_INCREMENT,
    `sellerID` INT NOT NULL,
    `name` VARCHAR(255),
    `address` VARCHAR(255),
    `city` VARCHAR(100),
    `state` VARCHAR(100),
    `zip` VARCHAR(20),
    `phone_number` VARCHAR(20),
    `email` VARCHAR(255),
    `website` VARCHAR(255),
    FOREIGN KEY (`sellerID`) REFERENCES users(`userID`),
    PRIMARY KEY (`locationID`)
);

