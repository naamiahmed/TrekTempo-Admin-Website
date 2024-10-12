import React, { useState } from 'react';
import './AddPlaceForm.css';

const AddPlaceForm = () => {
  const [formData, setFormData] = useState({
    placeName: '',
    district: '',
    city: '', 
    location: '',
    direction: '', 
    description: '',
    image1: null,
    image2: null,
    image3: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Handle file uploads
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value, // Handle text and textarea inputs
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.placeName.trim()) errors.placeName = 'Place Name is required';
    if (!formData.district.trim()) errors.district = 'District is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.direction.trim()) errors.direction = 'Direction is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.image1) errors.image1 = 'Image 1 is required';
    if (!formData.image2) errors.image2 = 'Image 2 is required';
    if (!formData.image3) errors.image3 = 'Image 3 is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission, such as sending data to backend
      console.log('Form data:', formData);
    } else {
      console.log('Validation failed. Form not submitted.');
    }
  };

  return (
    <div className="add-place-form-container">
      <h2>Add Places</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Place Name:</label>
          <input
            type="text"
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
            required
          />
          {formErrors.placeName && <p className="error-message">{formErrors.placeName}</p>}
        </div>

        <div>
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
          {formErrors.district && <p className="error-message">{formErrors.district}</p>}
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {formErrors.city && <p className="error-message">{formErrors.city}</p>}
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          {formErrors.location && <p className="error-message">{formErrors.location}</p>}
        </div>

        <div>
          <label>Direction:</label>
          <input
            type="text"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            required
          />
          {formErrors.direction && <p className="error-message">{formErrors.direction}</p>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {formErrors.description && <p className="error-message">{formErrors.description}</p>}
        </div>

        <div>
          <label>Image 1:</label>
          <input
            type="file"
            name="image1"
            onChange={handleChange}
            accept="image/*"
            required
          />
          {formErrors.image1 && <p className="error-message">{formErrors.image1}</p>}
        </div>

        <div>
          <label>Image 2:</label>
          <input
            type="file"
            name="image2"
            onChange={handleChange}
            accept="image/*"
            required
          />
          {formErrors.image2 && <p className="error-message">{formErrors.image2}</p>}
        </div>

        <div>
          <label>Image 3:</label>
          <input
            type="file"
            name="image3"
            onChange={handleChange}
            accept="image/*"
            required
          />
          {formErrors.image3 && <p className="error-message">{formErrors.image3}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPlaceForm;
