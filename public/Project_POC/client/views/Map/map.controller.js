(function() {
    angular
        .module("FeeFoodApp")
        .controller("MapController", MapController);

    function MapController($rootScope, $scope, MapService, $element, $compile, $http) {
        function init() {
            var mapProp = {
                center: new google.maps.LatLng(51.508742, -0.120850),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        }

        google.maps.event.addDomListener(window, 'load', init);
    }
});