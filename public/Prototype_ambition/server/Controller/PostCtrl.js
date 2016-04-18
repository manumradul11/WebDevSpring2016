var path = require('path');
var DBManager = require(path.resolve("./public/Prototype/server/DAO/DatabaseManager.js"))();

var http = require('http');

module.exports = function () {

    var post = function (email,newPost, callback) {

        DBManager.createNewPost(email,newPost,callback);

    };

    var getPost = function (filter, callback) {

        DBManager.getPosts(filter,callback);

    };


    return {
        post: post,
        getPost:getPost
    };

};