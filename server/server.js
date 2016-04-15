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

app.set('port', (process.env.PORT) || 4000);

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

app.route('/users')
        .get(function(req, res){
            User.find(function(err, users){
                if(err){
                    console.log(err);
                }
                res.send(users);
            });
        })
        .post(function(req, res){
            // console.log("in /users post function");
            console.log("req.body: ", req.body);
            var user = new User({
                accountType: req.body.type,
                districtNumber: req.body.district,
                fullname: req.body.fullname,
                userName: req.body.username,
                password: req.body.password
            });
            console.log("user: ", user);
            user.save(function(err, user){
                // console.log("in /users post user.save function");
                if(err){
                    console.log(err);
                }
                // console.log("req.body: ", req.body);
                // console.log("user: ", user);
                res.send(user);
            });
        });
    app.route('/users/:id').delete(function(req, res){
        User.findByIdAndRemove(req.params.id, function(err, user){
            if(err){
                console.log(err);
            }
            res.send(user);
        });
    });

    app.route('/students')
            .get(function(req, res){
                Student.find(function(err, students){
                    if(err){
                        console.log(err);
                    }
                    res.send(students);
                });
            })
            .post(function(req, res){
                var student = new Student({
                    fullname: req.body.fullname,
                    custodian: req.body.custodian,
                    cross: req.body.cross,
                    image: req.body.image
                });
                student.save(function(err, student){
                    if(err){
                        console.log(err);
                    }
                    res.send(student);
                });
            });
    app.route('/students/:id').delete(function(req, res){
        Student.findByIdAndRemove(req.params.id, function(err, student){
            if(err){
                console.log(err);
            }
            res.send(student);
        });
    });


app.get('/*', function(req, res){
    var file = req.params[0] || '/views/login.html';
    res.sendFile(path.join(__dirname, './public/', file));
});

app.listen(app.get('port'), function(){
    console.log('Listening on port #', app.get('port'));
});
