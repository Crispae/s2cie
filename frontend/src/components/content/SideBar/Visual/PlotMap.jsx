import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';

function PlotMap({ data }) {
  
  const xLabel = [];
  const yLabel = [];
  const z = [];

  var colorscaleValue = [
    [0, 'white'],
    [1, 'rgba(219, 64, 82, 0.7)'],
  ];

  data.forEach(element => {
    xLabel.push(element.x);
    yLabel.push(element.y);
    z.push([element.value]);
  });

  // Memoize the uniqueXLabels, uniqueYLabels, and zMatrix
  const [uniqueXLabels, uniqueYLabels, zMatrix] = useMemo(() => {
    // Extracting unique X and Y labels
    const uniqueXLabels = Array.from(new Set(xLabel));
    const uniqueYLabels = Array.from(new Set(yLabel));

    // Creating a 2D matrix (zMatrix) based on unique labels and values
    const zMatrix = uniqueYLabels.map((yLabel, rowIndex) =>
      uniqueXLabels.map((xLabel, colIndex) => {
        const dataIndex = data.findIndex(el => el.x === xLabel && el.y === yLabel);
        return dataIndex !== -1 ? data[dataIndex].value : 0;
      })
    );

    return [uniqueXLabels, uniqueYLabels, zMatrix];
  }, [data]);

  var layout = {
    title: "Co-occurence Heat Map plot",
    autosize: false,
    width: 1200,
    height: 400,
    yaxis: {
      automargin: true,
    },
    xaxis: {
      automargin: true,
    }
  };

  const config = { responsive: true };

  const data_plot = [
    {
      x: uniqueXLabels,
      y: uniqueYLabels,
      z: zMatrix,
      hoverinfo: 'z',
      colorscale: colorscaleValue,
      xgap: 2,
      ygap: 2,
      type: 'heatmap',
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot data={data_plot} layout={layout} config={config} />
    </div>
  );
}

export default PlotMap;
