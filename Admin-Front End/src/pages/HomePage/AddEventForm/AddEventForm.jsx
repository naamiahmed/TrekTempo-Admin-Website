import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEventForm.css";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    district: "",
    place: "",
    date: "",
    locationLink: "",
    image: null,
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name cannot be empty";
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
    if (!formData.locationLink) newErrors.locationLink = "Location Link cannot be empty";

    if (formData.image && !["image/png", "image/jpeg"].includes(formData.image.type)) {
      newErrors.image = "Invalid file format. Only PNG and JPEG are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("http://localhost:5000/api/createAccommodation", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);

      setFormData({
        name: "",
        description: "",
        phone: "",
        district: "",
        place: "",
        date: "",
        locationLink: "",
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
    <div className="add-event-form-container">
      <h2>Add New Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
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
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
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
          <label>Place:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />
          {errors.place && <p className="error-message">{errors.place}</p>}
        </div>

        <div className="form-row">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>

        <div className="form-row">
          <label>Location Link:</label>
          <input
            type="url"
            name="locationLink"
            value={formData.locationLink}
            onChange={handleChange}
            placeholder="https://maps.google.com/..."
            required
          />
          {errors.locationLink && <p className="error-message">{errors.locationLink}</p>}
        </div>

        <div className="form-row">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/png, image/jpeg"
            required
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <h3>Accommodation Details Successfully Added</h3>
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventForm;