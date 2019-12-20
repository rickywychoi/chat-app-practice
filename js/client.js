$(() => {
  const socket = io();
  const adminSocket = io('/admin');

  socket.on('connect', () => {
    $('#welcome').text(`${socket.id} has entered the chatroom.`);
  });

  socket.on('disconnect', () => {
    $('#leave').text(`${socket.id} has left.`);
  });

  $('#m').focusin((e) => {
    e.preventDefault();
    $('#typing').text(`${socket.id} is typing...`);
  });
  
  $('#m').focusout((e) => {
    e.preventDefault();
    $('#typing').text('');
  });
  

  $('form').submit((e) => {
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    $('#typing').text('');
  });

  socket.on('chat message', (msg) => {
    $('#messages').append(`<li>${msg}</li>`);
  });

});