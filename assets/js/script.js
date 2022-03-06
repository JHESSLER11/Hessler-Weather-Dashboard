const apiKey = "56cd55bcb41fb1d5dd1158c24bb37cc0";
let pastSearch = []

//searches for selected city
$("#aside-container").on("submit", citySearch);

//handles the search
function citySearch(event) {
    event.preventDefault();
    const city = $("#inputCity").val().trim()
    $("#inputCity").val("");
    getCity(city)
    pushHistory(city)
    
    
    
}


//add cities to past search and run the history list
function pushHistory(city) {
            pastSearch.unshift(city);
            localStorage.setItem("cities", JSON.stringify(pastSearch));
            historyList()
    
        }
    
    
    //loop through past search history and create a button
    function historyList() {
        const searchHistory = $("#search-history")
        searchHistory.empty()
        pastSearch.forEach((city) => {
            let searchBtn = $("<button>").addClass("has-text-black button is-info m-1")
            searchBtn.attr("city", city)
            searchBtn.text(city)
            searchHistory.append(searchBtn)     
        });
        
    }

//recalls past searches
$("#search-history").on("click", "button", function() {
    const savedCity = $(this).attr("city");
    getCity(savedCity)
});
    
 //creates all the data for each city.   
    function getCity(city) {
        
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        
        .then((response) => response.json())
        // calls the data for the current day
        .then((data) => {
            
            const todaysDate = moment().format("MM/DD/YYYY")
            console.log(todaysDate)
            $("#cityName").text(`${data.name} ${todaysDate}`);
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
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`)
            
            .then((response) => response.json())
            .then((dayForecast) => {
                
    
                //day 1
                $("#date1").text(moment().add(1, 'days').format("MM/DD/YYYY"))
                $("#icon1").attr("src", `https://openweathermap.org/img/wn/${dayForecast.daily[1].weather[0].icon}@2x.png`)
                $("#temp1").text(`Temperature: ${dayForecast.daily[1].temp.day} F`);
                $("#humid1").text(`Humidity: ${dayForecast.daily[1].humidity}%`);
                $("#wind1").text(`Wind Speed: ${dayForecast.daily[1].wind_speed} MPH`);
                
                //day 2
                $("#date2").text(moment().add(2, 'days').format("MM/DD/YYYY"))
                $("#icon2").attr("src", `https://openweathermap.org/img/wn/${dayForecast.daily[2].weather[0].icon}@2x.png`)
                $("#temp2").text(`Temperature: ${dayForecast.daily[2].temp.day} F`);
                $("#humid2").text(`Humidity: ${dayForecast.daily[2].humidity}%`);
                $("#wind2").text(`Wind Speed: ${dayForecast.daily[2].wind_speed} MPH`);
                
                //day 3
                $("#date3").text(moment().add(3, 'days').format("MM/DD/YYYY"))
                $("#icon3").attr("src", `https://openweathermap.org/img/wn/${dayForecast.daily[3].weather[0].icon}@2x.png`)
                $("#temp3").text(`Temperature: ${dayForecast.daily[3].temp.day} F`);
                $("#humid3").text(`Humidity: ${dayForecast.daily[3].humidity}%`);
                $("#wind3").text(`Wind Speed: ${dayForecast.daily[3].wind_speed} MPH`);
                
                //day 4
                $("#date4").text(moment().add(2, 'days').format("MM/DD/YYYY"))
                $("#icon4").attr("src", `https://openweathermap.org/img/wn/${dayForecast.daily[4].weather[0].icon}@2x.png`)
                $("#temp4").text(`Temperature: ${dayForecast.daily[4].temp.day} F`);
                $("#humid4").text(`Humidity: ${dayForecast.daily[4].humidity}%`);
                $("#wind4").text(`Wind Speed: ${dayForecast.daily[4].wind_speed} MPH`);
                
                //day 5
                $("#date5").text(moment().add(2, 'days').format("MM/DD/YYYY"))
                $("#icon5").attr("src", `https://openweathermap.org/img/wn/${dayForecast.daily[5].weather[0].icon}@2x.png`)
                $("#temp5").text(`Temperature: ${dayForecast.daily[5].temp.day} F`);
                $("#humid5").text(`Humidity: ${dayForecast.daily[5].humidity}%`);
                $("#wind5").text(`Wind Speed: ${dayForecast.daily[5].wind_speed} MPH`);
                
            })
            .catch((error) => {});
            
        }) 
        
        
    }
    
    


