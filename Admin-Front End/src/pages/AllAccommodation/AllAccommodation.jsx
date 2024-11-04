import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllAccommodation.css';

const AllAccommodation = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllAccommodations');
        setAccommodations(response.data.accommodations);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  return (
    <div className="all-accommodation-container">
      <h2>All Accommodations</h2>
      <div className="accommodation-list">
        {accommodations.map((accommodation) => (
          <div key={accommodation._id} className="accommodation-card">
            <h3>{accommodation.name}</h3>
            <p>{accommodation.description}</p>
            <p>Phone: {accommodation.contact}</p>
            <p>District: {accommodation.district}</p>
            <p>Place: {accommodation.location}</p>
            <p>Budget: {accommodation.budget}</p>
            <p>Day Cost: {accommodation.dayCost}</p>
            {accommodation.images.length > 0 && (
              <img src={accommodation.images[0]} alt={accommodation.name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAccommodation;