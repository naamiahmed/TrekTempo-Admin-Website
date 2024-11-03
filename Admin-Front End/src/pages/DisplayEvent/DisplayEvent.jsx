import React, { useEffect, useState } from "react";
import "./DisplayEvent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAllEvents");
      console.log("Fetched events:", response.data.events); // Debug log
      setData(response.data.events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error); // Debug log
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteEvent/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error); // Debug log
      setError(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/moveEventToAccepted/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error accepting event:", error); // Debug log
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button className="add-button1" onClick={() => navigate("/23")}>
        Next
      </button>
      <h2>Event Details</h2>
      <div className="card-container1">
        {data.map((item) => (
          <div key={item._id} className="card1">
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
            <div className="card-buttons1">
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