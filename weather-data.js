    function gettingJSON(){        
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=98ee2d73f7eef59301620cf461192eb7",function(json){
            document.write(JSON.stringify(json));
        });
    }