module.exports= function(mongoose){
    // load user schema
    var UserModel = require("./user.schema.server.js")(mongoose);
    var q = require("q");

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createUser :createUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findAllUsers:findAllUsers
    };

    return api;

    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        console.log("here-1");
        UserModel.findOne(
            {username: username, password : password},
            function(err,doc){
                deferred.resolve(doc);
            }
        );

        return deferred.promise;
    }


    function findUserByUsername(userName){
        var deferred = q.defer();
        UserModel.find(
            {username: userName},
            function(err,doc){
                deferred.resolve(doc);
            }
        );

        return deferred.promise;
    }

    function createUser(user){
        var deferred = q.defer();
        UserModel.create(user,function(err,doc){
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function updateUser(userId,updatedUserDetails){
        var deferred = q.defer();

        UserModel.update(
            {_id : userId},
            {$set : updatedUserDetails},
            function(err,stats){
                deferred.resolve(stats);
            });
        //return a promise
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        UserModel.remove(
            {_id : userId},
            function(err,doc){
                deferred.resolve(doc);
            });

        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();

        UserModel.find(
            function(err,doc){
                deferred.resolve(doc);
            });

        return deferred.promise;
    }
}
