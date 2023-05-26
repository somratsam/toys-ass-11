import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Container, Table, Button, Modal, Form, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';




const MyToy = () => {
  const { user } = useContext(AuthContext);
  const [myToy, setMyToy] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedToy, setSelectedToy] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  useTitle('My Toys')

  const url = `http://localhost:5000/addToy?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setMyToy(data));
  }, [user]);

  const handleUpdate = toy => {
    setSelectedToy(toy);
    setUpdatedPrice(toy.price);
    setUpdatedQuantity(toy.availableQuantity);
    setUpdatedDescription(toy.description);
    setShowModal(true);
  };

  const handleUpdateSubmit = () => {
    const updatedToy = {
      price: updatedPrice,
      availableQuantity: updatedQuantity,
      description: updatedDescription
    };

    fetch(`http://localhost:5000/addToy/${selectedToy._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedToy)
    })
      .then(response => {
        if (response.ok) {
          const updatedToyList = myToy.map(toy => {
            if (toy._id === selectedToy._id) {
              return {
                ...toy,
                ...updatedToy
              };
            }
            return toy;
          });

          setMyToy(updatedToyList);
          setShowModal(false);
          setUpdatedPrice('');
          setUpdatedQuantity('');
          setUpdatedDescription('');
          Swal.fire('Success', 'Toy information updated successfully.', 'success');
        } else {
          throw new Error('Failed to update toy information');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'An error occurred while updating toy information.', 'error');
      });
  };



  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this toy.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {

        fetch(`http://localhost:5000/addToy/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              const updatedToyList = myToy.filter(toy => toy._id !== id);
              setMyToy(updatedToyList);
              Swal.fire('Deleted!', 'The toy has been deleted.', 'success');
            } else {
              Swal.fire('Error', 'Failed to delete the toy.', 'error');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'An error occurred while deleting the toy.', 'error');
          });
      }
    });
  };

  const handleSort = sortDirection => {
    const sortUrl = `${url}&sort=${sortDirection}`;
  
    fetch(sortUrl)
      .then(res => res.json())
      .then(data => {
        const sortedData = data.map(toy => ({
          ...toy,
          price: parseFloat(toy.price)
        }));
  
        sortedData.sort((a, b) => {
          if (sortDirection === 'asc') {
            return a.price - b.price;
          } else if (sortDirection === 'desc') {
            return b.price - a.price;
          }
          return 0;
        });
  
        setMyToy(sortedData);
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'An error occurred while sorting the toys.', 'error');
      });
  };
  



  return (
    <div className='bg-light py-1' style={{ backgroundColor: "transparent", marginBottom: "-47px" }}>
      <Container style={{ marginTop: '3rem' }}>
      <Navbar expand="sm" bg="light" className="mb-3 ">
          <Navbar.Toggle aria-controls="sorting-buttons" />
          <Navbar.Collapse id="sorting-buttons">
            <Nav className="mr-auto">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-sort" className="mr-2">
                  Sort by Price
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSort('asc')}>Price (Asc)</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort('desc')}>Price (Desc)</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
                <td>
                  {toy.description.split(' ').length > 11 ? (
                    <>
                      {toy.description.split(' ').slice(0, 10).join(' ')}...{' '}

                    </>
                  ) : (
                    toy.description
                  )}
                </td>
                <td>
                  <button className='border-0' onClick={() => handleUpdate(toy)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className='mt-4 border-0' onClick={() => handleDelete(toy._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
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
              Apply Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default MyToy;



