//create basic info for database
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var Theater = require('./models/theater');

var moviedata = [
    {
        title:'La La Land',
        image:'/images/poster/lalaland.jpg', 
        desc:'La La Land is a 2016 American musical romantic comedy-drama film. It stars Ryan Gosling as a jazz pianist and Emma Stone as an aspiring actress, who meet and fall in love while pursuing their dreams in Los Angeles. John Legend, Rosemarie DeWitt, Finn Wittrock, and J. K. Simmons also star.',
        genre:'Romantic',
        runtime:'2 hrs 8 min',
        rating:'8.0/10',
        releasedate:'12/1/2017' ,
        canvas:'/images/canvas/lalaland.jpg',
    },
    {
        title:'Godzilla VS Kong',
        image:'/images/poster/godzvkongposter.jpeg', 
        desc:'Godzilla vs. Kong is a 2021 American monster film directed by Adam Wingard.',
        genre:'Sci-Fi',
        runtime:'1 hr 53 min',
        rating:'6.5/10',
        releasedate:'25/3/2018' ,
        canvas:'/images/canvas/godzillavskong.jpg',
    },
    {
        title:'Ne Zha',
        image:'/images/poster/NeZha.jpg', 
        desc:'Ne Zha is a 2019 Chinese 3D computer animation fantasy adventure film.',
        genre:'Animation',
        runtime:'1 hr 50 min',
        rating:'7.5/10',
        releasedate:'4/12/2019' ,
        canvas:'/images/canvas/nezha.jpg',
    },   
    {
        title:'Seobok',
        image:'/images/poster/seobok.png', 
        desc:'Seo Bok is a 2021 South Korean sci-fi action film directed by Lee Yong-ju.',
        genre:'Sci-Fi',
        runtime:'1 hr 54 min',
        rating:'6.3/10',
        releasedate:'15/4/2021' ,
        canvas:'/images/canvas/seobok.jpg',
    },   
    {
        title:'I still see you' ,
        image:'/images/poster/IstillSeeYou.jpg',
        desc:'I Still See You is a 2018 American supernatural mystery thriller film.',
        genre:'Horror',
        runtime:'1 hr 34 min',
        rating:'5.8/10',
        releasedate:'27/9/2018' ,
        canvas:'/images/canvas/istillseeyou.jpg',
    }   
];

// var theaterdata = [
//     {
//         provincal:'Bangkok',
//         branch:'Central Rama3',
//         image:'/images/branch/centralrama3.jpg',
//         desc:'An new theater that could give you an new experience of watching movie you never have before',
//         theater_no:'theater1,theater2,theater3'
//     },
//     {
//         provincal:'North',
//         branch:'Central Festival Chiangmai',
//         image:'/images/branch/centralfestchaingmai.jpg',
//         desc:'An new theater that could give you an new experience of watching movie you never have before',
//         theater_no:'theater1,theater2,theater3'
//     },
//     {
//         provincal:'Northeast',
//         branch:'Central Ubonratchatanee',
//         image:'/images/branch/centralubon.jpg',
//         desc:'An new theater that could give you an new experience of watching movie you never have before',
//         theater_no:'theater1,theater2,theater3'
//     },
//     {
//         provincal:'South',
//         branch:'Central Festival Samui',
//         image:'/images/branch/centralfestivalsamui.png',
//         desc:'An new theater that could give you an new experience of watching movie you never have before',
//         theater_no:'theater1,theater2'
//     }
// ];

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
                    Theater.find({theater_no :movie},function(err, movie){
                        if(err){
                            console.log(err);
                        } else{
                            console.log('')
                        }
                    });
                }
            });
        });
    });
}

// function seedDB(){
//     Theater.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("Remove DB completed");
//         theaterdata.forEach(function(seed){
//             Theater.create(seed, function(err, movie){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log('New data added');
//                 }
//             });
//         });
//     });
// }

//seed commment test system linking
module.exports = seedDB;