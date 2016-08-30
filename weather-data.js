$(document).ready(function() {	

	//add current cities json info to html
    $.getJSON(createAPIKeyWithCurrentLocation() ,function(weather){
        $('#temp').text(JSON.stringify(weather)); 
        $('#location').text(JSON.stringify(weather.main.temp_min));
    });

	function getLocationZip(){
			$.ajax({
			url: "http://ip-api.com/json/",
			async: false,
			dataType: 'json',
			success: function(ip){
				localZip = ip.zip;		
			}
		});
		return localZip;
	}

	function createAPIKeyWithCurrentLocation(){
		var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
		var units = "&units=imperial";
		var apiKey = "&APPID=98ee2d73f7eef59301620cf461192eb7";
		//add together key
		var apiUrlFull = apiUrl + getLocationZip() + units + apiKey;

		return apiUrlFull;
	}

});