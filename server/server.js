var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local');
var mongoose = require('mongoose');
var User = require('../models/user');
var Student = require('../models/student');
var mongoURI = 'mongodb://localhost/ccc';
var mongoDB = mongoose.connect(mongoURI).connection;

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    s: false,
    cookie:{maxAge: -1, secure: true}
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });
});

passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username' },
    function(req, username, password, done){
        User.findOne({username: username}, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: "Incorrect userID or password"});
            }
            user.comparePassword(password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }else{
                    done(null, false, {message: 'Incorrect userID or password'});
                }
            });
        });
    }
));

app.set('port', (process.env.PORT) || 5000);


//TODO create get call resonses



app.get('/*', function(req, res){
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
});
