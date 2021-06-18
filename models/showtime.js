var mongoose = require('mongoose');

var showtimeSchema = new mongoose.Schema({
    showtime: Number,
    theater:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Theater'
    },
    showtime: Date,
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
});

module.exports = mongoose.model('Showtime', showtimeSchema);