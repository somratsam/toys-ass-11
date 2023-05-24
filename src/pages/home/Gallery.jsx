import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Gallery = ({ activeToy, categories }) => {
  useEffect(() => {
    AOS.init(); // Initialize AOS library
  }, []);

  return (
    <Container>
      {activeToy && (
        <div>
          {/* Render activeToy details */}
        </div>
      )}

      <h3 className='text-center fw-bold'>Toys Gallery</h3>
      {categories.map((category) => (
        <div key={category._id}>
          <div className="d-flex flex-wrap justify-content-center">
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.name} className="mx-2 my-3" data-aos="fade-up">
                <Row className="justify-content-center">
                  {subcategory.toys.map((toy, index) => (
                    <Col key={index} xs={12}>
                      <Card className="m-2 p-3 shadow border-0" style={{ width: '18rem' }}>
                        {/* Replace the Card component with ImageGallery */}
                        <ImageGallery
                          items={subcategory.toys.map((toy, index) => ({
                            original: toy.image,
                            originalAlt: `Toy ${index + 1}`,
                          }))}
                          showPlayButton={false}
                          showThumbnails={true}
                        />
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
