const apiKey = "56cd55bcb41fb1d5dd1158c24bb37cc0";
const pastSearch = [];
console.log(pastSearch)

$("#aside-container").on("submit", citySearch);


function citySearch(event) {
    event.preventDefault();

    const city = $("#inputCity").val()
    $("#inputCity").val("");
    console.log(city)
    
    pastSearch.push(city);
    
    getCity(city)
    
}



function getCity(city) {

    console.log(city)

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`, {

    method: "GET"
    })
    
    .then((response) => response.json())
    // calls the data for the current day
    .then((data) => {
        //console.log("weather: ", data)
        $("#cityName").text(data.name);
        $("#temp").text(`Temperature: ${data.main.temp} F`);
        $("#humid").text(`Humidity: ${data.main.humidity}%`);
        $("#wind").text(`Wind Speed: ${data.wind.speed} MPH`);
        
        
        // new fetch request to get uv index
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`)
        
        .then((response) => response.json())
        .then((uvData) => {
            console.log(uvData)
            $("#weatherIcon").attr("src", `https://openweathermap.org/img/wn/${uvData.current.weather[0].icon}@2x.png`)
            $("#index").text(`UV Index: ${uvData.current.uvi}`);

            if (uvData.current.uvi < 2) {
                $("#index").attr("class", " button is-success");
            } else if (uvData.current.uvi < 4) {
                $("#index").attr("class", " button is-warning");
            } else if (uvData.current.uvi < 6) {
                $("#index").attr("class", "button is-danger");
            }
            
        })
        // fetching 5 day forecast
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`)
        
        .then((response) => response.json())
        .then((dayForecast) => {
        
            console.log(dayForecast)

        for (let index = 1; index <= 6; index++) {
           const data = moment().add(1, 'days').calender()
            
        }
        })
        .catch((error) => {});
        
    }) 


}




