import React, { useState,} from 'react';
import Collapse from 'react-bootstrap/Collapse';
import EntitiesList from './utils/EntitiesList';
import CaptureElement from './Capture/CaptureElement';

function Element({ name, _info,elementType}) {
  const [open, setOpen] = useState(false);


  let total_entity_count = 0;

  /*** calculation of total entity count 
   * 
   * TODO: causing error with wrong grammar queries
   * 
   * 
  */

  if (elementType ==="Capture"){
    console.log(_info)
    total_entity_count = 0

  }else{

    if (_info && Object.keys(_info).length > 0) {
      Object.values(_info).forEach((value) => {
  
        /**  calculating total_count */
        /* total_entity_count += value.count || 0; */
        total_entity_count += value.total_count || 0;
      });
    }


  }



 

  /**
   *  entity selection is considered as callback function
   *  selected entites taken back to
   * 
   */

  const style = {
    cursor: "pointer",
    borderRadius: '5px',
    padding: '2px',
    textAlign: 'center',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const countStyle = {
    borderRadius: '50%',
    backgroundColor: '#ccc',
    padding: '5px',
    minWidth: '25px',
    textAlign: 'center',
  };

  return (
    <>
      <div onClick={() => setOpen(!open)} className="m-2" style={style}>
        <span>{name}</span>
        {total_entity_count > 0 && (
          <div style={countStyle}>{total_entity_count}</div>
        )}
      </div>

      {elementType ==="Capture" ? (
        
      <Collapse in={open}>

        <div>{_info && <CaptureElement data={_info}> </CaptureElement>}</div>

      </Collapse>

      ):(<Collapse in={open}>
          <div>{_info && <EntitiesList data={_info}
                                       elementType={elementType}>
                          </EntitiesList>}</div>
        </Collapse>

      )}

      
      
    </>
  );
}

export default React.memo(Element);
