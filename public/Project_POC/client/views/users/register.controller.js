(function(){
    angular
        .module("FeeFoodApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            var foundUser = UserService.findUserByUsername(user.username);
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifypassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifypassword) {
                $scope.message = "Passwords must match";
                return;
            }
            if (foundUser != null) {
                $scope.message = "User already exists";
                return;
            }
            UserService.createUser($scope.user,function(newUser)
            {
                UserService.setCurrentUser(newUser);
                $location.url("/profile");
            });

        }
    }
})();
