//edit this
var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
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
    }
 
});

module.exports = mongoose.model('Ticket',ticketSchema);
