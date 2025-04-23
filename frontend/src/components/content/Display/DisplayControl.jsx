import React from 'react';
import ControllerButton from './DisplayUtils/ControllerButton';
import ControllerInfo from './DisplayUtils/ControllerInfo';
import OptionsButton from './DisplayUtils/Optionsbutton';

function DisplayControl() {


  const containerStyle = {
    border: '1px solid lightgray',
    height: '100%',
    width: '100%',
    display: 'flex',
    marginBottom: '5px',
    padding: '6px',
    borderRadius: '4px',
    fontSize: '12px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  };

  const leftContentStyle = {
    display: 'flex', // Create a horizontal layout
    alignItems: 'center', // Vertically center items
  };

  const rightContentStyle = {
    marginLeft: 'auto', // Push content to the right
    alignItems: 'center', // Vertically center items
  };

  const options = {
                  1:"Download all",
                  2:"Download upvoted",
                  3:"Download downvoted"}

  return (
    <div style={containerStyle}>
      <div style={leftContentStyle}>

        {/**
         *  Add controller buttons here
         */}

        <ControllerButton name={'Load'} />
        <ControllerButton name={'Stop'} />
        <OptionsButton name={"download"} options={options}></OptionsButton>
      </div>

      <div style={rightContentStyle}>
        {/**
         * In the extreme right, add count and timer label as well to show
         * the count of documents and time elapsed in processing the document.
         */}
        <ControllerInfo />
      </div>
    </div>
  );
}

export default DisplayControl;
