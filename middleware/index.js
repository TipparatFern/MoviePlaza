//rights for access info
var Movie = require('../models/movie');

var middlewareObj = {};

middlewareObj.checkCommentOwner = function(req ,res, next){
    //user is authen or not
    if(req.isAuthenticated()){
        // same id currently user
        Movie.findById(req.params.id, function(err, foundComment){
            if(err){
                console.log(err);
            } else {//mongoose function check info is same
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');//back to older webpage
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

module.exports = middlewareObj;