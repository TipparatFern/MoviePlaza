var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    title: String,
    image: String,
    desc: String,
    genre: String,
    runtime: String,
    rating: String,
    releasedate: String,
    canvas: String,
    trailerlink: String,
    likes: {type: Number, default: 0 },
    comments: [
        {//comment use this schema info
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    tickets:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    theater:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater'
        }
    ]
    
});

module.exports = mongoose.model('Movie',movieSchema);