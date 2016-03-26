(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController(UserService, $location,$scope)
    {
        var vm = this;
        $scope.message=null;
        vm.register = register;

        function register()
        {
            var foundUser=null;
            UserService.findUserByUsername(vm.user.username).then(function(response){
                foundUser=response.data;
            });
            if (vm.user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!vm.user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!vm.user.password || !vm.user.verifypassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (vm.user.password != vm.user.verifypassword) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!vm.user.firstName) {
                $scope.message = "Please provide a first name";
                return;
            }
            if (!vm.user.lastName) {
                $scope.message = "Please provide a last name";
                return;
            }
            if (!vm.user.email) {
                $scope.message = "Please provide an email";
                return;
            }
            if (foundUser != null) {
                $scope.message = "User already exists";
                return;
            }


            if(vm.user.password == vm.user.verifypassword)
            {
                UserService.createUser(vm.user).
                    then(function (response) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    });
            }
        };
    };
})();