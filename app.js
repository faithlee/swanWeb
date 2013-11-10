
/**
 * Module dependencies.
 */

var express = require('/usr/local/node-v0.10.17/lib/node_modules/express');
var routes = require('./routes');
var user = require('./routes/user');
var monitor = require('./routes/monitor');
var device = require('./routes/device');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/users', user.list);

//monitor
app.get('/monitor', monitor.index);
app.get('/monitor_add', monitor.add);
app.get('/monitor_update', monitor.update);

//device
app.get('/device', device.index);
app.get('/device_add', device.add);
app.post('/device_doAdd', device.addData);
app.get('/device_update', device.update);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

