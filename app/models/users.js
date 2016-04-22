var mongoose = require('mongoose');
var crypto = require('crypto');

//define User model
module.exports = mongoose.model('User', {
	username : String,
	password: String,
	email: String
});
