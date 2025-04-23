import React from 'react';
import { HiServer } from 'react-icons/hi';
import { TbServerBolt } from "react-icons/tb";
import { Collapse } from 'react-bootstrap';

function IndexServer() {
  const [isExpanded, setExpanded] = React.useState(false);

  const iconStyle = {
    fontSize: '30px',
    cursor: 'pointer',
    color: '#007BFF',
    marginRight: '5px',
  };

  const smallIconStyle = {
    fontSize: '25px',
    cursor: 'pointer',
    color: 'green',
    marginRight: '5px',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '3px',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    cursor: 'pointer',
  };

  const headingStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '8px',
  };

  const servers = ["Server 1",
                   "Server 2",
                   "Server 3",
                   "Server 4",
                   "Server 5",
                   "Server 6"
]



  return (
    <div>
      <div style={containerStyle} onClick={() => setExpanded(!isExpanded)}>
        <HiServer size={30} style={iconStyle} />
        <h3 style={headingStyle}>Node Servers</h3>
      </div>

      <Collapse in={isExpanded}>
        <div >
          {/* Render your list of servers here */}
        {
            servers.map((server,index)=>{
                return (<div key={index} style={{display:"flex",marginLeft:"10px"}}>
                <TbServerBolt size={20} style={smallIconStyle} />
                    <h3 style={headingStyle}>{server}</h3>
                    <hr />
            </div>)

            })

        }
            

          
          {/* Add more servers as needed */}

        </div>
      </Collapse>
    </div>
  );
}

export default IndexServer;
