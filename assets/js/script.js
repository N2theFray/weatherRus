var contentBoxEl = document.querySelector(".content_box")


function getCityInfo (city) {
// format openweather api
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=27a6e74d4260774945191a8dc4b750e0&units=imperial"

//make request to url
fetch(apiUrl).then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data); 
    console.log(data.coord.lat, data.coord.lon, data.name);
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