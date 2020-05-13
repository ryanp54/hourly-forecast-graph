import React, { useState, useEffect } from 'react';

import { getForecast } from './nws-api';
import { ForecastChart } from './chart';


export default function App() {
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useGeolocation();

  const onLocationChange = () => {
    if (location) {
      getForecast(location)
        .then(setForecast);
    }
  };

  useEffect(onLocationChange, [location]);

  return (
    <ForecastChart
      forecast={forecast}
      startTime={(new Date())}
      endTime={(new Date(2020, 4, 18, 23))}
    >
    </ForecastChart>
  );
}

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