let apiKey = "0156ea86085d3124374793ece8d4b917";

async function getWeather(){

    let city =
    document.getElementById("cityInput").value;

    if(city === ""){

        document.getElementById("weatherResult").innerHTML =

        "⚠ Please enter a city name";

        document.getElementById("weatherResult").style.color = "red";

        return;

    }

    document.getElementById("weatherResult").innerHTML =

    "Loading...";

    let url =

    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        let response = await fetch(url);

        let data = await response.json();

        if(data.cod == "404"){

            document.getElementById("weatherResult").innerHTML =

            "❌ City not found";

            return;

        }

        let weatherMain =
        data.weather[0].main;

        let weatherIcon = "";

        if(weatherMain === "Clear"){

            weatherIcon = "☀️";

            document.body.style.background = "skyblue";

        }

        else if(weatherMain === "Clouds"){

            weatherIcon = "☁️";

            document.body.style.background = "gray";

        }

        else if(weatherMain === "Rain"){

            weatherIcon = "🌧";

            document.body.style.background = "darkslategray";

        }

        else if(weatherMain === "Snow"){

            weatherIcon = "❄️";

        }

        else{

            weatherIcon = "🌍";

        }

        document.getElementById("weatherResult").style.color = "white";

        document.getElementById("weatherResult").innerHTML =

        `
        <h1>${weatherIcon}</h1>

        <h2>${data.name}</h2>

        <p>🌡 Temperature: ${data.main.temp}°C</p>

        <p>☁ Weather: ${weatherMain}</p>

        <p>💧 Humidity: ${data.main.humidity}%</p>

        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        `;

    }

    catch(error){

        document.getElementById("weatherResult").innerHTML =

        "❌ Something went wrong";

    }

}

function toggleDarkMode(){

    document.body.classList.toggle("dark");

}

function checkEnter(event){

    if(event.key === "Enter"){

        getWeather();

    }

}

function updateClock(){

    let now = new Date();

    let time =
    now.toLocaleTimeString();

    let date =
    now.toLocaleDateString();

    document.getElementById("clock").innerHTML =

    `${date} <br> ${time}`;

}

setInterval(updateClock, 1000);

updateClock();

function getLocationWeather(){

    navigator.geolocation.getCurrentPosition(

        async function(position){

            let lat =
            position.coords.latitude;

            let lon =
            position.coords.longitude;

            let url =

            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            let response = await fetch(url);

            let data = await response.json();

            document.getElementById("weatherResult").innerHTML =

            `
            <h1>📍</h1>
s
            <h2>${data.name}</h2>

            <p>🌡 ${data.main.temp}°C </p>
            `;

        }

    );

}