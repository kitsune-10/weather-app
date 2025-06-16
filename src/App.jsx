import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputCity, setInputCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleKeyDown = async (e) => {
  if (e.key === "Enter" && inputCity.trim()) {
    setLoading(true);
    setError("");

    try {
      const encodedCity = encodeURIComponent(inputCity.trim());
      const url = `https://api.weatherapi.com/v1/current.json?key=cee0ed6801054429819191809252805&q=${encodedCity}`;

      const response = await axios.get(url);

      const apiCity = response.data?.location?.name?.toLowerCase();
      const userInput = inputCity.trim().toLowerCase();

      if (apiCity !== userInput) {
        throw new Error(`No exact match found for "${inputCity}".`);
      }

      setWeather(response.data);
      setInputCity("");
    } 
      catch (err) {
    console.error("Error fetching weather:", err);

    if (err.response && err.response.status === 400) {
      setError("No location found.");
    } else {
      setError("Something went wrong. Please try again.");
    }

    setWeather(null);
}
 
      finally {
      setLoading(false);
    }
  }
};


  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  return (
    <div className="app">
      <div className="search">
        <input 
          type="text"
          id="inputLocation"
          value={inputCity}
          placeholder="Enter your city"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
      </div>

      {loading && (
      <div className="spinner"></div>
    )}

      {error && (
        <div className='error'>
          <p>{error}</p>
        </div>
      )}

      {weather && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weather.location.name}, {weather.location.country}</p>
            </div>
            <div className="temp">
                <br></br><p>Temperature</p>
              <h1>{weather.current.temp_c}°C</h1>
            </div>
            <div className="wind">
              <p>Wind: {weather.current.wind_kph} kph</p>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{weather.current.feelslike_c}°C</p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">{weather.current.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{weather.current.wind_kph} kph</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
