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
    likes: {type: Number, default: 0 },
    comments: [
        {//keep data comment schema in this
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    tickets:[
        {//keep data comment schema in this
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ]
    
});

module.exports = mongoose.model('Movie',movieSchema);