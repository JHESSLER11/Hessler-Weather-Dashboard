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

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {

    method: "GET"
    })
    
    .then((response) => response.json())
    // calls the data for the current day
    .then((data) => {
        console.log("weather: ", data)
        $("#cityName").text(data.name);
        $("#temp").text(`Temperature: ${data.main.temp} F`);
        $("#humid").text(`Humidity: ${data.main.humidity}%`);
        $("#wind").text(`Wind Speed: ${data.wind.speed} MPH`);
        
        
        // new fetch request to get uv index
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`)
        
        .then((response) => response.json())
        .then((data) => {
            $("#index").text(`UV Index: ${data.current.uvi}`);

            if (data.current.uvi < 2) {
                $("#index").attr("class", " button is-success");
            } else if (data.current.uvi < 4) {
                $("#index").attr("class", " button is-warning");
            } else if (data.current.uvi < 6) {
                $("#index").attr("class", "button is-danger");
            }

        

            
            
        })
        .catch((error) => {});
        
    }) 


}

getCity()

