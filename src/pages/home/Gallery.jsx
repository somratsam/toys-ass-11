import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Gallery = ({ activeToy, categories }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Container style={{marginTop: '6rem'}}>
      {activeToy && (
        <div>
  
        </div>
      )}

      
      {categories.map((category) => (
        <div key={category._id}>
          <div className="d-flex flex-wrap justify-content-center">
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.name} className="mx-2 my-3" data-aos="fade-up">
                <Row className="justify-content-center">
                  {subcategory.toys.map((toy, index) => (
                    <Col key={index} xs={12}>
                      <Card className="m-2 p-2 shadow " style={{ width: '18rem' }}>
                        {/* Replace the Card component with ImageGallery */}
                        <ImageGallery
                          items={subcategory.toys.map((toy, index) => ({
                            original: toy.galleryImg,
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
