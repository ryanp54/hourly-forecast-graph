import React, { useState, useEffect } from 'react';
import getWeather from './nws-api';


function App() {
  const [weather, setWeather] = useState();
  const [location, setLocation] = useGeolocation();

  const onLocationChange = () => {
    if (location) {
      getWeather(location).then(
        (forecast) => { debugger }
      );
    }
  };

  useEffect(onLocationChange, [location]);

  return (
    <div></div>
  );
}

export default App;

function useGeolocation() {
  const [location, setLocation] = useState();
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => { setLocation(coords); },
        () => { setLocation(null); }
      )
    } else {
      setLocation(null);
    }
  }, []);

  return [location, setLocation];
}