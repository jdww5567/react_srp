import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import './App.css';

function sum(nums, pow) {
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += Math.pow(nums[i], pow);
  }

  return sum;
}

const generateChartData = (nums, iterations, pDomain, sequenceP) => {
  let xDomain = [];
  let yDomain = [];
  let j_p_sequence = [[]];
  let p_j_sequence = [[]];

  for (let i = -pDomain; i <= pDomain; i++) {
    yDomain.push(i);
  }
  
  for (let i = 0; i <= iterations; i++) {
    xDomain.push(i);
    for (let j = 0; j <= 2 * pDomain; j++) {
      if (j == pDomain) {
        if (sequenceP == 0) {
          if (i == 0) {
            j_p_sequence[j] = [Math.pow(nums.reduce((a,b) => a*b), 1/nums.length)];
            p_j_sequence[j] = [Math.pow(nums.reduce((a,b) => a*b), 1/nums.length)];
          } else {
            j_p_sequence[j].push(Math.pow(j_p_sequence[j][i - 1] * p_j_sequence[j][i - 1], 1/2));
            p_j_sequence[j].push(Math.pow(p_j_sequence[j][i - 1] * j_p_sequence[j][i - 1], 1/2));
          }
        } else {
          if (i == 0) {
            j_p_sequence[j] = [Math.pow(nums.reduce((a,b) => a*b), 1/nums.length)];
            p_j_sequence[j] = [Math.pow((1/nums.length)*(sum(nums, sequenceP)), 1/sequenceP)];
          } else {
            j_p_sequence[j].push(Math.pow(j_p_sequence[j][i - 1] * p_j_sequence[j][i - 1], 1/2));
            p_j_sequence[j].push(Math.pow((1/2)*(Math.pow(p_j_sequence[j][i - 1], sequenceP) + Math.pow(j_p_sequence[j][i - 1], sequenceP)), 1/sequenceP));
          }
        }
      } else {
        if (sequenceP == 0) {
          if (i == 0) {
            j_p_sequence[j] = [Math.pow((1/nums.length)*(sum(nums, j - pDomain)), 1/(j-pDomain))];
            p_j_sequence[j] = [Math.pow(nums.reduce((a,b) => a*b), 1/nums.length)];
          } else {
            j_p_sequence[j].push(Math.pow((1/2)*(Math.pow(p_j_sequence[j][i - 1], j- pDomain) + Math.pow(j_p_sequence[j][i - 1], j - pDomain)), 1/(j - pDomain)));
            p_j_sequence[j].push(Math.pow(p_j_sequence[j][i - 1] * j_p_sequence[j][i - 1], 1/2));
          }
        } else {
          if (i == 0) {
            j_p_sequence[j] = [Math.pow((1/nums.length)*(sum(nums, j - pDomain)), 1/(j- pDomain))];
            p_j_sequence[j] = [Math.pow((1/nums.length)*(sum(nums, sequenceP)), 1/sequenceP)];
          } else {
            j_p_sequence[j].push(Math.pow((1/2)*(Math.pow(p_j_sequence[j][i - 1], j - pDomain) + Math.pow(j_p_sequence[j][i - 1], j - pDomain)), 1/(j - pDomain)));
            p_j_sequence[j].push(Math.pow((1/2)*(Math.pow(p_j_sequence[j][i - 1], sequenceP) + Math.pow(j_p_sequence[j][i - 1], sequenceP)), 1/sequenceP));
          }
        }
      }
    }
  }

  return {
    data: [
      {
        type: 'surface',
        name: 'M_p-M_' + sequenceP + ' Seq.',
        colorscale: 'Viridis',
        colorbar: {
          x: '-0.25'
        },
        x: xDomain,
        y: yDomain,
        z: j_p_sequence
      },
      {
        type: 'surface',
        name: 'M_' + sequenceP + '-M_p Seq.',
        colorscale: 'Cividis',
        x: xDomain,
        y: yDomain,
        z: p_j_sequence
      }
    ]
  };
};

const generateChartLayout = (w, h) => {
  return{
    width: w,
    height: h,
    scene: {
      aspectmode: 'automatic',
      xaxis: {
        title: 'Iteration'
      },
      yaxis: {
        title: 'P'
      },
      zaxis: {
        title: 'Value'
      },
    },
    legend: {
      orientation: 'h'
    }
  };
};

function App() {
  const [nums, setNums] = useState([1, 2, 3]);
  const [iterations, setIterations] = useState(4);
  const [pDomain, setPDomain] = useState(4);
  const [sequenceP, setSequenceP] = useState(4);
  const [chartData, setChartData] = useState(generateChartData(nums, iterations, pDomain, sequenceP));
  const [chartLayout, setChartLayout] = useState(generateChartLayout(0, 0));

  useEffect(() => {
    setChartData(generateChartData(nums, iterations, pDomain, sequenceP));
  }, [nums, iterations, pDomain, sequenceP]);

  useEffect(() => {
    const updateSize = () => {
      setChartLayout(generateChartLayout(window.innerWidth, 
        window.innerHeight - document.getElementById('inputs').clientHeight));
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <>
      <div id="gm" className='centeredContainer'>
        <a href="https://en.wikipedia.org/wiki/Generalized_mean">What is the Generalized Mean?</a>
      </div>
      <div id="agm" className='centeredContainer'>
        <a href="https://en.wikipedia.org/wiki/Arithmetic%E2%80%93geometric_mean">What is the Arithmetic-Geometric Mean?</a>
      </div>
      <div id="ex" className='centeredContainer'>
        Example: In this graph, the AGM would be the limit as Iteration goes to infinity, for a value of 1 for P, and 0 for the chosen p (or vice versa).
      </div>
      <div id="pos" className='centeredContainer'>
        All inputs should be positive.
      </div>
      <div id="inputs" className='centeredContainer'>
        <label htmlFor="numsInput">
          Numbers to average:
        </label>
        <input
          type="text"
          id="numsInput"
          defaultValue={nums}
          onChange={(event) => setNums((event.target.value).split(/[ ,]+/).map(Number).map(n => Math.abs(n)))}
        />
        <label htmlFor="iterInput">
          Number of recursive iterations:
        </label>
        <input
          type="number"
          id="iterInput"
          defaultValue={iterations}
          onChange={(event) => setIterations(Math.abs(Number(event.target.value)))}
        />
        <label htmlFor="pInput">
          Bounds for P:
        </label>
        <input
          type="number"
          id="pInput"
          defaultValue={pDomain}
          onChange={(event) => setPDomain(Math.abs(Number(event.target.value)))}
        />
        <label htmlFor="refInput">
          Chosen p:
        </label>
        <input
          type="number"
          id="refInput"
          defaultValue={sequenceP}
          onChange={(event) => setSequenceP(Number(event.target.value))}
        />
      </div>
      <div className='centeredContainer'>
        <Plot data={chartData.data} layout={chartLayout}/>
      </div>  
    </>
  );
}

export default App;