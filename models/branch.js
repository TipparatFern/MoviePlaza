var mongoose = require('mongoose');

var branchSchema = new mongoose.Schema({
    theater:[{
        type: String
    }],
    seat:[{
        type:String
    }],
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
});

module.exports = mongoose.model('Branch', branchSchema);