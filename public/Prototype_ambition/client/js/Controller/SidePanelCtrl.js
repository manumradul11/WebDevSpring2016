
app.controller("SidePanelCtrl", function ($rootScope, $scope, MyService,LoginService) {
    $scope.showSidePanel = false;
    $scope.currDate = new Date();

    $scope.userProfile = null;

    $scope.types = ["music", "conference", "comedy",
                        "learning education", "family fun kids", "festivals parades", "movies film", "food",
                        "fundraisers", "art ", "support", "holiday", "books", "attractions", "community",
                        "business", "singles social", "schools alumni", "clubs associations",
                        "outdoors recreation", "performing arts", "animals", "politics activism", "sales", "science",
                        "religion spirituality", "sports", "technology", "other", ""];

    $scope.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31];

    $scope.search = {

        offeringType : null,
        foodType : null,
        date:null,
        place_x : null,
        place_y : null,
        time : null,
        type: null,
        keywords: null,
        within: 5,
        goingWith:null,
        errors: {}
    };

    $scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';


    $scope.init = function () {
        MyService.setFilter($scope.search);
    };

    $scope.$watch(function () {
        return $scope.details1;
    }, function (details) {
        $scope.search.place_x = details.geometry.location.lat();
        $scope.search.place_y = details.geometry.location.lng();
        }, true);


    $scope.$watch(function () {
        //return LoginService.getCurrentUSerProfile();
        return $rootScope.user;
    }, function (response) {
        $scope.userProfile = response;
    }, true);

    $scope.toggleSidePanel = function () {
        $scope.showSidePanel = !$scope.showSidePanel;
        $rootScope.showSidePanel = $scope.showSidePanel;
    };

    $scope.validate = function () {
        if (!($scope.search.type == '' || $scope.search.type == null) &&
            isNumeric($scope.search.type)) {
            $scope.search.errors.type = "Invalid Type Name"
        } else {
            delete $scope.search.errors.type;
        };

        delete $scope.search.errors.toDate;
        if ($scope.search.toDate != '' && $scope.search.toDate != null &&
            $scope.search.fromDate != '' && $scope.search.fromDate != null) {
            if ($scope.search.toDate < $scope.search.fromDate) {
                $scope.search.errors.toDate = "can not be before from date";
            }
        } else {
            delete $scope.search.errors.toDate;
        }
    };

    $scope.resetFields = function () {
        if ($scope.search.goingWith != null && $scope.search.goingWith != '') {
        $scope.search.type = null;
        $scope.search.keywords = null;
    }
}
});

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};