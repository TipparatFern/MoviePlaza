var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username :String,
    email: String,
    password: String,
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'    
    }
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);