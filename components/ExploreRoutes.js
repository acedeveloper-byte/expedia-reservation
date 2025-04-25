'use client';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CgArrowsExchange } from "react-icons/cg";

// Sample data with dynamic class type
const destinationData = [
  {
    from: 'BHO',
    to: 'GOI',
    date: '22/04/2025',
    price: '8313',
    image: '/images/explores/destinations1.jpg',
    classType: 'Economy',
  },
  {
    from: 'DEL',
    to: 'BOM',
    date: '25/04/2025',
    price: '7200',
    image: '/images/explores/destinations2.png',
    classType: 'Business',
  },
  {
    from: 'HYD',
    to: 'BLR',
    date: '30/04/2025',
    price: '5400',
    image: '/images/explores/destinations3.png',
    classType: 'First Class',
  },
  {
    from: 'CCU',
    to: 'MAA',
    date: '02/05/2025',
    price: '6900',
    image: '/images/explores/destinations4.png',
    classType: 'Premium Economy',
  },
];

const ExploreRoutes = () => {
  return (
    <div>
      <Container className="my-3">
        <div className='text-center'>
            <h2 className='fw-bold fs-1 explore'>Explore</h2>
            <p className='populer-domestic'>Popular International Routes</p>
        </div>
        <Row style={{marginTop: '5rem'}}>
          {destinationData.map((item, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="cards-layout">
                <Row className="g-0 align-items-center p-2">
                  <Col md={6} className="d-flex justify-content-center align-items-center">
                    <CgArrowsExchange className="icons-layout" />
                  </Col>
                  <Col md={6}>
                    <img
                      src={item.image}
                      alt="destination"
                      className="explores-layout"
                    />
                  </Col>
                </Row>

                {/* Dynamic Class Type */}
                <div className='container-fluid'>
                  <h5 className="classess">{item.classType} Class</h5>
                </div>

                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <p className="mb-1 text-muted" style={{color: '#E59665 !important', fontWeight: '500'}}>From</p>
                      <h6 className="mb-0 fw-bold">{item.from}</h6>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 text-muted" style={{color: '#E59665 !important', fontWeight: '500'}}>To</p>
                      <h6 className="mb-0 fw-bold">{item.to}</h6>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col md={6}>
                      <p className="mb-1 text-muted">Date</p>
                      <h6 className="mb-0">{item.date}</h6>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 text-muted">Ticket Price</p>
                      <h6 className="mb-0" style={{color: '#E59665', fontSize: '24px', fontWeight: '700' }}>${item.price}</h6>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ExploreRoutes;

