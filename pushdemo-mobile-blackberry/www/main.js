var MessageList = (function(id){

    return {
    	cleanMessages : function(){
    		$(id).empty();
    		$(id).listview('refresh');
    	},
        addMessage : function(message){
            $("<li>").text(message).appendTo(id);
            $(id).listview('refresh');
        }
    }

})("#messages");


$(document).delegate('#main', 'pageinit', function(){
	var pubnub = PUBNUB.init({
        publish_key   : 'pub-bb70a1f9-8bc1-4716-98e8-eecbd3fbe035',
        subscribe_key : 'sub-5208c9eb-1c5b-11e1-9f33-9d1b3a4cde48',
        ssl           : false,
        origin        : 'pubsub.pubnub.com'
    });
    
    pubnub.subscribe({
        channel    : "push_demo",      // CONNECT TO THIS CHANNEL.
 
        restore    : true,              // STAY CONNECTED, EVEN WHEN BROWSER IS CLOSED
                                         // OR WHEN PAGE CHANGES.
        callback   : function(message) { // RECEIVED A MESSAGE.
            MessageList.addMessage(message.text);
        },
 
        error : function() {        // LOST CONNECTION.
        	MessageList.cleanMessages();
            MessageList.addMessage("Se ha perdido la conexion"); 
        }
    });

    MessageList.addMessage("La conexion ha sido establecida");

});
 
