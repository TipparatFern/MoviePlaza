//rights for access info
var Movie = require('../models/movie');

var middlewareObj = {};

middlewareObj.checkMovieOwner = function(req ,res, next){
    //user is authen or not
    if(req.isAuthenticated()){
        //
    } else {
        res.redirect('back');
    }
}

//change function isLoggedIn to be middleware object
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        //yes user is log in
        return next();
    }// no
    res.redirect('/login');
}