function showWeather(response) {
    console.log(response.data);
    let temperature = document.querySelector("#weather-temperature");
    let icon = document.querySelector("#weather-icon");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let date = new Date(response.data.time * 1000);
    let dateElement = document.querySelector("#current-date");
    temperature.innerHTML = Math.round(response.data.temperature.current);
    
    document.querySelector("#city").innerHTML = response.data.city;

    dateElement.innerHTML = formatDate(date);
    description.innerHTML = response.data.condition.description;
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    icon.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
    document.querySelector("#city").innerHTML = response.data.city;
    
    getForecast(response.data.city);
}

function formatDate(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
    let apiKey = "a27d320o50dd0fb63e6t6dc778bc438b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;   


    axios.get(apiUrl).then(showWeather);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function getForecast(city) {
    let apiKey = "a27d320o50dd0fb63e6t6dc778bc438b";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios(apiUrl).then(showForecast);
}

function showForecast(response) {

let weatherForecastHTML = "";
    response.data.daily.forEach(function (day, index) {
        if (index < 5) {

            weatherForecastHTML +=  `
            <div class="temp-values">
                <div class="temp-date"> ${formatDay(day.time)} </div>

                <img src="${day.condition.icon_url}" class="weather-temp-icon"/>
                    <div class="temp-value">
                        <div class="weather-temp"> <strong>${Math.round(day.temperature.maximum)}°</strong></div>
                        <div class="weather-temp2">${Math.round(day.temperature.minimum)}°</div>
                    </div> 
            </div>
            `;
        }
    });

let forecastElement = document.getElementById("forecast");
forecastElement.innerHTML = weatherForecastHTML;
};

function getInput(event) {
    event.preventDefault();
    let input = document.querySelector('#city-input')
    let city= document.querySelector('#city')
    city.innerHTML = input.value;
    searchCity(input.value);
}
let form = document.querySelector('#form');
form.addEventListener('submit', getInput) 

searchCity("New York");