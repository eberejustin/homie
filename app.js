'use strict'
var windows = [];
var currWindow;
// oNEDB AND BACKEND STUFF
var Client = require('onedb-client').Client;
var onedb = new Client({
        hosts: {
                primary: {
                        location: 'https://one-db.datafire.io',
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3RpbmViZXJlQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zVG9HcmFudCI6bnVsbCwiaWF0IjoxNTQxMjYyNzEyLCJleHAiOjE1NDEzNDkxMTJ9.UGBxnzmfXw6Qo8OWAGabtAsdMa59m0w9RGtsO4lyEtk"
                },
        }
});


$(function (){
        $("#homie-home").slideDown();
        currWindow = "#homie-home";
        windows.push(currWindow);
});

// hide all and display curr window
var display = function(window){
        $(currWindow).hide();
        $(window).slideDown();
        currWindow = window
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
var setInfo = function(choice) {
        switch (choice) {
                case "family":
                        display("#user-info");
                        break;
                case "youth":
                        // code block
                        break;
                case "adult":
                        // code block
                        break;
                case "abuse":
                        // code block
                        break;
                default:
                // code block
        }
        windows.push(currWindow);
}

var back = function() {
        windows.pop();
        if(windows.length > 0) {
                display(windows.pop());
        }
}

var setInfo = function(choice) {
        var query = {
                "data.tags" : choice
        };
        var locations = onedb.list('homie_locations', 'location', query).items;
        var markers = [];
        for(loc of locations){
                add = loc.address
                address = add.number + " " + add.streetName + " " + add.city + " " + add.state + " " + add.zip;
                
        }
}






