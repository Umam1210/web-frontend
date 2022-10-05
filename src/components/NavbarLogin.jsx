import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import icon from '../image/Icon2.png'
import Tooltip from './Tooltip';


import "bootstrap/dist/css/bootstrap.min.css";
import { Link,} from "react-router-dom";

function Navbarlogin() {

    return (
        <div className='sticky-top d-flex'>
        <Navbar collapseOnSelect expand="lg" bg="" variant="" style={{backgroundColor:"#F2F2F2"}} className="w-100">
            <Container>
                <Navbar.Brand >
                    <Link to="/home">
                    <img src={icon} alt="" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} >
                     <Tooltip />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    )
}

export default Navbarlogin