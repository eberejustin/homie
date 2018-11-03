
var data = require('./db.json');
var Client = require('onedb-client').Client;
var onedb = new Client({
        hosts: {
                primary: {
                        location: 'https://one-db.datafire.io',
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3RpbmViZXJlQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zVG9HcmFudCI6bnVsbCwiaWF0IjoxNTQxMjYyNzEyLCJleHAiOjE1NDEzNDkxMTJ9.UGBxnzmfXw6Qo8OWAGabtAsdMa59m0w9RGtsO4lyEtk"
                },
        }
});
async function edit_perm() {

       var locations = await onedb.list('homie_locations', 'location');
       for (var location of locations.items){
         await onedb.updateACL('homie_locations', 'location', location.$.id, {allow:{read:["_all"]}});
       }
}
edit_perm();