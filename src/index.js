function showWeather(response) {
    console.log(response.data);
    let temperature = document.querySelector("#weather-temperature");
    let icon = document.querySelector("#weather-icon");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let dateElement = document.querySelector("#current-date");
    let date = new Date(response.data.time * 1000);
    temperature.innerHTML = Math.round(response.data.temperature.current);
    
    document.querySelector("#city").innerHTML = response.data.city;

    dateElement.innerHTML = formatDate(date);
    description.innerHTML = response.data.condition.description;
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    icon.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
    document.querySelector("#city").innerHTML = response.data.city;

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