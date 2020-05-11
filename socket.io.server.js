var http = require('http')
var fs = require('fs')
var socketio = require('socket.io')

//웹서버 생성
var server = http.createServer(function (req,res) {
    fs.readFile('HTMLPage.html',function (error,data) {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    })
}).listen(52273,function () {
    console.log('Server running at http:127.0.0.1:52273');
})


var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('rint',function (data) {
        //클라이언트가 전송한 데이터 출력
        //console.log('Client Send Data:',data);
        //클라이언트에 smart 이벤트를 발생시킴
        //socket.emit('smart',data)
        io.sockets.emit('smart',data);
        //socket.broadcast.emit('smart',data);
    })
})
