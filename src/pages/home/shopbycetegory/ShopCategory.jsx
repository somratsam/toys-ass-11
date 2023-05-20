import React, { useEffect, useState } from 'react';
import { Tab, Nav, Card, Container, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import BestSeller from '../BestSeller';
import NewReleases from '../NewReleases';


const ShopCategory = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [categories, setCategories] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const [newReleasesData, setNewReleases] = useState([]);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/public/category.json');
      const data = await response.json();
      setCategories(data.categories);
      setBestSellerData(data.bestSellers)
      setNewReleases(data.newReleases)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  const handleRatingChange = (rating) => {
    // Handle rating change here
    console.log('Selected rating:', rating);
  };

  return (
    <Container className="mx-auto">
      <h2 className="text-center mb-4">Shop by Category</h2>
      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav justify variant="tabs" className="mb-3">
          {categories.map((category) => (
            <Nav.Item key={category.id}>
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
            <Tab.Pane key={category.id} eventKey={category.id}>
              <div className="d-flex flex-wrap justify-content-center">
                {category.subcategories.map((subcategory) => (
                  <React.Fragment key={subcategory.name}>
                    <div className="mx-2 my-3">
                      <h4 className="text-center fw-bold mt-4">{subcategory.name}</h4>
                      <Row className="justify-content-center">
                        {subcategory.toys.map((toy, toyIndex) => (
                          <Col key={toyIndex} xs={12}>
                            <Card className="m-2 p-3 shadow border-0" style={{ width: '18rem' }}>
                              <Card.Img
                                variant="top"
                                src={toy.image}
                                alt={`Toy ${toyIndex + 1}`}
                                style={{ height: '200px' }}
                              />
                              <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                  <Card.Text>Price: ${toy.price}</Card.Text>
                                  <span className="rating">
                                    {[...Array(5)].map((_, index) => (
                                      <FaStar
                                        style={{ color: index < toy.rating ? 'gold' : 'gray' }}
                                        key={index}
                                        className={index < toy.rating ? 'star filled-star' : 'star empty-star'}
                                        onClick={() => handleRatingChange(index + 1)}
                                      />
                                    ))}
                                  </span>
                                </div>
                                <div></div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
      <BestSeller bestSellerData={bestSellerData} />
      <NewReleases newReleasesData={newReleasesData} />
    </Container>

  );
};

export default ShopCategory;








// import React, { useEffect, useState } from 'react';
// import { Tab, Nav, Card, Container, Row, Col } from 'react-bootstrap';
// import { FaStar } from 'react-icons/fa';
// import BestSeller from '../BestSeller';

// const ShopCategory = () => {
//   const [activeTab, setActiveTab] = useState('1');
//   const [categories, setCategories] = useState([]);
//   const [bestSellerData, setBestSellerData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('/public/category.json');
//       const data = await response.json();
//       setCategories(data.categories);
//       setBestSellerData(data.bestSeller); // Assuming the best seller data is provided in the JSON response
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   const handleTabSelect = (key) => {
//     setActiveTab(key);
//   };

//   const handleRatingChange = (rating) => {
//     // Handle rating change here
//     console.log('Selected rating:', rating);
//   };

//   return (
//     <Container className="mx-auto">
//       <h2 className="text-center mb-4">Shop by Category</h2>
//       <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
//         {/* Rest of the code */}
//       </Tab.Container>
//       <BestSeller bestSeller={bestSellerData} />
//     </Container>
//   );
// };

// export default ShopCategory;
