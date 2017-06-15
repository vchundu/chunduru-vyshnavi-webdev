
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var bcrypt = require("bcrypt-nodejs");
var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;

function createUser(user) {
    // user.password = bcrypt.hashSync(user.password);
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
    // return userModel
    //     .findOne({username: username})
    //     .then(function(user) {
    //         return user;
    //         // if (user && bcrypt.compareSync(password, user.password)) {
    //         //     return user;
    //         // } else {
    //         //     return null;gi
    //         // }
    //     });
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser) {
    // delete newUser.username : will delete a field from an object
    return userModel.update({_id: userId}, {
        $set: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    })
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._websites.indexOf(websiteId);
            user._websites.splice(index, 1);
            return user.save();
        });
}

function findUserByGoogleId(googleId) {
    return userModel
        .find({"google.id" : googleId});

}