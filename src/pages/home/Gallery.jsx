import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import '../home/Gallery.css';
import 'react-image-gallery/styles/css/image-gallery.css';

const Gallery = ({ activeToy, categories }) => {
  return (
    <Container>
      {activeToy && (
        <div>
          
        </div>
      )}

      <h3 className="text-center fw-bold">Toys Gallery</h3>
      {categories.map((category) => (
        <div key={category._id}>
          <div className="d-flex flex-wrap justify-content-center">
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.name} className="mx-2 my-3">
                <Row className="justify-content-center">
                  {subcategory.toys.map((toy, index) => (
                    <Col key={index} xs={12}>
                      <Card className="m-2 p-3 shadow border-0" style={{ width: '18rem' }}>
                        <div className="position-relative">
                          <ImageGallery
                            items={[
                              {
                                original: toy.image,
                                originalAlt: `Toy ${index + 1}`,
                              },
                            ]}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            renderCustomControls={() => null}
                          />
                          <div className="hover-overlay">
                            <div className="hover-content">
                              {/* Add hover content */}
                              <h5>{toy.name}</h5>
                              <p>Price: ${toy.price}</p>
                              <button className="btn btn-primary">Add to Cart</button>
                            </div>
                          </div>
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
