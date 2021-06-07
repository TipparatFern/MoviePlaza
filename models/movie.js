var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments: [
        {//keep data comment schema in this
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
    
});

module.exports = mongoose.model('Movie',movieSchema);