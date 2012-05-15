// Generated by CoffeeScript 1.3.1
(function() {
  var choose_nickname, io;

  io = require('socket.io').listen(8080);

  io.sockets.on('connection', function(socket) {
    var socket_nickname;
    socket_nickname = choose_nickname();
    socket.set('nickname', socket_nickname, function() {
      socket.broadcast.emit('new_connection', {
        nickname: socket_nickname
      });
      return socket.emit('new_connection', {
        nickname: socket_nickname
      });
    });
    socket.on('client_message', function(data) {
      return socket.get('nickname', function(err, nick) {
        return socket.broadcast.emit('receive_message', {
          body: data.body,
          nickname: nick
        });
      });
    });
    return;
    return socket.on('disconnet', function() {
      return socket.broadcast.emit('user_leave');
    });
  });

  choose_nickname = function() {
    var nicknames;
    nicknames = ['El Peje', 'Enrique Peña Nieto', 'Elba Esther', 'El teacher', 'Derbez', 'Poniatowska', 'Loret', 'El Chicharito', 'El Canelo', 'Josefina VM', 'La prole', 'Paullette', 'El Vitor', 'Azcarraga', 'Aramburuzabala', 'Slim', 'Adal', 'Dresser'];
    return nicknames[Math.floor(Math.random() * nicknames.length)];
  };

}).call(this);
