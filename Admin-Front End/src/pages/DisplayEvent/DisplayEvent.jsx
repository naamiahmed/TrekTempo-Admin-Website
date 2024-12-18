import React, { useEffect, useState } from "react";
import "./DisplayEvent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://trektempo.onrender.com/api/getAllEvents");
      setData(response.data.events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setConfirmAction('delete');
    setShowConfirm(true);
  };

  const handleAccept = (id) => {
    setSelectedId(id);
    setConfirmAction('accept');
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://trektempo.onrender.com/api/deleteEvent/${selectedId}`);
      setData(data.filter((item) => item._id !== selectedId));
    } catch (error) {
      console.error("Error deleting event:", error);
      setError(error);
    }
    setShowConfirm(false);
  };

  const confirmAccept = async () => {
    try {
      await axios.post(`https://trektempo.onrender.com/api/moveEventToAccepted/${selectedId}`);
      setData(data.filter((item) => item._id !== selectedId));
    } catch (error) {
      console.error("Error accepting event:", error);
      setError(error);
    }
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    if (confirmAction === 'delete') {
      confirmDelete();
    } else if (confirmAction === 'accept') {
      confirmAccept();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Requested Event Details</h2>
      <div className="req-event-card-container">
        {data.map((item) => (
          <div key={item._id} className="req-event-card">
            <h2>{item.title}</h2>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Phone Number:</strong> {item.phone}</p>
            <p><strong>District:</strong> {item.district}</p>
            <p><strong>Place Name:</strong> {item.place}</p>
            <p>
              <strong>Location Link:</strong>{" "}
              <a href={item.location} target="_blank" rel="noopener noreferrer">
                {item.location}
              </a>
            </p>
            <p>
              <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
            </p>
            <div className="req-event-image-container">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="req-event-image"
              />
            </div>
            <div className="req-event-card-buttons">
              <button
                className="req-event-delete-button"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="req-event-accept-button"
                onClick={() => handleAccept(item._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <ConfirmDialog
        isOpen={showConfirm}
        message={confirmAction === 'delete' 
          ? "Are you sure you want to delete this event?" 
          : "Are you sure you want to accept this event?"}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default DataDisplay;