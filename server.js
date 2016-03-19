var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

function compressLogs() {
  targz().compress('/home/myuser', '/bkp/backup.tar.gz')
    .then(function(){
      console.log('Job done!');
    })
    .catch(function(err){
      console.log('Something is wrong ', err.stack);
    });
}