(function(){
    angular
        .module("FeeFoodApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, UserService, $location) {

         var currentUser = UserService.getCurrentUser();


        $scope.update = update;

        function update(user) {
            // same validation as register

            var ret_user = UserService.updateUser(currentUser._id,user);

            if (ret_user) {
                $rootScope.currentUser = ret_user;
                UserService.setCurrentUser(ret_user);
                $location.url("/home");
            }

        }
    }
})();