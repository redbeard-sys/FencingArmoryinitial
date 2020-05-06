SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `prices`;
CREATE TABLE `prices` (
            `fixID` tinyint(2) NOT NULL,
            `itemToFix` varchar(20) ,
            `problem` varchar(50) ,
            `price` decimal(13,2)
);
            
ALTER TABLE `prices`
    ADD PRIMARY KEY (`fixID`);

INSERT INTO `prices` (`fixID`, `itemToFix`, `problem`, `price`) VALUES
(1, 'foil', 'barrel', 8),
(2, 'foil', 'rewire', 25),
(3, 'foil', 'blade', 125),
(4, 'foil', 'rewire and barrel', 45),
(5, 'foil', 'socket', 25),
(6, 'epee', 'barrel', 9),
(7, 'epee', 'rewire', 28),
(8, 'epee', 'blade', 130),
(9, 'epee', 'rewire', 28),
(10, 'epee', 'rewire and barrel', 50),
(11, 'saber', 'socket', 10),
(12, 'saber', 'blade', 110),
(13, 'body cord', 'rewire', 11),
(14, 'mask cord', 'rewire', 9),
(15, 'mask', 'bib', 95),
(16, 'lame', 'patch', 22),
(17, 'lame', 'print name', 28),
(18, 'foil', 'handle', 13),
(19, 'epee', 'handle', 12),
(20, 'saber', 'handle', 9);



ALTER TABLE `prices`
    MODIFY `fixID` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
            `userID` tinyint(2) NOT NULL,
            `username` varchar(25) ,
            `password` varchar(65)
);
            
ALTER TABLE `users`
    ADD PRIMARY KEY (`userID`);

INSERT INTO `users` (`userID`, `username`, `password`) VALUES
(1, 'jFischer5', 'ollietooth' ),
(2, 'theChamp', 'helloworld'),
(3, 'worldbest', 'javalinthrow'),
(4, 'mrFencer', 'myPasscode');

ALTER TABLE `users`
    MODIFY `userID` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets`(
	        `ticketID` INT,
            `userID` tinyint(2),
            `brokenItem` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
            `problem` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
            `fixStatus` varchar(20) DEFAULT 'Not Fixed' )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
            
ALTER TABLE `tickets`
    ADD PRIMARY KEY (`ticketID`);

INSERT INTO `tickets`(`ticketID`, `userID`, `brokenItem`, `problem`, `fixStatus`) VALUES
(1, 1, 'body_cord', 'rewire', 'Not Fixed' ),
(2, 2, 'epee', 'barrel', 'Not Fixed'),
(3, 3, 'saber', 'new blade', 'Fixed'),
(4, 4, 'foil', 'new socket', 'Fixed');

ALTER TABLE `tickets`
    MODIFY `ticketID` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;
