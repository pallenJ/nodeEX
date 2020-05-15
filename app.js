var createError = require('http-errors');
var express = require('express');
var socketio = require('socket.io');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var io = socketio();
var server = require('http').createServer(app)
const session = require('express-session');

io.attach(server);
//소켓서버 실행
io.sockets.on('connection',function (socket) {
  socket.on('rint', function (data) {
    //socket.emit('smart',data)
  })
  var roomName = null;
  
  socket.on('join',function (data) {
    roomName = data;
    socket.join(data);
  })

  socket.on('message',function (data) {
    //roomName이란 room에만 이벤트 발생
    io.sockets.in(roomName).emit('message',data)
  })

})
server.listen(8000)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret:'secret key',
  resave:false,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //develope 환경, 실행할때만 호출됨
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //production환경에서 오류처리
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
