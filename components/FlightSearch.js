'use client'
import React, { useState, useRef } from 'react';
import { Container, Col, Row, Overlay, Popover, Button } from 'react-bootstrap';
import { PiSeatBold } from "react-icons/pi";
import SearchDate from './Searchengine/SearchDate';
import SearchTo from './Searchengine/SearchTo';
import SearchFrom from './Searchengine/From';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [show, setShow] = useState(false);
  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [travelClass, setTravelClass] = useState('First');
  const target = useRef(null);

  const handleCountChange = (type, delta) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const totalPassengers = passengers.adult + passengers.child + passengers.infant;
  const handleClose = () => setShow(false);

  return (
    <section id="flight-engine">
      <Container>
        <div className='form-layout'>
          <Row className='search-enigne-container'>

            {/* Trip type toggle */}
            <div className="trip-type-toggle d-flex gap-4 align-items-center mb-3">
              <label className={`option ${tripType === 'oneway' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={() => setTripType('oneway')}
                />
                One Way
              </label>
              <label className={`option ${tripType === 'roundtrip' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={() => setTripType('roundtrip')}
                />
                Round Trip
              </label>
            </div>

            {/* From Input */}
            <Col md={3}>
              <div className="input-container">
                <SearchFrom />
              </div>
            </Col>

            {/* To Input */}
            <Col md={3}>
              <div className="input-container">
                <SearchTo />
              </div>
            </Col>

            {/* Departure Date */}
            <Col md={2} className="col-md-2-date">
              <div className="input-container">
                <SearchDate
                  label="Departure On"
                  type="date"
                />
              </div>
            </Col>

            {/* Arrival Date - only for roundtrip */}
            {tripType === 'roundtrip' && (
              <Col md={2} sm={4} className="col-md-2-date">
                <div className="input-container">
                  <SearchDate
                    label="Arrival On"
                    type="date"
                  />
                </div>
              </Col>
            )}

            {/* Passenger + Class Selector */}
            <Col md={2}>
              <div className="shadow-sm p-2 rounded custom-passenger-box" onClick={() => setShow(!show)} ref={target}>
                <PiSeatBold />
                <div className="fw-bold" style={{ fontSize: '14px' }}>
                  {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
                </div>
                <div className="text-muted" style={{ fontSize: '14px' }}>
                  {travelClass}
                </div>

                {/* Popover for Passenger & Class Selection */}
                <Overlay target={target.current} show={show} placement="bottom">
                  <Popover className="passenger-class-popover">
                    <Popover.Body>

                      {/* Passenger count controls */}
                      {['adult', 'child', 'infant'].map(type => (
                        <div className="d-flex justify-content-between align-items-center mb-2" key={type}>
                          <div>
                            <strong className="text-capitalize">{type}</strong>
                            <div className="small text-muted">
                              ({type === 'adult' ? '12+ years' : type === 'child' ? '0–12 years' : '0–2 years'})
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <Button variant="light" onClick={() => handleCountChange(type, -1)}>-</Button>
                            <span className="mx-2">{passengers[type]}</span>
                            <Button variant="light" onClick={() => handleCountChange(type, 1)}>+</Button>
                          </div>
                        </div>
                      ))}

                      {/* Travel Class options */}
                      <div className="travel-class-grid mt-3">
                        {['Economy', 'Premium Economy', 'Business', 'First'].map(cls => (
                          <div
                            key={cls}
                            className={`travel-class-option ${travelClass === cls ? 'selected' : ''}`}
                            onClick={() => setTravelClass(cls)}
                          >
                            {cls}
                          </div>
                        ))}
                      </div>

                      {/* Done button */}
                      <div className="text-center mt-3">
                        <Button variant="link" className="done-btn" onClick={handleClose}>DONE</Button>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
            </Col>

            {/* Search Button */}
            <Col md={1}>
              <button className="search-btn">
                Search
              </button>
            </Col>

          </Row>
        </div>
      </Container>
    </section>
  );
};

export default FlightSearch;
