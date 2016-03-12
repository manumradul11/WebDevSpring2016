(function(){
    angular
        .module("FeeFoodApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {

        $scope.$location = $location;
        var lat;
        var long;

        navigator.geolocation.getCurrentPosition(success);

        function success(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
        }

        function init() {
            var mapProp = {
                center: new google.maps.LatLng(lat, long),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        }

        google.maps.event.addDomListener(window, 'load', init);
    }
})();