// Generated by CoffeeScript 1.3.1
(function() {
  var io;

  io = require('socket.io').listen(8080);

  io.sockets.on('connection', function(socket) {
    return socket.on('user.new', function(name) {
      return socket.emit('user.ready');
    });
  });

}).call(this);
