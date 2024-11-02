import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import moonLogo from '/moon-sleep-svgrepo-com.svg';
import sunLogo from '/sun-fog-svgrepo-com.svg';
import cloudRainLogo from '/cloud-rain-svgrepo-com.svg';
import cloudSnowfallLogo from '/cloud-snowfall-svgrepo-com.svg';
import cloudStormLogo from '/cloud-storm-svgrepo-com.svg';
import cloudSunLogo from '/cloud-sun-svgrepo-com.svg';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [additionalData, setAdditionalData] = useState(0);
  const [cloudIconPath, setCloudIconPath] = useState('');
  const apiKey = '1293e8bff0e045eca3d232038240111'; //my token from weatherapi.com
  const [city, setCity] = useState('New ');
  const [weatherTemp, setWeatherTemp] = useState('');
  const [wheaterCondition, setWeatherCondition] = useState('');

  const weatherConditionStatic = [
    'Clear',
    'Partly cloudy',
    'Overcast',
    'Light rain',
    'Moderate rain',
    'Heavy rain',
    'Thunderstorms',
    'Snow',
    'Fog'];


  // function getWeather() {
  //   const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  //   try {
  //     const response = fetch(url);

  //     if (!response.ok) {
  //       throw new Error(`Ошибка: ${response.status}`);
  //     }

  //     const data = response.json();
  //     setWeatherTemp(`${data.current.temp_c}°C`);
  //     setWeatherCondition(`${data.current.condition.text}`);
  //   } catch (error) {
  //     console.error(error);
  //   };

  //   if (setWeatherCondition === weatherConditionStatic(0)) {

  //   }
  // };
    // getWeather()

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);

      const seconds = currentTime.getSeconds();

      if (seconds >= 0 && seconds <= 6) {
        setCloudIconPath(moonLogo);
      } else {
        setCloudIconPath(sunLogo);
      }

      setAdditionalData(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  setInterval(() => {const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    try {
      const response = fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = response.json();
      setWeatherTemp(`${data.current.temp_c}°C`);
      setWeatherCondition(`${data.current.condition.text}`);
    } catch (error) {
      console.error(error);
    };

    if (setWeatherCondition === weatherConditionStatic(0)) {

    }}, 1800000);
  // getWeather()

  return (
    <>
      <div>
        <div className="object">
          <div className="citys">
            <span>
              Город: Москва
            </span>
          </div>
          <div className="localtime">
            {hours}:{minutes}:{seconds}
          </div>
          <div className="cloudicon">
            <img className='cloudicon1' src={cloudIconPath} alt="" />
            <img src={setWeatherCondition} alt="" className="cloudicon2" />
          </div>
          <div className="temp">
            <span>
              {weatherTemp}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
