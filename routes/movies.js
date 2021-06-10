var express     = require('express'),
    router      = express.Router(),
    Movie       = require('../models/movie');

//movie
router.get('/', function(req, res){
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else{
            res.render('movies/index.ejs',{movies: allMovies});
        }
    });
});

router.post('/', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var genre = req.body.genre;
    var time = req.body.time;
    var rating = req.body.time;
    var newMovie = {name: name, image: image, desc: desc, genre: genre, time: time, rating: rating};
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/movie');
        }
    });
});

//show
router.get('/:id', function(req,res){
    //ref or join have to reveal it , follow var that we want to reveal, execute
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        }else {
            //write {variables in this fole: found in varaibles that ref from presently file}
            res.render('movies/show.ejs', {movies: foundMovie});
        }
    });
});



module.exports = router;