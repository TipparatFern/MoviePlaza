var express     = require('express'),
    router      = express.Router(),
    multer      = require('multer'),
    path        = require('path'),
    //call obj trough middleware
    middleware  = require('../middleware'),
    storage     = multer.diskStorage({
                    destination: function(req, file, callback){
                        callback(null,'./public/uploads');
                    },
                    filename: function(req, file, callback){
                        // path for type of file
                        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                    }
                }),
    imageFilter = function(req, file, callback){
        //for check these (extension) are allowed image files 
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
            return callback(new Error('Only jpg, jpeg, png and gif Image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({storage: storage, fileFilter: imageFilter}),
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
router.post('/', middleware.isLoggedIn, upload.single('image'), function(req,res){
    // req.body.movies
    req.body.movies.image ='/uploads/'+ req.file.filename;//declare already
    // var name = req.body.name;
    // var image = req.body.image;
    // var desc = req.body.desc;
    // var genre = req.body.genre;
    // var time = req.body.time;
    // var rating = req.body.rating;
    req.body.movies.author = {
        id: req.user._id,
        username: req.user.username
    };
    // var newMovie = {name: name, image: image, desc: desc, genre: genre, time: time, rating: rating, author: author};
    Movie.create(req.body.movies, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect('/movie');
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('movies/new.ejs')
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

//edit
router.get('/:id/edit', middleware.checkMovieOwner, function(req,res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            console.log(foundMovie);
            res.render('movies/edit.ejs',{movies: foundMovie});
        }
    });
});

router.put('/:id', upload.single('image'), function(req, res){
    //image in case doesnt upload image, check upload or not
    if(req.file){
        req.body.movies.image = '/uploads/' + req.file.filename;
    }
    Movie.findByIdAndUpdate(req.params.id, req.body.movies, function(err, updatedMovie){
        if(err){
            res.redirect('/movie/');
        }else{ 
            res.redirect('/movie/' + req.params.id);
        }
    });
});

//delete
router.delete('/:id', middleware.checkMovieOwner, function(req, res){
    Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/movie/');
        }else{ 
            res.redirect('/movie/');
        }
    });
});

module.exports = router;