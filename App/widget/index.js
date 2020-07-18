const weatherDiv = document.getElementById("weather");
const dateDiv = document.getElementById("time")

export const weather = () => fetch("http://api.ipstack.com/185.215.54.145?access_key=af8b21152e84b0f5efc25781157e8c3a")
    .then(data => data.json())
    .then(({city,location}) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd48bdf8a8b87b3c140f17625f4e2d57&units=metric`)
            .then(e => e.json())
            .then(data => {
                weatherDiv.innerHTML = `
                <p>${data.main.temp} C</p> 
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <img  style="background-image:url('${location.country_flag}')">`
            })
    })



export const time = () =>{
    setInterval(()=>{
        dateDiv.innerText = new Date().toLocaleTimeString()
    },1000)
}