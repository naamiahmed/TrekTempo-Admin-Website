import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllAccommodation.css';

// Confirmation Dialog Component
const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

const AllAccommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get('https://trektempo.onrender.com/api/getAllAccommodations');
        setAccommodations(response.data.accommodations);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`https://trektempo.onrender.com/api/deleteAcceptedAccommodation/${deleteId}`);
      if (response.data.success) {
        setAccommodations(accommodations.filter(accommodation => accommodation._id !== deleteId));
      } else {
        console.error('Error deleting accommodation:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting accommodation:', error);
    }
    setShowConfirm(false);
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
      <ConfirmDialog
        isOpen={showConfirm}
        message="Are you sure you want to delete this accommodation?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default AllAccommodation;