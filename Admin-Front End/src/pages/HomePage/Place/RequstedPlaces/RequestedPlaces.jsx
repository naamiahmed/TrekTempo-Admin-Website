import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RequestedPlaces.css";

const RequestedPlaces = () => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/getAllNewPlaces')
          .then(response => {
            if (response.data.success) {
              setPlaces(response.data.places);
            } else {
              setError(new Error(response.data.message));
            }
            setLoading(false);
          })
          .catch(error => {
            console.error("There was an error fetching the places!", error);
            setError(error);
            setLoading(false);
          });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/deletePlace/${id}`)
          .then(response => {
            if (response.data.success) {
              setPlaces(places.filter(place => place._id !== id));
            } else {
              setError(new Error(response.data.message));
            }
          })
          .catch(error => {
            setError(error);
          });
    };

    const handleAccept = (place) => {
        navigate('/24', { state: { place } });
    };

    const downloadImage = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = imageUrl.split('/').pop(); // Extract filename from URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading the image:", error);
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
            <h2>Requested New Places</h2>
            <div className="requested-places-container">
                {places.map((place) => (
                    <div key={place._id} className="requested-place-card">
                        <div className="requested-place-details">
                            <h3><strong>Place Name:</strong> {place.name}</h3>
                            <p><strong>District:</strong> {place.district}</p>
                            <p><strong>City:</strong> {place.city}</p>
                            <p><strong>Location:</strong> {place.location}</p>
                            <p><strong>Direction:</strong> 
                                <a href={place.direction} target="_blank" rel="noopener noreferrer">
                                    {place.direction}
                                </a>
                            </p>
                            <p><strong>Description:</strong> {place.description}</p>
                            <div className="button-container">
                                <button onClick={() => handleDelete(place._id)} className="delete-button">Delete</button>
                                <button onClick={() => handleAccept(place)} className="accept-button">Accept</button>
                            </div>
                        </div>
                        <div className="requested-place-images">
                            {place.images && place.images.map((image, index) => (
                                <div key={index} className="image-container2">
                                    <img 
                                        src={image} 
                                        alt={`${place.name} - Image ${index + 1}`} 
                                        className="requested-place-image" 
                                    />
                                    {/* Save Image Button */}
                                    <button onClick={() => downloadImage(image)} className="save-button">
                                        Save Image
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default RequestedPlaces;
