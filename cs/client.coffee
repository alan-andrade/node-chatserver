socket = io.connect 'http://localhost:8080'

socket.on 'write', (data) ->
  $('#messages').append String.fromCharCode data.key

socket.on 'new_connection', (data) ->
  alert(data)

jQuery ->
  $(document).keyup (e) ->
    socket.emit 'keypress', {key: e.which}
    return
