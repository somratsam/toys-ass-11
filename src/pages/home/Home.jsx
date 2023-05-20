import { Button, Col, Container, Row } from "react-bootstrap";
import ShopCategory from "./shopbycetegory/ShopCategory";
import Gallery from "./Gallery";

const Home = () => {
    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <div style={{ paddingTop: "3rem" }}>
                        <p className=' fw-bold' style={{ color: '#FF5722' }}>Explore the Marvel Universe</p>
                        <h1>Unleash Your Inner Hero with Avengers Toys</h1>
                        <p>
                            <small>
                                Embark on thrilling adventures with our wide range of Avengers toys. From action figures to collectibles, immerse yourself in the epic world of Iron Man, Captain America, Thor, Black Widow, and more. Let your imagination soar as you recreate iconic battles, assemble your team of heroes, and defend the universe against powerful villains. Whether you are a fan or a collector, our Avengers toys bring the excitement of the Marvel Universe to life.
                            </small>
                        </p>
                        <Button variant="light" className="rounded-5 text-dark fw-bold" style={{ backgroundColor: '#FF5722' }}>Shop Now</Button>

                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <img className='w-100' src="https://i.ibb.co/vjkJByj/spiderman.jpg" alt="Banner" />
                    </div>
                </Col>
            </Row>
<Gallery></Gallery>
            <ShopCategory></ShopCategory>
        </Container>
    );
};

export default Home;
