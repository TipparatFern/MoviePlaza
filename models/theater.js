var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema({
    name: String,
    branch: String,
    comments: [
        {//keep data comment schema in this
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
    
});

module.exports = mongoose.model('Theater',theaterSchema);