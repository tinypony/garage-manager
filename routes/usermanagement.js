var _ = require('underscore');

module.exports = function(app, passport) {
	
	// =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    

     // process the signup form
    app.post('/signup', function(req, res, next) { 
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { 
                return next(err); 
            }

            if (!user) { 
                return res.json(info); 
            } else {
                req.login(user, function(err) {
                    if (err) { 
                        return next(err);
                    }
                    return res.status(200).send('OK');
                });
            }
        })(req,res,next);
    });

    app.get('/current_user', function(req, res) {
        res.json({
            authenticated: req.isAuthenticated(),
            user: req.user
        });
    });

        // process the login form
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { 
                return next(err); 
            }

            if (!user) { 
                return res.status(401).json(info);
            }

            req.login(user, function(err) {
                if (err) { 
                    return next(err);
                }
                return res.send(200);
            });
        })(req, res,next);
    });
};