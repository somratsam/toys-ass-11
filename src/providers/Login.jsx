import { useEffect, useContext, useState } from 'react';
import { Button, Container, Form, Alert, Col, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from './AuthProvider';
import useTitle from '../hooks/useTitle';

const Login = () => {
  const { signIn, setUserAndName, setUserAndPhoto } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useTitle('Login')


  const from = location.state?.from || { pathname: '/' };


  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        const name = loggedUser.displayName;
        const photoURL = loggedUser.photoURL;
        setUserAndName(loggedUser, name, photoURL);
        setErrorMessage('');
        navigate(from, { replace: true })
      })
      .catch((error) => {
        setErrorMessage('Invalid email or password');
        console.log(error);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='bg-light py-1' style={{ backgroundColor: "transparent", marginBottom: "-47px" }}>
      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} className='card shadow border-0 p-3' >
            <h3 className='text-center'>Login</h3>
            <Form onSubmit={handleLogin}>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required />
              </Form.Group>
              <Button variant="light rounded-5 text-light" type="submit" style={{ backgroundColor: '#FF5722' }}>
                Login
              </Button>
              <br />
              <Form.Text className='text-dark fw-bold'>
                Do not have an account?{' '}
                <Link to="/register" className="text-decoration-none fw-bold">
                  Register
                </Link>
              </Form.Text>
              <br />
              <Form.Text className="fw-bold text-dark">Or Login with</Form.Text>
              <Button className="border-0" variant="light " onClick={handleGoogleLogin}>
                <FcGoogle />
              </Button>
              <Form.Text className="text-danger"></Form.Text>
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <img className="w-100" src="https://i.ibb.co/K57FmWp/loginimg.webp" alt="Login Image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;













