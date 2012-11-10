;(function($){
	$(function(){
	    // if user is running mozilla then use it's built-in WebSocket
	    window.WebSocket = window.WebSocket || window.MozWebSocket;

	    var _connection = new WebSocket('ws://' + document.URL.substr(7).split('/')[0]);
	    
	    $('#envoyer').click(function(){
	    	_connection.send( $('#texte').val() );
	    });
	});
})(jQuery);