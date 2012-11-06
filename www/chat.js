;(function($){
	$(function(){
		var _login = prompt("Entrez votre login");
		
	    // if user is running mozilla then use it's built-in WebSocket
	    window.WebSocket = window.WebSocket || window.MozWebSocket;

	    var _connection = new WebSocket('ws://' + document.URL.substr(7).split('/')[0]);

	    _connection.onopen = function () {
	    	_connection.send( JSON.stringify({
	    		type: 'open', 
	    		login: _login
	    	}) );
	    };

	    _connection.onerror = function (_error) {
	        // an error occurred when sending/receiving data
	    	console.error('onerror: %s', _error);
	    };

	    _connection.onmessage = function (_message) {
	    	var _data = JSON.parse(_message.data);
	    	
	    	if ( _data.type == 'chatopen' ){
	    		$('#salon').prepend( $('<li></li>').text( ">>> "+_data.login+" vient d'arriver") );
	    	}else if ( _data.type == 'chatmessage' ){
	    		$('#salon').prepend( $('<li></li>').text( _data.login+": "+_data.message) );
	    	}else if ( _data.type == 'chatclose' ){
	    		$('#salon').prepend( $('<li></li>').text( _data.login+" vient de partir") );
	    	}
	    };
	    
	    $('#envoyer').click(function(){
	    	_connection.send( JSON.stringify({
	    		type: 'message', 
	    		message: $('#texte').val()
	    	}) );
	    });
	});
})(jQuery);