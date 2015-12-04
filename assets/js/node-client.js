var socket = io.connect( 'http://10.0.0.184:8080' );
socket.on( 'changeStatus', function( data ) {
    $("#" + data.target).taskRecived($("#" + data.task_id));
});
