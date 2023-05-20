
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const BestSeller = ({ bestSellerData }) => {
    return (
        <div>
            <h4 className="text-center my-5">Best Sellers</h4>
            <Row className="justify-content-center">
                {bestSellerData.map((toy, toyIndex) => (
                    <Col key={toyIndex} xs={12} md={4}>
                        <Card className="m-2 p-3 shadow border-0 mx-auto" style={{ width: '18rem' }}>
                            <p className='text-center fw-bold'>{toy.name}</p>
                            <Card.Img
                                variant="top"
                                src={toy.image}
                                alt={`Best Seller ${toyIndex + 1}`}
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

export default BestSeller;
