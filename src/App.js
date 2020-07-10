import React from 'react';
import './App.css';
import "weather-icons/css/weather-icons.css"
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherComponent from './components/WeatherComponent/WeatherComponent';

function App() {
  return (
    <div className="App">
      <WeatherComponent />
    </div>
  );
}

export default App;
