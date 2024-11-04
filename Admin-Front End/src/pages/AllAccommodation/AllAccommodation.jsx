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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this accommodation?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/deleteAccommodation/${id}`);
        if (response.data.success) {
          setAccommodations(accommodations.filter(accommodation => accommodation._id !== id));
        } else {
          console.error('Error deleting accommodation:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting accommodation:', error);
      }
    }
  };

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
            <button className="delete-button" onClick={() => handleDelete(accommodation._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAccommodation;