////////////////// Nav Menu  //////////////////
function openNav(){
  document.getElementById("nav").style.height= "100%";
}

function closeNav(){
  document.getElementById("nav").style.height = "0%";
}

$(document).ready(function() {	

	//add current cities json info to html
    $.getJSON(createAPIKeyWithCurrentLocation() ,function(weather){

    	// City Temp
    	var cityTemp = JSON.stringify(weather.main.temp);
    	var cityTempRounded = Math.floor(cityTemp);
        $('#temp').text(cityTempRounded); 
        // City Name
        var cityName = JSON.stringify(weather.name);
        var cityNameNoQuotes = cityName.replace(/\"/g, "");
        $('#location').text(cityNameNoQuotes);
        // Weather Description
        var weatherDescription = JSON.stringify(weather.weather[0].description);
        var weatherDescriptionNoQuotes = weatherDescription.replace(/\"/g, "");
        $('#weatherDescription').text(weatherDescriptionNoQuotes);
        // City Temp
    	var windSpeed = JSON.stringify(weather.wind.speed);
    	var windSpeedRounded = Math.floor(windSpeed);
        $('#wind').text(windSpeedRounded + " mph"); 
        // Humidity
    	var humidity = JSON.stringify(weather.main.humidity);
    	//var windSpeedRounded = Math.floor(windSpeed);
        $('#humidity').text(humidity); 

        document.getElementById("fahrenheit").addEventListener("click", addNewTemp);

        function convertFarenToCelsius(tempInFaren){
    		return (tempInFaren-32) * (5/9);
    	}

    	function addNewTemp(){
    		$('#temp').text(convertFarenToCelsius(cityTempRounded));
    	}
    	

    });




    function convertCelsiusToFaren(){

    }

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