import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import './App.css';

const generateChartData = (A, B, chartLength) => {
  let arithmeticGData = [A];
  let geometricAData = [B];
  let harmonicGData = [A];
  let geometricHData = [B];
  let labels = [];

  for (let i = 1; i <= chartLength; i++) {
    arithmeticGData[i] = (arithmeticGData[i - 1] + geometricAData[i - 1]) / 2;
    geometricAData[i] = Math.sqrt(arithmeticGData[i - 1] * geometricAData[i - 1]);
    harmonicGData[i] = (2 * harmonicGData[i - 1] * geometricHData[i - 1]) / (harmonicGData[i - 1] + geometricHData[i - 1]);
    geometricHData[i] = Math.sqrt(harmonicGData[i - 1] * geometricHData[i - 1]);
    labels.push(i - 1);
  }
  labels.push(chartLength);

  let zeroes = Array(chartLength + 1).fill(0);

  let arithmeticMean = Array(2).fill(arithmeticGData[1]);
  let geometricMean = Array(2).fill(geometricAData[1]);
  let harmonicMean = Array(2).fill(harmonicGData[1]);

  let chartBoundsX = [0, chartLength];
  let chartBoundsY = [0, 0];

  return {
    x: labels,
    data: [
      {
        type: 'scatter3d',
        mode: 'lines+markers',
        name: 'Arithmetic-G Sequence',
        x: labels,
        y: zeroes,
        z: arithmeticGData,
        line: { color: 'rgba(70, 100, 160, 1)' },
      },
      {
        type: 'scatter3d',
        mode: 'lines+markers',
        name: 'Geometric-A Sequence',
        x: labels,
        y: zeroes,
        z: geometricAData,
        line: { color: 'rgba(200, 75, 100, 1)' }
      },
      {
        type: 'scatter3d',
        mode: 'lines+markers',
        name: 'Harmonic-G Sequence',
        x: labels,
        y: zeroes,
        z: harmonicGData,
        line: { color: 'rgba(130, 140, 86, 1)' }
      },
      {
        type: 'scatter3d',
        mode: 'lines+markers',
        name: 'Geometric-H Sequence',
        x: labels,
        y: zeroes,
        z: geometricHData,
        line: { color: 'rgba(200, 80, 88, 1)' }
      },
      {
        type: 'scatter3d',
        mode: 'lines',
        name: 'Arithmetic Mean',
        x: chartBoundsX, 
        y: chartBoundsY, 
        z: arithmeticMean, 
        line: { color: 'blue' }

      },
      {
        type: 'scatter3d',
        mode: 'lines',
        name: 'Geometric Mean',
        x: chartBoundsX,
        y: chartBoundsY,
        z: geometricMean,
        line: { color: 'red' }
      },
      {
        type: 'scatter3d',
        mode: 'lines',
        name: 'Harmonic Mean',
        x: chartBoundsX, 
        y: chartBoundsY, 
        z: harmonicMean, 
        line: { color: 'green' }
      },
    ],
  };
};

const chartLayout = {
    scene: {
      aspectmode: 'manual',
      aspectratio: { x: 1, y: 1, z: 0.5 },
      xaxis: {
        title: 'Iteration'
      },
      yaxis: {
        title: 'Real'
      },
      zaxis: {
        title: 'Complex'
      }
    },
    legend: {
      orientation: 'h'
    }
};

function App() {
  const [A, setA] = useState(1);
  const [B, setB] = useState(1);
  const [chartData, setChartData] = useState(generateChartData(A, B, 4));
  const [chartLength, setChartLength] = useState(4);

  useEffect(() => {
    setChartData(generateChartData(A, B, chartLength));
  }, [A, B, chartLength]);

  return (
    <>
      <div className='centeredContainer'>
        <input
          type="number"
          defaultValue={A}
          onChange={(event) => setA(Number(event.target.value))}
        />
        <input
          type="number"
          defaultValue={B}
          onChange={(event) => setB(Number(event.target.value))}
        />
        <input
          type="number"
          defaultValue={chartLength}
          onChange={(event) => setChartLength(Math.abs(Number(event.target.value)))}
        />
      </div>
      <div className='centeredContainer'>
        <Plot id='stfu' data={chartData.data} layout={chartLayout} />
      </div>
    </>
  );
}

export default App;