
exports.get = function(item) {
	var configs = {
		data_host: '192.168.37.128',
		data_port: '9080',
	};

	if ('undefined' == typeof(configs[item])) {
		return null;
	}

	return configs[item];
}
