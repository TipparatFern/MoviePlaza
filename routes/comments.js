var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Movie       = require('../models/movie'),
    Comment     = require('../models/comment');
    path        = require('path'),
    //call obj trough middleware
    middleware  = require('../middleware'),
//comments
//middleware route function function
router.get('/new', isLoggedIn, function(req,res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }else {
            res.render('comments/new.ejs', {movies: foundMovie});
        }
    });
});

router.post('/', isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
            res.redirect('/movie');
        }else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    //add comment. access user id ,username for comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundMovie.comments.push(comment);
                    foundMovie.save();
                    res.redirect('/movie/'+ foundMovie._id);
                }
            });
        }
    });
});


//middleware to check user is log in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        //yes user is log in
        return next();
    }// no
    res.redirect('/login');
}

module.exports = router;