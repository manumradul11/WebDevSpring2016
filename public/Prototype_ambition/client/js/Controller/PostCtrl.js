app.controller("PostCtrl", function ($scope, MyService, PostService,$location, $rootScope) {

    $scope.post = {
        title: null,
        desc: null,
        offeringType: null,
        foodType: null,
        place: '',
        date:{month:"12",day:"12",year:"2016"},
        time:{from:{hr:"12",min:"0",merd:"am"},
              till:{hr:"12",min:"0",merd:"am"}},
        errors: {}
    }
    $scope.message=null;
    $scope.details1='';
    $scope.result1 = '';
    $scope.options1 = null;

    $scope.days = [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    //***************************************** Go To Home Page ****************************************//

    $scope.goToHome = function () {
        $location.url('/home');
    };

    //***************************************** Post Event ****************************************//
    $scope.PostEvent = function () {

        $scope.post.place= $scope.details1;
        $scope.validatePostTitle();
        $scope.validatePostDesc();
        $scope.validatePostDate();

        if (Object.keys($scope.post.errors).length == 0) {

            var newPost = $scope.post;
            PostService.post(newPost, function (msg) {
            if (msg == 'ok')
            {
                $scope.message="Post Successful";
            }
            else
            {
                $scope.message="Some Error happened"
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
        if ($scope.post.date == null || $scope.post.date== "") {
            $scope.post.errors.date = "Please enter Date";
        }  else {
            delete $scope.post.errors.date;
        };
    };


});