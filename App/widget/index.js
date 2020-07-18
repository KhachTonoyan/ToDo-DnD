const weatherDiv = document.getElementById("weather");
const dateDiv = document.getElementById("time")

const getCity = (latitude,longitude) => (
fetch(`https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${latitude}&longitude=${longitude}&range=0`, {
        "method": "GET",
        "headers": {
        "x-rapidapi-host": "geocodeapi.p.rapidapi.com",
        "x-rapidapi-key": "19d40a0f85mshbfb5f80994be06bp14d0ddjsn4f4ef4abd7f4"
        }
    })
    .then(response => {
    return response.json()
    })
    .then(res => res[0])
)

const getWeather = (getCity) => {
    getCity.then(({City,CountryId}) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=fd48bdf8a8b87b3c140f17625f4e2d57&units=metric`)
        .then(e => e.json())
        .then(data => {
            weatherDiv.innerHTML = `
            <p>${data.main.temp} C</p> 
            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <img  src='https://www.countryflags.io/${CountryId}/shiny/32.png'>`
        })
    })
}

export const weather = () => navigator.geolocation.getCurrentPosition((pos) => {
    let {latitude,longitude} = pos.coords;
        getWeather(getCity(latitude,longitude))
  },null, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });




export const time = () =>{
    setInterval(()=>{
        dateDiv.innerText = new Date().toLocaleTimeString()
    },1000)
}