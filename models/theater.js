//edit this
var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema({
    provincal: String,
    branch: String,
    image: String,
    desc: String,
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
});

module.exports = mongoose.model('Theater',theaterSchema);