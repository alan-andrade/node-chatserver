// Generated by CoffeeScript 1.3.1
(function() {
  var NickFactory, io, _;

  _ = require('underscore');

  io = require('socket.io').listen(8080);

  io.sockets.on('connection', function(socket) {
    var socket_nickname;
    socket_nickname = NickFactory.choose();
    socket.set('nickname', socket_nickname, function() {
      socket.emit('new_connection', {
        body: "Haz iniciado sesion como " + socket_nickname + "..."
      });
      return socket.broadcast.emit('new_connection', {
        body: "" + socket_nickname + " entro a la grilla"
      });
    });
    socket.on('client_message', function(data) {
      return socket.get('nickname', function(err, nick) {
        return socket.broadcast.emit('receive_message', {
          body: data.body,
          sender: nick
        });
      });
    });
    socket.on('disconnect', function() {
      return socket.get('nickname', function(err, nick) {
        NickFactory.release(nick);
        return io.sockets.emit('user_leave', {
          body: "" + nick + " se ha ido :("
        });
      });
    });
  });

  NickFactory = {
    _free: ['El Peje', 'EPN', 'Elba Esther', 'Brozo', 'Quadri', 'Poniatowska', 'Loret', 'El Chicharito', 'El Canelo', 'Josefina VM', 'La prole', 'Paullette', 'Azcárraga', 'Aramburuzabala', 'Slim', 'Adal', 'Dresser', 'Frida Khalo', 'Santa Anna', 'Cantinflas', 'Irma Serrano', 'Pancho Villa', 'Hidalgo', 'El chapulín colorado', 'Benito Juárez', 'Morelos', 'Margarito', 'El Santo', 'Juan Ga', 'Calderón'],
    _given: [],
    choose: function() {
      var chosen;
      chosen = _.first(_.shuffle(this._free));
      if (chosen) {
        this._given.push(chosen);
      } else {
        chosen = "Ciudadano: " + ((Math.random() * 1000) + 1);
      }
      return chosen;
    },
    release: function(name) {
      var index;
      index = _.indexOf(this._given, name);
      this._given.splice(1, index);
      this._free.push(name);
    }
  };

}).call(this);
