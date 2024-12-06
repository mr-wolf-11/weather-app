function getWeather(){
    const code = "9e21bd1095db062a313ecef56b875fdf"
    const city = document.getElementById("city").value;
    if(!city){
        alert('Please enter a city');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${code}`;
    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${code}`

    fetch(currentWeatherUrl).then(response=>response.json()).then(data=>{
        displayWeather(data);
    }).catch(error => {
        console.error('Error fetching current weather data:',error);
        alert('Error fetching current weather data. Please try again.');
    });
    
    fetch(forecasturl).then(response=>response.json()).then(data=>{
        displayHourlyFarecast(data.list);
    }).catch(error => {
        console.error('Error fetching hourly forecast data:',error);
        alert('Error fetching current forecast data. Please try again.');
    });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div')
    const weatherInfoDiv = document.getElementById('weather-info')
    const weatherIcon = document.getElementById('weather-icon')
    const hourlyForecastDiv = document.getElementById('hourly-forecast')

    weatherInfoDiv.innerHTML = ''
    hourlyForecastDiv.innerHTML = ''
    tempDivInfo.innerHTML = ''

    if (data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
    } else{
        const cityName = data.name
        const temperature = Math.round(data.main.temp-273.15)
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `

        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `

        tempDivInfo.innerHTML = temperatureHTML
        weatherInfoDiv.innerHTML = weatherHTML
        weatherIcon.src = iconUrl
        weatherIcon.alt = description

        showImage()
    }
}

function displayHourlyFarecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast')
    const next24Hours = hourlyData.slice(0,8)

    next24Hours.forEach(item => {
        
        const dateTime = new Date(item.dt = 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp-273.15)
        const iconCode = item.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`

        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Houlry Weather Icon">
            <span>${temperature}°C</span>
        </div>
        `
        hourlyForecastDiv.innerHTML += hourlyItemHtml

    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}