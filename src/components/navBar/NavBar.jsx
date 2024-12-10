import React from "react";
import { Wrapper } from "./NavBar.style";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

const NavBar = ({ topics, topicsRoute }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      {topics[0] == null ? (
        <Wrapper>
          <Navbar.Brand>Internáutica CRM</Navbar.Brand>
        </Wrapper>
      ) : (
        <Wrapper>
          <Navbar.Brand href="#home">Internáutica CRM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {topics.map((topic, index) => (
                <>
                  <Nav.Link href={topicsRoute[index]}>{topic}</Nav.Link>
                </>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Wrapper>
      )}
    </Navbar>
  );
};

export default NavBar;
