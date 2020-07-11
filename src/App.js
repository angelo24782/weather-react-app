import React, { useState } from 'react';
import './App.css';
import "weather-icons/css/weather-icons.css"
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherComponent from './components/WeatherComponent/WeatherComponent';
import FormComponent from './components/FormComponent/FormComponent';

function App() {

  const [city, setCity] = useState();
  const [country,] = useState();
  const [icon, setIcon] = useState();
  const [celsius, setCelsius] = useState();
  const [temp_max, setTemp_max] = useState();
  const [temp_min, setTemp_min] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState(false);

  // api call api.openweathermap.org/data/2.5/weather?q=London,uk
  const API_key = "fa08a88a6cc2ee6ba5af312be463ff63";

  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  }


  const get_weatherIcon = (icons, rangeID) => {

    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        setIcon(weatherIcon.Thunderstorm);
        break;
      case rangeID >= 300 && rangeID <= 321:
        setIcon(weatherIcon.Drizzle);
        break;
      case rangeID >= 500 && rangeID <= 531:
        setIcon(weatherIcon.Rain);
        break;
      case rangeID >= 600 && rangeID <= 622:
        setIcon(weatherIcon.Snow);
        break;
      case rangeID >= 701 && rangeID <= 781:
        setIcon(weatherIcon.Atmosphere);
        break;
      case rangeID === 800:
        setIcon(weatherIcon.Clear);
        break;
      case rangeID >= 801 && rangeID <= 804:
        setIcon(weatherIcon.Clouds);
        break;
      default:
        setIcon(weatherIcon.Clouds);
    }

  }

  const getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);


      const response = await api_call.json();


      setCity(`${response.name}, ${response.sys.country}`);
      setCelsius(calCelsius(response.main.temp));
      setTemp_max(calCelsius(response.main.temp_max));
      setTemp_min(calCelsius(response.main.temp_min));
      setDescription(response.weather[0].description);
      get_weatherIcon(weatherIcon, response.weather[0].id);
      setError(false);

    } else {
      setError(true);
    }

  }

  return (
    <div className="App">

      <FormComponent loadWeather={getWeather} error={error} />

      <WeatherComponent
        city={city}
        country={country}
        temp_celsius={celsius}
        temp_min={temp_min}
        temp_max={temp_max}
        description={description}
        weatherIcon={icon}
      />
    </div>
  );
}

export default App;
