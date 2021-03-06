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


router.get('/:comments_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.paramas.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('comments/edit.ejs',{movie_id: req.params.id, comment: foundComment});
        }
    });
});

router.put('/:comments_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/movie/'+req.params.id);
        }
    });
});

module.exports = router;