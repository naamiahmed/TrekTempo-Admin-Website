import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReqAccommodation.css";
// import { useNavigate } from "react-router-dom";

const DisplayAccommodation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    getAllAccommodations();
  }, []);

  const getAllAccommodations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAllAccommodations");
      console.log("Response from backend:", response.data); // Debugging log
      if (response.data.success) {
        setData(response.data.accommodations); // Ensure this matches the backend response
      } else {
        setError(new Error(response.data.message));
      }
    } catch (error) {
      console.error("Error fetching accommodations:", error); // Debugging log
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
      {/* <button className="add-button1" onClick={() => navigate("/23")}>
        Next
      </button> */}
      <h1>Accommodation Details</h1>
      <div className="card-container1">
        {data.map((item) => (
          <div key={item._id} className="card1">
            <h2>{item.name}</h2>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>District:</strong> {item.district}
            </p>

            <p>
              <strong>Location:</strong> {item.location}
            </p>

            <p>
              <strong>Budget:</strong> {item.budget}
            </p>

            <p>
              <strong>Location Link:</strong>{" "}
              <a href={item.locationLink} target="_blank" rel="noopener noreferrer">
                {item.locationLink}
              </a>
            </p>
            <div className="image-container1">
              <img
                src={item.images[0]} // Assuming images is an array
                alt={item.name}
                className="Accommodation-image"
              />
            </div>
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
        ))}
      </div>

      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this accommodation?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowConfirmModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayAccommodation;