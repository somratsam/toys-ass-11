import { Navbar, Nav, Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import { Link} from 'react-router-dom';
import { useContext } from 'react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <Navbar  >
      <Container >
        <Navbar.Brand>
          <img src="https://i.ibb.co/xhM0hzM/0-0-removebg-preview.png" alt="" style={{ height: '40px', width: '40px' }} />
          <span className="fw-bold" style={{ color: '#FF5722' }}>
            Wonder Toy
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/all-toys">All Toys</Nav.Link>
            {user && <Nav.Link as={Link} to="/my-toys">My Toys</Nav.Link>}
            {user && <Nav.Link as={Link} to="/add-a-toy">Add Toy</Nav.Link>}
            <Nav.Link as={Link} to="/blog">Blogs</Nav.Link>
          </Nav>
          <Nav>
            {user && (
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-user">{user.displayName}</Tooltip>}>
                <Nav.Item>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" style={{ height: '2rem', width: '2rem', borderRadius: '50%' }} />
                  ) : (
                    <FaUserCircle style={{ fontSize: '2rem', paddingRight: '10px', cursor: 'pointer' }} />
                  )}
                </Nav.Item>
              </OverlayTrigger>
            )}
            {user ? (
              <Button variant=" rounded-5 text-light " style={{ backgroundColor: '#FF5722' }} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant=" rounded-5 text-light" style={{ backgroundColor: '#FF5722' }}>
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
