/**
 * Module dependencies.
 */

var express = require('./opt/lib/node_modules/express');
var routes = require('./routes');
var user = require('./routes/user');

var device = require('./routes/device');
var monitor = require('./routes/monitor');
var mAttribute = require('./routes/mAttribute');

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

//app.get('/users', user.index);

//device
app.get('/device', device.index);

app.get('/device_add', device.add);
app.post('/device_doAdd', device.addData);

app.get('/device_update', device.update);
app.post('/device_doUpdate', device.updateData);

app.post('/device_doDelete', device.deleteData);

//madpater
app.get('/monitor', monitor.index);
app.get('/monitor_add', monitor.add);
app.post('/monitor_doAdd', monitor.addData);

app.get('/monitor_update', monitor.update);
app.post('/monitor_doUpdate', monitor.updateData);

app.get('/monitor_doDelete', monitor.delelteData);

//@todo madapter_attr  @todo 属性有问题，暂时不解决
//app.get('/monitor_attr', mAttribute.index);

//@todo madapter_metric

//@todo madapter_archive

//@todo dmonitor

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

