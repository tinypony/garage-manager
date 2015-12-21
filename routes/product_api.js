var _ = require('underscore');
var Product = require('../models/product.js');
var mw = require('./middleware/vamiddleware.js');
var multer  = require('multer')
var upload = multer({ dest: 'public/app/media' })

module.exports = function(app, passport) {

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

	app.post('/product/image', mw.authenticated(), mw.groupAccess('admin'), upload.single('file'), function (req, res) {
	  console.log(req.file);
	  res.status(200).json({
	  	'image_url': '/media/'+req.file.filename
	  });
	})
};