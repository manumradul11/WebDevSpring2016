var mock = require("./user.mock.json");

module.exports = function() {
    var api = {

        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials

    };
    return api;

    function createUser (user) {
        var created_user = {
            _id:(new Date).getTime(),
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password
        };
        mock.push(created_user);
        return mock;
    }

    function deleteUser(userId) {
        userId = parseInt(userId);
        for (var i in mock) {
            if (mock[i]._id == userId) {
                mock.splice(i,1);
            }
        }
        return mock;
    }

    function updateUser (userId,user) {
        userId = parseInt(userId);
        for(var i in mock) {
            if(mock[i].id === userId) {
                mock[i].username = user.username;
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].password = user.password;
            }
        }
        return mock;
    }

    function findUserById(userId) {
        userId = parseInt(userId);
        for(var i in mock) {
            if(mock[i].id === userId) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllUsers() {

        return mock;
    }


    function findUserByCredentials(credentials) {
        for(var i in mock) {
            if(mock[i].username === credentials.username && mock[i].password === credentials.password) {
                return mock[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var i in mock) {
            if(mock[i].username === username) {
                return mock[i];
            }
        }
        return null;
    }
};