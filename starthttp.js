;(function( $ ){
	$({
		port: 	8090
	})
		.httpserver();
})( require('jquery'), 				// Load jQuery
	require('./src/jquery.httpserver') );	// Load your web server