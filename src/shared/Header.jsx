
import { Navbar, Nav,  Container, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

const Header = () => {

    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
  
    const handleLogout = () => {
      logout()
      .then()
      .catch(error => console.log(error))
    };
  


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src="https://i.ibb.co/xhM0hzM/0-0-removebg-preview.png"
                        alt=""
                        style={{ height: '40px', width: '40px' }}
                    />
                    <span className="fw-bold" style={{ color: '#FF5722' }}>Wonder Toy</span>
                </Navbar.Brand>


                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">All Toys</Nav.Link>
                        <Nav.Link href="#">My Toys</Nav.Link>
                        <Nav.Link href="#">Add A Toy</Nav.Link>
                        <Nav.Link href="#">Blogs</Nav.Link>
                    </Nav>
                    <Nav>
            {user && (
              <Nav.Item className="fw-bold text-dark">
                <FaUserCircle style={{ fontSize: '2rem',
            paddingRight: '10px' }} /> {user.name} 
              </Nav.Item>
            )}
            {user ? (
              <Button variant=" rounded-5 text-dark fw-bold" style={{ backgroundColor: '#FF5722' }} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant=" rounded-5 text-dark fw-bold" style={{ backgroundColor: '#FF5722' }}>Login</Button>
              </Link>
            )}
          </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
