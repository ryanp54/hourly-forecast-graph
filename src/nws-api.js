const NWS_OPTIONS = {
  headers: {
    'User-Agent': 'site:weather2019.appspot.com; contact-email:ryanp54@yahoo.com'
  }
};

export function validTimeToDates(timeStr) {
  let [date, duration] = timeStr.split('/P');
  let [days, hours] = duration.split('T');

  days = Number(days.split('D')[0]);
  hours = Number(hours.split('H')[0]);

  date = new Date(date);
  duration = 24 * days + hours;

  const dates = []
  for (let i = 0; i < duration; i++) {
    let nextDate = new Date(date);
    nextDate.setHours(date.getHours() + i);

    dates.push(nextDate);
  }

  return dates;
}


export function getForecast({latitude, longitude}) {
  return getGridpoints(latitude, longitude)
    .then(getGridForecast);
}

function getGridpoints(latitude, longitude) {
  return fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`,
    NWS_OPTIONS
  ).then(getRelevantAsJson);
}

function getGridForecast({cwa, gridX, gridY}) {
  return fetch(
    `https://api.weather.gov/gridpoints/${cwa}/${gridX},${gridY}`,
    NWS_OPTIONS
  ).then(getRelevantAsJson);
}

function getRelevantAsJson(resp) {
  return resp.json().then((json) => json.properties);
}