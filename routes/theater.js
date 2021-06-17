var express     = require('express'),
    router      = express.Router(),
    Theater     = require('../models/theater');

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
    var branch = req.body.branch;
    var name = req.body.name;
    var desc = req.body.desc;
    var day = req.body.day;
    var month =req.body.month;
    var year = req.body.year;
    var newTheater ={branch: branch, name: name, desc: desc, year: year, month: month, day: day}
    Theater.create(req.body.theater, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.redirect('/theater');
        }
    });
});