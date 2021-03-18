window.onload = init;

function renderWeather(weatherData) {
    //initial variables
    const weatherTitle = document.querySelector(".weather__title");
    //const weatherTime = document.querySelector(".weather__time");
    const weatherDate = document.querySelector(".weather__date");
    //const weatherStatus = document.querySelector(".weather__status");
    const weatherMinTemp = document.querySelector(".weather__min");
    const weatherMaxTemp = document.querySelector(".weather__max");
    const weatherHumidity = document.querySelector(".weather__humidity");
    const weatherWindSpeed = document.querySelector(".weather__wind");

    weatherTitle.innerHTML = "Погода в" + `: ${weatherData.name}`;
    //weatherTime.innerHTML = "";

    let date = new Date();
    const mounthsArray = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let currentMounth = mounthsArray[date.getMonth()];
    weatherDate.innerHTML = `${date.getDate()} ${currentMounth} ${date.getFullYear()}`;

    weatherMinTemp.innerHTML = `${(+(weatherData.main.temp_min) - 273.15).toFixed(1)} - `;
    weatherMaxTemp.innerHTML = `${(+(weatherData.main.temp_max) - 273.15).toFixed(1)} &#8451`;
    weatherHumidity.innerHTML = `Влажность: ${weatherData.main.humidity}%`;
    weatherWindSpeed.innerHTML = `Ветер: ${(weatherData.wind.speed).toFixed(1)} м/с`;
}

function init () {
    const geo = navigator.geolocation;    
    const geoPromise = new Promise((resolve, reject) => {
        let position = {};

        geo.getCurrentPosition(  (pos) => {
            position.latitude = pos.coords.latitude;
            position.longitude = pos.coords.longitude;
            resolve(position);
        } , 
        (error) => {
            reject(error);
        }
        );
    })
    .then( pos => {
        let requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=d4c56184700c822c20bc8877b007221a`;
        return (fetch(requestURL));

    })
    .catch(err => {console.error(err)})

    const getRequestPromise = geoPromise.then( response => {
        return response.ok ? response : Promise.reject(response);
    })
    .then( response => {
        return response.json();
    })
    .then( weatherData => {
        console.log(weatherData);
        renderWeather(weatherData);
    })
    .catch( error => {console.error(error)})

}