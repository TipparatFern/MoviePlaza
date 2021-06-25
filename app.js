var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    User            = require('./models/user'),
    methodOverride  = require('method-override'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    seedDB          = require('./seed');

var movieRoutes     = require ('./routes/movie'),
    commentRoutes   = require ('./routes/comments'),
    indexRoutes     = require ('./routes/index');
    //edit this
var theaterRoutes   = require ('./routes/theater');

mongoose.connect('mongodb://localhost/movieplaza');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view egine','ejs');
// app.use(express.static(__dirname + 'public'));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
// seedDB();

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
//edit
app.use('/theater', theaterRoutes);



app.listen('9090',function(){
    console.log("Movie Plaza is running");
});
