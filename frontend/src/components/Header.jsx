import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

import { useNavigate } from 'react-router-dom';


const Header = () => {


  return (
    <header>
      <Navbar bg='black' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
            <Navbar.Brand>MERN Auth</Navbar.Brand>
       </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              
                
                  <NavDropdown  id='username'>
                  <LinkContainer to='/coupon'>
                      <NavDropdown.Item>Owe Coupon</NavDropdown.Item>
                      </LinkContainer >
                    <NavDropdown.Item >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                
             
               
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                 
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                 
            
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;