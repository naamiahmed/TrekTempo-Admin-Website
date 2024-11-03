import React, { useEffect, useState } from "react";
import "./DisplayEvent.css";
import { useNavigate } from "react-router-dom";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace the API call with mock data
    getMockEvents();
  }, []);

  const getMockEvents = () => {
    // Simulate mock data instead of making an API call
    const mockEvents = [
      {
        _id: "1",
        title: "Sample Event 1",
        description: "Description for Sample Event 1",
        phone: "123-456-7890",
        district: "District 1",
        place: "Place Name 1",
        location: "http://example.com/location1",
        date: new Date().toISOString(),
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        _id: "2",
        title: "Sample Event 2",
        description: "Description for Sample Event 2",
        phone: "987-654-3210",
        district: "District 2",
        place: "Place Name 2",
        location: "http://example.com/location2",
        date: new Date().toISOString(),
        imageUrl: "https://via.placeholder.com/150",
      },
    ];
    setData(mockEvents);
    setLoading(false);
  };

  const handleDelete = (id) => {
    // Update local state without server call
    setData(data.filter((item) => item._id !== id));
  };

  const handleAccept = (id) => {
    // Placeholder for handling accept, refresh the list if needed
    console.log(`Accepted event with id: ${id}`);
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
      <h1>Event Details</h1>
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
