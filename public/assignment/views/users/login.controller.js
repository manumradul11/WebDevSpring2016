(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username,user.password,function(ret_user)
            {
                if (ret_user) {
                    UserService.setCurrentUser(ret_user);
                    $location.url("/profile");
                }
                else
                {
                    $location.url("/home");
                }
            });

        }
    }
})();
