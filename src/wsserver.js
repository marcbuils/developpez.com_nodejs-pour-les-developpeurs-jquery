;(function( WebSocketServer, $ ){
	$.fn.wsserver = function(){
		return this.each(function(){
			var $_this = $(this);
			var _wsserver = null;
			var _connections = {
				list: []
			};
			
			try {
				// verifie si le serveur web a bien ete initialise
				if ( typeof( $_this.data('httpserver') ) == "undefined" ){
					throw "Serveur http non initialisé";
				}
				
				// Save the connection list data
				$_this.data('connections', _connections);
				
				// Cree le serveur de websocket
				_wsserver = new WebSocketServer({
					httpServer: $_this.data('httpserver')
				});
				
				// Surveille les evenements
				_wsserver
					.on('request', function(request) {
						var _connection = request.accept(null, request.origin);
						
						// ajoute la nouvelle connection a la liste des connections
						_connections.list.push( _connection );
						
						// diffuse l'information d'une nouvelle connection
						$_this.trigger('request', [_connection])
						
						// ecoute les evenements de la connection
						_connection
							.on('message', function(message) {
							        if (message.type === 'utf8') {
							        	// diffuse le message recu
							        	$(_connection).trigger('message', [message.utf8Data]);
							        }
							})
							.on('close', function(connection) {
							    // diffuse la fermeture de connection
								$(_connection).trigger('close');
							});
				});

			} catch( e ) {
				console.error( "Erreur du plugin services: %s", e )
			}
		});
	}
})(	require('websocket').server, 
	require('jquery') );