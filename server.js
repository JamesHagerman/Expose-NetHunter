/*jslint node: true */
"use strict";

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var compression = require('compression');
var sassMiddleware = require('node-sass-middleware');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars'); // Template/frontend help

var request = require('request'); // AJAX requests
// var targz = require('tar.gz');
var marked = require('marked'); // Markdown parsing

//========
// Our libs:
var tarFetch = require('./lib/tarFetch');

//=============
// App configs:

marked.setOptions({
  // Configure marked markdown renderer:
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
app.use(compression({
  threshold: 512
}));
app.use(sassMiddleware({
  src: __dirname + '/scss',
  dest: __dirname + '/public/css',
  //debug: true,
  outputStyle: 'compressed',
  prefix: '/css'
}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Setup the template engine:
app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
app.engine('hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', 'hbs');

// End app config
//================
// Server start

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

io.on('connection', function(socket){
  console.log('New socket.io connection');
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

//============
// ROUTING:

app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

app.get('/fetchCapture', function (req, res) {
  console.log('fetch endpoint hit');

  var path = '';
  if (typeof req.query === 'undefined' || typeof req.query.path === 'undefined') {
    path = '/var/lib/mana-toolkit';
  } else {
    path = req.query.path;
  }

  var filename = 'capture-logs.tar.gz';

  console.log('path to compress: ', path);
  console.log('output filename: ', filename);
  tarFetch.capture(path, filename, req, res);

});
