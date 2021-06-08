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

var movieRoutes     = require ('./routes/movies'),
    commentRoutes   = require ('./routes/comments'),
    indexRoutes     = require ('./routes/index');

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


var theater = [
    {name:'THEATER 1'},
    {name:'THEATER 2'},
    {name:'THEATER 3'},
    {name:'THEATER 4'},
    {name:'THEATER 5'},  
];

app.use('/', indexRoutes);
app.use('/movie', movieRoutes);
app.use('/movie/:id/comments', commentRoutes);


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
