import React from 'react';
import { Navbar, Container, Image } from 'react-bootstrap';
import Logo from 'assets/logo.webp';

const NavbarComponent = () => (
  <Navbar expand="lg">
    <Container fluid>
      <Navbar.Brand href="/" className='align-items-center d-flex'>
        <Image
          src={Logo}
          alt="Markdown Editor logo"
          style={{
            objectFit: "contain",
            width: "90px",
            mixBlendMode: 'multiply'
          }}
        />
        <span className='orange-text-gradient fw-bold' style={{ fontSize: "25px" }}>
          Markdown Editor
        </span>
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavbarComponent;