(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location){
        $scope.login = login;

        function login(user){
            var ret_user = UserService.findUserByCredentials(user.username,user.password);

            if (ret_user!=null) {
                UserService.setCurrentUser(ret_user);
                $location.url("/profile");
            }
            else
            {
                $location.url("/home");
            }
        }
    }
})();


{if (ret_user) {
    UserService.setCurrentUser(ret_user);
    $location.url("/profile");
}
else
{
    $location.url("/home");
}
}