var fs = require('fs')
var express = require('express');
var router = express.Router();
var foodItem = require('./Controllers/foodItem.controller');
var order = require('./Controllers/order.controller');
var seat = require('./Controllers/seat.controller');

//route for getting all food items list in mysql database
router.get('/foodlist' , foodItem.get_all_foodItem);


//route for getting all seats info in mysql database
router.get('/allseats', seat.getAllSeats);


//route to clearSeats if user didn't proceed with order or we can use while payment unsuccessful
router.post('/clearSeats', (req) => {
    var seats = req.body.seats;
    console.log(seats);
    if(seats.length != 0) {
        seat.clearMultipleSeats(seats);
    }

})


//route if admin want to add new food item in mysql database
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


//for video streming part in museum app not part of food app
router.get('/video' , function(req , res) {
    const path = 'assets/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {

        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] 
          ? parseInt(parts[1], 10)
          : fileSize-1
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
      }
})


router.get('/barcodescanned', function(req , res) {
    console.log(req);
    res.send({
        description: 'The humanoid robot was built in 1495 by Leonardo Da vinci. The robot is clad in medieval armour that resembles the armoury of Germany and Italy',
        url: '10.10.3.112:4000/api/video'
    })
})





module.exports = router;