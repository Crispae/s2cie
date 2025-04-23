import React from 'react'

function Footer() {

  const style = {
  margin:"3px",
  fontSize:"12px",
  boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.9)"}

  return (
    <footer style={style} 
    
    className="page-footer font-small blue pt-2">

    <div className="footer-copyright  py-3" style={{textAlign:"left",padding:"10px"}}> 

    <span style={{ fontSize: "16px" }}><b>S<sup>2</sup>CIE</b></span> is developed by <a href="https://www.tecnatox.cat/">TecnaTox Lab</a> and <a href="https://www.iispv.cat/">Institut d'Investigació Sanitària Pere Virgili (IISPV)</a>. <b>S<sup>2</sup>CIE</b> development was supported by project <a href="https://www.eu-parc.eu/">Partnership for the Assessment Of risk from Chemicals (PARC)</a> funded by the European Union's Horizon Europe research and innovation Programme under <b>Grant Agreement No. 101057014</b>.
        
        <span style={{textAlign:"center"}}>
        <p>Point of contact: saurav kumar (<span><b>saurav.kumar[AT]iispv.cat</b></span>)</p>
        <p>&copy; <b>IISPV. All rights reserved.</b></p>
          </span>



  
    </div>

</footer>
  )
}

export default Footer
