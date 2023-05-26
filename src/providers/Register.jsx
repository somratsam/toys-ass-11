import React, { useContext, useState } from 'react';
import { Button, Container, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import app from '../firebase/firebase.config';
import useTitle from '../hooks/useTitle';

const Register = () => {
  const { setUserAndName, setUserAndPhoto } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  useTitle('Registration')

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long');
      return;
    } else {
      setErrorMessage('');
    }

    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const createdUser = result.user;
        updateProfile(createdUser, { displayName: name, photoURL: photo })
          .then(() => {
            setUserAndName(createdUser, name, photo);
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'You have successfully registered.',
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='bg-light py-1' style={{ backgroundColor: "transparent", marginBottom: "-47px" }}>
      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} className='card shadow border-0 p-3'>
            <h3 className='text-center'>Please Register</h3>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name="name" placeholder="Your name" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control type="text" name="photo" placeholder="photo url" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" required />
                {errorMessage && <Form.Text className="text-danger fw-bold">{errorMessage}</Form.Text>}
              </Form.Group>

              <Button variant="light rounded-5 text-light" type="submit" style={{ backgroundColor: '#FF5722' }}>
                Register
              </Button>
              <br />
              <Form.Text className="text-dark fw-bold">
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none fw-bold">
                  Login
                </Link>
              </Form.Text>
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <img className="w-100" src="https://i.ibb.co/K57FmWp/loginimg.webp" alt="Registration Image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
