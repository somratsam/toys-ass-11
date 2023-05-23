import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AllToys = () => {
  const [toys, setToys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredToys, setFilteredToys] = useState([]);

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
  console.log('filteredToys:', filteredToys)

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
                <Link to={`/toy-details/${toy._id}`}>
                  <Button variant="primary">
                    <FontAwesomeIcon icon={faCartPlus} /> View Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllToys;
