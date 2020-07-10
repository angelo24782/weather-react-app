import React, { useEffect } from 'react';
import './App.css';
import "weather-icons/css/weather-icons.css"
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherComponent from './components/WeatherComponent/WeatherComponent';

function App() {

  // api call api.openweathermap.org/data/2.5/weather?q=London,uk
  const API_key = "fa08a88a6cc2ee6ba5af312be463ff63";

  const getWeather = async () => {

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);

    const response = await api_call.json();


    console.log(response);

  }

  useEffect(() => {
    getWeather();
  }, [])



  return (
    <div className="App">
      <WeatherComponent />
    </div>
  );
}

export default App;
