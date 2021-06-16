//edit this
var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    // date: {
    //     type: Number,
    //     default: Date.now
    // },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    movie:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        name: String
    },
    theater: {
        id:{type: mongoose.Schema.Types.ObjectId,
            ref: 'Theater'

        }
    }
 
});

module.exports = mongoose.model('Ticket',ticketSchema);
