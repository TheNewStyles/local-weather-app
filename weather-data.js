////////////////// Nav Menu  //////////////////
function openNav(){
  document.getElementById("nav").style.height= "100%";
}

function closeNav(){
  document.getElementById("nav").style.height = "0%";
}

// function getLocationZip(){
//      $.ajax({
//      url: "https://ip-api.com/json/",
//      async: false,
//      dataType: 'json',
//      success: function(ip){
//          localZip = ip.zip;      
//      }
//  });
//  return localZip;
// }

if(navigator.geolocation){
    var optn = {
            enableHighAccuracy : true,
            timeout : Infinity,
            maximumAge : 0
        };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, optn);
}else{
    alert('Geolocation is not supported in your browser');
    //set to chicago
}

function geoSuccess(position){
    
    lat = 'lat=' + Math.floor(position.coords.latitude);
    lon = '&lon' + Math.floor(position.coords.longitude);
    // function getLatitude(){
    //     console.log(position.coords.latitude);
    //     return 'lat=' + Math.floor(position.coords.latitude);
    // }
    // function getLongitude(){
    //     console.log(position.coords.longitude);
    //     return '&lon' + Math.floor(position.coords.longitude);
    // }
}

function geoError(error){
    switch(error.code) {
    case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
    case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
    case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
    case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
}

function createAPIKeyWithCurrentLocation(){
    var apiUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=imperial";
    var apiKey = "&APPID=98ee2d73f7eef59301620cf461192eb7";
    var latLon = lat + lon;
    //add together key
    var apiUrlFull = apiUrl + latLon + units + apiKey;

    return apiUrlFull;
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
        var weatherDescriptionNoQuotes = titleCase(weatherDescriptionNoQuotes);
        $('#weatherDescription').text(weatherDescriptionNoQuotes);
        // Wind Speed
    	var windSpeed = JSON.stringify(weather.wind.speed);
    	var windSpeedRounded = Math.floor(windSpeed);
        $('#wind').text(windSpeedRounded); 
        // Humidity
    	var humidity = JSON.stringify(weather.main.humidity);    	
        $('#humidity').text(humidity); 
        // Weather Icons
        var weatherIcons = weather.weather[0].icon;

        document.getElementById("celsius").addEventListener("click", addCelsiusTemp);
        document.getElementById("fahrenheit").addEventListener("click", addFahrenTemp);

        function convertFahrenToCelsius(tempInFaren){
    		return Math.floor((tempInFaren-32) * (5/9));
    	}

    	function addCelsiusTemp(){
    		$('#temp').text(convertFahrenToCelsius(cityTempRounded));
    		$('#celsius').addClass('tempActive');
    		$('#fahrenheit').removeClass('tempActive');
    	}

    	function addFahrenTemp(){
    		$('#temp').text(cityTempRounded);    		
    		$('#fahrenheit').addClass('tempActive');
    		$('#celsius').removeClass('tempActive');
    	}

    	function titleCase(str) {
		  str = str.split(' ');
		  var length = str.length;
		  for (var i = 0; i < length; i++) {
		    str[i] = str[i][0].toUpperCase() + str[i].substring(1);
		  }
		  return str.join(' ');
		}

		var sunShowerIcon = $("<div class='icon sun-shower'><div class='cloud'></div><div class='sun'><div class='rays'></div></div><div class='rain'></div></div>");
    	var thunderStormIcon = $("<div class='icon thunder-storm'><div class='cloud'></div><div class='lightning'><div class='bolt'></div><div class='bolt'></div></div></div>");
    	var cloudyIcon = $("<div class='icon cloudy'><div class='cloud'></div><div class='cloud'></div></div>");
    	var snowFlurriesIcon = $("<div class='icon flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div></div>");
    	var sunnyIcon = $("<div class='icon sunny'><div class='sun'><div class='rays'></div></div></div>");
    	var rainyIcon = $("<div class='icon rainy'><div class='cloud'></div><div class='rain'></div></div>");

    	//Determine which icon to add    	
    	switch (weatherIcons) {
    		//Clear Sky
    		case "01d":
    		case "01n":   			
    			$('#icons').append(sunnyIcon);
    			break;
    		//Few Clouds
    		case "02d":   
    		case "02n": 			
    			$('#icons').append(cloudyIcon);    			
    			break;
    		//Scattered clouds
    		case "03d": 
    		case "03n":   			
    			$('#icons').append(cloudyIcon);
    			break;
    		//Broken clouds
    		case "04d": 
    		case "04n":   			
    			$('#icons').append(cloudyIcon);
    			break;
    		//Shower rain
    		case "09d":  
    		case "09n":  			
    			$('#icons').append(sunShowerIcon);
    			break;
    		//Rain
    		case "10d":
    		case "10n":    			
    			$('#icons').append(rainyIcon);
    			break;
    		//ThunderStom
    		case "11d":    	
    		case "11n":		
    			$('#icons').append(thunderStormIcon);
    			break;
    		//Snow
    		case "13d":  
    		case "13n":  			
    			$('#icons').append(snowFlurriesIcon);
    			break;
    		//Mist
    		case "50d":  
    		case "50n":  			
    			$('#icons').append(rainyIcon);
    			break;    			
    		default:
    			$('#icons').append(sunnyIcon);
    			break;
    	}

    });


});













