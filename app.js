/**
 * Module dependencies.
 */

var express = require('./opt/lib/node_modules/express');
var ejs = require('./opt/lib/node_modules/ejs');
var routes = require('./routes');
var user = require('./routes/user');

var device = require('./routes/device');
var madapter = require('./routes/madapter');
var mAttribute = require('./routes/mAttribute');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('phtml', ejs.renderFile);
app.set('view engine', 'phtml');
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
app.post('/device_indexList', device.indexList);

app.get('/device_add', device.add);
app.post('/device_doAdd', device.addData);

app.get('/device_update', device.update);
app.post('/device_doUpdate', device.updateData);

app.post('/device_doDelete', device.deleteData);

//madapter
app.get('/madapter', madapter.index);
app.post('/madapter_indexList', madapter.indexList);
app.get('/madapter_add', madapter.add);
app.post('/madapter_doAdd', madapter.addData);

app.get('/madapter_update', madapter.update);
app.post('/madapter_doUpdate', madapter.updateData);

app.get('/madapter_doDelete', madapter.delelteData);

//@todo madapter_attr
//app.get('/monitor_attr', mAttribute.index);

//@todo madapter_metric

//@todo madapter_archive

//@todo dmonitor

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
