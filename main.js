$( document ).ready(function() {

    var $icons = $("#icons");
    var $celsius = $("#celsius");
    var $fahrenheit = $("#fahrenheit");

    var sunShowerIcon = $("<div class='icon sun-shower'><div class='cloud'></div><div class='sun'><div class='rays'></div></div><div class='rain'></div></div>");
    var thunderStormIcon = $("<div class='icon thunder-storm'><div class='cloud'></div><div class='lightning'><div class='bolt'></div><div class='bolt'></div></div></div>");
    var cloudyIcon = $("<div class='icon cloudy'><div class='cloud'></div><div class='cloud'></div></div>");
    var snowFlurriesIcon = $("<div class='icon flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div></div>");
    var sunnyIcon = $("<div class='icon sunny'><div class='sun'><div class='rays'></div></div></div>");
    var rainyIcon = $("<div class='icon rainy'><div class='cloud'></div><div class='rain'></div></div>");

    startUp();

    function startUp() {
        if (navigator.geolocation) {
            var optn = {
                enableHighAccuracy : true,
                timeout : Infinity,
                maximumAge : 0
            };
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError, optn);
        } else {
            alert('Geolocation is not supported in your browser');
        }
    }

    //This function is called on error
    function geoError(error){
        switch (error.code) {
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

    //This function is called on success
    function geoSuccess(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var lat = 'lat=' + latitude.toFixed(2);
        var lon = '&lon=' + longitude.toFixed(2);

        //add current cities json info to html
        $.getJSON(getAPIKeyWithCurrentLocation() ,function(weather){
            $('.loader').hide();
            $('.tempButtons').show();

            // City Temp
            var cityTemp = JSON.stringify(weather.main.temp);
            cityTemp = Math.floor(cityTemp);
            $('#temp').text(cityTemp);

            // City Name
            $('#location').text(removeQuotes(JSON.stringify(weather.name)));

            // Weather Description
            var weatherDescription = removeQuotes(JSON.stringify(weather.weather[0].description));
            $('#weatherDescription').text(titleCase(weatherDescription));

            // Wind Speed
            var windSpeed = JSON.stringify(weather.wind.speed);
            $('#wind').text(Math.floor(windSpeed));

            // Humidity
            var humidity = JSON.stringify(weather.main.humidity);
            $('#humidity').text(humidity);

            // Weather Icons
            var weatherIcons = weather.weather[0].icon;

            $celsius.click(function() {
                addCelsiusTemp(cityTemp);
            });

            $fahrenheit.click(function() {
                addFahrenTemp(cityTemp);
            });

            displayWeatherIcon(weatherIcons);

        });

        function displayWeatherIcon(weatherIcons) {
            switch (weatherIcons) {
                //Clear Sky
                case "01d":
                case "01n":
                    $icons.append(sunnyIcon);
                    break;
                //Few Clouds
                case "02d":
                case "02n":
                    $icons.append(cloudyIcon);
                    break;
                //Scattered clouds
                case "03d":
                case "03n":
                    $icons.append(cloudyIcon);
                    break;
                //Broken clouds
                case "04d":
                case "04n":
                    $icons.append(cloudyIcon);
                    break;
                //Shower rain
                case "09d":
                case "09n":
                    $icons.append(sunShowerIcon);
                    break;
                //Rain
                case "10d":
                case "10n":
                    $icons.append(rainyIcon);
                    break;
                //ThunderStom
                case "11d":
                case "11n":
                    $icons.append(thunderStormIcon);
                    break;
                //Snow
                case "13d":
                case "13n":
                    $icons.append(snowFlurriesIcon);
                    break;
                //Mist
                case "50d":
                case "50n":
                    $icons.append(rainyIcon);
                    break;
                default:
                    $icons.append(sunnyIcon);
                    break;
            }
        }

        function getAPIKeyWithCurrentLocation() {
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
            var units = "&units=imperial";
            var apiKey = "&APPID=98ee2d73f7eef59301620cf461192eb7";
            var latLon = lat + lon;
            aipUrl = apiUrl + latLon + units + apiKey;

            return aipUrl;
        }

        function addCelsiusTemp(cityTempRounded) {
            $('#temp').text(convertFahrenToCelsius(cityTempRounded));
            $celsius.addClass('tempActive');
            $fahrenheit.removeClass('tempActive');
        }

        function convertFahrenToCelsius(tempInFaren) {
            return Math.floor((tempInFaren-32) * (5/9));
        }

        function addFahrenTemp(cityTempRounded) {
            $('#temp').text(cityTempRounded);
            $fahrenheit.addClass('tempActive');
            $celsius.removeClass('tempActive');
        }

        function titleCase(str) {
            str = str.split(' ');
            var length = str.length;
            for (var i = 0; i < length; i++) {
                str[i] = str[i][0].toUpperCase() + str[i].substring(1);
            }
            return str.join(' ');
        }

        function removeQuotes(str) {
            return str.replace(/\"/g, "");
        }
    }
});

// function getLocationZip(){
//      $.ajax({
//      url: "https://crossorigin.me/http://ip-api.com/json/",
//      async: false,
//      dataType: 'json',
//      success: function(ip){
//          localZip = ip.zip;
//      }
//  });
//  return localZip + ",us";
// }
















