var Hero = require('./models/heroes');
var Deck = require('./models/decks');
var Game = require('./models/games');
var User = require('./models/users');


//creation data Heroes
var heroes = [
    'Paladin',
    'Mage',
    'Warrior',
    'Warlock',
    'Rogue',
    'Priest',
    'Chaman',
    'Druid',
    'Hunter'
];


heroes.forEach(function(hero, index){
    Hero.find({name : hero}, function(err, heroes){
        if(!err && !heroes.length){
            Hero.create({name : hero}, function(err){
                console.log("Hero created!!")
            });
        };
    });
});
    module.exports = function(app) {
        var session = require('express-session');
        app.use(session({secret: "123"}));

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route

        app.use(function(req, res, next){
            next();
        });

        //get all the heroes
        app.get('/heroes', function(req, res) {
            Hero.find(function(err, heroes) {
                if (err)
                    return res.send(err);
                res.json(heroes);
            });
        });

        //get all the decks
        app.get('/decks', function(req, res){
            Deck.find(function(err, decks){
                if(err){
                    return res.send(err);
                }
                res.json(decks);
            });
        });

        //get all the games
        app.get('/games/:user_id', function(req, res){
            console.log(req.params.user_id);
            Game.find({'user_id' : req.params.user_id}, function(err, games){
                if(err){
                    return res.send(err);
                }
                res.json(games);
            });
        });


        //Filter Routes

        app.get('/filters/:hero/:user_id', function(req, res){
            Game.find({
                hero_played : req.params.hero,
                user_id: req.params.user_id
            },function(err, games){
                if(err){
                    res.send(err);
                }
                res.json(games);
            });

        });

        app.get('/filters/:deck/:user_id', function(req, res){
            console.log(req.params);
            Game.find({
                deck_used : req.params.deck,
                user_id: req.params.user_id
            },function(err, games){
                if(err){
                    res.send(err);
                }
                res.json(games);
            });

        });



        // route to handle creating goes here (app.post)

        //route to create a new deck, then returns all of them
        app.post('/decks', function(req, res){
            var deck_name = req.body.deck_name;
            var hero_name = req.body.hero;
            var newDeck = new Deck();
            newDeck.deck_name = deck_name;
            newDeck.hero_name = hero_name;

            newDeck.save(function(err){
                if(err){
                    res.send(err);
                }
                Deck.find(function(err, decks){
                    if(err){
                        res.send(err);
                    }
                    res.json(decks);
                });
            });
        });

        //route to create a new game, then returns all of them

        app.post('/games', function(req, res){
            var hero_played = req.body.hero_played;
            var hero_opp = req.body.hero_opp;
            var deck = req.body.deck_used;
            var outcome = req.body.outcome;
            var user_id = req.body.user_id;

            var newGame = new Game();
            newGame.hero_played = hero_played;
            newGame.hero_opponent = hero_opp;
            newGame.deck_used = deck;
            newGame.outcome = outcome;
            newGame.user_id = user_id;

            newGame.save(function(err){
                if(err){
                    res.send(err);
                }
                Game.find({'user_id' : user_id}, function(err, games){
                    if(err){
                        res.send(err);
                    }
                    res.json(games);
                });
            });
        });



        // route to handle delete goes here (app.delete)
        app.delete('/games/:id/:user_id', function(req, res){
            Game.remove({
                _id: req.params.id
            }, function(err, game){
                if(err){
                    res.send(err);
                }

                Game.find({'user_id' : req.params.user_id},function(err, games){
                    if(err){
                        res.send(err);
                    }
                    res.json(games);
                });
            });
        });

//authentification routes

app.get('/session', function(req, res){
    var userSession = req.session.username;
    if(userSession == null){
        return res.send(null);
    }else {
        User.findOne({'_id' : userSession}, function(err, user){
            if(err){
                return res.send(err);
            }
            res.json(user);
        });
    }


});

app.post('/signup', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    User.findOne({'username' : username}, function(err, user){
        if(err){
            console.log('Signup Error' + err);
            return res.send(err);
        }
        //already exists
        if(user){
            console.log('User already exists');
            return res.send('User exists!!');
        }else {
            //if no user with that email, create user
            var newUser = new User();
            newUser.username = username;
            newUser.password = password;
            newUser.email = email;

            newUser.save(function(err){
                if(err){
                    console.log('Saving error:' + err);
                    return res.send(err);
                }
                console.log('Registration complete');
                return res.send("Congrats!!");
            });
        }
    })
});

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({'username' : username, 'password' : password}, function(err, user){
        if(err){
            console.log('Error:'+ err);
            res.send(err);
        }
        if(user == null){
            return res.send("Wrong username and/or password");
        }else {
            req.session.username = user._id;
            console.log(user._id);
            return res.send('Congrats, you are connected as ' + username);
        }
    });
});

//Logout route, killing session
app.get('/logout', function(req, res){
    delete req.session.username;
    res.send('Deleted');
})

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
