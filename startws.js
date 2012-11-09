;(function( $ ){
	$({
		port: 	8090,
		path: './www',
		types: {
			"js":	'text/js',
			"html":	'text/html'
		}
	})
		.httpserver();
})( require("jquery"), 				// Load jQuery
	require('./src/httpserver') );	// Load your chat services