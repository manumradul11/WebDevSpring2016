"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope,$http, $q) {
        var service = {   createUser: createUser,
                        findAllUsers: findAllUsers,
                        findUserByCredentials: findUserByCredentials,
                        findUserById: findUserById,
                        findUserByUsername:findUserByUsername,
                        deleteUserById: deleteUserById,
                        setCurrentUser: setCurrentUser,
                        getCurrentUser: getCurrentUser,
                        updateUser: updateUser
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
            $http.get("/api/assignment-3-serverside/user?username="+username)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment-3-serverside/user/:"+userId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment-3-serverside/user/:"+userId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser (user) {
            var deferred = $q.defer();
            $http.post("/api/assignment-3-serverside/user",user)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers () {
            var deferred = $q.defer();
            $http.get("/api/assignment-3-serverside/user")
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByCredentials(username,password) {
            var deferred = $q.defer();
            $http.get("/api/assignment-3-serverside/user?username=" + username + "&password=" +  password)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser (userId,user) {
            var deferred = $q.defer();
            $http.put("/api/assignment-3-serverside/user/:"+userId,user)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();