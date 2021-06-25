var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    middleware  = require('../middleware'),
    Movie       = require('../models/movie'),
    Comment     = require('../models/comment');
    path        = require('path'),
    //call obj trough middleware
    middleware  = require('../middleware'),
//comments
//middleware route function function
router.get('/new', middleware.isLoggedIn, function(req,res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }else {
            res.render('comments/new.ejs', {movies: foundMovie});
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
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


router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.paramas.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('comments/edit.ejs',{movie_id: req.params.id, comment: foundComment});
        }
    });
});

router.get('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate()
})

module.exports = router;