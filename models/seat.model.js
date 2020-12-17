var db = require("../services/mysql.db.service");

var seat = function(seat) {
    this.seatNumber = seat.seatNumber;
    this.status = seat.status;
    this.orderId = seat.orderId;
    this.broken = seat.broken;
    this.selected = seat.selected;
}



seat.getAllSeats = function(result) {
    try {
        db.get().query("SELECT * FROM seats", (err , res) => {
            if(err) {
                result(err, null);
            } else {
                result(false, res);
            }
        })
    } catch (error) {
        result(error, false);
    }
}

seat.seatSelected = function(seat_id, selected, result) {
    try {
        console.log(seat_id);
        db.get().query("UPDATE `seats` SET selected = ? WHERE  seatNumber = ?", [selected, seat_id], (err, res) => {
            if(err) {
                console.log("some error in updating seat selection: " , err );
                result(err, null);
            } else {
                result(false, res);
            }
        });

    } catch (err) {
        console.log("In catch block: ", err);
        result(err, false);
    }
}

// seat.seatBookingStatus = function(req, result) {
//     try {
//         db.get().query("UPDATE `seats` SET status = ? WHERE  seatNumber = ?", [req.status, req.seatNumber], (err, res) => {
//             if(err) {
//                 console.log("some error in updating booking status: " , err );
//                 result(err, null);
//             } else {
//                 result(false, res);
//             }
//         });

//     } catch (err) {
//         console.log("In catch block: ", err);
//         result(err, false);
//     }
// }

seat.lockSelectedSeats = function(seatArray , result) {
    var selectedSeats = seatArray[0];
    var or =' OR ';

    for (let i = 1; i < seatArray.length; i++) {
        selectedSeats+= or + seatArray[i];   
    }

    var sql = "UPDATE `seats` SET selected = 1 WHERE seatNumber = " + selectedSeats;

    try {
        
        db.get().query( sql , (err, res) => {
            if(err) {
                console.log("some error in updating multiple seat status: ", err);
                result(err, null);
            } else {
                result(false, res);
            }
        });
    } catch (error) {
        console.log("In catch block: ", error);
        result(error, false);
    }

}

seat.seatsStatusChange = function(seatArray, result) {
    console.log("model array: ", seatArray);
    
    var text =seatArray[0];
    var or =' OR ';

    for (let i = 1; i < seatArray.length; i++) {
        text+= or + seatArray[i];   
    }

    var sql = "UPDATE `seats` SET status = 1 WHERE seatNumber = " + text;

    try {
        
        db.get().query( sql , (err, res) => {
            if(err) {
                console.log("some error in updating multiple seat status: ", err);
                result(err, null);
            } else {
                result(false, res);
            }
        });
    } catch (error) {
        console.log("In catch block: ", error);
        result(error, false);
    }
}


seat.clearMultipleSeatsSelection = function(seatArray , result) {
    var text = seatArray[0];
    var or =' OR ';
    for (let i = 1; i < seatArray.length; i++) {
        text+= or + seatArray[i];   
    }
    var sql = "UPDATE `seats` SET selected = 0 WHERE seatNumber = " + text;
    try {
        db.get().query( sql , (err, res) => {
            if(err) {
                console.log("some error in clearing multiple seat selection : ", err);
                result(err, null);
            } else {
                result(false, res);
            }
        });
    } catch (error) {
        console.log("In catch block: ", error);
        result(error, false);
    }

}

//handling this with sockets 
seat.seatSelectionStatusChange = function(seat_id, selected, result) {
    try {
        console.log(seat_id);
        db.get().query("UPDATE `seats` SET selected = ? WHERE  seatNumber = ?", [selected, seat_id], (err, res) => {
            if(err) {
                console.log("some error in updating seat selection: " , err );
                result(err, null);
            } else {
                
                db.get().query("SELECT * FROM seats", (err, res) => {
                    if(err) {
                        console.log("some error in getting seats data back after update : ", err);
                        result(err, null);
                    } else {
                        result(false, res);
                    }
                });
            }
        });

    } catch (err) {
        console.log("In catch block: ", err);
        result(err, false);
    }
}



module.exports = seat;