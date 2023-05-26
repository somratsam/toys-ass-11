import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import ShopCategory from "./shopbycetegory/ShopCategory";
import '../home/Home.css'
import useTitle from "../../hooks/useTitle";
const Home = () => {
  useTitle('Home')
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (

    <Container style={{ fontFamily: 'Open Sans, sans-serif' }}>
      <Row >
        <Col xs={12} md={6} data-aos="fade-right">
          <div style={{ paddingTop: "7rem" }}>
            <p className="fw-bold" style={{ color: "#FF5722" }}>
              Explore the Marvel Universe
            </p>
            <h1 className="banner-title">Unleash Your Inner Hero with Avengers Toys</h1>
            <p>
              <small className="text-light">
                Embark on thrilling adventures with our wide range of Avengers toys. From action figures to collectibles, immerse yourself in the epic world of Iron Man, Captain America, Thor, Black Widow, and more. Let your imagination soar as you recreate iconic battles, assemble your team of heroes, and defend the universe against powerful villains. Whether you are a fan or a collector, our Avengers toys bring the excitement of the Marvel Universe to life.
              </small>
            </p>
            <Button variant="light" className="rounded-5 text-light shop-now-btn">
              Shop Now
            </Button>
          </div>
        </Col>
        <Col xs={12} md={6} data-aos="fade-left">
          <div>
            <img className="w-100 h-75 banner-image" src="https://i.ibb.co/wsTm9P3/Three-Zero-Iron-Man-Mark-43-Ao-U-014-1200x900-removebg-preview.png" alt="Banner" />
          </div>
        </Col>
      </Row>

      <ShopCategory backgroundColor="rgb(255, 255, 255)" />
    </Container>

  );
};

export default Home;
