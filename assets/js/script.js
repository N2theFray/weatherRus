var contentBoxEl = document.querySelector("#content-box")
var forecastBoxEl = document.querySelector("#forecast_box")
// var mainBoxEl = document.querySelector("#main-box")

//time converter
function timeConverter (inputTime) {
let unix_timestamp = inputTime;
var date = new Date(unix_timestamp * 1000)
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear()-2000;

//format time
var formattedTime = month + "/" + day + "/" + year;
return formattedTime
}

function getCityInfo (city) {
// format openweather api
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=27a6e74d4260774945191a8dc4b750e0&units=imperial"

//make request to url
fetch(apiUrl).then(function(response){
    return response.json()
})
.then(function(data){
    var cityLat = data.coord.lat;
    var cityLon = data.coord.lon;
    var requestName = data.name;
    cityUvInfo (cityLat, cityLon, requestName);
});
};

function cityUvInfo (lat, lon, requestName) {
    //format request to url
    var oneUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +  "&appid=27a6e74d4260774945191a8dc4b750e0&units=imperial"
    var cityName = requestName;

    //make request to api
    fetch(oneUrl).then(function(response){
        return response.json()
    })
    .then(function(data){
        
        //today object
        var today = {
            Date: timeConverter(data.current.dt),
            Temp: data.current.temp,
            Humidity: data.current.humidity,
            Wind: data.current.wind_speed,
            Uvi: data.current.uvi,
            Icon: "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
        }

        //create h2 to hold titleCity
        var titleCityEl = document.createElement("h2")
        titleCityEl.className = "titleCity";
        titleCityEl.innerHTML = cityName + " (" + today.Date + ")";
            //change img icon

        var imageIconEl = document.createElement("img")
        imageIconEl.className = "imgIcon";
        imageIconEl.setAttribute("src", today.Icon);
        

        //append contents of h2 to container
        titleCityEl.appendChild(imageIconEl)
        contentBoxEl.appendChild(titleCityEl)


        //create temp h3
        var cityTempEl = document.createElement("h3");
        cityTempEl.textContent = "Temperature: " + today.Temp;
        
        var tempSymbolEl = document.createElement("span");
        tempSymbolEl.setAttribute("id", "temp")
        tempSymbolEl.innerHTML = " &#8457;";

        cityTempEl.appendChild(tempSymbolEl)
        contentBoxEl.appendChild(cityTempEl)

        //create humidity h3
        var cityHumidityEl = document.createElement("h3");
        cityHumidityEl.textContent = "Humidity: " + today.Humidity;
        
        var humiditySymbolEl = document.createElement("span");
        humiditySymbolEl.setAttribute("id", "humidity")
        humiditySymbolEl.innerHTML = " &#x25;";

        cityHumidityEl.appendChild(humiditySymbolEl)
        contentBoxEl.appendChild(cityHumidityEl)

            

        //create wind speed h3
        var cityWindEl = document.createElement("h3");
        cityWindEl.textContent = "Wind: ";
        
        var windSymbolEl = document.createElement("span");
        windSymbolEl.setAttribute("id", "wind")
        windSymbolEl.innerHTML = today.Wind + " MPH";

        cityWindEl.appendChild(windSymbolEl)
        contentBoxEl.appendChild(cityWindEl)
            

        //create uv index
        var cityUvEl = document.createElement("h3");
        cityUvEl.textContent = "UV Index: ";
        
        var uvSymbolEl = document.createElement("span");

        //index color identifier
        if (today.Uvi >= 0 && today.Uvi < 3){
            uvSymbolEl.classList = "uv uv_index_low";
        } else if (today.Uvi >= 3 && today.Uvi < 6){
            uvSymbolEl.classList = "uv uv_index_moderate";
        } else if (today.Uvi >= 6 && today.Uvi < 8){
            uvSymbolEl.classList = "uv uv_index_high";
        } else if (today.Uvi >= 8 && today.Uvi < 11){
            uvSymbolEl.classList = "uv uv_index_very_high";
        } else {
            uvSymbolEl.classList = "uv uv_index_extreme";
        }
        
        uvSymbolEl.textContent = today.Uvi;

        cityUvEl.appendChild(uvSymbolEl)
        contentBoxEl.appendChild(cityUvEl)
            
       
        // forecast looper
        for (i =1; i<=5; i++){

            var forecast = {
                Date: timeConverter(data.daily[i].dt),
                Min: data.daily[i].temp.min,
                Max: data.daily[i].temp.max,
                Humidity: data.daily[i].humidity, 
                Icon: data.daily[i].weather[0].icon
            }

            
        }
    });
}

getCityInfo("Savannah");