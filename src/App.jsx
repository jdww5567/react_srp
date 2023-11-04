import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

import './App.css'

const generateChartData = (A, B, chartLength) => {
  let arithmeticGData = [A];
  let geometricAData = [B];
  let harmonicGData = [A];
  let geometricHData = [B];
  let labels = [];

  for (let i = 1; i <= chartLength; i++) {
    arithmeticGData[i] = (arithmeticGData[i-1] + geometricAData[i-1]) / 2;
    geometricAData[i] = Math.sqrt(arithmeticGData[i-1] * geometricAData[i-1]);
    harmonicGData[i] = 2 * (harmonicGData[i-1] * geometricHData[i-1]) / (harmonicGData[i-1] + geometricHData[i-1]);
    geometricHData[i] = Math.sqrt(harmonicGData[i-1] * geometricHData[i-1]);
  }

  let arithmeticMean = [arithmeticGData[1]];
  let geometricMean = [geometricAData[1]];
  let harmonicMean = [harmonicGData[1]];

  for (let i = 0; i <= chartLength; i++) {
    labels[i] = i;
    arithmeticMean[i + 1] = arithmeticMean[i];
    geometricMean[i + 1] = geometricMean[i];
    harmonicMean[i + 1] = harmonicMean[i];
  }

  return {
    labels: labels,
    datasets: [
      {
        label: 'Arithmetic-G Sequence',
        data: arithmeticGData,
        backgroundColor: 'rgba(70, 100, 160, 0.2)',
        borderColor: 'rgba(70, 100, 160, 1)',
        borderWidth: 1
      },
      {
        label: 'Geometric-A Sequence',
        data: geometricAData,
        backgroundColor: 'rgba(200, 75, 100, 0.2)',
        borderColor: 'rgba(200, 75, 100, 1)',
        borderWidth: 1
      },
      {
        label: 'Harmonic-G Sequence',
        data: harmonicGData,
        backgroundColor: 'rgba(130, 140, 86, 0.2)',
        borderColor: 'rgba(130, 140, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Geometric-H Sequence',
        data: geometricHData,
        backgroundColor: 'rgba(200, 80, 88, 0.2)',
        borderColor: 'rgba(200, 80, 88, 1)',
        borderWidth: 1
      },
      {
        label: 'Arithmetic Mean',
        data: arithmeticMean,
        backgroundColor: 'rgba(45, 112, 176, 0.2)',
        borderColor: 'rgba(45, 112, 176, 1)',
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'Geometric Mean',
        data: geometricMean,
        backgroundColor: 'rgba(228, 63, 90, 0.2)',
        borderColor: 'rgba(228, 63, 90, 1)',
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'Harmonic Mean',
        data: harmonicMean,
        backgroundColor: 'rgba(117, 168, 84, 0.2)',
        borderColor: 'rgba(117, 168, 84, 1)',
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };
};

function App() {
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  const [chartData, setChartData] = useState(generateChartData(A, B));
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
          onChange = {(event) => setA(Math.abs(Number(event.target.value)))}
        />
        <input
          type="number"
          defaultValue={B}
          onChange = {(event) => setB(Math.abs(Number(event.target.value)))}
        />
        <input
          type="number"
          defaultValue={chartLength}
          onChange = {(event) => setChartLength(Math.abs(Number(event.target.value)))}
        />
      </div>
      <div className='centeredContainer'>
        <div className='chartContainer'>
          <Line data={chartData}/>
        </div>
      </div>
    </>
  );
}

export default App
