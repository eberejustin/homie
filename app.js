'use strict'
var windows = [];
var currWindow;
var geo;
var maps;
var lat, lng;
var loc = { lat: 42.318928, lng: -71.079979 };
var markers;

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
       
        maps.panTo(loc); 
        var image = "https://raw.githubusercontent.com/googlemaps/js-samples/gh-pages/places/icons/number_1.png";
        var marker = new google.maps.Marker({
                map: maps,
                position: loc,
                icon: image
        });

}

var initMap = function () {

        maps = new google.maps.Map(document.getElementById('map'), {
                center: loc,
                zoom: 14, mapTypeControl: false, fullscreenControl: false
        });
        navigate();
}

// hide all and display curr window
var display = function(window){
        $(currWindow).hide();
        $(window).slideDown();
        currWindow = window;
}

// Choose option at home
var makeChoice =  function(choice) {
        switch (choice) {
                case "shelter":
                        display("#user-info");
                        break;
                case "prevent":
                         // code block
                        break;
                case "permanent":
                        // code block
                        break;
                case "drop-in":
                        // code block
                        break;
                default:
                // code block
        }
        windows.push(currWindow);
}

//choose options at user-info page

var setInfo = function (choice) {
        var query = {
                "data.tags": [choice, "emergency"]
        };

        display("#map-info");
        windows.push(currWindow);
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
        markers = [];
        geo = new google.maps.Geocoder();
        for (var loc of locations) {
                var add = loc.Address
                var address = add.number + " " + add.streetName + " " + add.city + " " + add.state + " " + add.zip;
                geo.geocode({ 'address': address }, function (results, status) {
                        if (status == 'OK') {
                                var marker = new google.maps.Marker({
                                        map: maps,
                                        position: results[0].geometry.location
                                });
                                markers.push({marker: loc});
                        } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                        }
                });
        }
}

