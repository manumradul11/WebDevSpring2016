(function(){
    angular
        .module("FeeFoodApp")
        .controller("MapController", MapController);

    function MapController($rootScope, $scope, MapService, $element, $compile, $http) {
        var map;
        var markers = [];
        $scope.directionsTo;

        var spinner, directionsBox;

        var isInitialLoad = false, filterApplied = false;

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        };

        var oArgs = {
            app_key: "k6C5qrCrdBgZMSkw",
            category: "",
            q: "",
            where: "",
            date: "",
            page_size: 80,
            within: 5
        };

        $scope.init = function () {
            isInitialLoad = true;

            MapService.initUserPosition(function (msg) {
                if (msg == 'ok') {

                    var position = MapService.getUserPosition();
                    $scope.position = position;

                    //set oArgs location parameter
                    oArgs.where = $scope.position.lat + "," + $scope.position.lon;

                    //if map exists, print on map
                    printOnMap(oArgs);
                }
                else {
                    alert(msg);
                }
            });


        };



        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                animation: google.maps.Animation.DROP,
                title: title,
                icon: '/img/red-dot.png'
            };

            if (title == 'You are here') {
                markerOptions.icon = '/img/blue_dot.png';
                content = "You are here";
            }

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            if (content == 'You are here') {
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }

                if (isInitialLoad) {
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);

                    setTimeout(function () {
                        infoWindow.close();
                    }, 4000);
                    isInitialLoad = false;
                }
            }

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });

            //google.maps.event.addListener(marker, 'mouseover', function () {
            //    // close window if not undefined
            //    if (infoWindow !== void 0) {
            //        infoWindow.close();
            //    }
            //    // create new window
            //    var infoWindowOptions = {
            //        content: content
            //    };
            //    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            //    infoWindow.open(map, marker);
            //});

            //google.maps.event.addListener(marker, 'mouseout', function () {
            //    // close window if not undefined
            //    if (infoWindow !== void 0) {
            //        infoWindow.close();
            //    }
            //    // create new window
            //    var infoWindowOptions = {
            //        content: content
            //    };
            //    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            //    infoWindow.close(map, marker);
            //});
        }


        $scope.$watch(function () {
                return MapService.getFilter();
            },
            function (filter) {
                $scope.filter = filter;
                printOnMap(oArgs);
            },
            true);
        var errorMsg;
        function printOnMap(oArgs) {
            if (map === void 0) {
                //create map and center it to the scope.position's location
                mapOptions.center = new google.maps.LatLng($scope.position.lat, $scope.position.lon);
                map = new google.maps.Map($element[0], mapOptions);

            }


            //setting defaults
            var date = new Date();
            oArgs.date = getDateInFormat(date, date);

            oArgs.category = "";
            oArgs.q = "";





            $scope.loading = true;

            deleteMarkers();

            setMarker(map, new google.maps.LatLng($scope.position.lat, $scope.position.lon), 'You are here', '');

            if (oArgs.category != null && oArgs.category != "") {
                oArgs.category = oArgs.category.toLowerCase().split(' ').join('_');
            }

            //api call

            //query
            //EVDB.API.call("/events/search", oArgs, function (data) {
            //    for (var d in data.events.event) {

            //        var event = data.events.event[d];
            //        var scope = $scope.$new();
            //        scope.event = event;

            //        var compiled = $compile("<div><info-box></info-box></div>")(scope);
            //        setMarker(map, new google.maps.LatLng(event.latitude, event.longitude), event.name, compiled[0]);
            //    }
            //    $scope.loading = false;
            //});


            var url = getApiUrl();
            $http.jsonp(url)
                .success(function (data) {
                    if (data.events == null) $scope.loading = false;
                    if (data.events.event instanceof Array) {
                        //Output is list
                        for (var d in data.events.event) {
                            var event = data.events.event[d];
                            if (!userDislikedVenue(event.venue_id)) {
                                var scope = $scope.$new();
                                scope.event = event;
                                if ($scope.ratingData && $scope.ratingData.hasOwnProperty(event.venue_id)) {
                                    scope.ratingData = $scope.ratingData[event.venue_id];
                                } else {
                                    scope.ratingData = null;
                                }
                                var compiled = $compile("<div><info-box></info-box></div>")(scope);

                                setMarker(map, new google.maps.LatLng(event.latitude, event.longitude), event.name, compiled[0]);
                            }
                        }
                    } else {
                        //Output is a single event object
                        var event = data.events.event;
                        if (!userDislikedVenue(event.venue_id)) {
                            var scope = $scope.$new();
                            scope.event = event;
                            if ($scope.ratingData && $scope.ratingData.hasOwnProperty(event.venue_id)) {
                                scope.ratingData = $scope.ratingData[event.venue_id];
                            } else {
                                scope.ratingData = null;
                            }
                            var compiled = $compile("<div><info-box></info-box></div>")(scope);

                            setMarker(map, new google.maps.LatLng(event.latitude, event.longitude), event.name, compiled[0]);
                        }
                    }


                    $scope.loading = false;
                }).error(function (err) {
            });

            if (spinner == undefined) {
                spinner = angular.element("<center><img src='..client/img/gps.gif' ng-show='loading' id='spinner'></center>");
                $element.append(spinner);
                $compile(spinner)($scope);
            }

            if (directionsBox == undefined) {
                var html = "<div class='directionBox style='width:1000px'>\
                            <input type='text' ng-model='directionsTo' disabled style='width:600px' /> \
                            <input type='button' value='X' ng-click='clearDirection()'/> \
                        </div>"
                directionsBox = angular.element(html);
                $compile(directionsBox)($scope);
                $element.append(directionsBox);
            }
        }

        function filterAppliedType() {
            if ($scope.filter != null) {
                if ($scope.filter.type == null || $scope.filter.type == '') return false;
                else return true;
            }
            return false;
        }

        function filterAppliedKeywords() {
            if ($scope.filter != null) {
                if ($scope.filter.keywords == null || $scope.filter.keywords == '') return false;
                else return true;
            }
            return false;
        }

        function filterAppliedFromDate() {
            if ($scope.filter != null) {
                if ($scope.filter.fromDate == null || $scope.filter.fromDate == '') return false;
                else return true;
            }
            return false;
        }
        function filterAppliedToDate() {
            if ($scope.filter != null) {
                if ($scope.filter.toDate == null || $scope.filter.toDate == '') return false;
                else return true;
            }
            return false;
        }

        function filterAppliedWithin() {
            if ($scope.filter != null) {
                if ($scope.filter.within == null || $scope.filter.within == '') return false;
                else return true;
            }
            return false;
        }

        function deleteMarkers() {
            setMapOnAll(null);
            markers = [];
        }
        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        var directionsService;
        var directionsDisplay;

        $scope.clearDirection = function () {
            if (directionsDisplay) {
                $scope.directionsTo = null;
                directionsDisplay.setMap(null);
            }
        };

        $scope.calculateAndDisplayRoute = function (toAdd, lat, lon) {

            if (directionsDisplay) {
                directionsDisplay.setMap(null);
            }

            directionsService = new google.maps.DirectionsService;

            directionsDisplay = new google.maps.DirectionsRenderer({
                'map': map,
                'preserveViewport': true,
                'suppressMarkers': true
            });

            $scope.directionsTo = toAdd;

            directionsService.route({
                origin: $scope.position.lat + "," + $scope.position.lon,
                destination: lat + "," + lon,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        function getApiUrl() {
            var url = "http://api.eventful.com/json/events/search?app_key=k6C5qrCrdBgZMSkw";

            if (oArgs.q != "") url += "&q=" + oArgs.q;

            url += "&location=" + $scope.position.lat.toFixed(6) + "," + $scope.position.lon.toFixed(6);
            //Within
            url += "&within=" + parseInt(oArgs.within);

            if (filterAppliedFromDate() || filterAppliedToDate()) url += "&date=" + oArgs.date;
            else url += "&date=" + oArgs.date;

            if (oArgs.category != "") url += "&category=" + oArgs.category;


            //Size
            url += "&page_size=" + parseInt(oArgs.page_size)
            url += "&page_number=1"
            url += "&include=categories"

            url += '&callback=JSON_CALLBACK';

            return url;

        };

        function userDislikedVenue(venueId) {
            var index = dislikedEvents.indexOf(venueId);
            if (index > -1) return true;
            else return false;
        };

    }
})();

function getDateInFormat(from, to) {
    return "" + from.getFullYear() + getMonth(from) + getDay(from) + '00-' + to.getFullYear() + getMonth(to) + getDay(to) + '00';
}

function getMonth(d) {
    var currentMonth = d.getMonth() + 1;
    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
    return currentMonth;
}

function getDay(d) {
    var currentDate = d.getDate();
    if (currentDate < 10) { currentDate = '0' + currentDate; }
    return currentDate;
}