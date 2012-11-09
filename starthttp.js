;(function( $ ){
	$({
		port: 	8090
	})
		.httpserver();
})( require("jquery"), 				// Load jQuery
	require('./src/httpserver') );	// Load your chat services