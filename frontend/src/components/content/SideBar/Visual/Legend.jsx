import React from 'react';

function Legend() {
  const legendItems = [
    { label: 'Gene', color: '#6FB1FC', shape: 'ellipse' },
    { label: 'Chemical', color: '#F5A45D', shape: 'hexagon' },
    { label: 'Disease', color: '#E84A5F', shape: 'triangle' },
    { label: 'Cell Type', color: '#8E44AD', shape: 'rectangle' },
    { label: 'Cell Line', color: '#3498DB', shape: 'round-rectangle' },
    { label: 'Species', color: '#2ECC71', shape: 'diamond' },
  ];

  const legendStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
    zIndex: 10
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  };

  const legendColorStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    borderRadius: '50%'
  };

  return (
    <div style={legendStyle}>
      {legendItems.map(item => (
        <div key={item.label} style={legendItemStyle}>
          <div style={{ ...legendColorStyle, backgroundColor: item.color }}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
