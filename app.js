var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    User            = require('./models/user'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    seedDB          = require('./seed');

var movieRoutes     = require ('./routes/movies'),
    commentRoutes   = require ('./routes/comments'),
    indexRoutes     = require ('./routes/index'),
    theaterRoutes   = require ('./routes/theater');

mongoose.connect('mongodb://localhost/movieplaza');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view egine','ejs');
app.use(express.static(__dirname + 'public'));
seedDB();

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


app.use('/', indexRoutes);
app.use('/movie', movieRoutes);
app.use('/movie/:id/comments', commentRoutes);


app.listen('3000',function(){
    console.log("Movie Plaza is running");
});
