;(function(http, url, fs, $){
	$.fn.httpserver = function( ){
		return this.each(function(){
			var _options = $.extend( {}, {
				port: 80,
				path: './www',
				types: {
					"html":	'text/html'
				}
			}, this );
			
			// Création du serveur HTTP
			$(this).data('httpserver', http.createServer( function (req, res) { // fonction de callback appelée pour chaque appel de page
				var _pathname = url.parse(req.url).pathname;
				var _ext = _pathname.split('/');
				_ext = _ext[_ext.length-1].split('.');
				_ext = ( _ext.length < 2 ? '' : _ext[_ext.length-1] );
				
				fs.readFile( _options.path + _pathname, function(err, data){
						if ( err ){
							// code de statut 404 (FILE_NOT_FOUND) et retourne un fichier de type 'text/plain'
							res.writeHead(404, {'Content-Type': 'text/plain'});
							// Affiche une erreur
							res.end('Ereur 404: Fichier non trouve\n');
						} else {
							// code de statut 200 (OK) et retourne un fichier de type 'text/plain'
							res.writeHead(200, {'Content-Type': typeof(_options.types[ _ext ]) != "undefined" ? _options.types[ _ext ] : 'text/plain' });
							// retourne le fichier trouve
							res.end( data );
						}
					});
				} )
				.listen( _options.port ) 
			);
		});
	};
})(	require('http'), 
	require('url'), 
	require('fs'), 
	require('jquery') );