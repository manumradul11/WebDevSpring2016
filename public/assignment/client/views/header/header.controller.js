(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("HeaderController",HeaderController);
    function HeaderController($location,$scope,UserService) {

        $scope.admin=false;

        $scope.logout = function () {
            UserService.logout();
        };
        //currentUser.roles.indexOf('admin') >= 0
    }
})();

