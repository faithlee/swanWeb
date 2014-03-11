
exports.get = function(item) {
	var configs = {
		data_host: '127.0.0.1',
		data_port: '9080',
	};

	if ('undefined' == typeof(configs[item])) {
		return null;
	}

	return configs[item];
}
