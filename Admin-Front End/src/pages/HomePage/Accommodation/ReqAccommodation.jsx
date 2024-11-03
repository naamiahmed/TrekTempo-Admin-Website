import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReqAccommodation.css";

const DisplayAccommodation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getAllAccommodations();
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
    try {
      const response = await axios.post(`http://localhost:5000/api/moveAccommodationToAccepted/${id}`);
      if (response.status === 200) {
        getAllAccommodations();
      } else {
        setError(new Error(response.data.message));
      }
    } catch (error) {
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
      <div className="title2-container" style={{ margin: 0 }}>
        <h2>Requested Accommodations</h2>
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
            <div className="image-container1">
              {item.images && item.images.map((image, index) => (
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