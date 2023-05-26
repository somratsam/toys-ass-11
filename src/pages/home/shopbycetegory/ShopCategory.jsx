import React, { useContext, useEffect, useState } from 'react';
import { Tab, Nav, Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import BestSeller from '../BestSeller';
import NewReleases from '../NewReleases';
import Gallery from '../Gallery';
import ToyModal from './ToyModal';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';


const ShopCategory = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [categories, setCategories] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [rating, setRating] = useState(0);
  const [activeToy, setActiveToy] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const redirectedFromLogin = location.state?.from?.pathname === '/login';

  useEffect(() => {
    fetchData();

    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);



  useEffect(() => {
    if (redirectedFromLogin) {
      Swal.fire({
        icon: 'success',
        text: 'Logged in successfully! Modal will be opened.',
      }).then(() => {

      });
    }
  }, [redirectedFromLogin]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://toy-server-ass-11.vercel.app:5000/toys');
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

  const handleRatingChange = (value) => {
    setRating(value)
  };

  const handleModal = (toy) => {
    if (isLoggedIn()) {
      setActiveToy(toy);
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Please log in first.',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { fromModal: true } }); // Pass 'fromModal' as the state
        }
      });
    }
  };


  const handleCloseModal = () => {
    setActiveToy(null);
  };

  const isLoggedIn = () => {
    return user !== null;
  };
  return (

    <Container     >
      <Gallery activeToy={activeToy} categories={categories} />
      <h2 className="text-center fw-bold mb-4" style={{ marginTop: '10rem', color: '#F0F8FF' }}>Shop by Category</h2>
      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
        <div className='d-flex justify-content-center'>
          <Nav justify variant="tabs" className="mb-3 w-50 d-flex justify-content-center border-0">
            {categories.map((category) => (
              <Nav.Item key={category._id}>
                <Nav.Link
                  className={`fw-bold   ${activeTab === category.id ? 'bg-danger border-0  opacity-90' : '#F0F8FF'}`}
                  eventKey={category.id}
                  style={{
                    color: activeTab === category.id ? '#F0F8FF' : '#000',
                  }}
                >
                  {category.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <Tab.Content >
          {categories.map((category) => (
            <Tab.Pane key={category._id} eventKey={category.id}>
              <div className="d-flex flex-wrap justify-content-center">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.name} className="mx-2 my-3" data-aos="fade-up" data-aos-delay="100" data-aos-duration="500" >

                    <Row className="justify-content-center bg-dark rounded-4">
                      {subcategory.toys.map((toy, index) => (
                        <Col key={index} xs={12}>
                          <Card className="m-2 p-3  shadow border-0" style={{ width: '18rem', background: '#6096BA' }}>
                            <Card.Img
                              variant="top"
                              src={toy.image}
                              alt={`Toy ${index + 1}`}
                              style={{ height: '200px' }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between text-light">
                              <div>

                                <Card.Text>{subcategory.name}</Card.Text>
                                <Card.Text>Price: ${toy.price}</Card.Text>
                                <span className="rating">
                                  {[...Array(5)].map((_, ratingIndex) => (
                                    <FaStar
                                      style={{ color: ratingIndex < toy.rating ? 'gold' : 'gray' }}
                                      key={ratingIndex}
                                      className={
                                        ratingIndex < toy.rating ? 'star filled-star' : 'star empty-star'
                                      }
                                      onClick={() => handleRatingChange(ratingIndex + 1)}
                                    />
                                  ))}
                                </span>
                              </div>
                            </Card.Body>
                            <div>
                              <Button
                                variant="light"
                                className="rounded-5 text-light border-0"
                                style={{ backgroundColor: '#FF5722' }}
                                onClick={() => handleModal(toy)}
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

      <ToyModal toy={activeToy} handleClose={handleCloseModal} />
    </Container>

  );
};

export default ShopCategory;
