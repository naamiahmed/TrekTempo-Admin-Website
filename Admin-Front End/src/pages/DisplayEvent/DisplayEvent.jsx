import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/getAllEvents')
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data from Backend</h1>
      <div className="card-container">
        {data.map((item) => (
          <div key={item._id} className="card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>District:</strong> {item.district}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;