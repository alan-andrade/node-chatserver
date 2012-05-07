server  = require 'http'
socket  = require 'socket.io'

app = server.createServer (req,res) ->
  res.writeHead 200
  res.end 'Gallo from da house!'
  return
.listen 8080

io = socket.listen app

io.sockets.on 'connection', (socket) ->
  socket.set 'nickname', "gallis#{Math.floor(Math.random()*11)}"
  socket.on 'msg', (data) ->
    socket.get 'nickname' , (err,nick) ->
      socket.broadcast.emit 'postMsg', {msg: data.msg, nickname: nick}
  return
