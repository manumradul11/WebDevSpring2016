var path = require('path');
var DBManager = require(path.resolve("./public/assignment/server/DAO/DatabaseManager.js"))();

var http = require('http');

module.exports = function () {

    var post = function (email,newPost, callback) {

        DBManager.createNewPost(email,newPost,callback);

    };


    return {
        post: post
    };

};