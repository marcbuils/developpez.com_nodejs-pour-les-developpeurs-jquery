;(function(http, url, fs, $){
	$.fn.httpserver = function( ){
		return this.each(function(){
			var _options = $.extend( {}, {
				port: 80,				// port par defaut
				path: './www',			// repertoire par defaut
				types: {				// liste des types de fichier acceptes
					"html":	'text/html'
				}
			}, this );
			
			// Cr�ation du serveur HTTP
			var _serveur = http.createServer( function (req, res) { // fonction de callback appel�e pour chaque appel de page
				var 	_pathname = url.parse(req.url).pathname,
					_ext = _pathname.split('/');
					
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
			.listen( _options.port, '127.0.0.1' );	// Le serveur �coutera le port 8090 
			
			// Partage le serveur
			$(this).data( 'httpserver', _serveur );
		});
	};
})(	require('http'), 	// charge le module http
	require('url'), 	// charge le module url
	require('fs'), 		// charge le module file system
	require('jquery') );// charge le module jQuery
