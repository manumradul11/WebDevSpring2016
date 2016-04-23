"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope,$http,$location,$q) {
        var service = {   createUser: createUser,
                        findAllUsers: findAllUsers,
                        findUserByCredentials: findUserByCredentials,
                        findUserById: findUserById,
                        findUserByUsername:findUserByUsername,
                        deleteUserById: deleteUserById,
                        setCurrentUser: setCurrentUser,
                        getCurrentUser: getCurrentUser,
                        logout:logout,
                        loggedin:loggedin,
                        updateUser: updateUser,
                        createUserbyAdmin:createUserbyAdmin,
                        updateUserbyAdmin:updateUserbyAdmin,
                        findUserByIdbyAdmin:findUserByIdbyAdmin
                    };

        return service;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername (username) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username="+username)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/:"+userId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function findUserByIdbyAdmin(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/admin/user/"+userId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }



        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/admin/user/"+userId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser (user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/register",user)
                .success(function(response){
                    deferred.resolve(response);
                });


            return deferred.promise;
        }

        function createUserbyAdmin (user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/admin/user",user)
                .success(function(response){
                    deferred.resolve(response);
                });


            return deferred.promise;
        }

        function findAllUsers () {
            var deferred = $q.defer();
            $http.get("/api/assignment/admin/user")
                .success(function(response){
                    deferred.resolve(response.users);
                });
            return deferred.promise;
        }

        function findUserByCredentials(username,password) {
            var deferred = $q.defer();
            var cred ={username:username,
                        password:password}
            $http.post("/api/assignment/login",cred)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function logout() {
            $http.post("/api/assignment/logout", $rootScope.currentUser)
                .success(function (res) {
                    delete $rootScope.currentUser;
                    $location.url("/home");
                })
                .error(function (err) {

                });
        }

        function loggedin() {
            var deferred = $q.defer();
            $http.post("/api/assignment/loggedin", $rootScope.currentUser)
                .success(function (res) {
                   if(res!='0')
                   {
                       deferred.resolve(res.roles.indexOf('admin') >= 0);
                   }
                    else {deferred.resolve(false);}
                })
                .error(function (err) {

                });
            return deferred.promise;
        }

        function updateUser (userId,user) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+userId,user)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUserbyAdmin (userId,user) {
            var deferred = $q.defer();
            $http.put("/api/assignment/admin/user/"+userId,user)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();