import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

function ErrorDisplay({ message }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '300px',
          width: '500px',
          border: '1px solid #ccc',
          background: '#f4f4f4',
          fontSize: '24px',
          color: '#333',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding shadow
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <FaExclamationCircle style={{ marginRight: '10px' }} /> An error occurred:
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default ErrorDisplay;