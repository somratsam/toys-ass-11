import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Gallery = ({ activeToy, categories }) => {
  return (
    <Container>
      {activeToy && (
        <div>
          {/* Render the active toy details */}
        </div>
      )}

      <h3 className='text-center fw-bold'>Toys Gallery</h3>
      {categories.map((category) => (
        <div key={category._id} >

          <div className="d-flex flex-wrap justify-content-center">
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.name} className="mx-2 my-3">
                <h4 className="text-center  mt-4">{subcategory.name}</h4>
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
                        <div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Gallery;
