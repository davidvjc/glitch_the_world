//server

//This node.js using Express server serves a file host.html with a video and a file index.html for everyone else
//Client sends touch data to this server, twhich then emits it back to all clients
//Only one client however, the host.html reads this data and integrates it into it's functionality
//to run this in terminal: go to the folder, run node index.js, then go to localhost:3000/ for client and /host.html for video

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	//server html file
  res.sendfile('phone.html');
});

app.get('/master.html', function(req, res){
	//server html file
  res.sendfile('master.html');
});

app.get('/screen.html', function(req, res){
	//server html file
  res.sendfile('screen.html');
});

app.get('/test.mp4', function(req, res){
	//server html file
  res.sendfile('test.mp4');
});

app.get('/test.mp3', function(req, res){
	//server html file
  res.sendfile('test.mp3');
});


io.on('connection', function(socket){
	

	// Screen Master data
  	socket.on('master data screen', function(msg){

    	var masterout_s = msg;
    	//emit out screen master data
        io.emit('master data screen action', masterout_s);
        console.log("master to screen: " + masterout_s);

        //check if the server is receiving a message
        console.log("server received the screen choice: " + masterout_s);
	});

	// phone Master data
  	socket.on('master data phone', function(msg){

    	var masterout_p = msg;
    	//emit out master data
        io.emit('master data phone action', masterout_p);
        console.log("master to phone: " + masterout_p);

        //check if the server is receiving a message
        console.log("server received the phone choice: " + masterout_p);
	});

	//receive Phone data
  	socket.on('phone data in', function(msg){

    	var phonein = msg;
    	//emit out master data
        io.emit('phone data out', phonein);
        console.log("phone data in: " + phonein);

        //check if the server is receiving a message
        console.log("server received phone data: " + phonein);
	});


});

//define port
http.listen(3030, function(){
  console.log('listening on port 3030');
});

