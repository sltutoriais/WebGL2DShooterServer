var socket = io() || {};
socket.isReady = false;

window.addEventListener('load', function() {

	var execInUnity = function(method) {
		if (!socket.isReady) return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		if(gameInstance!=null)
		{
		 gameInstance.SendMessage("NetworkManager", method, args.join(':'));
		}
		else if(unityInstance!=null)
		{
		  unityInstance.SendMessage("NetworkManager", method, args.join(':'));
		}
		
	};

	socket.on('PONG', function() {
				      		
	   if(gameInstance!=null)
		{
		  gameInstance.SendMessage ('NetworkManager', 'OnPrintPongMsg');
		}
		else if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnPrintPongMsg');
		}
	 
	});
	socket.on('JOIN_SUCCESS', function(id,name,avatar) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar;
	  if(gameInstance!=null)
		{
		 gameInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		 unityInstance.SendMessage ('NetworkManager', 'OnJoinGame', currentUserAtr);
		}
	  
	});
	socket.on('SPAWN_PLAYER', function(id,name,avatar,dx) {
				      		
	  var currentUserAtr = id+':'+name+':'+avatar+':'+dx;
	 if(gameInstance!=null)
		{
		  gameInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		 unityInstance.SendMessage ('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
		}
	 
	});
	
	socket.on('UPDATE_POS_AND_ROT', function(id,dx,rotation) {
				      		
	  var currentUserAtr = id+':'+dx+':'+rotation;
	  if(gameInstance!=null)
		{
		  gameInstance.SendMessage ('NetworkManager', 'OnUpdatePosAndRot', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		unityInstance.SendMessage ('NetworkManager', 'OnUpdatePosAndRot', currentUserAtr);
		}
	 
	});
	
	socket.on('UPDATE_JUMP', function(id) {
				      		
	  var currentUserAtr = id;
	  if(gameInstance!=null)
		{
		 gameInstance.SendMessage ('NetworkManager', 'OnUpdateJump', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnUpdateJump', currentUserAtr);
		}
	  
	});

   socket.on('UPDATE_PLAYER_DAMAGE', function(id,health) {
				      		
	  var currentUserAtr = id+':'+health;
	 if(gameInstance!=null)
		{
		  gameInstance.SendMessage ('NetworkManager', 'OnUpdatePlayerDamage', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnUpdatePlayerDamage', currentUserAtr);
		}
	 
	});	

 socket.on('GAME_OVER', function(id) {
				      		
	  var currentUserAtr = id;
	 if(gameInstance!=null)
		{
		  gameInstance.SendMessage ('NetworkManager', 'OnGameOver', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnGameOver', currentUserAtr);
		}
	 
	});	
	
 socket.on('UPDATE_ANIMATOR', function(id,animation) {
				      		
	  var currentUserAtr = id+':'+animation;
	  if(gameInstance!=null)
		{
		  gameInstance.SendMessage ('NetworkManager', 'OnUpdateAnim', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		  unityInstance.SendMessage ('NetworkManager', 'OnUpdateAnim', currentUserAtr);
		}
	 
	});	

 socket.on('USER_DISCONNECTED', function(id) {
				      		
	  var currentUserAtr = id;
	  if(gameInstance!=null)
		{
		  gameInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
		}
		else if(unityInstance!=null)
		{
		 unityInstance.SendMessage ('NetworkManager', 'OnUserDisconnected', currentUserAtr);
		}
	 
	});		


});//END_WINDOW.ADDEVENTLISTENER

