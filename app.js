var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Movie           = require('./models/movie'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require('./seed');

mongoose.connect('mongodb://localhost/movieplaza');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view egine','ejs');
app.use(express.static(__dirname + 'public'));
//seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUnintialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//database_name.authen
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//refer user presently
app.use(function(req,res,next){
    //find data link with req keep value in  var
    res.locals.currentUser = req.user;
    next();
});

// var movieSchema = new mongoose.Schema({
//      name: String,
//      image: String,
//      desc: String
// });

// var Movie = mongoose.model('Movie', movieSchema);
// var movie = [
//     {name:'La La Land' ,image:'https://i.pinimg.com/originals/a3/fe/19/a3fe1953058d51294b8c061a9f76ead7.jpg', desc:'La La Land is a 2016 American musical romantic comedy-drama film.'},
//     {name:'Godzilla VS Kong' ,image:'https://i1.wp.com/keeping-it-reel.com/wp-content/uploads/2021/03/godzvkongposter.jpeg?ssl=1', desc:'Godzilla vs. Kong is a 2021 American monster film directed by Adam Wingard.'},
//     {name:'Ne Zha' ,image:'https://i.pinimg.com/564x/c9/1d/4d/c91d4d5497f12ec0154ab0560b64e3d6.jpg', desc:'Ne Zha is a 2019 Chinese 3D computer animation fantasy adventure film.'},
//     {name:'Seobok' ,image:'https://korean-drama-list.com/wp-content/uploads/2021/03/wer.png', desc:'Seo Bok is a 2021 South Korean sci-fi action film directed by Lee Yong-ju.'},   
//     {name:'I still see you' ,image:'https://s359.kapook.com/rq/375/auto/50/pagebuilder/cd28eca9-ba00-4878-963c-c84fe102f8b0.jpg', desc:'I Still See You is a 2018 American supernatural mystery thriller film.'}   
// ];

// Movie.create (
//     //create success should be or not success should be
//     {
//         name: 'La La Land',
//         image: 'https://i.pinimg.com/originals/a3/fe/19/a3fe1953058d51294b8c061a9f76ead7.jpg',
//         desc: 'La La Land'
//     },
//     //call back function when it doesnt success
//     function(err, movie){
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log('New data added');
//                 console.log(movie);
//             }
//     }
// );


var theater = [
    {name:'THEATER 1'},
    {name:'THEATER 2'},
    {name:'THEATER 3'},
    {name:'THEATER 4'},
    {name:'THEATER 5'},  
];

app.get('/',function(req,res){
    res.render('home.ejs');
});

//movie
app.get('/movie', function(req, res){
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else{
            res.render('movies/movie.ejs',{movies: allMovies});
        }
    });
});

app.post('/movie', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newMovie = {name: name, image: image, desc: desc};
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/movie');
        }
    });
});

//show
app.get('/movie/:id', function(req,res){
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

//comments
//middle wear route function function
app.get('/movie/:id/comments/new', isLoggedIn, function(req,res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        }else {
            res.render('comments/new.ejs', {movies: foundMovie});
        }
    });
});

app.post('/movie/:id/comments', isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
            res.redirect('/movie');
        }else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    foundMovie.comments.push(comment);
                    foundMovie.save();
                    res.redirect('/movie/'+ foundMovie._id);
                }
            });
        }
    });
});

//sign up and log in
app.get('/signup',function(req,res){
    res.render('signup.ejs');
});

app.post('/signup', function(req, res){
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

app.get('/login',function(req,res){
    res.render('login.ejs');
});

app.post('/login', passport.authenticate('local' ,
    {
        successRedirect: '/movie',//suceess go to this page
        failureRedirect: '/login'//unsuccess go to this page
    }), function(res, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/movie');
});
//middle wear to check user is log in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        //yes user is log in
        return next();
    }// no
    res.redirect('/login');
}

app.get('/ticket',function(req,res){
    res.render('ticket.ejs',{movie: movie});
});

app.get('/description',function(req,res){
    res.render('description.ejs');
});

app.get('/showtime',function(req,res){
    res.render('showtime.ejs');
});

app.get('/theater',function(req,res){
    res.render('theater.ejs',{theater: theater});
});

app.get('/history',function(req,res){
    res.render('history.ejs');
});

app.listen('3000',function(){
    console.log("Movie Plaza is running");
});
