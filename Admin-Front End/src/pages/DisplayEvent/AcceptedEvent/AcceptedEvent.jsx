import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AcceptedEvent.css';

const AcceptedEvent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getAllAcceptedEvents')
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
    axios.delete(`http://localhost:5000/api/deleteAcceptedEvent/${id}`)
      .then(response => {
        if (response.data.success) {
          setData(data.filter(item => item._id !== id));
        } else {
          setError(new Error(response.data.message));
        }
      })
      .catch(error => {
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Accepted Event Details</h2>
      <div className="card-container">
        {data.map((item) => (
          <div key={item._id} className="card">
            <h1>{item.title}</h1>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Phone Number:</strong> {item.phone}</p>
            <p><strong>District:</strong> {item.district}</p>
            <p><strong>Place Name:</strong> {item.place}</p>
            <p><strong>Location Link:</strong> <a href={item.location} target="_blank" rel="noopener noreferrer">{item.location}</a></p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            <div className="image-container1">
              <img src={item.imageUrl} alt={item.title} className="event-image" />
            </div>
            <div className="card-buttons">
              <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcceptedEvent;