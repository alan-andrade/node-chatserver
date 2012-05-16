io = require('socket.io').listen 8080

io.sockets.on 'connection', (socket) ->
  socket_nickname = choose_nickname()
  socket.set 'nickname', socket_nickname, ->
    socket.emit 'new_connection', { body: "Haz iniciado sesion como #{socket_nickname}... y te aguantas" }
    socket.broadcast.emit 'new_connection', { body: "#{socket_nickname} entro a la grilla" }

  socket.on 'client_message', (data) ->
    socket.get 'nickname' , (err,nick) ->
      socket.broadcast.emit 'receive_message', { body: data.body, nickname: nick }
  return

  socket.on 'disconnet', ->
    socket.broadcast.emit 'user_leave'

choose_nickname = ->
  nicknames = [
    'El Peje'
    , 'Enrique Peña Nieto'
    , 'Elba Esther'
    , 'El teacher'
    , 'Derbez'
    , 'Poniatowska'
    , 'Loret'
    , 'El Chicharito'
    , 'El Canelo'
    , 'Josefina VM'
    , 'La prole'
    , 'Paullette'
    , 'El Vitor'
    , 'Azcarraga'
    , 'Aramburuzabala'
    , 'Slim'
    , 'Adal'
    , 'Dresser'
  ]
  nicknames[Math.floor(Math.random()*nicknames.length)]
