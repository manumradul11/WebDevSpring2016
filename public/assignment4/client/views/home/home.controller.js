(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location,UserService) {
        $scope.$location = $location;
    }
})();