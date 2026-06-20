let tempCelsius = 0;
let currentUnit = "C";

async function getWeather() {
    const city = document.getElementById("citySelect").value;
    const result = document.getElementById("weatherResult");

    if (!city) {
        result.innerHTML = "Please select a city.";
        return;
    }
    const apiKey = "bc51f3bc6fe43584b9cd49c8fc65628e";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        result.innerHTML = "Fetching weather...";

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch weather");
        }

        tempCelsius = data.main.temp;

        result.innerHTML = `
            <h2>${data.name}</h2>
            <p id="temperature">Temperature: ${tempCelsius} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        result.innerHTML = `Error: ${error.message}`;
        console.error(error);
    }
}

function toggleTemperature() {
    const tempElement = document.getElementById("temperature");

    if (!tempElement) {
        return;
    }

    if (currentUnit === "C") {
        const fahrenheit = (tempCelsius * 9 / 5) + 32;

        tempElement.innerHTML =
            `Temperature: ${fahrenheit.toFixed(1)} °F`;

        currentUnit = "F";

        document.getElementById("toggleBtn").textContent =
            "Show °C";
    } else {
        tempElement.innerHTML =
            `Temperature: ${tempCelsius} °C`;

        currentUnit = "C";

        document.getElementById("toggleBtn").textContent =
            "Show °F";
    }
}
