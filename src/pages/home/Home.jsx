import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import ShopCategory from "./shopbycetegory/ShopCategory";


const Home = () => {

    useEffect(() => {
        AOS.init({ duration: 2000 }); // You can customize the duration as per your preference
      }, []);
      

    return (
        <Container>
            <Row>
                <Col xs={12} md={6} data-aos="fade-right">
                    <div style={{ paddingTop: "7rem" }}>
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
                <Col xs={12} md={6}data-aos="fade-right">
                    <div>
                        <img className='w-100 h-75' src="https://i.ibb.co/vjkJByj/spiderman.jpg" alt="Banner" />
                    </div>
                </Col>
            </Row>

            <ShopCategory></ShopCategory>
        </Container>
    );
};

export default Home;
