// DisplayAccommodation.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReqAccommodation.css";

const DisplayAccommodation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const userId = "67063e574428fbfde0ab2cb9";

  useEffect(() => {
    getAllAccommodations();
    getNotifications();
  }, []);

  const getAllAccommodations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAllAccommodations");
      if (response.data.success) {
        setData(response.data.accommodations);
      } else {
        setError(new Error(response.data.message));
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getNotifications = async () => {
    setNotificationLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/getAllNotifications");
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setNotificationLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deleteAccommodation/${deleteId}`);
      if (response.data.success) {
        setData(data.filter((item) => item._id !== deleteId));
      } else {
        setError(new Error(response.data.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setShowConfirmModal(false);
      setDeleteId(null);
    }
  };

  const handleAccept = async (id) => {
    setAcceptLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/moveAccommodationToAccepted/${id}`,
        { userId }
      );

      if (response.data.success) {
        await Promise.all([
          getAllAccommodations(),
          getNotifications()
        ]);
        alert("Accommodation accepted successfully!");
      } else {
        setError(new Error(response.data.message));
      }
    } catch (error) {
      console.error("Error accepting accommodation:", error);
      setError(error);
      alert("Failed to accept accommodation. Please try again.");
    } finally {
      setAcceptLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="accommodation-container">
      <div className="notifications-section">
        <h2>Recent Notifications</h2>
        {notificationLoading ? (
          <div>Loading notifications...</div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div key={notification._id} className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="title1-container">
        <h1>Requested Accommodations</h1>
      </div>

      <div className="card-container1">
        {data.map((item) => (
          <div key={item._id} className="card1">
            <div className="accommodation-details">
              <h3><strong>Name:</strong> {item.name}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>District:</strong> {item.district}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Budget:</strong> {item.budget}</p>
              <p>
                <strong>Location Link:</strong>{" "}
                <a href={item.locationLink} target="_blank" rel="noopener noreferrer">
                  {item.locationLink}
                </a>
              </p>
              <div className="card-buttons1">
                <button
                  className="delete-button"
                  onClick={() => {
                    setDeleteId(item._id);
                    setShowConfirmModal(true);
                  }}
                  disabled={acceptLoading}
                >
                  Delete
                </button>
                <button
                  className="accept-button"
                  onClick={() => handleAccept(item._id)}
                  disabled={acceptLoading}
                >
                  {acceptLoading ? 'Accepting...' : 'Accept'}
                </button>
              </div>
            </div>
            <div className="image-container1">
              {item.images?.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <img
                    src={image}
                    alt={`${item.name} - Image ${index + 1}`}
                    className="Accommodation-image"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this accommodation?</p>
              <div className="modal-buttons">
                <button className="modal-button confirm" onClick={handleDelete}>Yes</button>
                <button className="modal-button cancel" onClick={() => setShowConfirmModal(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayAccommodation;