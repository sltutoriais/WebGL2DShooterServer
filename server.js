/*
*@autor: Rio 3D Studios
*@description:  java script file that works as master server of the Helicopter WARZONE MMO Game
*@date: 07/04/2020
*/
var express = require('express'); //import express NodeJS framework module

var app = express(); // create an object of the express module

var http = require('http').Server(app); // create a http web server using the http library

var io = require('socket.io')(http); // import socketio communication module


app.use("/public/TemplateData",express.static(__dirname + "/public/TemplateData"));

app.use("/public/Build",express.static(__dirname + "/public/Build"));

app.use(express.static(__dirname+'/public'));

var clientLookup = {};

//open a connection with the specific client
io.on('connection', function(socket){

 console.log('A user ready for connection!');//prints in the  nodeJS console


  var current_player;
 
 //create a callback fuction to listening EmitPing() method in NetworkMannager.cs unity script
  socket.on("PING",function(pack){


   console.log('ping');

  socket.emit("PONG");


});//END_SOCKET.ON

//create a callback fuction to listening EmitJoin() method in NetworkMannager.cs unity script
socket.on("JOIN_ROOM",function(_data){

  var pack = JSON.parse(_data);
  // fills out with the information emitted by the player in the unity
  current_player = {

    name : pack.name,
    id: socket.id,
	avatar: pack.avatar,
	dx:pack.dx,
	rotation:'r',
	health:100,
	maxHealth:100,
	isDead:false
	
  };
  
  console.log("[INFO] player " + current_player.id + ": logged!");
  
  clientLookup[current_player.id] = current_player;
  
  console.log ("[INFO] Total players: " + Object.keys(clientLookup).length);

  socket.emit("JOIN_SUCCESS",current_player.id,current_player.name,current_player.avatar);
  
  // spawn current_player client on clients in broadcast
  socket.broadcast.emit('SPAWN_PLAYER',current_player.id,current_player.name,current_player.avatar,current_player.dx);

   //spawn all connected clients for current_player client 
  for(client in clientLookup)
  {
    if(clientLookup[client].id!=current_player.id)
    {
      socket.emit('SPAWN_PLAYER',clientLookup[client].id,clientLookup[client].name,clientLookup[client].avatar,clientLookup[client].dx);
    }
  }
  
});//END_SOCKET.ON


socket.on("RESPAW",function(_data){

   var pack = JSON.parse(_data);
   
  console.log("receive respaw");
  
  if(current_player)
  {
	  current_player.isDead = false;
	  current_player.health = current_player.maxHealth;
	  current_player.avatar = pack.avatar;
	  current_player.dx = pack.dx;
		 
	  socket.emit("JOIN_SUCCESS",current_player.id,current_player.name,current_player.avatar);
  
      socket.broadcast.emit('SPAWN_PLAYER',current_player.id,current_player.name,current_player.avatar,current_player.dx);

      for(client in clientLookup)
      {
         if(clientLookup[client].id!=current_player.id)
         {
           socket.emit('SPAWN_PLAYER',clientLookup[client].id,clientLookup[client].name,clientLookup[client].avatar,clientLookup[client].dx);
      }
    }
	}
		  
		
  
});//END_SOCKET.ON

 
socket.on("POS_AND_ROT",function(_data){

 var pack = JSON.parse(_data);
  
 clientLookup[current_player.id].dx = pack.dx;
 
 clientLookup[current_player.id].rotation = pack.rotation;
 
 var data = {
   id:current_player.id,
   dx:pack.dx,
   rotation:pack.rotation
 };

 socket.broadcast.emit('UPDATE_POS_AND_ROT',data.id,data.dx,data.rotation);

});//END_SOCKET.ON

socket.on("JUMP",function(_data){
 
 var pack = JSON.parse(_data);
 var data = {
   id:current_player.id,
   
 };

 socket.broadcast.emit('UPDATE_JUMP',data.id);
 
 console.log("player jump");

});//END_SOCKET.ON

socket.on('ANIMATION',function(_data){

   var pack = JSON.parse(_data);
  socket.broadcast.emit('UPDATE_ANIMATOR',current_player.id,pack.animation);

});//END_SOCKET.ON

socket.on('DAMAGE',function(_data){

    var pack = JSON.parse(_data);
   var target = clientLookup[pack.id];
   
   var _damage = 10;
   
   if(target.health - _damage > 0)
   {
			   
	 target.health -=_damage;
	 
  }
  
   else
  {
      console.log("game over for: "+target.name);
      socket.emit('GAME_OVER',target.id);
	  
	  socket.broadcast.emit('GAME_OVER',target.id);
			   
  }
  
  socket.emit("UPDATE_PLAYER_DAMAGE",target.id,target.health);	   

	   socket.broadcast.emit("UPDATE_PLAYER_DAMAGE",target.id,target.health);

		

});//END_SOCKET.ON

socket.on('disconnect', function ()
	{
        console.log("User  has disconnected");
	    
	      if(current_player)
		    {
		       current_player.isDead = true;
		       socket.broadcast.emit('USER_DISCONNECTED', current_player.id);


		       delete clientLookup[current_player.id];
		     
		      
        }
    });//END_SOCKET.ON


});//END_IO.ON


http.listen(process.env.PORT ||3000, function(){
	console.log('listening on *:3000');
});

console.log('------- NodeJS server is running -------');
