socket = io.connect 'http://localhost:8080'

socket.on 'write', (data) ->
  $('#messages').append String.fromCharCode data.key

jQuery ->
  $(document).keyup (e) ->
    socket.emit 'keypress', {key: e.which}
    return
