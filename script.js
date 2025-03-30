document.getElementById("search-btn").addEventListener("click", function() {
    const city = document.getElementById("city-input").value;
    const apiKey = "3e2d12529da434308dfc5e4ba4381b44"; // Corrected API key placement
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod !== 200) { // Check if API response is successful
                document.getElementById("error-message").textContent = "City not found";
                return;
            }
            document.getElementById("error-message").textContent = "";
            document.querySelector(".city-name").textContent = data.name;
            document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById("description").textContent = data.weather[0].description;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            if (document.querySelector(".city-name").textContent === "City Name") {
                document.getElementById("error-message").textContent = "Error fetching data. Please try again.";
            }
    
        });
});
