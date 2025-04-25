import { LiaPlaneDepartureSolid } from "react-icons/lia";

import React, { useState } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';

const airportData = [
  { city: 'New Delhi', code: 'DEL', name: 'Indira Gandhi International' },
  { city: 'Los Angeles', code: 'LAX', name: 'Los Angeles International' },
  { city: 'San Diego', code: 'SAN', name: 'San Diego International' },
  { city: 'Miami', code: 'MIA', name: 'Miami International Airport' },
  { city: 'Ontario', code: 'ONT', name: 'Ontario International Airport' },
  // Add more airports as needed
];

const SearchFrom = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(  { city: 'Ontario', code: 'ONT', name: 'Ontario International Airport' });

  const filtered = airportData.filter(
    a =>
      a.city.toLowerCase().includes(query.toLowerCase()) ||
      a.code.toLowerCase().includes(query.toLowerCase()) ||
      a.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (airport) => {
    setSelected(airport);
    setQuery('');
  };

  return (
    <>
    <div>

      {!selected ? (
        <>
        <div className="shadow-sm pointer-cursor">
        <LiaPlaneDepartureSolid  size={30}/>
          <FormControl
            placeholder="Search city or airport"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
                  <strong>{a.city}</strong> ({a.code}) – {a.name}
                </ListGroup.Item>
              ))}
              {filtered.length === 0 && <ListGroup.Item>No results found</ListGroup.Item>}
            </ListGroup>
          )}
        </>
      ) : (
        <div className="pointer-cursor airport-card" onClick={() =>setSelected(null)}>
   <LiaPlaneDepartureSolid  size={30}/>
        <div className="airport-result">
          <div className="airport-city fw-bold">{selected.city}</div>
          <div className="airport-details text-muted">
            {selected.code}, {selected.name}
          </div>
        </div>
        </div>
      )}
    </div>
    </>

  );
};

export default SearchFrom;
