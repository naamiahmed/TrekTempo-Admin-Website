import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayEvent.css";
import { useNavigate } from "react-router-dom";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    axios
      .get("http://localhost:5000/api/getAllEvents")
      .then((response) => {
        if (response.data.success) {
          setData(response.data.events);
        } else {
          setError(new Error(response.data.message));
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/deleteEvent/${id}`)
      .then((response) => {
        if (response.data.success) {
          setData(data.filter((item) => item._id !== id));
        } else {
          setError(new Error(response.data.message));
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleAccept = (id) => {
    axios
      .post(`http://localhost:5000/api/moveEventToAccepted/${id}`)
      .then((response) => {
        if (response.status == "200") {
          // console.log(`Accepted event with id: ${id}`);
         getAllEvents();
        } else {
          setError(new Error(response.data.message));
        }
      })
      .catch((error) => {
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
      <button className="add-button" onClick={() => navigate("/23")}>
        Next
      </button>
      <h1>Event Details</h1>
      <div className="card-container">
        {data.map((item) => (
          <div key={item._id} className="card">
            <h2>{item.title}</h2>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>Phone Number:</strong> {item.phone}
            </p>
            <p>
              <strong>District:</strong> {item.district}
            </p>
            <p>
              <strong>Place Name:</strong> {item.place}
            </p>
            <p>
              <strong>Location Link:</strong>{" "}
              <a href={item.location} target="_blank" rel="noopener noreferrer">
                {item.location}
              </a>
            </p>
            <p>
              <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
            </p>
            <div className="image-container1">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="event-image"
              />
            </div>
            <div className="card-buttons">
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="accept-button"
                onClick={() => handleAccept(item._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
