var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
const conf = require('./conf');

var app = express();

const root_dir = path.resolve(__dirname, './');
console.log(root_dir);

// 
// define and set static dirname
// 
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/', express.static(conf.static_default));
app.use('/modules', express.static(conf.nodeModules));

/////////////////////////////////////////////////////////////////////////
// ERROR message Handler
/////////////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('\nurl: ', req.url)
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

// custom error page
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err)
    if (err) {
      res.status(err.status || 500);
      // log.mark(' > ERROR: ' + err.message);
      console.log('> ERROR: ' + err.message);
      res.end('<h1 style="text-align: center; padding: 10%"> 404 Bad Request... </h1>');
    }
  });
} else {
  app.use(function (err, req, res, next) {
    res.status(err.status || 404);
    res.end('<h1 style="text-align: center; padding: 10%"> 404 Bad Request... </h1>');
  });
}

module.exports = app;