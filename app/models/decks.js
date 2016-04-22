var mongoose = require('mongoose');

//define Deck model
module.exports = mongoose.model('Deck', {
	deck_name : String,
	hero_name : String
});