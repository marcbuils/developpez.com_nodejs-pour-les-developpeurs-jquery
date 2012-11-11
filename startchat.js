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
	require('./src/jquery.httpserver'), 	// Load your http Server
	require('./src/jquery.wsserver'),		// Load your websocket server
	require('./src/jquery.chatserver') );	// Load your chat services