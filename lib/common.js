var config = require('./config');
var querystring = require('querystring');
var http = require('http');

exports.test = function(res, options) {
	var path = '/' + options.module + '/?/' + options.action + '?' + querystring.stringify(options.params);

	var params = {
		hostname: config.get('data_host'),
		port: config.get('data_port'),
		path: path,
		method: 'POST'
	};

	if ('undefined' == typeof(options.error)) {
		options.error = function(e) {
			res.render('error', e);	
		}
	}

	var request = http.request(params, function(response) {
		response.setEncoding('utf8');
		response.on('data', options.sucess);
	});	

	request.on('error', options.error);
	if ('undefined' == typeof(options.timeout)) {
		options.timeout = 200;
	}

 	request.setTimeout(options.timeout, function() {
		request.abort();
	});
	request.end()
}
