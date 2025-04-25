import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../app/globals.css"


const Footer = () => {
  const paymentLogos = [
    { name: 'visa', url: '/images/payments/visa.jpg' },
    { name: 'stripe', url: '/images/payments/stripe.png' },
    { name: 'paypal', url: '/images/payments/paypal.png' },
    { name: 'discover', url: '/images/payments/discover.png' },
    { name: 'mastercard', url: '/images/payments/group.png' },
    { name: 'maestro', url: '/images/payments/maestro.png' },
    { name: 'jcb', url: '/images/payments/jcb.png' },
    { name: 'amex', url: '/images/payments/amex.png' },
    { name: 'affirm', url: '/images/payments/affirm.png' },
  ];
  
  return (
    <footer className=" text-white pt-5 pb-3 mt-5 background-layout">
      <Container>
        <Row>
        <Col md={3}>
            <h6 className="text-uppercase fw-bold">About</h6>
            <div className="text-center my-3">
          <i className="bi bi-facebook mx-2"></i>
          <i className="bi bi-instagram mx-2"></i>
          <i className="bi bi-x mx-2"></i>
          <i className="bi bi-pinterest mx-2"></i>
          <i className="bi bi-linkedin mx-2"></i>
        </div>
          </Col>
          <Col md={3}>
            <h6 className="text-uppercase fw-bold">About</h6>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Articles</li>
              <li>Blog</li>
              <li>Media</li>
              <li>FAQ</li>
              <li>Contact Us</li>
              <li>Business Class</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="text-uppercase fw-bold">Booking</h6>
            <ul className="list-unstyled">
              <li>Flights</li>
              <li>Hassle Booking</li>
              <li>Car Rental</li>
              <li>Transfers</li>
              <li>Vacation</li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="text-uppercase fw-bold">Other Links</h6>
            <ul className="list-unstyled">
              <li>Airlines</li>
              <li>Stopovers</li>
              <li>Flight Booking</li>
              <li>International Flights</li>
              <li>Villas</li>
              <li>Accommodations</li>
              <li>Vacation Rentals</li>
              <li>Airport Transfer</li>
              <li>Forum</li>
              <li>Influencer Program</li>
            </ul>
          </Col>
        </Row>

        <div className="text-center my-3">
          <i className="bi bi-facebook mx-2"></i>
          <i className="bi bi-instagram mx-2"></i>
          <i className="bi bi-x mx-2"></i>
          <i className="bi bi-pinterest mx-2"></i>
          <i className="bi bi-linkedin mx-2"></i>
        </div>

        <p className="text-center small">
          © 2024–2025 ExampleCo, Inc. All rights reserved. Services subject to our{' '}
          <a href="#" className="text-white text-decoration-underline">Privacy Policy</a> and{' '}
          <a href="#" className="text-white text-decoration-underline">Terms and Conditions</a>.
        </p>

        <div className="text-center mt-3 d-flex justify-content-center flex-wrap gap-3">
          {paymentLogos.map(({ name, url }) => (
            <img
              key={name}
              src={url}
              alt={name}
              height="40"
              className="bg-white p-1 rounded"
            />
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
