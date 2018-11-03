'use strict'
var windows = [];
var currWindow;


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


// oNEDB AND BACKEND STUFF
var onedb = new OneDBClient({
        hosts: {
                primary: { location: 'https://one-db.datafire.io' },
        }
});




