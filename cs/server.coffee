io = require('socket.io').listen 8080

io.sockets.on 'connection', (socket) ->

  socket.on 'nickname', ( name ) ->
    socket.set 'nickname', name.nick, ->
      params = name: name.nick
      socket.broadcast.emit 'nickname', params
      socket.emit 'nickname', params

  socket.on 'message', ( msg, fn ) ->
    socket.broadcast.emit 'message',
      body: msg.body
    fn()

    return

#  socket.on 'client_message', (data) ->
    #socket.get 'nickname' , (err,nick) ->
      #socket.broadcast.emit 'receive_message', { body: data.body, sender: nick }

  #socket.on 'disconnect', ->
    #socket.get 'nickname' , (err,nick) ->
      #io.sockets.emit 'user_leave', { body: "#{nick} se ha ido :(" }

  #socket.on 'get_nickname', ->
  #  socket.set 'nickname', 'given fake nickname' , ->

  return
