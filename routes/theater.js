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
    var year = req.body.year;
    var month =req.body.month;
    var day = req.body.day;
    var newTheater ={ provincal: provincal, branch: branch, image: image, desc: desc, year: year, month: month, day: day};
    Theater.create(req.body.theater, function(err, newlyCreated){
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
    Theater.findById(req.params.id).populate('movie').exec(function(err, foundTheater){
        if(err){
            console.log(err);
        }else {
            //write {variables in this file: found in varaibles that ref from presently file}
            res.render('theater/show.ejs', {theater: foundTheater});
        }
    });
});



module.exports = router;