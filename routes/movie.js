var express     = require('express'),
    router      = express.Router(),
    multer      = require('multer'),
    path        = require('path'),
    //call obj trough middleware
    middleware  = require('../middleware'),
    // storage     = multer.diskStorage({
    //                 destination: function(req, file, callback){
    //                     callback(null,'./public/uploads');
    //                 },
    //                 filename: function(req, file, callback){
    //                     // path for type of file
    //                     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    //                 }
    //             }),
    // imageFilter = function(req, file, callback){
    //     //for check these (extension) are allowed image files 
    //     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
    //         return callback(new Error('Only jpg, jpeg, png and gif Image files are allowed!'), false);
    //     }
    //     callback(null, true);
    // },
    // upload = multer({storage: storage, fileFilter: imageFilter}),
    Movie       = require('../models/movie');

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
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var genre = req.body.genre;
    var time = req.body.time;
    var rating = req.body.rating;
    var newMovie = {name: name, image: image, desc: desc, genre: genre, time: time, rating: rating};
    Movie.create(req.body.movies, function(err, newlyCreated){
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
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
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

router.get('/:id/ticket', function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            console.log(foundMovie);
            res.render('ticket.ejs',{movies: foundMovie});
        }
    });
});

module.exports = router;