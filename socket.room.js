var http = require('http')
var fs = require('fs')
var socketio = require('socket.io')

//웹서버 생성
var server = http.createServer();
var io = socketio.listen(server);

server.listen(52273, function () {
    console.log('Server running at http:127.0.0.1:52273');
})

server.on('request',function (req,res) {
    fs.readFile('HTMLPage.html', function (error,data) {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);        
    })
})

io.sockets.on('connection', function (socket) {
    //방이름을 저장할 변수
    var roomName = null;

    //join 이벤트
    socket.on('join', function (data) {
        roomName =data;
        socket.join(data);
    });
    //message 이벤트
    socket.on('message',function (data) {
        io.sockets.in(roomName).emit('message','test');
    })

});
