//edit this
var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    ticketer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    },
    movie:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
    },
    theater: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theater'
        
    },
 
});

module.exports = mongoose.model('Ticket',ticketSchema);
