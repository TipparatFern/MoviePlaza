app.get('/',function(req,res){
    res.render('home.ejs');
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