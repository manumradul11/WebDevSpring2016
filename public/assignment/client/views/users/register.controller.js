(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            var foundUser=null;
            UserService.findUserByUsername(user.username).then(function(response){
                foundUser=response.data;
            });
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
            if (!user.firstName) {
                $scope.message = "Please provide a first name";
                return;
            }
            if (!user.lastName) {
                $scope.message = "Please provide a last name";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide an email";
                return;
            }
            if (foundUser != null) {
                $scope.message = "User already exists";
                return;
            }

            UserService.createUser(user).then(function(response){
                UserService.setCurrentUser(response.data);
                $location.url("/profile");
            });


        }
    }
})();
