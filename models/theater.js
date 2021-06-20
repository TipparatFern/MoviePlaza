//edit this
var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema({
    provincal: String,
    branch: String,
    image: String,
    desc: String,
    theater:[{
        type: String
    }],
    seat:[{
        type:String
    }],
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    theater_no:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    }
});

module.exports = mongoose.model('Theater',theaterSchema);