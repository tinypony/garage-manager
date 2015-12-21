var mw = require('./middleware/vamiddleware.js');
var Category = require('../models/category.js');
var Product = require('../models/product.js');
var User = require('../models/user.js');

var _ = require('underscore');

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


	app.post('/product', mw.authenticated(), mw.groupAccess('admin'), function(req, res) {
		var productData = _.omit(req.body, 'category');
		productData.category = [req.body.category._id]; //use only id to refer to the category

		Product.create(productData, function(err, newProduct) {
			if(err) {
				return res.status(400).json(err);
			} 

			res.status(201).json(newProduct);
		});
	});

	app.put('/product/:id', mw.authenticated(), mw.groupAccess('admin'), function(req, res) {
		var productData = _.omit(req.body, 'category');
		productData.category = [req.body.category._id]; //use only id to refer to the category

		Product.findOneAndUpdate({_id: req.params.id}, productData, function(err, updatedCategory) {
			res.status(200).json(updatedCategory);
		});
	});

	app.get('/product', function(req, res) {
		Product.find({}).exec(function(err, products) {
			if(err) {
				res.status(400).send('Could not fetch products');
			}

			res.status(200).json(products);
		});
	});

	app.get('/user', mw.authenticated(), mw.groupAccess('admin'), function(req, res) {
		User.find({}).exec(function(err, users) {
			if(err) {
				res.status(400).send('Could not fetch users');
			}

			res.json(users);
		});
	});
};