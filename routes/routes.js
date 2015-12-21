//routes.js

module.exports = function(app, passport) {

    var idx = require('./index.js');

    /**
     * Routes
     */

    // serve index
    app.get('/', idx.index);
    require('./usermanagement.js')(app, passport);
    require('./product_api.js')(app, passport);
    require('./category_api.js')(app, passport);
    require('./user_api.js')(app, passport);
    require('./cart_api.js')(app, passport);

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}