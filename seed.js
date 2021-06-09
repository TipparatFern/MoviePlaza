//create basic info for database
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var Comment = require('./models/comment');

var data = [
    {
        name:'La La Land',
        image:'https://i.pinimg.com/originals/a3/fe/19/a3fe1953058d51294b8c061a9f76ead7.jpg', 
        desc:'La La Land is a 2016 American musical romantic comedy-drama film.'
    },
    {
        name:'Godzilla VS Kong',
        image:'https://i1.wp.com/keeping-it-reel.com/wp-content/uploads/2021/03/godzvkongposter.jpeg?ssl=1', 
        desc:'Godzilla vs. Kong is a 2021 American monster film directed by Adam Wingard.'
    },
    {
        name:'Ne Zha',
        image:'https://i.pinimg.com/564x/c9/1d/4d/c91d4d5497f12ec0154ab0560b64e3d6.jpg', 
        desc:'Ne Zha is a 2019 Chinese 3D computer animation fantasy adventure film.'
    },
    {
        name:'Seobok',
        image:'https://korean-drama-list.com/wp-content/uploads/2021/03/wer.png', 
        desc:'Seo Bok is a 2021 South Korean sci-fi action film directed by Lee Yong-ju.'
    },   
    {
        name:'I still see you' ,
        image:'https://s359.kapook.com/rq/375/auto/50/pagebuilder/cd28eca9-ba00-4878-963c-c84fe102f8b0.jpg',
        desc:'I Still See You is a 2018 American supernatural mystery thriller film.'
    }   
];

function seedDB(){
    Movie.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Remove DB completed");
        data.forEach(function(seed){
            Movie.create(seed, function(err, movie){
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