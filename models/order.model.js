var db = require('../services/mysql.db.service');

var order = function(order){
    this.orderId = order.orderId;
    this.token = order.token;
    this.status = order.status;
    this.subTotal = order.subTotal;
    this.itemDiscount = order.itemDiscount;
    this.tax = order.tax;
    this.discount = order.discount;
    this.grandTotal = order.grandTotal;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.content = order.content;

}


order.place_new_order = function(req, result) {
    try {
        console.log(req);
        db.get().query("INSERT INTO `order` (orderId, token, status, subTotal, itemDiscount, tax, discount, grandTotal, createdAt, updatedAt, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.orderId, req.token, req.status, req.subTotal, req.itemDiscount, req.tax, req.discount, req.grandTotal, req.createdAt, req.updatdeAt, req.content], function(err, res) {
            if(err) {
                console.log("Some error: ",  err);
                result(err, null);
            }
            else {
                result(false, res);

            }
        });
    } catch (err) {
        console.log(err);
        result(err, false);
    }
};

module.exports = order;