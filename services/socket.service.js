'use strict'

var seat = require('../Controllers/seat.controller');
var foodItem = require('../Controllers/foodItem.controller');


var io; 

exports.init = function(http) {

    io = require('socket.io')(http);
    console.log("socket");

    io.on('connection', (socket) => {

        console.log("Socket connection started with Robocafe App");

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });


        socket.on('seatSelected', (data) => {

            console.log(data);
            var seat_id = data.seatNumber;
            var selection = data.selected;
            seat.seatSelectionStatus(seat_id, selection); 
        })


        //this will call function which send seats info using socket emit event 'getAllseat'  
        seat.seatsInfo();

        socket.on('foodSelected', (data) => {
            var food_Id = data.itemId;
            foodItem.getFoodById(food_Id);
        })
        
        socket.emit('seatStatus' , 1);

        //socket events for increase-decrease the food amount available in pantery we are updating this in every plus minus click
        socket.on('decreaseAmount' , (data) => {
            var itemId = data.itemId;
            foodItem.decreaseFoodCountById(itemId);
        })


        socket.on('increaseAmount' , (data) => {
            var itemId = data.itemId;
            foodItem.increaseFoodCountById(itemId);
        })
    })
}

exports.getSocketIO = () => {
    return io;
}