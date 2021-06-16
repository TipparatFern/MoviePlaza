var express     = require('express'),
    router      = express.Router(),
    Theater     = require('../models/theater');

//theater
router.get('/', function(req, res){
    Theater.find({}, function(err, allTheater){
        if(err){
            console.log(err);
        } else{
            res.render('theater/theater.ejs',{theater: allTheater});
        }
    });
});

router.post('/',function(req, res){
    var name = req.body.name;
    var branch = req.body.branch;
    var desc = req.body.desc;
    // var seat = req.body.seat;
    var count_seat = req.body.count_seat;
    var newTheater ={name: name, branch: branch, desc: desc, seat: seat, count_seat: count_seat}
    Theater.create(req.body.theater, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.redirect('/theater');
        }
    });
});