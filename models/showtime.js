var mongoose = require('mongoose');

var showtimeSchema = new mongoose.Schema({
    showtime: Date, //only time doesnt use date
    date: {
        type:Date,
        default: Date.now
    },
    theater:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Theater'
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
});

module.exports = mongoose.model('Showtime', showtimeSchema);