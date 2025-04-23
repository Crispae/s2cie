import React from 'react';
import Plot from 'react-plotly.js';

function ScorePlot({scoredResponse}) {

  // Check if scoredResponse is not available
  if (!scoredResponse) {
    // Return an empty plot
    return (
      <Plot
        data={[]}  // Empty data array
        layout={{ title: 'Score Density Plot' }}
        config={{ responsive: true }}
      />
    );
  }

  // Convert scoredResponse object into an array of { id, score }
  const data = Object.entries(scoredResponse).map(([id, score]) => ({ id, score }));

  // Create a histogram for the scores
  const layout = {
    title: 'Score Density Plot',
  };

  const dataForPlot = [
    {
      y: data.map(entry => entry.score),
      type: 'violin',
      name: 'Score Density',
      box: {
        visible: true
      },
      boxpoints: false,
      line: {
        color: 'black'
      },
      fillcolor: '#8dd3c7',
      meanline: {
        visible: true
      },
      marker: {
        color: 'rgba(219, 64, 82, 0.7)',
      },
    },
  ];

  const config = { responsive: true };

  return (
    <Plot
      data={dataForPlot}
      layout={layout}
      config={config}
    />
  );
}

export default ScorePlot;
