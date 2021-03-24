var contentBoxEl = document.querySelector(".content_box")


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
    var cityName = data.name;
    cityUvInfo (cityLat, cityLon, cityName);
});
};

function cityUvInfo (lat, lon, cityName) {
    //format request to url
    var oneUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +  "&appid=27a6e74d4260774945191a8dc4b750e0&units=imperial"
    var cityName = cityName;

    //make request to api
    fetch(oneUrl).then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        console.log(data.current.temp,
                    data.current.dt,
                    data.current.humidity, 
                    data.current.wind_speed, 
                    data.current.uvi, 
                    data.current.weather[0].icon,

                    data.daily[1].dt,
                    data.daily[1].weather[0].icon,
                    data.daily[1].temp.min,
                    data.daily[1].temp.max,
                    data.daily[1].humidity,
                    );

        var todayDate = timeConverter(data.current.dt);
        var todayPlus1 = timeConverter(data.daily[1].dt);
        var todayPlus2 = timeConverter(data.daily[2].dt);
        var todayPlus3 = timeConverter(data.daily[3].dt);
        var todayPlus4 = timeConverter(data.daily[4].dt);
        var todayPlus5 = timeConverter(data.daily[5].dt);
            console.log(todayDate, todayPlus1, todayPlus2, todayPlus3, todayPlus4, todayPlus5);
            

        

        //create h2 to hold titleCity
            //change img icon

        //create temp h3
            //create temp span

        //create humidity h3
            //create humidity span

        //create wind speed h3
            //create wind span

        //create uv index
            //create uv span
    });
}

getCityInfo("Savannah");