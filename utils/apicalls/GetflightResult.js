import React from 'react'

export const GetflightResult = ( values , setResults) => {
    console.log(values)
 var requestobj = {}



 if  (  values.tripType === 1) {
    requestobj = {
        "origin": values.origin,
        "destination": values.destination,
        "departureDate": values.departureDate,
        "adults": values.adults,
        "children": values.children,
        "tripType" : values.tripType,
        "infants": values.infants,
        "currencyCode": "USD",
        "max": 100,
        "isOneWay": true,
        "cabinClass":values.cabinClass
    }
 } else {
    requestobj ={
        "origin": values.origin,
        "destination": values,destination,
        "departureDate": values.departureDate,
        "arrivalDate" : values.returnDate,
        "adults": values.adults,
        "children": values.children,
        "tripType" : values.tripType,
        "infants": values.infants,
        "currencyCode": "USD",
        "max": 100,
        "isOneWay": false,
        "cabinClass":values.cabinClass
    }
 }


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(requestobj);
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://flight-api.acedigitalsolution.com/flight-offers/v1/get-flight-searches", requestOptions)
      .then((response) => response.text())
      .then((result) => setResults(result.results))
      .catch((error) => console.error(error));
}


