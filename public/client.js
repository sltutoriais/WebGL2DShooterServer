var socket = io() || {};
socket.isReady = false;

window.addEventListener('load', function() {

	var execInUnity = function(method) {
		if (!socket.isReady) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		
		gameInstance.SendMessage("NetworkManager", method, args.join(':'));
	};

	socket.on('PONG', function() {
				      		
	 
	  gameInstance.SendMessage ('NetworkManager', 'OnPrintPongMsg');
	});
	socket.on('JOIN_SUCCESS', function(id,name,avatar) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar;
	  gameInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
	});
	socket.on('SPAWN_PLAYER', function(id,name,avatar,dx) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar+':'+dx;
	  gameInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
	});
	
	socket.on('UPDATE_POS_AND_ROT', function(id,dx,rotation) {
				      		
	  var currentUserAtr = id+':'+dx+':'+rotation;
	  gameInstance.SendMessage ('NetworkManager', 'OnUpdatePosAndRot', currentUserAtr);
	});
	
	socket.on('UPDATE_JUMP', function(id) {
				      		
	  var currentUserAtr = id;
	  gameInstance.SendMessage ('NetworkManager', 'OnUpdateJump', currentUserAtr);
	});

   socket.on('UPDATE_PLAYER_DAMAGE', function(id,health) {
				      		
	  var currentUserAtr = id+':'+health;
	  gameInstance.SendMessage ('NetworkManager', 'OnUpdatePlayerDamage', currentUserAtr);
	});	

 socket.on('GAME_OVER', function(id) {
				      		
	  var currentUserAtr = id;
	  gameInstance.SendMessage ('NetworkManager', 'OnGameOver', currentUserAtr);
	});	
	
 socket.on('UPDATE_ANIMATOR', function(id,animation) {
				      		
	  var currentUserAtr = id+':'+animation;
	  gameInstance.SendMessage ('NetworkManager', 'OnUpdateAnim', currentUserAtr);
	});	

 socket.on('USER_DISCONNECTED', function(id) {
				      		
	  var currentUserAtr = id;
	  gameInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
	});		


});//END_WINDOW.ADDEVENTLISTENER

