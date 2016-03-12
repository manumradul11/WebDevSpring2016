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

            var ret_user;
            for (var u = 0; u < model.users.length; u++) {
                if (model.users[u].username == username &&
                    model.users[u].password == password) {
                    ret_user = model.users[u];
                    return ret_user;
                }
            }
            return null;
        }

        function updateUser (userId,user,callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    model.users[u].username = user.username;
                    model.users[u].firstName = user.firstName;
                    model.users[u].lastName = user.lastName;
                    model.users[u].password = user.password;
                    model.users[u].email = user.email;
                    callback(model.users[u]);
                }
            }
            callback(null);
        }
    }
})();