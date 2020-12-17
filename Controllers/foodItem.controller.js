

'use strict';

var socket = require("../services/socket.service");

var foodItem = require('../models/foodItem.model');

// exports.get_all_foodItem = function(req, res) {
    
//     foodItem.getAll(function(err, task) {

//         if(err){
//             console.log(err);
//         } else {
//             console.log(task);
//         }

//     })
// }

exports.get_all_foodItem = (req , res) => {
    console.log("foodlist request")
    foodItem.getAll( (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving foodlist."
            });
        } else {
            res.send(data);
        }
    })
}

//socket call 
exports.getFoodById = function(food_Id) {
    foodItem.getFoodById(food_Id, function(err, res) {
        const socketio = socket.getSocketIO();
        if(err) {
            console.log(err);
        } else {
            socketio.sockets.emit('updatedFooddata', res);
        }

    });
}


exports.decreaseFoodCountById = function(itemId) {
    foodItem.decreaseFoodCountById(itemId, function(err , res) {
        const socketio = socket.getSocketIO();
        if(err) {
            console.log(err);
        } else {
            socketio.sockets.emit('updatedFooddata', res);
        }
    });
}

exports.increaseFoodCountById = function(itemId) {
    foodItem.increaseFoodCountById(itemId, function(err, res) {
        const socketio = socket.getSocketIO();
        if(err) {
            console.log(err);
        } else {
            socketio.sockets.emit('updatedFooddata', res);
        }
    });
}

exports.add_new_food = (req, callback) => {
    foodItem.addNewFood(req, function(err, res) {

		if (err){
		  console.log(err);
		} else {
			callback(res);
		}
	});
}
