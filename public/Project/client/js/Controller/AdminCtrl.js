app.controller("AdminCtrl", function AdminCtrl($scope,$location, $http, LoginService) {

    $scope.adminCreate = {
        first: null,
        last: null,
        email: null,
        password: null,
        confirmPassword: null,
        roles: null,
        errors: {}
    };

    var selectedEmail=null;


    $scope.addUser = addUser;
    $scope.selectUser = selectUser;
    $scope.updateUser = updateUser;
    $scope.deleteUser = deleteUser;
    $scope.init= init;


    function init()
    {
        $scope.profileOptionsToggle = false;
        LoginService.getAllUsers(function (response) {
           $scope.users = response.users;
            $scope.adminCreate.email=null;
            $scope.adminCreate.password=null;
            $scope.adminCreate.roles=null;
        });

    }

    function addUser()
    {
        var newUSer = $scope.adminCreate;
        LoginService.create(newUSer, function (msg) {
            if (msg == 'ok') {
                init();
            }
        });


    }


    function selectUser(index)
    {
        var user = $scope.users[index];
        $scope.adminCreate = {
            email: user.email,
            password:user.password,
            roles:user.roles
        }
        selectedEmail= user.email;
    }


    function updateUser()
    {

        LoginService.updateUserByEmail(selectedEmail,$scope.adminCreate,function (msg) {
            if (msg == 'ok') {
                init();
            }
        });
        selectedEmail=null;


    }


    function deleteUser(index)
    {
        var user = $scope.users[index];
        LoginService.deleteUserByEmail(user.email,function (msg) {
            if (msg == 'ok') {
                init();
            }
        });

    }

    $scope.goToHome = function () {
        $location.url('/home');
    };

    $scope.logout = function () {
        LoginService.logout();
    };

    $scope.setProfileOptionsToggle = function () {
        $scope.profileOptionsToggle = !$scope.profileOptionsToggle;
    };
});
