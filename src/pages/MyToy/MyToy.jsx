import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

const MyToy = () => {
  const { user } = useContext(AuthContext);
  const [myToy, setMyToy] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedToy, setSelectedToy] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const url = `http://localhost:5000/addToy?email=${user?.sellerEmail}`;
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setMyToy(data));
  }, []);

  const handleUpdate = toy => {
    setSelectedToy(toy);
    setUpdatedPrice(toy.price);
    setUpdatedQuantity(toy.availableQuantity);
    setUpdatedDescription(toy.description);
    setShowModal(true);
  };

  const handleUpdateSubmit = () => {
    const updatedToy = {
      ...selectedToy,
      price: updatedPrice,
      availableQuantity: updatedQuantity,
      description: updatedDescription
    };

    // Update the toy in the list
    const updatedToyList = myToy.map(toy => {
      if (toy._id === selectedToy._id) {
        return updatedToy;
      }
      return toy;
    });

    setMyToy(updatedToyList);
    setShowModal(false);
    setUpdatedPrice('');
    setUpdatedQuantity('');
    setUpdatedDescription('');
  };

  const handleDelete = toyId => {
    const confirmDelete = window.confirm('Are you sure you want to delete this toy?');
    if (confirmDelete) {
      // Delete the toy from the list
      const updatedToyList = myToy.filter(toy => toy._id !== toyId);
      setMyToy(updatedToyList);
    }
  };

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Seller Name</th>
            <th>Seller Email</th>
            <th>Sub-category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Available Quantity</th>
            <th>Detail Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myToy.map(toy => (
            <tr key={toy._id}>
              <td>
                <img src={toy.pictureUrl} alt={toy.name} className="img-fluid" style={{ height: '100px' }} />
              </td>
              <td>{toy.name}</td>
              <td>{toy.sellerName}</td>
              <td>{toy.sellerEmail}</td>
              <td>{toy.subCategory}</td>
              <td>{toy.price}</td>
              <td>{toy.rating}</td>
              <td>{toy.availableQuantity}</td>
              <td>{toy.description}</td>
              <td>
                <Button variant="primary" onClick={() => handleUpdate(toy)}>
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(toy._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Toy Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={updatedPrice}
                onChange={e => setUpdatedPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Available Quantity</Form.Label>
              <Form.Control
                type="text"
                value={updatedQuantity}
                onChange={e => setUpdatedQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Detail Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedDescription}
                onChange={e => setUpdatedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyToy;
