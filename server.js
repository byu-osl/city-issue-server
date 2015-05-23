"use strict";

global.isUndefined = function(thing) {
  return (typeof thing === 'undefined');
}
global.__rootDirname = __dirname;

var app = require('./app');
var debug = require('debug')('app:server');
var http = require('http');


var port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  console.log('Listening on port ' + server.address().port);
}

// Exporting the app so Mocha can access it.
module.exports = app;