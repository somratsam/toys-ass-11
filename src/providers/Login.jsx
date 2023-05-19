
import { useContext, useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { FcGoogle } from 'react-icons/fc';

import { AuthContext } from './AuthProvider';



const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    console.log('log in page location', location);
    const from = location.state?.from?.pathname || '/'
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
                console.log(loggedUser);
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
        <Container className="w-25 mx-auto mt-5" >
            <h3>Please Login</h3>
            <Form onSubmit={handleLogin}>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <Button variant=" rounded-5 text-dark fw-bold" style={{ backgroundColor: '#FF5722' }} type="submit">
                    Login
                </Button>
                <br />
                <Form.Text>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none fw-bold">
                        Register
                    </Link>
                </Form.Text>
                <br />
                <Form.Text className="fw-bold">Or Login with</Form.Text>
                <Button className="border-0" variant="" onClick={handleGoogleLogin}>
                    <FcGoogle />
                </Button>

                <Form.Text className="text-danger"></Form.Text>
            </Form>
        </Container>

    );
};

export default Login;



