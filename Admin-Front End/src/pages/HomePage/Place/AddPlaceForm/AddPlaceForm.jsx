import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddPlaceForm.css"; // Import the CSS file

const AddPlaceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { place } = location.state || {}; // Destructure the place object from state

  // Initialize form values with the `place` data or empty strings
  const [formData, setFormData] = useState({
    id: place?._id || "", // Include the id field
    name: place?.name || "",
    district: place?.district || "",
    city: place?.city || "",
    location: place?.location || "",
    direction: place?.direction || "",
    description: place?.description || "",
    images: [], // Initialize images as an empty array
  });

  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [error, setError] = useState(""); // State to handle error messages

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for file input (images)
  const handleImageChange = (e, index) => {
    const file = e.target.files[0]; // Get the first file
    const updatedImages = [...formData.images];
    updatedImages[index] = file; // Store the File object in state
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  // Add another image input field
  const addImageInput = () => {
    setFormData({
      ...formData,
      images: [...formData.images, null], // Add an empty entry to the images array
    });
  };

  // Remove an image input field
  const removeImageInput = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one image is provided
    if (formData.images.length === 0 || formData.images.every(image => image === null)) {
      setError("At least one image is required.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("direction", formData.direction);
    formDataToSend.append("description", formData.description);

    formData.images.forEach((image, index) => {
      if (image instanceof File) {
        formDataToSend.append("images", image); // Append new image file
      }
    });

    try {
      const response = await axios.post("http://localhost:5000/api/createPlace", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);

      // Delete the place from the database using the id
      await axios.delete(`http://localhost:5000/api/deleteRequestPlaces/${formData.id}`);

      // Optionally reset the form after submission
      setFormData({
        id: "",
        name: "",
        district: "",
        city: "",
        location: "",
        direction: "",
        description: "",
        images: [],
      });

      // Show success popup
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/20'); // Navigate to the root path
  };

  return (
    <div className="add-place-form">
      <h2 className="form-title">Add Place Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Place Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          District:
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Direction (URL):
          <input
            type="text"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </label>

        <label className="form-label">Upload Images:</label>
        {formData.images.map((image, index) => (
          <div key={index} className="image-upload-container">
            <input
              type="file"
              name={`image-${index}`}
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
              className="image-input"
            />
            {image instanceof File && (
              <div className="image-preview">
                <p>
                  Image {index + 1}: {image.name}
                </p>
                <img
                  src={URL.createObjectURL(image)} // Create a URL for the selected file
                  alt={`Preview ${index + 1}`}
                  className="image-preview-img"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => removeImageInput(index)}
              className="remove-image-button"
            >
              Remove Image
            </button>
          </div>
        ))}

        {/* Add Image Button */}
        <button
          type="button"
          onClick={addImageInput}
          className="add-image-button"
        >
          Add Another Image
        </button>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Place Details Successfully Added to Database</h3>
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPlaceForm;