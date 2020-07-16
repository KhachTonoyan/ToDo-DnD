const weatherDiv = document.getElementById("weather");
const dateDiv = document.getElementById("time")

export const weather = () => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${"yerevan"}&appid=fd48bdf8a8b87b3c140f17625f4e2d57&units=metric`)
.then(e => e.json())
.then(data => {
    weatherDiv.innerHTML = `<p>${data.main.temp} C</p> <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`
})

export const time = () =>{
    setInterval(()=>{
        dateDiv.innerText = new Date().toLocaleTimeString()
    },1000)
}