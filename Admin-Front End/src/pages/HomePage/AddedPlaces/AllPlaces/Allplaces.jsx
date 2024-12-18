import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllPlaces.css";

const AllPlaces = () => {

    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://trektempo.onrender.com/api/getAllPlaces')
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
        axios.delete(`https://trektempo.onrender.com/api/deletePlace/${id}`)
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
            <h2>TrackTempo Places</h2>
            <div className="places-container1">
                {places.map((place) => (
                    <div key={place._id} className="place-card1">
                        <div className="place-details1">
                            <h3>{place.name}</h3>
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
                                <button onClick={() => handleDelete(place._id)} className="delete-button1">Delete</button>
                            </div>
                        </div>
                        <div className="place-images1">
                            {place.images && place.images.map((image, index) => (
                                <div key={index} className="image-container3">
                                    <img 
                                        src={image} 
                                        alt={`${place.name} - Image ${index + 1}`} 
                                        className="place-image1" 
                                    />
                                    {/* Save Image Button */}
                                    <button onClick={() => downloadImage(image)} className="save-button1">
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

export default AllPlaces;
