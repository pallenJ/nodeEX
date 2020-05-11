var port = 8801;

var io = require('socket.io').listen(port);  // 8801 포트로 소켓을 엽니다

console.log('server running at '+port+' port');

 

io.sockets.on('connection', function (socket) { // connection이 발생할 때 핸들러를 실행합니다.

 io.sockets.emit('conn', 'connected');

 

 socket.on('message', function(message){

  io.sockets.emit('message', message);  //client에 message 라는 키로 값을 전송합니다.

 });

});
