var mongoose = require('mongoose');

//define Game model
module.exports = mongoose.model('Game', {
	hero_played : String,
	hero_opponent : String,
	deck_used : String,
	outcome : String,
	user_id : String
});
