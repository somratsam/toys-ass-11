import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddAToy = () => {
  const [toyData, setToyData] = useState({
    pictureUrl: '',
    name: '',
    sellerName: '',
    sellerEmail: '',
    subCategory: '',
    price: 0,
    rating: 0,
    availableQuantity: 0,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic here
    console.log(toyData);
    // Reset the form
    setToyData({
      pictureUrl: '',
      name: '',
      sellerName: '',
      sellerEmail: '',
      subCategory: '',
      price: 0,
      rating: 0,
      availableQuantity: 0,
      description: '',
    });
  };

  return (
    <div>
      <h1>Add A Toy</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="pictureUrl">
          <Form.Label>Picture URL of the toy</Form.Label>
          <Form.Control
            type="text"
            name="pictureUrl"
            value={toyData.pictureUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={toyData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Include other form fields based on the provided information */}
        {/* Example: Seller Name */}
        <Form.Group controlId="sellerName">
          <Form.Label>Seller Name</Form.Label>
          <Form.Control
            type="text"
            name="sellerName"
            value={toyData.sellerName}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Example: Seller Email */}
        <Form.Group controlId="sellerEmail">
          <Form.Label>Seller Email</Form.Label>
          <Form.Control
            type="email"
            name="sellerEmail"
            value={toyData.sellerEmail}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Example: Sub-category */}
        <Form.Group controlId="subCategory">
          <Form.Label>Sub-category</Form.Label>
          <Form.Control
            as="select"
            name="subCategory"
            value={toyData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Sub-category</option>
            <option value="Math Toys">Math Toys</option>
            <option value="Language Toys">Language Toys</option>
            <option value="Science Toys">Science Toys</option>
          </Form.Control>
        </Form.Group>

        {/* Include other form fields based on the provided information */}
        {/* Example: Price */}
        {/* Example: Rating */}
        {/* Example: Available Quantity */}
        {/* Example: Detail Description */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddAToy;
