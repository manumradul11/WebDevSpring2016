var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, userModel, developerModel) {

    passport.use('assignment',   new LocalStrategy(assignmentLocalStrategy));
    passport.use('Project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), assignmentLogin);
    app.post  ('/api/assignment/logout',   assignmentLogout);
    app.get   ('/api/assignment/loggedin', assignmentLoggedin);
    app.post  ('/api/assignment/register', assignmentRegister);

    app.post  ('/api/Project/login',    passport.authenticate('Project'), ProjectLogin);
    app.post  ('/api/Project/logout',   logout);
    app.get   ('/api/Project/loggedin', loggedin);
    app.post  ('/api/Project/register', register);

    function assignmentLocalStrategy(username, password, done) {
        developerModel
            .findDeveloperByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function ProjectLocalStrategy(username, password, done) {
        userModel
            .findByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.type == 'developer') {
            developerModel
                .findDeveloperById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == 'Project') {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }
}

;/**
 * Created by manusaxena on 4/22/16.
 */
