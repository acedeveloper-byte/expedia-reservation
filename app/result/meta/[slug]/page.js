'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';
import moment from 'moment';
import airportdata  from "../../../../utils/Jsons/airportdata.json"
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [flightResults, setFlightResults] = useState([]);
  const [loading, setLoading] = useState(true);
const  [fare , setfare ] = useState({})
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const decoded = decodeURIComponent(params.slug);
        const parsed = JSON.parse(decoded);
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
        setfare(response.data.results.fare);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [params.slug]); // Ensures it's only called once or when params change
  console.log(flightResults)
  console.log("fare:" , fare)



  function parseFlightDuration(isoDuration) {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const match = isoDuration.match(durationRegex);
  
    if (!match) return 'Invalid format';
  
    const hours = match[1] ? `${match[1]}h` : '';
    const minutes = match[2] ? `${match[2]}m` : '';
  
    return `${hours} ${minutes}`.trim();
  }


  function getAirportDetails(airportCode) {
    const filteredData = airports.filter(airport => airport.airportCode === airportCode);
  
    // If data is found, return it, otherwise return a message
    if (filteredData.length > 0) {
      return filteredData[0]; // Assuming airportCode is unique, we return the first match
    } else {
      return { message: 'Airport code not found' };
    }
  }


  
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-lg-3">{/* Sidebar */}</div>
          <div className="col-lg-9">
            <div className="section-header d-flex justify-content-between">
              <div>
                DEL → BOM &nbsp;&nbsp;Fri 02 May 2025 - Fri 09 May 2025
              </div>
              <div>
                <a href="#" className="text-white text-decoration-none me-3">Lowest to Higher</a>
                <a href="#" className="text-white text-decoration-none">Highest to Lower</a>
              </div>
            </div>

            {loading ? (
              <div className="text-center p-4">Loading flight data...</div>
            ) : (
              <div className="flight-card">
                {flightResults.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.outBound.map((itm, idx) => (
                      <div className="card flight-card shadow-sm border mb-3" key={idx}>
                        <div className="d-flex justify-content-between p-3 flight-segment">
                          <div className="d-flex">
                            <img src={`https://flight-api.acedigitalsolution.com/resources/airline-logo/${itm.airline}.png`}
                              alt="Air India" width="40" className="me-3" />
                            <div>
                              <div className="text-muted small">{moment(itm.depDate).format("dddd MMMM Do")} - <span className="fw-bold">{moment(itm.depDate).format("hh:mm A")}</span></div>
                              <div className="text-muted small">{itm.airline} - {itm.flightNo}</div>
                            </div>
                          </div>

                          <div className="text-center">
                          
                            <div className="fw-bold">{itm.fromAirport} - {itm.toAirport}</div>
                            <div className="text-muted small">{moment(itm.depDate).format("hh:mm A")} -   {moment(itm.reachDate).format("hh:mm A")}</div>
                            <div className="text-muted small">{moment(itm.depDate).format("ddd MMMM Do")}  - {moment(itm.reachDate).format("ddd MMMM Do")}  </div>
                            <div className="text-muted small">{airportdata.find(( itex) =>  itex.airportCode === itm.fromAirport).airportName} - {airportdata.find(( itex) =>  itex.airportCode === itm.toAirport).airportName}</div>
              
                            {/* <div className="text-muted small">{itm.fromAirport} - {itmtoAirport}</div> */}
                          </div>
      <div>
      <div className="small text-muted">Duration <span className="fw-bold">{parseFlightDuration(itm.eft)}</span></div>
      <div className="small"><strong>Direct</strong> {itm.cabinClass}</div>
      </div>
                        </div>

                        <hr className="my-0" />

                        <div className="d-flex justify-content-between align-items-center p-3">
                          <div>
                            <span className="text-muted">From</span>
                            <span className="fs-5 fw-bold text-primary"> {item.fare.adultFare} {item.fare.currency}</span>
                            <sup className="text-muted small">(per pax)</sup>
                          </div>
                          <div>
                            <button className="btn btn-outline-secondary me-2">More Details</button>
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
