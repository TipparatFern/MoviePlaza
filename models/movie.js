var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    genre: String,
    time: String,
    rating: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
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