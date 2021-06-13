//edit this
var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema({
    name: String,
    branch: String,
    desc: String,
    
});

module.exports = mongoose.model('Theater',theaterSchema);