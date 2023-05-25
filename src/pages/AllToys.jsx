import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const AllToys = () => {
  const [toys, setToys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredToys, setFilteredToys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedToy, setSelectedToy] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const redirectedFromLogin = location.state?.from?.pathname === '/login';


  useEffect(() => {
    if (redirectedFromLogin) {
      Swal.fire({
        icon: 'success',
        text: 'Logged in successfully! Modal will be opened.',
      }).then(() => {
        setShowModal(true);
      });
    }
  }, [redirectedFromLogin]);

  useEffect(() => {
    fetch('http://localhost:5000/allToys')
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setFilteredToys(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredToys(toys);
    } else {
      const filtered = toys.filter((toy) =>
        toy.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredToys(filtered);
    }
  }, [searchTerm, toys]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (toy) => {
    setSelectedToy(toy);
    if (isLoggedIn()) {
      setShowModal(true);
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Please log in first.',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { fromModal: true, toyId: toy._id } }); // Pass 'fromModal' and 'toyId' as the state
        }
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedToy(null);
  };

  const isLoggedIn = () => {
    return user !== null; // Return true if logged in, false otherwise
  };

  return (
    <Container style={{ marginTop: '5rem' }}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Toy Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Seller</th>
            <th>Toy Name</th>
            <th>Sub-category</th>
            <th>Price</th>
            <th>Available Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredToys.slice(0, 20).map((toy) => (
            <tr key={toy._id}>
              <td>{toy.sellerName || 'N/A'}</td>
              <td>{toy.name}</td>
              <td>{toy.subCategory}</td>
              <td>${toy.price}</td>
              <td>{toy.availableQuantity}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewDetails(toy)}>
                  <FontAwesomeIcon icon={faCartPlus} /> View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Toy Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedToy && (
            <div>
              <div className="card p-2 border-0">
                <div className="text-center">
                  
                  <img className="w-50 h-100" src={selectedToy.pictureUrl} alt="" />
                </div>
                <div>
                <h3 className="my-3 fw-bold">{selectedToy.name}</h3>
                  <p>
                    <strong>Seller Name:</strong> {selectedToy.sellerName}
                  </p>
                  <p>
                    <strong>Seller Email:</strong> {selectedToy.sellerEmail}
                  </p>
                  <p>
                    <strong>Price: $</strong> {selectedToy.price}
                  </p>
                  <p>
                    <strong>Rating:</strong> {selectedToy.rating}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {selectedToy.quantity}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedToy.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllToys;
