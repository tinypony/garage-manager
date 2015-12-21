var _ = require('underscore');
var User = require('../models/user.js');
var mw = require('./middleware/vamiddleware.js');

module.exports = function(app, passport) {
	app.get('/user', mw.authenticated(), mw.groupAccess('admin'), function(req, res) {
		User.find({}).exec(function(err, users) {
			if(err) {
				res.status(400).send('Could not fetch users');
			}

			res.json(users);
		});
	});
};