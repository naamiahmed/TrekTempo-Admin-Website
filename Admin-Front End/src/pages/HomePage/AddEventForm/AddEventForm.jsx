import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEventForm.css";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
    district: "",
    place: "",
    date: "",
    location: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title cannot be empty";
    if (!formData.description) newErrors.description = "Description cannot be empty";
    
    if (!formData.phone) {
      newErrors.phone = "Phone number cannot be empty";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.district) {
      newErrors.district = "District cannot be empty";
    } else if (!/^[A-Za-z\s]+$/.test(formData.district)) {
      newErrors.district = "District should contain only letters";
    }
    
    if (!formData.place) newErrors.place = "Place cannot be empty";
    if (!formData.date) newErrors.date = "Date cannot be empty";
    if (!formData.location) newErrors.location = "Location cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/createAcceptedEvent", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Form submitted successfully:", response.data);

      setFormData({
        title: "",
        description: "",
        phone: "",
        district: "",
        place: "",
        date: "",
        location: "",
        image: null,
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/accommodations');
  };

  return (
    <><h2>Add New Event</h2><div className="add-event-form-container">

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>

        <div className="form-row">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="form-row">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <div className="form-row">
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required />
          {errors.district && <p className="error-message">{errors.district}</p>}
        </div>

        <div className="form-row">
          <label>Place:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required />
          {errors.place && <p className="error-message">{errors.place}</p>}
        </div>

        <div className="form-row">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required />
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>

        <div className="form-row">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required />
          {errors.location && <p className="error-message">{errors.location}</p>}
        </div>

        <div className="form-row">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange} />
        </div>

        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <h3>Event Details Successfully Added</h3>
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}
    </div></>
  );
};

export default AddEventForm;