_  = require 'underscore'
io = require('socket.io').listen 8080

io.sockets.on 'connection', (socket) ->
  socket_nickname = NickFactory.choose()
  socket.set 'nickname', socket_nickname, ->
    socket.emit 'new_connection', { body: "Haz iniciado sesion como #{socket_nickname}..." }
    socket.broadcast.emit 'new_connection', { body: "#{socket_nickname} entro a la grilla" }

  socket.on 'client_message', (data) ->
    socket.get 'nickname' , (err,nick) ->
      socket.broadcast.emit 'receive_message', { body: data.body, sender: nick }

  socket.on 'disconnect', ->
    socket.get 'nickname' , (err,nick) ->
      NickFactory.release(nick)
      io.sockets.emit 'user_leave', { body: "#{nick} se ha ido :(" }

  return

NickFactory = {
  _free : [
    'El Peje'
    , 'EPN'
    , 'Elba Esther'
    , 'Brozo'
    , 'Quadri'
    , 'Poniatowska'
    , 'Loret'
    , 'El Chicharito'
    , 'El Canelo'
    , 'Josefina VM'
    , 'La prole'
    , 'Paullette'
    , 'Azcárraga'
    , 'Aramburuzabala'
    , 'Slim'
    , 'Adal'
    , 'Dresser'
    , 'Frida Khalo'
    , 'Santa Anna'
    , 'Cantinflas'
    , 'Irma Serrano'
    , 'Pancho Villa'
    , 'Hidalgo'
    , 'El chapulín colorado'
    , 'Benito Juárez'
    , 'Morelos'
    , 'Margarito'
    , 'El Santo'
    , 'Juan Ga'
    , 'Calderón'
  ]
  , _given  : []
  , choose  : ->
    chosen = _.first(_.shuffle(this._free))
    if chosen
      this._given.push chosen
    else
      chosen = "Ciudadano: #{ (Math.random()*1000)+1 }"
    chosen
  , release : (name) ->
    index = _.indexOf(this._given, name)
    this._given.splice(1, index)
    this._free.push name
    return


}
