module.exports = function(dbPass) {
	if(dbPass) {
		return {
	    	'url' : 'mongodb://vamoto:' + dbPass + '@localhost/vamoto' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
	    };
	} else {
		return {
			'url': 'mongodb://localhost/vamoto'
		};
	}
};