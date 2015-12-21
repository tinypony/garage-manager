var _ = require('underscore');
var Category = require('../models/category.js');
var mw = require('./middleware/vamiddleware.js');

module.exports = function(app, passport) {

	app.post('/category', mw.authenticated(), mw.groupAccess('admin'), function(req, res) {
		Category.create(req.body, function(err, newCat) {
			if(err) {
				return res.status(400).json(err);
			} 

			res.status(201).json(newCat);
		});
	});

	app.put('/category/:id', mw.authenticated(), mw.groupAccess('admin'), function(req, res) {
		Category.findOneAndUpdate({_id: req.params.id}, req.body, function(err, updatedCategory) {
			res.status(200).json(updatedCategory);
		});
	});

	app.get('/category', function(req, res) {
		Category.find({}).exec(function(err, cats) {
			if(err) {
				res.status(400).send('Could not fetch categories');
			}

			res.status(200).json(cats);
		});
	});
};