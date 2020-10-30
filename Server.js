const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var routes = require('./Route');
var mysqldb = require('./services/mysql.db.service');
var socket = require('./services/socket.service');

var cors = require('cors');

app.use(cors());


const http = require('http').Server(app);



app.use(bodyParser.json());
app.use (bodyParser.urlencoded({extended: true}));




mysqldb.connect((err) => {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
      } else {
          console.log('DB connected')
      }
});

app.get('/', (req, res) => {
    res.send('hello new testing server')
})

app.use('/api' , routes);


socket.init(http);


http.listen(4000, () => {
    console.log("server ready at 4000");
})

var io = socket.getSocketIO();
app.set('socketio', io);
 
// const eventEmitter = new Emitter()
// app.set('eventEmitter', eventEmitter)