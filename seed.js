//create basic info for database
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var Comment = require('./models/comment');
var moviedata = [
    {
        name:'La La Land',
        image:'https://i.pinimg.com/originals/a3/fe/19/a3fe1953058d51294b8c061a9f76ead7.jpg', 
        desc:'La La Land is a 2016 American musical romantic comedy-drama film. It stars Ryan Gosling as a jazz pianist and Emma Stone as an aspiring actress, who meet and fall in love while pursuing their dreams in Los Angeles. John Legend, Rosemarie DeWitt, Finn Wittrock, and J. K. Simmons also star.',
        genre:'Romantic',
        runtime:'2 hrs 8 min',
        rating:'8.0/10',
        releasedate:'12/1/2017' ,
        canvas:'/images/lalalandcanvas.jpg'
    },
    {
        name:'Godzilla VS Kong',
        image:'https://i1.wp.com/keeping-it-reel.com/wp-content/uploads/2021/03/godzvkongposter.jpeg?ssl=1', 
        desc:'Godzilla vs. Kong is a 2021 American monster film directed by Adam Wingard.',
        genre:'Sci-Fi',
        runtime:'1 hr 53 min',
        rating:'6.5/10',
        releasedate:'25/3/2018' ,
        canvas:'/images/godzillavskong.jpg'
    },
    {
        name:'Ne Zha',
        image:'https://i.pinimg.com/564x/c9/1d/4d/c91d4d5497f12ec0154ab0560b64e3d6.jpg', 
        desc:'Ne Zha is a 2019 Chinese 3D computer animation fantasy adventure film.',
        genre:'Animation',
        runtime:'1 hr 50 min',
        rating:'7.5/10',
        releasedate:'4/12/2019' ,
        canvas:'/images/nezha.jpg'
    },
    {
        name:'Seobok',
        image:'https://korean-drama-list.com/wp-content/uploads/2021/03/wer.png', 
        desc:'Seo Bok is a 2021 South Korean sci-fi action film directed by Lee Yong-ju.',
        genre:'Sci-Fi',
        runtime:'1 hr 54 min',
        rating:'6.3/10',
        releasedate:'15/4/2021' ,
        canvas:'/images/seobok.jpg'
    },   
    {
        name:'I still see you' ,
        image:'https://s359.kapook.com/rq/375/auto/50/pagebuilder/cd28eca9-ba00-4878-963c-c84fe102f8b0.jpg',
        desc:'I Still See You is a 2018 American supernatural mystery thriller film.',
        genre:'Horror',
        runtime:'1 hr 34 min',
        rating:'5.8/10',
        releasedate:'27/9/2018' ,
        canvas:'/images/istillseeyou.jpg'
    }   
];

var theaterdata = [
    {
        name:'Theater1',
        branch:'Bangkok',
        desc:'An new theater that could give you an new experience of watching movie you never have before'
    },
    {
        name:'Theater2',
        branch:'Bangkok',
        desc:''
    },
    {
        name:'Theater3',
        branch:'Konkean',
        desc:''
    },
    {
        name:'Theater4',
        branch:'Konkean',
        desc:''
    }
];

function seedDB(){
    Movie.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Remove DB completed");
        moviedata.forEach(function(seed){
            Movie.create(seed, function(err, movie){
                if(err){
                    console.log(err);
                }else{
                    console.log('New data added');
                }
            });
        });
    });
    Theater.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Remove DB completed");
        theaterdata.forEach(function(seed){
            Theater.create(seed, function(err, movie){
                if(err){
                    console.log(err);
                }else{
                    console.log('New data added');
                }
            });
        });
    });
}

//seed commment test system linking
module.exports = seedDB;