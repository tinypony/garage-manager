var _ = require('underscore');
var Order = require('../models/order.js');
var mw = require('./middleware/vamiddleware.js');

module.exports = function(app, passport) {

	app.post('/orders', function(req, res) {
		var orderData = _.extend(req.body, {created: new Date(), status: 'NEW'});

		Order.create(orderData, function(err, newOrder) {
			if(err) {
				return res.status(400).json(err);
			}

			res.status(201).json(newOrder);
		});
	});

	app.get('/orders', function(req, res) {
		Order.find({
			status: 'NEW'
		}).sort({ preferredDate: -1 })
		.exec(function(err, orders) {
			if(err)
				res.status(400).json(err);

			res.status(200).json(orders);
		});
	});
};
