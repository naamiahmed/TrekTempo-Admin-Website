import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./AddPlaceForm.css"; // Import the CSS file

const AddPlaceForm = () => {
  const location = useLocation();
  const { place } = location.state || {}; // Destructure the place object from state

  // Initialize form values with the `place` data or empty strings
  const [formData, setFormData] = useState({
    name: place?.name || "",
    district: place?.district || "",
    city: place?.city || "",
    location: place?.location || "",
    direction: place?.direction || "",
    description: place?.description || "",
    images: place?.images || [], // If images exist, pre-fill them, otherwise empty array
  });

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

  // Handler for form submission (can be further implemented)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the formData to your backend here, which will include file uploads
    console.log("Form Data Submitted: ", formData);
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
          />
        </label>
        <label className="form-label">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
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
            {typeof image === "string" ? (
              <div className="image-preview">
                <p>
                  Image {index + 1}: {image}
                </p>
                <img
                  src={image} // Directly use the URL for images
                  alt={`Preview ${index + 1}`}
                  className="image-preview-img"
                />
              </div>
            ) : image instanceof File ? (
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
            ) : null}
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
    </div>
  );
};

export default AddPlaceForm;
