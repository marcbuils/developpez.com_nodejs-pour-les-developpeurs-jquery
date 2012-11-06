;(function( $ ){
	$( [{
			port: 	8090,
			path: './www/design1',
			types: {
				"js":	'text/js',
				"html":	'text/html'
			}
		},
		{
			port: 	8095,
			path: './www/design2',
			types: {
				"js":	'text/js',
				"html":	'text/html'
			}
		}] )
		.httpserver()
		.wsserver()
		.chatserver();
})( require("jquery"), 			// Load jQuery
	require('./httpserver'), 	// Load your http Server
	require('./wsserver'),		// Load your websocket server
	require('./chatserver') );	// Load your chat services