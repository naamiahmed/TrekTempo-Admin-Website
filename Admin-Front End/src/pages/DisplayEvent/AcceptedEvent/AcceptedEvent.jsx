import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AcceptedEvent.css';

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

const AcceptedEvent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    axios.get('https://trektempo.onrender.com/api/getAllAcceptedEvents')
      .then(response => {
        if (response.data.success) {
          setData(response.data.events);
        } else {
          setError(new Error(response.data.message));
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    axios.delete(`https://trektempo.onrender.com/api/deleteAcceptedEvent/${deleteId}`)
      .then(response => {
        if (response.data.success) {
          setData(data.filter(item => item._id !== deleteId));
        } else {
          setError(new Error(response.data.message));
        }
      })
      .catch(error => {
        setError(error);
      });
    setShowConfirm(false);
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>TrackTempo Event Details</h2>
      <div className="view-event-card-container">
        {data.map((item) => (
          <div key={item._id} className="card">
            <h1>{item.title}</h1>
            <p>
              <strong>Description:</strong> 
              {expandedDescriptions[item._id] ? item.description : `${item.description.slice(0, 100)}...`}
              {item.description.length > 100 && (
                <span className="more-link" onClick={() => toggleDescription(item._id)}>
                  {expandedDescriptions[item._id] ? ' less' : ' more'}
                </span>
              )}
            </p>
            <p><strong>Phone Number:</strong> {item.phone}</p>
            <p><strong>District:</strong> {item.district}</p>
            <p><strong>Place Name:</strong> {item.place}</p>
            <p><strong>Location Link:</strong> <a href={item.location} target="_blank" rel="noopener noreferrer">{item.location}</a></p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            <div className="image-containerAB">
              <img src={item.imageUrl} alt={item.title} className="event-image" />
            </div>
            <div className="card-buttons">
              <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog
        isOpen={showConfirm}
        message="Are you sure you want to delete this event?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default AcceptedEvent;