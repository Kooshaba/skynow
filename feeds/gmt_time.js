//request data from google time zones api to return the current GMT time
//TAKES NO PARAMETER - coordinates are hardcoded for the new york city area

var request = require('request');
require('../utils/read');
var keys = require('../api_keys.json');
var date = new Date();
var timestamp = date.getTime()/1000;
var local_coordinates = {
    'lat': '40.745695',
    'lng': '-74.0255538999999999'
};

exports.get_content = function(callback){

    request(generate_url(local_coordinates,keys.google), function (error, response, body) {
	if (!error && response.statusCode == 200) 
	{
	    // console.log(body);
	    var response = JSON.parse(body);
	    var dst = response['dstOffset'];
	    var raw = response['rawOffset'];
	    var gmt = timestamp + (raw * -1);
	    gmt = gmt * 1000;
	    var time = new Date(gmt);
	    callback(null, time);
	    // callback(null, new Date(2014, 3, 17, 20, 0, 0, 0))
	}
	else
	{
	    console.log("gmt time error");
	}
    });

};

var generate_url = function(loc, api_key){
    var lat = loc['lat'];
    var lng = loc['lng'];
    var date = new Date();
    return('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + timestamp + '&sensor=false&key=' + api_key);
}