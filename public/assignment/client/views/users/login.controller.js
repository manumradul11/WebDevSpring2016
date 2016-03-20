(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope,$rootScope,UserService, $location){
        $scope.login = login;

        function login(user){
            UserService.findUserByCredentials(user.username,user.password).then(function(response){
                if(response!=null) {
                    UserService.setCurrentUser(response);
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
