var express     = require('express'),
    router      = express.Router(),
    Movie       = require('../models/movie'),
    Theater     = require('../models/theater');

//movie add multer for upload image
router.get('/', function(req, res){
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else{
            res.render('movies/index.ejs',{movies: allMovies});
        }
    });
});

//multer middleware func
router.post('/', function(req,res){
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.desc;
    var genre = req.body.genre;
    var runtime = req.body.runtime;
    var rating = req.body.rating;
    var releasedate = req.body.releasedate;
    var canvas = req.body.canvas;
    var newMovie = {title: title, image: image, desc: desc, genre: genre, runtime: runtime, rating: rating, releasedate: releasedate, canvas: canvas};
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect('/movie');
        }
    });
});


//show
router.get('/:id', function(req,res){
    //ref or join have to reveal it , follow var that we want to reveal, execute
    Movie.findById(req.params.id).populate('comments').populate('theater').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        }else {
            //write {variables in this file: found in varaibles that ref from presently file}
            res.render('movies/show.ejs', {movies: foundMovie});
        }
    });
});

//showtime
router.get('/:id/showtime', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            console.log(foundMovie);
            res.render('movies/showtime.ejs',{movies: foundMovie});
        }
    });
});
//showtime
router.get('/:id/showtime/:id', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            console.log(foundMovie);
            res.render('movies/seat.ejs',{movies: foundMovie});
        }
    });
});

router.get('/search', function(req, res) {
    res.render('search/search.ejs');
});

router.post('/search', function(req, res) {
    var name = req.body.search;
    res.redirect('/search/' + name);
});

router.get('/search/:title', function(req,res){
    Movie.find({title: new RegExp(req.params.title, 'i')}, function(err, foundMovietitle){
        if(err){
            console.log(err);
        } else {
            res.render('./search/search.ejs', {movies: foundMovietitle, sort: req.params.title});
        }
    });
});


module.exports = router;