

var seat = require("../models/seat.model");
var socket = require("../services/socket.service");

/*
exports.checkemit = () =>{
    const socketio = socket.getSocketIO();
    socketio.sockets.emit('getAllseats', {message: "check all"});
}
*/

//define the socketio [like line 19] inside the function only
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



//get seat info using Api calls
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

exports.seatSelection = function(seat_id, selected) {
    seat.seatSelected(seat_id, selected, function(err, res) {
    
        if(err) {
            console.log(err);
        } else {
            console.log("seat selection updated");
        }
    });
}

//using socket to update seat selection
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


//change multiple seats status at single api call
exports.seatsStatusChange = function(seatArray) {

    seat.seatsStatusChange(seatArray , function(err, res) {

        if(err) {
            console.log(err);
        } else {
            console.log("seats status change");
        }
    })
    

}


