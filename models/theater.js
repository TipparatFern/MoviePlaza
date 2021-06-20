//edit this
var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema({
    provincal: String,
    branch: String,
    image: String,
    desc: String,
    theater_no:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    }
});

module.exports = mongoose.model('Theater',theaterSchema);