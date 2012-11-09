/**
 * Simple Hello World
 */
;(function( http /* variable qui re�oit le module http */ ){
	// Cr�ation du serveur HTTP
	http.createServer( function (req, res) { // fonction de callback appel�e pour chaque appel de page
			// code de statut 200 (OK) et retourne un fichier de type 'text/plain'
			res.writeHead(200, {'Content-Type': 'text/plain'});
			// Le ficier retourn� contient le texte 'Hello World'
			res.end('Hello World\n');
		} )
		.listen( 1337, '127.0.0.1' );	 // Le seveur �coutera le port 1337  
})( require('http') /* inclue le module http */ );
