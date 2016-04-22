var mongoose = require('mongoose');

//define Hero model
module.exports = mongoose.model('Hero', {
	name : String
});