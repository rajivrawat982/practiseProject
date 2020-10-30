var db = require('../services/mysql.db.service');

var foodItem  = function(fooditem) {
    this.itemId = fooditem.itemId;
    this.itemName = fooditem.itemName;
    this.price = fooditem.price;
    this.imageUrl = fooditem.imageUrl;
    this.status = fooditem.status;
    this.amountAvailable = fooditem.amountAvailable;
}

foodItem.getAll = function(result) {
    try{
        db.get().query("SELECT * FROM  foodlist", (err , res) => {
    
            if(err) {
                console.log("Some error: ", err);
                result(err , null);
            } else {
                result(false, res);
            }
        })
    } catch(err) {
        console.log(err);
        result(err, false);
    }
};

//later change AutoIncrement in database for itemId 
foodItem.addNewFood = function(req ,result) {
    try {
        db.get().query("INSERT INTO `foodlist` (itemName, unitPrice, imageUrl, status, amountAvailable) VALUES (? , ?, ?, ?, ?)", [req.itemName, req.price, req.url, req.status, req.amountAvailable], (err, res) => {
            if(err) {
                console.log("Some error: ",  err);
                result(err, null);
            }
            else {
                result(false, res);
            }
        });
    } catch (err) {
        console.log("error in catch block: ", err);
        result(err, null);
    }
}


foodItem.getFoodById = function(food_id, result) {
    try {
        db.get().query("SELECT * FROM `foodlist` where itemId = ?", food_id, (err, res) => {
            if(err) {
                console.log("Some error: ",  err);
                result(err, null);
            }
            else {
                result(false, res);
            }
        });
    } catch (error) {
        result(error, false);
    }
}


foodItem.decreaseFoodCountById = function(itemId, result) {
    try {
        console.log(itemId);
        db.get().query("UPDATE `foodlist` SET amountAvailable = amountAvailable - 1 WHERE  itemId = ?", itemId , (err, res) => {
            if(err) {
                console.log("some error in updating fooditem amount: " , err );
                result(err, null);
            } else {
                
                db.get().query("SELECT * FROM seats", (err, res) => {
                    if(err) {
                        console.log("some error in getting food data back after update : ", err);
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

foodItem.increaseFoodCountById = function(itemId, result) {
    try {
        console.log(itemId);
        db.get().query("UPDATE `foodlist` SET amountAvailable = amountAvailable + 1 WHERE  itemId = ?", itemId , (err, res) => {
            if(err) {
                console.log("some error in updating fooditem amount: " , err );
                result(err, null);
            } else {
                
                db.get().query("SELECT * FROM seats", (err, res) => {
                    if(err) {
                        console.log("some error in getting food data back after update : ", err);
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


// //hint - https://stackoverflow.com/questions/45710001/multiple-queries-in-a-single-api
// foodItem.getAll = function(result) {
//     var sql1 = "SELECT * FROM  foodlist";
//     var sql2 = "SELECT * FROM seats";

//     var res1 = {}

//     try{
//         db.get().query(sql1 , (err , data1) => {

//             db.get().query(sql2, (err, data2) => {
//                 res1.data1 = data1;
//                 res1.data2 = data2;


//                 if(err) {
//                     console.log("Some error: ", err);
//                     result(err , null);
//                 } else {
//                     result(false, res1);
//                     console.log("consoling in query: ", res1);
//                 }
//             })

            
//         });

//         console.log("consoling in query: ", res1);

//         db.get().query( (err , res) => {
//             var res2 = res; 
//             console.log(res2);
//         });
//     } catch(err) {
//         console.log(err);
//         result(err, false);
//     }
// };

module.exports = foodItem;