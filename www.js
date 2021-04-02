#!/usr/bin / env node

const app = require('./app');
const debug = require('debug')('apiserver: server');
const http = require('http');
const conf = require('./conf')

var port = normalizePort(process.env.PORT || conf.port);
app.set('port', port);

var server = http.createServer();
server.on('request', app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('---------------------------------------------------------');
  console.log('Server is Listening on ', bind);
  console.log('---------------------------------------------------------');
}