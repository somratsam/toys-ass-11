import { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

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

    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        console.log(createdUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="w-100 d-flex justify-content-center mt-5 ">
      <div className="w-100 card shadow border-0 p-4" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-4 fw-bold"> SignUp</h3>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" name="name" placeholder="Your name" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control type="text" name="photo" placeholder="Photo URL" required />
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

          <Button variant="light rounded-5 text-dark fw-bold" type="submit" style={{ backgroundColor: '#FF5722' }}>
            Register
          </Button>
          <br />
          <Form.Text className="text-center mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none fw-bold">
              Login
            </Link>
          </Form.Text>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
