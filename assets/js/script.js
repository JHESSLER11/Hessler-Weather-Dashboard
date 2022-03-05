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
    .then((data) => {
        console.log("weather: ", data)
        $("#cityName").text(data.name);
        $("#temp").text(`Temperature: ${data.main.temp} F`);
        $("#humid").text(`Humidity: ${data.main.humidity}%`);
        $("#wind").text(`Wind Speed: ${data.wind.speed} MPH`);
        
        
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`)
        
        .then((response) => response.json())
        .then((data) => {
            $("#index").text(`UV Index: ${data.current.uvi} UV`);
            
            
        })
        .catch((error) => {});
        
    }) 


}

getCity()

