(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
                    users:
                        [
                        {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                            "username":"alice",  "password":"alice",   "roles": ["student"]		},
                        {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                            "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                        {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                            "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                        {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                            "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                        {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                            "username":"ed",     "password":"ed",      "roles": ["student"]		}
                        ]
                    ,
                            createUser: createUser,
                            findAllUsers: findAllUsers,
                            findUserByCredentials: findUserByCredentials,
                            findUserById: findUserById,
                            findUserByUsername:findUserByUsername,
                            deleteUserById: deleteUserById,
                            setCurrentUser: setCurrentUser,
                            getCurrentUser: getCurrentUser,
                            updateUser: updateUser
                    };

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username == username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    return(model.users[u]);
                }
            }
            return(null);
        }

        function deleteUserById(userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    callback((model.users.splice(u,1)));
                }
            }
            callback((model.users));
        }

        function createUser (user,callback) {
            var created_user = {
                _id:(new Date).getTime(),
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                password: user.password,
                roles:["student"],
                email:user.email
            };
            model.users.push(created_user);
            callback(created_user);
        }

        function findAllUsers (callback) {
            callback(model.users);
        }

        function findUserByCredentials(username,password) {
            for (var u = 0; u < model.users.length; u++) {
                if (model.users[u].username == username &&
                    model.users[u].password == password) {
                    return(model.users[u]);
                }
            }
            return(null);
        }

        function updateUser (userId,user,callback) {
            var ret_user = model.findUserById ();
            if (ret_user != null) {
                ret_user.username = user.username;
                ret_user.firstName = user.firstName;
                ret_user.lastName = user.lastName;
                ret_user.password = user.password;
                ret_user.email = user.email;
                callback(ret_user);
            } else {
                callback(null);
            }
        }
    }
})();