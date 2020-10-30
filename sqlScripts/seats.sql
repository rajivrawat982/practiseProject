CREATE TABLE `robocafe`.`seats` (
  `seatNumber` INT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `broken` TINYINT NOT NULL DEFAULT 0,
  `selected` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`seatNumber`),
  UNIQUE INDEX `seatNumber_UNIQUE` (`seatNumber` ASC)
  );

