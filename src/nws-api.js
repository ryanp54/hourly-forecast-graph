const nwsOptions = {
  headers: {
    'User-Agent': 'site:weather2019.appspot.com; contact-email:ryanp54@yahoo.com'
  }
};

export default function getWeather({latitude, longitude}) {
  return getGridpoints(latitude, longitude)
    .then((locationInfo) => getGridForecast(locationInfo));
}

function getGridpoints(latitude, longitude) {
  return fetch(`https://api.weather.gov/points/${latitude},${longitude}`, nwsOptions)
    .then(convertToJson);
}

function getGridForecast({cwa, gridX, gridY}) {
  return fetch(
    `https://api.weather.gov/gridpoints/${cwa}/${gridX},${gridY}`,
    nwsOptions
  ).then(convertToJson);
}

function convertToJson(resp) {
  return resp.json().then((json) => json.properties);
}