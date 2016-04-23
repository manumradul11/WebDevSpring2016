(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController ($scope,$location, $http, UserService){
        $scope.adminCreate = {
            firstName: null,
            lastName: null,
            username: null,
            username:null,
            password: null,
            roles: ["user"]
        };

        var selectedUserId=null;


        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.init= init;


        function init()
        {
            UserService.findAllUsers().then(function(response){
                $scope.users = response;
                $scope.adminCreate.username=null;
                $scope.adminCreate.password=null;
                $scope.adminCreate.roles=null;
                $scope.adminCreate.firstName=null;
                $scope.adminCreate.lastName=null;
            });

        }

        function addUser()
        {
            var newUSer = $scope.adminCreate;
            UserService.createUserbyAdmin(newUSer).then(function (msg) {
                if (msg == 'ok') {
                    init();
                }
            });


        }


        function selectUser(index)
        {
            var user = $scope.users[index];
            $scope.adminCreate = {
                password:user.password,
                roles:user.roles,
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName

            }
            selectedUserId= user._id;
        }


        function updateUser()
        {

            UserService.updateUserbyAdmin(selectedUserId,$scope.adminCreate).then(function (msg) {
                if (msg == 'ok') {
                    init();
                }
            });
            selectedUserId=null;


        }


        function deleteUser(index)
        {
            var user = $scope.users[index];
            UserService.deleteUserById(user._id).then(function (msg) {
                if (msg == 'ok') {
                    init();
                }
            });

        }

    }
})();
