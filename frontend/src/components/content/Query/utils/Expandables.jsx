import React,{useState} from 'react'
import Collapse from 'react-bootstrap/Collapse';
import {FaSquarePlus} from "react-icons/fa6";


function Expandables({name,contentDiv}) {
  
  const [open,setOpen] = useState(false);

  return (
    <>
    <div onClick={()=> setOpen(!open)}
         aria-controls={name}
         aria-expanded={open}
         style={{
         boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add shadow
        }}>

          <table>
            <tr>
              <td style={{paddingBottom:"3px"}}><FaSquarePlus size={12} ></FaSquarePlus></td>
              <td style={{fontSize:"12px",}}>{name}</td>
            </tr>
          </table>
    </div>

    <Collapse in={open}>
      {contentDiv}
    </Collapse>



    </>
  )
}

export default Expandables
