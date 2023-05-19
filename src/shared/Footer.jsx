
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer mt-5 bg-dark text-white">
            <Container className='mx-auto w-100 '>
                <Row className=' pt-4'>
                    <Col md={4} sm={6}>
                        <h3>About</h3>
                        <p className='text-start'>
                            <small> Welcome to The Endless Meal, your ultimate destination for delicious and inspiring food recipes. We are passionate about creating and sharing mouthwatering dishes that are not only satisfying but also easy to prepare.</small>
                        </p>

                    </Col>
                    <Col md={4} sm={6}>
                        <h3>Contact Us</h3>
                        <p > <strong>Email:</strong> <small>somratsam2@gmail.com</small> <br />
                            <strong> Phone:</strong> <small>+968 93876228</small> <br />
                            <strong> Address:</strong> <small>23 Main Street, California, USA</small> </p>
                    </Col>
                    <Col md={4} sm={12}>
                        <h3>Follow Us</h3>
                        <ul className="social-icons list-unstyled">
                            <li>
                                <a className='text-decoration-none' href="https://www.facebook.com/profile.php?id=100004894309114" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF /> Abdul Aziz
                                </a>
                            </li>
                            <li>
                                <a className='text-decoration-none' href="https://twitter.com/AbdulAz78635266">
                                    <FaTwitter /> Abdul Aziz
                                </a>
                            </li>
                            <li>
                                <a className='text-decoration-none' href="https://www.instagram.com/sanjusomrat/">
                                    <FaInstagram /> Sanju Somrat
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <p className="text-center pb-4">
                Copyright &copy; 2023 Wonder Toy. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
