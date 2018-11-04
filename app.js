'use strict'
var windows = [];
var currWindow;
var geo;
var maps;
var lat, lng;
var myloc;
var infowindow;

$(function (){
        $("#homie-home").slideDown();
        currWindow = "#homie-home";
        windows.push(currWindow);
});

// oNEDB AND BACKEND STUFF

var onedb = new OneDBClient({
        hosts: {
                primary: {
                        location: 'https://one-db.datafire.io',
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3RpbmViZXJlQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zVG9HcmFudCI6bnVsbCwiaWF0IjoxNTQxMjYyNzEyLCJleHAiOjE1NDEzNDkxMTJ9.UGBxnzmfXw6Qo8OWAGabtAsdMa59m0w9RGtsO4lyEtk"
                },
        }
});

function navigate() {
       
        maps.panTo(myloc); 
        var image = "https://raw.githubusercontent.com/googlemaps/js-samples/gh-pages/places/icons/number_1.png";
        var marker = new google.maps.Marker({
                map: maps,
                position: myloc,
                icon: image
        });

}

var initMap = function () {
        infowindow = new google.maps.InfoWindow();
        myloc = new google.maps.LatLng(42.318928, -71.079979);
        maps = new google.maps.Map(document.getElementById('map'), {
                center: myloc,
                zoom: 14, mapTypeControl: false, fullscreenControl: false
        });
        navigate();
}

// hide all and display curr window
var display = function(window){
        $(currWindow).hide();
        $(window).slideDown();
        currWindow = window;
        windows.push(currWindow);
}

// Choose option at home
var makeChoice =  function(choice) {
        switch (choice) {
                case "shelter":
                        display("#user-info");
                        break;
                case "prevent":
                        display("#stats");
                        break;
                case "transition":
                        display("#trans-info");
                        break;
                case "drop-in":
                        // code block
                        break;
                default:
                // code block
        }
}

//choose options at user-info page

var setInfo = function (choice) {
        var query = {
                "data.tags": [choice, "emergency"]
        };

        display("#map-info");
        $(".maphead").text("Shelters: Emergency for " + choice);
        initMap();
        onedb.list('homie_locations', 'location', query)
                .then(function (res) {
                        setloc(res.items);
                });
        
        
}

//choose options ant transitional
var setInfoT = function (choice) {
        var query = {
                "data.tags": [choice, "transitional"]
        };

        display("#map-info");
        $(".maphead").text("Housing: Emergency for " + choice);
        initMap();
        onedb.list('homie_locations', 'location', query)
                .then(function (res) {
                        setloc(res.items);
                });


}

var back = function() {
        windows.pop();
        if(windows.length > 0) {
                display(windows.pop());
        }
}

var setloc = function(locations){
        geo = new google.maps.Geocoder();
        console.log(locations);
        locations.forEach(function(loc) {
                createMarker(loc);
                
        });
};

var createMarker = function(loc){
        var add = loc.Address;
        var address = add.number + " " + add.streetName + " " + add.city + " " + add.state + " " + add.zip;
        geo.geocode({ 'address': address }, function (results, status) {
                if (status == 'OK') {
                        var marker = new google.maps.Marker({
                                map: maps,
                                position: results[0].geometry.location
                        });
                        var dist = google.maps.geometry.spherical.computeDistanceBetween(myloc, results[0].geometry.location) * 0.000621371192;

                        google.maps.event.addListener(marker, 'click', function () {

                                var info_temp = "<div style='color:black;'><p>" + loc.Name + "</p><p>" + add.number + " " + add.streetName + "</p><p>" + add.city + " " + add.state + " " + add.zip + "</p><p>" + loc.phone + "</p><p>" + dist + " miles away</p></div>";
                                console.log(add);
                                infowindow.setContent(info_temp);
                                infowindow.open(maps, marker);
                        });
                } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                }

        });
};