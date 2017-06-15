var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    _websites: [
        {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}
    ],
    _following: [
        {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}
    ],
    google: {
        id: String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'user'});

module.exports = userSchema;

