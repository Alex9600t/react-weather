import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import moonLogo from '/moon-sleep-svgrepo-com.svg';
import sunLogo from '/sun-fog-svgrepo-com.svg';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [additionalData, setAdditionalData] = useState(0);
  const [cloudIconPath, setCloudIconPath] = useState('');

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

  return (
    <>
      <div>
        <div className="object">
          <div className="citys">
            <span>
              Город: 
            </span>
          </div>
          <div className="localtime">
            {hours}:{minutes}:{seconds}
          </div>
          <div className="cloudicon">
            <img className='cloudicon1' src={cloudIconPath} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
