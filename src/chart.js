import React from 'react';
import {
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory';

import { validTimeToDates } from './nws-api';
import { convert } from './convert';
import { getMidnightDateOrTime } from './date-helpers'

const WX_TYPES = {
  temperature: convert.fToC,
}

// startTime and endTime define a non-inclusive interval.
function getData(forecastEntries, startTime, endTime, conversion = (val) => val) {
  const data = [];
	
  for (const { validTime, value } of forecastEntries) {
    let times = validTimeToDates(validTime);
    let y = conversion(value);

    for (const time of times) {
      if (time > startTime && time < endTime) {
        data.push({ x: time, y: y });
      }
    }
  }

  return data;
}

export function getAllData(forecast, startTime, endTime) {
	const data = {};
	for (const [wxType, conversion] of Object.entries(WX_TYPES)) {
		data[wxType] = getData(forecast[wxType].values, startTime, endTime, conversion);
	}

	return data;
}

export function ForecastChart({ forecast, startTime, endTime }) {
	if (!forecast) {
		return 'Loading';
	}

	const data = getAllData(forecast, startTime, endTime);
	return (
		<VictoryChart
		  scale={{ x: 'time' }}
		  domainPadding={{ x: 6 }}
		  padding={{
		    top: 25, bottom: 50, left: 50, right: 75,
		  }}
		  containerComponent={
		    <VictoryVoronoiContainer
		      voronoiDimension='x'
		      labels={() => null} // Otherwise Cursor is not displayed.
		      labelComponent={<Cursor />}
		    />
		  }
		>
			<VictoryAxis
			  tickCount={6}
			  tickFormat={getMidnightDateOrTime}
			  style={{
			    ticks: { stroke: 'black', size: 5 },
			    tickLabels: { fontSize: 9 },
			    grid: { stroke: 'grey' },
			  }}
			  offsetY={50}
			  key='independent'
			/>
			<VictoryAxis
			  dependentAxis
			  crossAxis={false}
			  axisLabelComponent={<VictoryLabel dx={-15} angle={0} />}
			  label={'°F'}
			  style={{
			    grid: { stroke: 'grey' },
			    tickLabels: { fontSize: 9 },
			  }}
			  key='dependent'
			/>
			<VictoryLine
			  data={data.temperature}
			/>
		</VictoryChart>
	);
}

function Cursor({ x, scale }) {
  const range = scale.y.range();
  return (
    <line
      style={{
        stroke: 'lightgrey',
        strokeWidth: 1,
      }}
      x1={x}
      x2={x}
      y1={Math.max(...range)}
      y2={Math.min(...range)}
    />
  );
}