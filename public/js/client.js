(function() {
  var socket;
  socket = io.connect('http://localhost:8080');
  socket.on('write', function(data) {
    return $('#messages').append(String.fromCharCode(data.key));
  });
  socket.on('new_connection', function(data) {
    return alert(data);
  });
  jQuery(function() {
    return $(document).keyup(function(e) {
      socket.emit('keypress', {
        key: e.which
      });
    });
  });
}).call(this);
