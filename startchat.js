;(function( $ ){
	$({
		port: 	8092,
		path: './www',
		types: {
			"js":	'text/js',
			"html":	'text/html'
		}
	})
		.httpserver()
		.wsserver()
		.chatserver();
})( require("jquery"), 				// Load jQuery
	require('./src/httpserver'), 	// Load your http Server
	require('./src/wsserver'),		// Load your websocket server
	require('./src/chatserver') );	// Load your chat services