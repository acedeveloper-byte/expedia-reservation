import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const FamousTourist = () => {
  const attractions = [
    { name: 'Paris', img: '/images/city/paris.png' },
    { name: 'Paris', img: '/images/city/paris.png' }, 
    { name: 'Paris', img: '/images/city/paris.png' }, 
    { name: 'Paris', img: '/images/city/paris.png' },
    { name: 'Paris', img: '/images/city/paris.png' },
    { name: 'Paris', img: '/images/city/paris.png' },
    { name: 'Paris', img: '/images/city/paris.png' }, 
    { name: 'Paris', img: '/images/city/paris.png' }, 
    { name: 'Paris', img: '/images/city/paris.png' },
    { name: 'Paris', img: '/images/city/paris.png' },

  ];
  return (
    <div>
      <Container className="text-center my-5">
        <h4 className="fw-bold mb-4 ">FAMOUS TORIST ATTRACTION</h4>
        <Row className="g-4 justify-content-center">
          {attractions.map((place, index) => (
            <Col key={index} xs={5} sm={4} md={3} lg={2}>
              <div className="rounded-circle overflow-hidden mx-auto" style={{ width: 100, height: 100 }}>
                <img
                  src={place.img}
                  alt={place.name}
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>
              <p className="mt-2 mb-0">{place.name}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default FamousTourist
