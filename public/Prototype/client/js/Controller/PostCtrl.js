app.controller("PostCtrl", function ($scope, MyService, PostService,$location, $rootScope) {

    $scope.post = {
        title: null,
        desc: null,
        offeringType: null,
        foodType: null,
        place: '',
        date: null,
        time:{from:{hr:12,min:0,merd:"am"},
              till:{hr:12,min:0,merd:"am"}},
        errors: {}
    }
    $scope.message=null;
    $scope.result2 = '';
    $scope.options2 = null;

    //***************************************** Go To Home Page ****************************************//

    $scope.goToHome = function () {
        $location.url('/home');
    };

    //***************************************** Post Event ****************************************//

    $scope.PostEvent = function () {

        $scope.validatePostTitle();
        $scope.validatePostDesc();
        $scope.validatePostDate();

        if (Object.keys($scope.post.errors).length == 0) {

            var newPost = $scope.post;
            PostService.post(newPost, function (msg) {
            if (msg == 'ok') {
            message="Post Successfull";
              }
            });
        };
    };



    //***************************************** Posting Validations ****************************************//

    $scope.validatePostTitle = function () {
        if ($scope.post.title == null || $scope.post.title == "") {
            $scope.post.errors.title = "Please enter Title";
        }  else {
            delete $scope.post.errors.title;
        };
    };

    $scope.validatePostDesc = function () {
        if ($scope.post.desc == null || $scope.post.desc == "") {
            $scope.post.errors.desc = "Please enter Description";
        }  else {
            delete $scope.post.errors.desc;
        };
    };

    $scope.validatePostDate = function () {
        if ($scope.post.date == null || $scope.post.date == "") {
            $scope.post.errors.date = "Please enter Date";
        }  else {
            delete $scope.post.errors.date;
        };
    };


});