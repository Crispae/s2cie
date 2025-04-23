import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Nav() {
  return (
    <Navbar style={{
                    margin:"3px",
                    borderRadius:"3px",
                    fontSize:"12px",
                    boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.9)"}} className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        <span style={{ fontSize: "16px" }}>
  S<sup style={{ fontSize: "50%", verticalAlign: "super" }}>2</sup>CIE
</span>

      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Nav
