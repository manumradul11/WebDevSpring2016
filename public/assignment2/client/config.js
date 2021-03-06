(function(){
    angular
        .module("FeeFoodApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: 'HomeController'
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when('/posts', {
            templateUrl: 'views/posts/posts.view.html',
            controller: "FormController"
            })
            .when('/fields', {
                templateUrl: 'views/posts/posts.view.html',
                controller: "PostController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();



