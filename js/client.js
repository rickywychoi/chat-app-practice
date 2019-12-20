$(() => {
  const socket = io();

  $('form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  });

  socket.on('chat message', (msg) => {
    $('#messages').append($(`<li>${msg}</li>`));
  })
});