//edit this
var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Movie       = require('../models/movie'),
    Ticket    = require('../models/ticket');
//comments
//middle wear route function function
router.get('/new', isLoggedIn, function(req,res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }else {
            res.render('ticket.ejs', {movies: foundMovie});
        }
    });
});

router.post('/', isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
            res.redirect('/movie');
        }else {
            Ticket.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    //add comment. access user id ,username for comment
                    ticket.author.id = req.user._id;
                    ticket.author.username = req.user.username;
                    ticket.save();
                    foundMovie.ticket.push(ticket);
                    foundMovie.save();
                    res.redirect('/movie/'+ foundMovie._id);
                }
            });
        }
    });
});


//middle wear to check user is log in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        //yes user is log in
        return next();
    }// no
    res.redirect('/login');
}

module.exports = router;