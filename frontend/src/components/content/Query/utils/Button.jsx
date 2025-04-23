import React from 'react'
// Handles the submission of query to the backend

function Button({event}) {

    const style = {
                    background:"white",
                    height:"30px",
                    width:"80px",
                    textAlign:"center",
                    marginTop:"10px",
                    fontSize:"12px",
                    position:"relative",
                    borderRadius:"4px",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Add shadow
                    cursor:"pointer",
                  }




    //TODO: Event will be taken as prop from each search
  return (
   

        <button 
        onClick={event}
                style={style}>
                     submit
        </button>

  
  )
}

export default Button
