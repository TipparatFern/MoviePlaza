
var express     = require('express'),
    router      = express.Router(),
    Theater     = require('../models/theater');
    Movie       = require('../models/movie')

//theater
router.get('/', function(req, res){
    Theater.find({}, function(err, allTheater){
        if(err){
            console.log(err);
        } else{
            res.render('theater/index.ejs',{theater: allTheater});
        }
    });
});

router.post('/', function(req, res){
    var provincal = req.body.provincal;
    var branch = req.body.branch;
    var image = req.body.image;
    var desc = req.body.desc;
    var theater_no = req.body.theater_no;
    var newTheater ={ provincal: provincal, branch: branch, image: image, desc: desc, theater_no: theater_no};
    Theater.create(newTheater, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.redirect('/theater');
        }
    });
});

router.get('/:id', function(req,res){
    //ref or join have to reveal it , follow var that we want to reveal, execute
    Theater.findById(req.params.id, function(err, foundTheater){
        if(err){
            console.log(err);
        }else {
            console.log(foundTheater);
            //write {variables in this file: found in varaibles that ref from presently file}
            res.render('theater/showtime.ejs', {theater: foundTheater});
        }
    });
});



router.get('/:id/seat', function(req,res){
    //ref or join have to reveal it , follow var that we want to reveal, execute
    Theater.findById(req.params.id, function(err, foundTheater){
        if(err){
            console.log(err);
        }else {
            console.log(foundTheater);
            //write {variables in this file: found in varaibles that ref from presently file}
            res.render('theater/seat.ejs', {theater: foundTheater});
        }
    });
});


router.get('/:id/purchase', function(req,res){
    //ref or join have to reveal it , follow var that we want to reveal, execute
    Theater.findById(req.params.id, function(err, foundTheater){
        if(err){
            console.log(err);
        }else {
            console.log(foundTheater);
            //write {variables in this file: found in varaibles that ref from presently file}
            res.render('theater/purchase.ejs', {theater: foundTheater});
        }
    });
});

router.get('/search', function(req, res) {
    res.render('search/theater.ejs');
});

router.post('/search', function(req, res) {
    var name = req.body.search;
    res.redirect('/search/' + name);
});

router.get('/search/:branch', function(req,res){
    Theater.find({branch: new RegExp(req.params.branch, 'i')}, function(err, foundTheaterbranch){
        if(err){
            console.log(err);
        } else {
            res.render('./search/theater.ejs', {theater: foundTheaterbranch, sort: req.params.branch});
        }
    });
});


module.exports = router;