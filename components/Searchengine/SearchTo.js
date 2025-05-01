import { LiaPlaneArrivalSolid } from "react-icons/lia";

import React, { useEffect, useRef, useState } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';
import airportData from '../../utils/Jsons/airportdata.json'

// const airportData = [
//   { city: 'New Delhi', code: 'DEL', name: 'Indira Gandhi International' },
//   { city: 'Los Angeles', code: 'LAX', name: 'Los Angeles International' },
//   { city: 'San Diego', code: 'SAN', name: 'San Diego International' },
//   { city: 'Miami', code: 'MIA', name: 'Miami International Airport' },
//   { city: 'Ontario', code: 'ONT', name: 'Ontario International Airport' },
// ];

const SearchTo = ({ onChange}) => {
  const inputRef =  useRef()
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState( {
    "airportCode": "DCA",
    "airportName": "Ronald Reagan Washington National",
    "cityCode": "WAS",
    "cityName": "Washington, D.C.",
    "countryCode": "US",
    "countryName": "United States",
    "continent": "North America"
  });

  const[location, setLocation] = useState({from: "", to: ""})



  const filtered = airportData.filter(
    a =>
      a.cityName.toLowerCase().includes(query.toLowerCase()) ||
      a.airportCode.toLowerCase().includes(query.toLowerCase()) ||
      a.airportName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (airport) => {
    setSelected(airport);
    setQuery('');
    onChange(airport)
  };

    // Focus input when selected is null
    useEffect(() => {
      if (!selected && inputRef.current) {
        inputRef.current.focus();
      }
    }, [selected]);

  return (
    <>
    <div>

      {!selected ? (
        <>
        <div className="shadow-sm pointer-cursor">
        <LiaPlaneArrivalSolid  size={30}/>
          <FormControl
          ref={inputRef}
            placeholder="Search city or airport"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value) 
              ,onChange(e)}}

            />
            </div>
          {query && (
            <ListGroup className="airport-suggestions">
              {filtered.map((a, idx) => (
                <ListGroup.Item
                  key={idx}
                  action
                  onClick={() => handleSelect(a)}
                >
                 <strong>{a.airportCode}</strong> ({a.cityCode}) – {a.cityName}<br />
                 <strong>{a.airportName}</strong> 
                </ListGroup.Item>
              ))}
              {filtered.length === 0 && <ListGroup.Item>No results found</ListGroup.Item>}
            </ListGroup>
          )}
        </>
      ) : (
        <div className="pointer-cursor airport-card" onClick={() =>setSelected(null)}>
   <LiaPlaneArrivalSolid  size={30}/>
        <div className="airport-result">
          <div className="airport-city fw-bold">{selected.cityName}</div>
          <div className="airport-details text-muted">
            {selected.airportCode}, {selected.cityName}
          </div>
        </div>
        </div>
      )}
    </div>
    </>

  );
};

export default SearchTo;
