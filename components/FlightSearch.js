'use client'
import React, { useState, useRef } from 'react';
import { Container, Col, Row, Overlay, Popover, Button } from 'react-bootstrap';
import { PiSeatBold } from "react-icons/pi";
import SearchDate from './Searchengine/SearchDate';
import SearchTo from './Searchengine/SearchTo';
import SearchFrom from './Searchengine/SearchFrom';
import moment from 'moment';
import { GetflightResult } from '@/utils/apicalls/GetflightResult';
import Link from 'next/link';


const FlightSearch = () => {

  const [searchengineData, setSearchenginedata] = useState({
    origin: "DEL",
    destination: "GYD",
    departureDate: moment().format("YYYY-MM-DD"),
    returnDate: moment().format("YYYY-MM-DD"),
    adults: 1,
    children: 0,
    infants: 0,
    currencyCode: "INR",
    tripType: 1,
    cabin: "ECONOMY"
  });


  const [tripType, setTripType] = useState('oneway');
  const [show, setShow] = useState(false);
  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [travelClass, setTravelClass] = useState('Economy');
  const target = useRef(null);

  const handleCountChange = (type, delta) => {
    setPassengers(prev => {
      const updated = {
        ...prev,
        [type]: Math.max(0, prev[type] + delta)
      };
      updatePassengerData(updated);
      return updated;
    });
  };

  const updatePassengerData = (updated) => {
    setSearchenginedata(prev => ({
      ...prev,
      adults: updated.adult,
      children: updated.child,
      infants: updated.infant
    }));
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    setSearchenginedata(prev => ({
      ...prev,
      tripType: type === 'oneway' ? 1 : 2
    }));
  };

  const handleSearchFieldChange = (field, value) => {
    var trip = tripType === 'oneway' ? 1 : 2

    if (field === "departureDate" || field === "returnDate") {

      setSearchenginedata(prev => ({
        ...prev,
        [field]: moment(value).format('YYYY-MM-DD')
      }));
    } else {

        setSearchenginedata(prev => ({
          ...prev,
          [field]: value
        }));



    }

  };

  const handleClassChange = (cls) => {
        setTravelClass(cls);

    setSearchenginedata(prev => ({
      ...prev,
      cabin: cls.toUpperCase().replace(' ', '_') // ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST
    }));
  };

  const totalPassengers = passengers.adult + passengers.child + passengers.infant;
  console.log("searchengineData::", searchengineData)

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
                  onChange={() => handleTripTypeChange('oneway')}
                />
                One Way
              </label>
              <label className={`option ${tripType === 'roundtrip' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={() => handleTripTypeChange('roundtrip')}
                />
                Round Trip
              </label>
            </div>

            {/* From Input */}
            <Col md={3}>
              <div className="input-container">
                <SearchFrom
                  onChange={(value) => handleSearchFieldChange('origin', value.airportCode)}
                />
              </div>
            </Col>

            {/* To Input */}
            <Col md={3}>
              <div className="input-container">
                <SearchTo
                  onChange={(value) => handleSearchFieldChange('destination', value.airportCode)}
                  onClick={() => handleAirportSelect("to", airport)}
                />
              </div>
            </Col>

            {/* Departure Date */}
            <Col md={2} className="col-md-2-date">
              <div className="input-container">
                <SearchDate
                  label="Departure On"
                  type="date"
                  onChange={(value) => handleSearchFieldChange('departureDate', value)}
                />
              </div>
            </Col>

            {/* Arrival Date - only if Roundtrip */}
            <Col md={2} sm={4} className="col-md-2-date">
              <div className="input-container">
                {tripType !== 'roundtrip' ?
                  <div className='shadow-sm date text-center' onClick={() => handleTripTypeChange('roundtrip')}>
                    <p style={{ fontSize: "13px", margin: "4px" }}>Book a round trip to save more</p>
                  </div> :
                  <SearchDate
                    label="Arrival On"
                    type="date"
                    onChange={(value) => handleSearchFieldChange('returnDate', value)}
                  />
                }
              </div>
            </Col>

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
              </div>
              <Overlay target={target.current} show={show} placement="bottom">
                <Popover className="passenger-class-popover">
                  <Popover.Body>

                    {['adult', 'child', 'infant'].map(type => (
                      <div className="d-flex justify-content-between align-items-center mb-2" key={type}>
                        <div>
                          <strong className="text-capitalize">{type}</strong>
                          <div className="small text-muted">
                            ({type === 'adult' ? '12+ years' : type === 'child' ? '2–12 years' : '0–2 years'})
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
                          onClick={() => handleClassChange(cls)}
                        >
                          {cls}
                        </div>
                      ))}
                    </div>

                    {/* Done button */}
                    <div className="text-center mt-3 selected" onClick={() => setShow(false)}>
                      <Button variant="link" className="done-btn " >DONE</Button>
                    </div>
                  </Popover.Body>
                </Popover>
              </Overlay>
            </Col>

            {/* Search Button */}
            <Col md={1} sm={3}>
              <div className="search-btn">

                <Link href={`/result/meta/${JSON.stringify(searchengineData)}`} className='text-decoration-none text-white' >
                  Search
                </Link>
              </div>
            </Col>

          </Row>
        </div>
      </Container>
    </section>
  );
};

export default FlightSearch;
