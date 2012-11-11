;(function($){
	$.fn.chatserver = function(){
		return this.each(function(){
			var $_this = $(this);
			
			// s'abonne au nouveaux clients
			$_this.on('request', function(_event, _connection){
				$( _connection )
					// on vient de se connecter
					.on('open', function(__event){
						// rien a faire
					})
					// on recoit un message de l'IHM
					.on('message', function(__event, _message){
						// on parse la reponse avant de la traiter
			        	var _data = JSON.parse(_message);
				        	
			        	// l'utilisateur vient de se connecter sur l'IHM
			        	if ( _data.type == 'open' ){
			        		$( _connection ).data( 'login', _data.login );			// on enregistre nom login
				        		
			        		$( $_this.data('connections').list )
			        			.trigger( 'chatopen', [_data.login] );	
			        	}else if ( _data.type == 'message' ){
			        		$( $_this.data('connections').list )
			        			.trigger( 'chatmessage', [$(_connection).data('login'), _data.message] );
			        	}
					})
					.on('close', function(__event){
						var _connections = $_this.data('connections');
						
						_connections.list.splice(_connections.list.indexOf(_connection), 1);
						$( _connections.list )
	        				.trigger( 'chatclose', [$(_connection).data('login')] );
					})
					// un nouvel utilisateur vient d'arriver
					.on('chatopen', function(__event, _login){
						// on envoi l'information ˆ l'IHM
						_connection.sendUTF( JSON.stringify({
							type: 'chatopen', 
							login: _login
						}) );	
					})
					// on recoit un message d'un autre utilisateur du chat
					.on('chatmessage', function(__event, _login, _message){
						// on envoi l'information ˆ l'IHM
						_connection.sendUTF( JSON.stringify({
							type: 'chatmessage', 
							login: _login, 
							message: _message
						}) );			
					})
					// un utilisateur vient de partir
					.on('chatclose', function(__event, _login){
						// on envoi l'information ˆ l'IHM
						_connection.sendUTF( JSON.stringify({
							type: 'chatclose', 
							login: _login
						}) );				
					});
			});
		});
	};
})( require('jquery') );