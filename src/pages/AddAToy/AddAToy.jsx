import React, { useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';

const AddAToy = () => {
  const { user } = useContext(AuthContext);
  useTitle('Add A Toy');

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const toyData = {
      pictureUrl: form.pictureUrl.value,
      name: form.name.value,
      sellerName: form.sellerName.value,
      sellerEmail: form.sellerEmail.value,
      subCategory: form.subCategory.value,
      price: parseFloat(form.price.value),
      rating: parseFloat(form.rating.value),
      availableQuantity: parseFloat(form.availableQuantity.value),
      description: form.description.value,
    };

    console.log(toyData);

    fetch('https://toy-server-ass-11.vercel.app:5000/addToy', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(toyData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.insertedId) {
          Swal.fire({
            icon: 'success',
            text: 'Toy added successfully',
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    form.reset();
  };

  return (
    <div className="bg-light py-3" style={{ backgroundColor: 'transparent', marginBottom: '-47px' }}>
      <Container className="mx-auto w-50">
        <h1 className="text-center my-2">Add A Toy</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="pictureUrl">
            <Form.Label>Picture URL of the toy</Form.Label>
            <Form.Control type="text" name="pictureUrl" required />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Toy Name</Form.Label>
            <Form.Control type="text" name="name" required />
          </Form.Group>

          <Form.Group controlId="sellerName">
            <Form.Label>Seller Name</Form.Label>
            <Form.Control type="text" name="sellerName" defaultValue={user?.displayName} />
          </Form.Group>

          <Form.Group controlId="sellerEmail">
            <Form.Label>Seller Email</Form.Label>
            <Form.Control type="email" name="sellerEmail" defaultValue={user?.email} />
          </Form.Group>

          <Form.Group controlId="subCategory">
            <Form.Label>Sub-category</Form.Label>
            <Form.Control as="select" name="subCategory" required>
              <option value="">Select Sub-category</option>
              <option value="Marvel">Marvel</option>
              <option value="Avengers">Avengers</option>
              <option value="Transformers">Transformers</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" step="0.01" required />
          </Form.Group>

          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" name="rating" step="0.1" required />
          </Form.Group>

          <Form.Group controlId="availableQuantity">
            <Form.Label>Available Quantity</Form.Label>
            <Form.Control type="number" name="availableQuantity" step="1" required />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Detail Description</Form.Label>
            <Form.Control as="textarea" name="description" />
          </Form.Group>

          <Button style={{ backgroundColor: '#FF5722' }} className="border-0 rounded-3 pt-2" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddAToy;
