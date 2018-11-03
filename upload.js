
var data = require('./db.json');
var Client = require('onedb-client').Client;
var onedb = new Client({
        hosts: {
                primary: { location: 'https://one-db.datafire.io', 
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1c3RpbmViZXJlQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zVG9HcmFudCI6bnVsbCwiaWF0IjoxNTQxMjYyNzEyLCJleHAiOjE1NDEzNDkxMTJ9.UGBxnzmfXw6Qo8OWAGabtAsdMa59m0w9RGtsO4lyEtk" },
        }
});
async function upload (){
        for(location of data){

                await onedb.create('homie_locations', 'location', location);
        }
}
upload();