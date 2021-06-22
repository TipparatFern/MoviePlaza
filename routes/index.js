var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    Movie       = require('../models/movie'),
    passport    = require('passport');


router.get('/',function(req,res){
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else{
            res.render('home.ejs',{movies: allMovies});
        }
    });
    
});

//sign up and log in
router.get('/signup',function(req,res){
    res.render('user/signup/signup.ejs');
});

router.post('/signup', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            //user go to this page when error
            return res.render('signup');
        }//save decode password
        passport.authenticate('local')(req, res, function(){
            res.redirect('/movie');
        });   
    });
});

router.get('/login',function(req,res){
    res.render('user/login.ejs');
});

router.post('/login', passport.authenticate('local' ,
    {
        successRedirect: '/movie',//suceess go to this page
        failureRedirect: '/login'//unsuccess go to this page
    }), function(res, res){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/movie');
});

module.exports = router;