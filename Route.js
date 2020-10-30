
var express = require('express');
var router = express.Router();
var foodItem = require('./Controllers/foodItem.controller');
var order = require('./Controllers/order.controller');
var seat = require('./Controllers/seat.controller');


router.get('/foodlist' , foodItem.get_all_foodItem);

router.get('/allseats', seat.getAllSeats);


router.post('/addnewfood', (req, res) => {
    req = req.body
    foodItem.add_new_food(req, function(data) { 
       res.send(data); 
    })
})


router.post('/neworder', (req, res) => {

    req = req.body;
    order.placeNewOrder(req, function(data) {
        res.send({status: 'success', done: true, data: {categories: data}});
    });
});



//below route to change the seat selected status 
router.put('/seatSelected', (req, res) => {
    var seat_id = req.query.seat_id;
    var selected= req.query.selected;
    seat.seatSelection(seat_id, selected);
});



//route to change the booking status of seats
router.post('/seatsarrayStatusChange', (req, res) => {
    var arr = JSON.parse(req.query.array);
    console.log(arr);
    seat.seatsStatusChange(arr);

});

router.post('/postcheck', (req, res) => {
    var items = req.body;
    console.log(items);
    console.log("some update from React side");
})


router.post('/json', (req) => {
    console.log(req.body);
})



module.exports = router;