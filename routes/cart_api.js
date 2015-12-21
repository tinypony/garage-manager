var _ = require('underscore');
var Cart = require('../models/cart.js');
var ObjectId = require('mongoose').Types.ObjectId; 
var mw = require('./middleware/vamiddleware.js');

module.exports = function(app, passport) {

	function getAnonymousCartQuery(session_id) {
		console.log(session_id);
		return Cart.findOne({
			session: session_id
		}).populate('products.product');
	}

	function createAnonymousCart(session_id) {
		var newCart = new Cart({
			session: session_id,
			products: []
		});

		return newCart;
	}

	function getAuthenticatedCartQuery(user_id) {
		return Cart.findOne({
			ownedBy: new ObjectId(user_id)
		}).populate('products.product ownedBy');
	}

	function createAuthenticatedCart(user_id) {
		var newCart = new Cart({
			ownedBy: new ObjectId(user_id)
		});

		return newCart
	}

	function getCartQuery(req) {
		var query;
		var authenticated = req.isAuthenticated();

		if(authenticated) {
			query = getAuthenticatedCartQuery(req.user._id);
		} else {
			query = getAnonymousCartQuery(req.sessionID);
		}

		return query;
	}

	function createCart(req) {
		var cart;
		if(req.isAuthenticated()) {
			cart = createAuthenticatedCart(req.user._id);
		} else {
			cart = createAnonymousCart(req.sessionID);
		}

		cart.save();
		return cart;
	}

	app.get('/cart', function(req, res) {
		getCartQuery(req).exec(function(err, shoppingCart) {
			if(err) {
				res.status(400).json({
					error: 'Could not retrieve session, woops'
				});
			}
			console.log(shoppingCart);
			if(!shoppingCart) {
				shoppingCart = createCart(req);
			}

			res.status(200).json(shoppingCart);
		});
	});

	app.put('/cart', function(req, res) {
		getCartQuery(req).exec(function(err, shoppingCart) {
			if(err) {
				res.status(400).json({
					error: 'Could not retrieve session, woops'
				});
			}

			shoppingCart.products = _.uniq(req.body.cart.products);

			shoppingCart.save(function(err) {
				if(err) {
					res.status(400).json({
						error: 'Could not save shopping cart'
					});
				}

				res.status(200).json(shoppingCart);
			});
		});
	});
};
