// Generated by CoffeeScript 1.3.1
(function() {
  var app, io, server, socket;

  server = require('http');

  socket = require('socket.io');

  app = server.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Gallo from da house!');
  }).listen(8080);

  io = socket.listen(app);

  io.sockets.on('connection', function(socket) {
    socket.set('nickname', "gallis" + (Math.floor(Math.random() * 11)));
    socket.on('msg', function(data) {
      return socket.get('nickname', function(err, nick) {
        return socket.broadcast.emit('postMsg', {
          msg: data.msg,
          nickname: nick
        });
      });
    });
  });

}).call(this);