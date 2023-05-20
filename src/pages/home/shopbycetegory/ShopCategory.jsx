




import React, { useEffect, useState } from 'react';
import { Tab, Nav, Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import BestSeller from '../BestSeller';
import NewReleases from '../NewReleases';
const ShopCategory = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [categories, setCategories] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/toys');
      const data = await response.json();
      setCategories(data);
      setBestSellerData(data[0].bestSellers);
      setNewReleasesData(data[0].newReleases);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  const handleRatingChange = (rating) => {
    console.log('Selected rating:', rating);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container className="mx-auto my-5">
      <h2 className="text-center mb-4">Shop by Category</h2>
      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav justify variant="tabs" className="mb-3">
          {categories.map((category) => (
            <Nav.Item key={category._id}>
              <Nav.Link
  className={`fw-bold ${activeTab === category.id ? 'bg-warning' : ''}`}
  eventKey={category.id}
  style={{
    color: activeTab === category.id ? '#ff6600' : '#000'
  }}
>
  {category.name}
</Nav.Link>

            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {categories.map((category) => (
            <Tab.Pane key={category._id} eventKey={category.id}>
              <div className="d-flex flex-wrap justify-content-center">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.name} className="mx-2 my-3">
                    <h4 className="text-center fw-bold mt-4">{subcategory.name}</h4>
                    <Row className="justify-content-center">
                      {subcategory.toys.map((toy, index) => (
                        <Col key={index} xs={12}>
                          <Card className="m-2 p-3 shadow border-0" style={{ width: '18rem' }}>
                            <Card.Img
                              variant="top"
                              src={toy.image}
                              alt={`Toy ${index + 1}`}
                              style={{ height: '200px' }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between">
                              <div>
                                <Card.Text>Price: ${toy.price}</Card.Text>
                                <span className="rating">
                                  {[...Array(5)].map((_, ratingIndex) => (
                                    <FaStar
                                      style={{ color: ratingIndex < toy.rating ? 'gold' : 'gray' }}
                                      key={ratingIndex}
                                      className={ratingIndex < toy.rating ? 'star filled-star' : 'star empty-star'}
                                      onClick={() => handleRatingChange(ratingIndex + 1)}
                                    />
                                  ))}
                                </span>
                              </div>
                            </Card.Body>
                            <div>
                              <Button
                                variant="light"
                                className="rounded-5 text-dark fw-bold"
                                style={{ backgroundColor: '#FF5722' }}
                                onClick={handleModal}
                              >
                                View Details
                              </Button>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
      <BestSeller bestSellerData={bestSellerData} />
      <NewReleases newReleasesData={newReleasesData} />

      <Modal className="w-100 h-100" show={showModal} onHide={handleModal}>
  <Modal.Header closeButton>
    <Modal.Title>Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {categories.map((category) => {
      if (category.id === activeTab) {
        return category.subcategories.map((subcategory) => (
          <div key={subcategory.name}>
            <h4 className=" mt-4">{subcategory.name}</h4>
            {subcategory.toys.map((toy, index) => (
              <div key={index} className="d-flex justify-content-between">
                <div className="w-25">
                  <img className="w-100" src={toy.image} alt="" />
                </div>
                <div className="w-75">
                  <h6>Toy {index + 1}</h6>
                  <p>Price: ${toy.price}</p>
                  {/* Add any other relevant data here */}
                </div>
              </div>
            ))}
          </div>
        ));
      }
      return null;
    })}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleModal}>
      Close
    </Button>
    <Button variant="primary">Save Changes</Button>
  </Modal.Footer>
</Modal>


    </Container>
  );
};

export default ShopCategory;
