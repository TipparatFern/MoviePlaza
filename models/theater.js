//edit this
var mongoose = require('mongoose');

var theaterSchema = new mongoose.Schema({
    branch: String,
    name: String,
    desc: String,
    year: Number,
    month: Number,
    day: Number,
    showtime: Number,
    tickets:[
        {//keep data in this
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
    movie:{//accept movie info
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        name: String
    }
});

module.exports = mongoose.model('Theater',theaterSchema);