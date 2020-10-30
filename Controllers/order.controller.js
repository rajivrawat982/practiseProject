
'use strict';

var order = require("../models/order.model");

exports.placeNewOrder = function(req, callback) {

    order.place_new_order(req, function(err, res) {

		if (err){
		  console.log(err);
		} else {
            //console.log(res);
			callback(res);
		}
	});
}