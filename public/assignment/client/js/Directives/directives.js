(function() {
    "use strict";
    angular.module("FeeFoodApp")
        .directive("myMap",myMap);
    function myMap() {
        return {
            restrict: 'E',
            template: '<div class="gmaps" ng-controller="MapController" ng-init="init()"></div>',
            replace: true
        };
    }
})();

