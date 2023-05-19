
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">
                   
                    {' Wonder Toy'}
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
                        <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
