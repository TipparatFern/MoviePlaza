//edit this
var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema({
    name: String,
    branch: String,
    desc: String,
    date: Date,
    showtime: Number,
    tickets:[
        {//keep data comment schema in this
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    movie:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        name: String
    }
});

module.exports = mongoose.model('Theater',theaterSchema);