var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require("node-uuid");
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT ||3000;
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'this is the secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+ '/public'));
require("./public/assignment/server/app.js")(app,passport, LocalStrategy);
app.listen(port, ipaddress);
module.exports.server = app;


