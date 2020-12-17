

var seat = require("../models/seat.model");
var socket = require("../services/socket.service");

/*
exports.checkemit = () =>{
    const socketio = socket.getSocketIO();
    socketio.sockets.emit('getAllseats', {message: "check all"});
}
*/


//get seat info using Api calls using this in route
exports.getAllSeats = (req, res) => {
    seat.getAllSeats(function(err, data) {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Seats Info."
            });
        } else {
            res.send(data); 
        }
    })
}

//change single seat booking status in single api calls 
// exports.seatBookingStatus = function(req) {
//     seat.seatBookingStatus(req, function(err, res) {
    
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("seat Booking status change");
//         }
//     });
// }


//clear multiple seats selected status at a single call
exports.clearMultipleSeats = function(seatArray) {
    seat.clearMultipleSeatsSelection(seatArray , function(err, res) {
        if(err) {
            console.log(err);
        } else {
            console.log("seats Selection clear");
        }
    })
} 

exports.seatSelection = function(seat_id, selected) {
    seat.seatSelected(seat_id, selected, function(err, res) {
    
        if(err) {
            console.log(err);
        } else {
            console.log("seat selection updated");
        }
    });
}

//change multiple seats booking status at single api call
exports.seatsStatusChange = function(seatArray) {
    seat.seatsStatusChange(seatArray , function(err, res) {

        if(err) {
            console.log(err);
        } else {
            console.log("seats status change");
        }
    })
}


/*------------------------------------------Sockets-----------------------------------*/


//define the [socketio = socket.getSocketIo() ] inside the function only
//source -- https://stackoverflow.com/questions/43604778/node-js-and-socket-io-cannot-read-property-sockets-of-undefined

//get all seats data after socket connection 
exports.seatsInfo = () => {
    seat.getAllSeats(function(err, data) {
        const socketio = socket.getSocketIO();
        if(err) {
            console.log(err);
        } else {
            socketio.sockets.emit('getAllseats', data);
        }
    })
}

//using socket to update seat selection this is we are using for sending instant updated seats detail to every screen 
exports.seatSelectionStatus = function(seat_id, selected) {
    seat.seatSelectionStatusChange(seat_id, selected, function(err, res) {
        const socketio = socket.getSocketIO();
        if(err) {
            console.log(err);
        } else {
            socketio.sockets.emit('updatedSeatSelection', res);
        }

    });
}





