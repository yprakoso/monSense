var express  = require('express');
var bodyParser = require('body-parser');
var app      = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req,res,next){
    req.io = io;
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(client){
  console.log("Client connected");
  client.on('newData', function(data){
    //console.log(data);
    io.emit("updateData", { data });
  });
  client.on('disconnect', function(){
    console.log("Client disconnected");
  });
});

server.listen(3000);
console.log('Listen to http://localhost:3000');