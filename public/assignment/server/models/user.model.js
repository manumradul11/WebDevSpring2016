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
        findAllUsers:findAllUsers,
        findUserById:findUserById,
        logout:logout
    };

    return api;

    function findUserByCredentials(username,password,done) {
        console.log("here-1");
        UserModel.findOne(
            {username: username, password : password},
            function(err,doc){
                user = doc;
                if (user != null) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Unable to login' });
                }
            }
        );

    }

    function logout(reqUser, req, callback) {
        UserModel.findOne(
            {username: reqUser.username, password : reqUser.password},
            function(err,doc){
                user = doc;
                if (user != null) {
                    req.logOut();

                    req.session.destroy(function (err) {

                        callback(200);
                    });
                } else {
                    callback("Error");
                }
            }
        );
    };

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

    function findUserById(userId,callback){
        UserModel.find(
            {_id: userId},
            function(err,doc){
                callback(doc);
            }
        );

        return;
    }

    function createUser(user){
        var deferred = q.defer();
        var roles = user.roles.split(",");
        user.roles=roles;
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

        UserModel.find({},
            function(err,doc){
                deferred.resolve(doc);
            });

        return deferred.promise;
    }
}
