;(function( $ ){
	$({
		port: 	8090,
		types: {
			"js":	'text/js',
			"html":	'text/html'
		}
	})
		.httpserver()
		.wsserver()
		.on('request', function( _connection ){
			$( _connection )
				.on('open', function(){
					console.log('Nouvelle connexion');
				})
				.on('message', function(event, message){
					console.log('Nouveau message: %s', message);
				})
				.on('close', function(){
					console.log('Une connexion s\'est fermée');
				});
		});
})( require('jquery'), 				// Load jQuery
	require('./src/httpserver'), 	// Load your http Server
	require('./src/wsserver') );	// Load your websocket server 