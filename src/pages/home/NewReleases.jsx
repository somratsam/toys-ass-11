import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const NewReleases = ({ newReleasesData }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
      };
    
      const handleMouseLeave = () => {
        setHoveredIndex(null);
      };
    return (
        <div>
            <h4 className="text-center my-5">New Releases</h4>
            <Row className="justify-content-center">
                {newReleasesData.map((release, releaseIndex) => (
                    <Col key={releaseIndex} xs={12} md={4}>
                        <Card className={`m-2 p-3 shadow border-0 mx-auto ${hoveredIndex === releaseIndex ? 'card-hover' : ''}`}
                            style={{ background: '#F0F8FF', width: '18rem' }}
                            onMouseEnter={() => handleMouseEnter(releaseIndex)}
                            onMouseLeave={handleMouseLeave}  >
                            <p className='text-center fw-bold'>{release.name}</p>
                            <Card.Img
                                variant="top"
                                src={release.image}
                                alt={`New Release ${releaseIndex + 1}`}
                                style={{ height: '200px' }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                    <Card.Text>Price: ${release.price}</Card.Text>
                                    <span className="rating">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                style={{ color: index < release.rating ? 'gold' : 'gray' }}
                                                key={index}
                                                className={index < release.rating ? 'star filled-star' : 'star empty-star'}
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
    );
};

export default NewReleases;
