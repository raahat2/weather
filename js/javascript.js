let weather;
let search = {};
let sevenDay;
const weatherIcons = {
  "01d": ` <img src=./images/day.svg>`,
  "01n": `<img src=./images/night.svg>`,
  "02d": `<img src=./images/cloudy-day-1.svg>`,
  "02n": `<img src=./images/cloudy-night-1.svg>`,
  "03d": `<img src=./images/cloudy.svg>`,
  "03n": `<img src=./images/cloudy.svg>`,
  "04d": `<img src=./images/cloudy.svg>`,
  "04n": `<img src=./images/cloudy.svg>`,
  "09d": ` <img src=./images/rainy-2.svg>`,
  "09n": ` <img src=./images/rainy-2.svg>`,
  "10d": ` <img src=./images/rainy-3.svg>`,
  "10n": ` <img src=./images/rainy-3.svg>`,
  "11d": ` <img src=./images/thunder.svg>`,
  "11n": ` <img src=./images/thunder.svg>`,
  "13d": ` <img src=./images/snowy-5.svg>`,
  "13d": ` <img src=./images/snowy-5.svg>`,
  "50d": ` <img src=./images/snowy-5.svg>`,
  "50n": ` <img src=./images/snowy-5.svg>`,
};

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchInput = document.getElementById("in");

  get(searchInput.value);
});

async function get(city) {
  await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb2d5f804f01204832fd06bc21f135ed&units=metric`
  )
    .then((res) => res.json())
    .then((json) => {
      weather = json;
      search = json.coord;
      getWeather(weather);
    });
  seven(search.lon, search.lat);
}
const forecast = document.getElementById("forecast");
function getWeather(a) {
  forecast.innerHTML = `
  <div class="card">
  <div class="logo">
  <img src="./images/weather.svg">
  </div>
  <div class='locationWraper'>
  <div class="des">
  <label>${a.name}</label>
  <label>Temprature:${a.main.temp_max}°C</label></div>
  <div class="icon">
  ${weatherIcons[a.weather[0].icon]}
  </div>
  </div>
  <div class="minMax">
  <div class="max">Max. Temprature:
  <label>${a.main.temp_max}°C</label></div>
  <div class="min">Min. Temprature:
  <label>${a.main.temp_min}°C</label></div></div>
    </div>

  `;
}
getWeather();
async function seven(lon, lat) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=bb2d5f804f01204832fd06bc21f135ed&units=metric`
  );
  sevenDay = await response.json();

  sevenWeather(sevenDay);
}

function sevenWeather(b) {
  let sevenDisplay = document.getElementById("sevenday");
  sevenDisplay.innerHTML = `
    <div class="sevenWraper">
    ${b.daily
      .map((e) => {
        let d = new Date(0);
        d.setUTCSeconds(e.dt);
        let x = d.getDate();
        let y = d.getMonth() + 1;
        let f = x + "/" + y;
        return `<div class="colum">
        <label>
          ${f}
        </label>
        <div class="image">${weatherIcons[e.weather[0].icon]}</div>
        <label>Temp:${e.temp.day}°C</label>
        <label>Min:${e.temp.min}°C</label>
        <label>Max:${e.temp.max}°C</label>
      </div>`;
      })
      .join("")}
    </div>
    `;
}
async function locate() {
  navigator.geolocation.getCurrentPosition(succ, err);
}
async function succ(pos, city) {
  await seven(pos.coords.latitude, pos.coords.longitude);
}
function err() {
  alert("hi!");
}
