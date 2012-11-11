;(function( $ ){
	$({
		port: 	8091,
		types: {
			"js":	'text/js',
			"html":	'text/html'
		}
	})
		.httpserver()
		.wsserver()
		.on('request', function( event, _connection ){
			console.log('Nouvelle connexion');
			
			$( _connection )
				.on('message', function(event, message){
					console.log('Nouveau message: %s', message);
				})
				.on('close', function(){
					console.log('Une connexion s\'est fermee');
				});
		});
})( require('jquery'), 						// Load jQuery
	require('./src/jquery.httpserver'), 	// Load your http Server
	require('./src/jquery.wsserver') );		// Load your websocket server 