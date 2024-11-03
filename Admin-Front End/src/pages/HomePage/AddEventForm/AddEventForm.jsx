import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEventForm.css";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    district: "",
    city: "",
    location: "",
    description: "",
    image1: null,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user starts typing
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventName) newErrors.eventName = "Event Name cannot be empty";
    if (!formData.district) {
      newErrors.district = "District cannot be empty";
    } else if (!/^[A-Za-z\s]+$/.test(formData.district)) {
      newErrors.district = "District should contain only letters";
    }
    
    if (!formData.city) {
      newErrors.city = "City cannot be empty";
    } else if (!/^[A-Za-z\s-]+$/.test(formData.city)) {
      newErrors.city = "City should contain only letters";
    }
    
    if (!formData.location) newErrors.location = "Location cannot be empty";
    if (!formData.description) newErrors.description = "Description cannot be empty";

    // Check for valid image file format
    if (formData.image1 && !["image/png", "image/jpeg"].includes(formData.image1.type)) {
      newErrors.image1 = "Invalid file format for image upload. Only PNG and JPEG are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("eventName", formData.eventName);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    if (formData.image1) formDataToSend.append("image1", formData.image1);

    try {
      const response = await axios.post("http://localhost:5000/api/createEvent", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);

      setFormData({
        eventName: "",
        district: "",
        city: "",
        location: "",
        description: "",
        image1: null,
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/add-event');
  };

  return (
    <div className="add-event-form-container">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
          {errors.eventName && <p className="error-message">{errors.eventName}</p>}
        </div>
        <div className="form-row">
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
          {errors.district && <p className="error-message">{errors.district}</p>}
        </div>
        <div className="form-row">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>
        <div className="form-row">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>
        <div className="form-row">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        <div className="form-row">
          <label>Image 1:</label>
          <input
            type="file"
            name="image1"
            onChange={handleChange}
            required
          />
          {errors.image1 && <p className="error-message">{errors.image1}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <h3>Event Details Successfully Added to Database</h3>
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventForm;
