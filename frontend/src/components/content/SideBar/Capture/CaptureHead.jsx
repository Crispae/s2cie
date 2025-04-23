import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import IndividualCaptureElement from './IndividualCaptureElement';

function CaptureHead({ name, data }) {
  const [open, setOpen] = useState(false);

  /**
   * 
   */
  const headStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    justifyContent: 'space-between',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '5px',
    margin: '3px 0',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  };

  const listContainerStyle = {
    maxHeight: '500px', // Fixed height
    overflowY: 'auto', // Enable vertical scroll
    overflowX: 'hidden', // Disable horizontal scroll
    position: 'relative',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };

  const Row = ({index,style}) =>{

    const key = Object.keys(data)[index];

    return (
      <div style={style}>
        <IndividualCaptureElement name={key} data={data[key]}></IndividualCaptureElement>
      </div>
    );
  };


  return (
    <>
      <div style={headStyle} onClick={() => setOpen(!open)}>
        {name}
      </div>

      <Collapse in={open}>

        <div style={listContainerStyle}>
            <List

            height={500}
            itemCount={Object.keys(data).length}
            itemSize={50}
            width={"100%"}
            >

                {Row}
            </List>
        </div>

      </Collapse>
    </>
  );
}

export default CaptureHead;
