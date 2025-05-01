'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';
import moment from 'moment';
import airportdata from "../../../../utils/Jsons/airportdata.json";
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [flightResults, setFlightResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fare, setFare] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const decoded = decodeURIComponent(params.slug);
        const parsed = JSON.parse(decoded);
        setData(parsed);
        const response = await axios.post(
          "https://flight-api.acedigitalsolution.com/flight-offers/v1/get-flight-searches",
          parsed,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        setFlightResults(response.data.results);
        setFare(response.data.results.fare);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [params.slug]);

  function parseFlightDuration(isoDuration) {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const match = isoDuration.match(durationRegex);
    if (!match) return 'Invalid format';
    const hours = match[1] ? `${match[1]}h` : '';
    const minutes = match[2] ? `${match[2]}m` : '';
    return `${hours} ${minutes}`.trim();
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-12 col-lg-3">{/* Sidebar */}</div>
          <div className="col-12 col-lg-9">
            <div className="section-header row mb-3">
              <div className="col-12 col-md-6 text-start mb-2 mb-md-0">
                {data.origin} → {data.destination} &nbsp;&nbsp;{data.departureDate} - {data.returnDate}
              </div>
              <div className="col-12 col-md-6 text-md-end text-start">
                <a href="#" className="text-decoration-none me-3 d-inline-block mb-1">Lowest to Higher</a>
                <a href="#" className="text-decoration-none d-inline-block mb-1">Highest to Lower</a>
              </div>
            </div>

            {loading ? (
              <div className="text-center p-4">Loading flight data...</div>
            ) : (
              <div className="flight-card">
                {flightResults.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.outBound.map((itm, idx) => (
                      <div className="card flight-card shadow-sm border mb-4" key={idx}>
                        <div className="row align-items-center p-3 gy-3">

                          {/* Airline and flight info */}
                          <div className="col-12 col-md-4 d-flex align-items-start">
                            <img
                              src={`https://flight-api.acedigitalsolution.com/resources/airline-logo/${itm.airline}.png`}
                              alt={itm.airline}
                              width="40"
                              className="me-3"
                            />
                            <div>
                              <div className="text-muted small">
                                {moment(itm.depDate).format("dddd MMM Do")} - 
                                <span className="fw-bold"> {moment(itm.depDate).format("hh:mm A")}</span>
                              </div>
                              <div className="text-muted small">{itm.airline} - {itm.flightNo}</div>
                            </div>
                          </div>

                          {/* Flight times and airport info */}
                          <div className="col-12 col-md-4 text-center">
                            <div className="fw-bold">{itm.fromAirport} - {itm.toAirport}</div>
                            <div className="text-muted small">
                              {moment(itm.depDate).format("hh:mm A")} - {moment(itm.reachDate).format("hh:mm A")}
                            </div>
                            <div className="text-muted small">
                              {moment(itm.depDate).format("ddd MMM Do")} - {moment(itm.reachDate).format("ddd MMM Do")}
                            </div>
                            <div className="text-muted small">
                              {airportdata.find(itex => itex.airportCode === data.origin)?.airportName} - {airportdata.find(itex => itex.airportCode === data.destination)?.airportName}
                            </div>
                          </div>

                          {/* Duration and class */}
                          <div className="col-12 col-md-4 text-md-end text-start">
                            <div className="small text-muted">
                              Duration <span className="fw-bold">{parseFlightDuration(itm.eft)}</span>
                            </div>
                            <div className="small"><strong>Direct</strong> {itm.cabinClass}</div>
                          </div>
                        </div>

                        <hr className="my-0" />

                        {/* Fare and Buttons */}
                        <div className="row p-3 gy-2">
                          <div className="col-12 col-md-6">
                            <span className="text-muted">From</span>
                            <span className="fs-5 fw-bold text-primary">
                              {item.fare.adultFare} {item.fare.currency}
                            </span>
                            <sup className="text-muted small">(per pax)</sup>
                          </div>
                          <div className="col-12 col-md-6 text-md-end text-start">
                            <button className="btn btn-outline-secondary me-2 mb-2 mb-md-0">More Details</button>
                            <button className="btn btn-primary">Select Flight</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
