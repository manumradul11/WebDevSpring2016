(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function loginController ($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {

            UserService.findUserByCredentials(user.username,user.password,function(ret_user)
            {
                if (ret_user) {
                    $rootScope.currentUser = ret_user;
                    UserService.setCurrentUser(ret_user);
                    $location.url("/profile");
                }
            });

        }
    }
})();
