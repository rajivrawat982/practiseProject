CREATE TABLE `robocafe`.`order_item` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `orderId` BIGINT NOT NULL,
  `itemId` BIGINT NOT NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `quantity` FLOAT NOT NULL DEFAULT 0,
  `unit` SMALLINT(6) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_order_item_order` (`orderId` ASC),
  CONSTRAINT `fk_order_item_order`
    FOREIGN KEY (`orderId`)
    REFERENCES `robocafe`.`order` (`orderId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `robocafe`.`order_item` 
ADD INDEX `idx_order_item_item` (`itemId` ASC);
ALTER TABLE `robocafe`.`order_item` 
ADD CONSTRAINT `fk_order_item_item`
  FOREIGN KEY (`itemId`)
  REFERENCES `robocafe`.`foodlist` (`itemId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;