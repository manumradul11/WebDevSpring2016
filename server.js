var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require("node-uuid");
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port = process.env.OPENSHIFT_NODEJS_PORT ||3000;
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+ '/public'));
require("./public/assignment/server/app.js")(app);
app.listen(port, ipaddress);