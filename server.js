(function() {
  var choose_nickname, io;
  io = require('socket.io').listen(8080);
  io.sockets.on('connection', function(socket) {
    var socket_nickname;
    socket_nickname = choose_nickname();
    socket.set('nickname', socket_nickname, function() {
      return socket.broadcast.emit('new_connection', {
        nickname: socket_nickname
      });
    });
    socket.on('msg', function(data) {
      return socket.get('nickname', function(err, nick) {
        return socket.broadcast.emit('postMsg', {
          msg: data.msg,
          nickname: nick
        });
      });
    });
  });
  choose_nickname = function() {
    var nicknames;
    nicknames = ['El Peje', 'Enrique Peña Nieto', 'Elba Esther', 'El teacher', 'Derbez', 'Poniatowska', 'Loret', 'El Chicharito', 'El Canelo', 'Josefina VM', 'La prole', 'Paullette', 'El Vitor', 'Azcarraga', 'Aramburuzabala', 'Slim', 'Adal', 'Dresser'];
    return nicknames[Math.floor(Math.random() * nicknames.length)];
  };
}).call(this);
