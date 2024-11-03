import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddAccomadationForm.css";

const AddAccomadationForm = () => {
  const [formData, setFormData] = useState({
    district: "",
    name: "",
    description: "",
    location: "",
    budget: "",
    locationLink: "",
    contact: "",
    dayCost: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user starts typing
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.district) newErrors.district = "District cannot be empty";
    if (!formData.name) newErrors.name = "Name cannot be empty";
    if (!formData.description) newErrors.description = "Description cannot be empty";
    if (!formData.location) newErrors.location = "Location cannot be empty";
    if (!formData.budget) newErrors.budget = "Please select a budget";
    if (!formData.locationLink) newErrors.locationLink = "Location link cannot be empty";
    if (!formData.contact) newErrors.contact = "Contact number cannot be empty";
    if (!formData.dayCost) newErrors.dayCost = "Day cost cannot be empty";

    // Check for valid image file format
    if (formData.image && !["image/png", "image/jpeg"].includes(formData.image.type)) {
      newErrors.image = "Invalid file format for image upload. Only PNG and JPEG are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("district", formData.district);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("budget", formData.budget);
    formDataToSend.append("locationLink", formData.locationLink);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("dayCost", formData.dayCost);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/createAccommodation", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Accommodation submitted successfully:", response.data);

      setFormData({
        district: "",
        name: "",
        description: "",
        location: "",
        budget: "",
        locationLink: "",
        contact: "",
        dayCost: "",
        image: null,
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting the accommodation:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/add-accommodation');
  };

  return (
    <div className="add-accommodation-form-container">
      <h2>Add New Accommodation</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Budget:</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
          {errors.budget && <p className="error-message">{errors.budget}</p>}
        </div>
        <div className="form-row">
          <label>Location Link:</label>
          <input
            type="text"
            name="locationLink"
            value={formData.locationLink}
            onChange={handleChange}
            required
          />
          {errors.locationLink && <p className="error-message">{errors.locationLink}</p>}
        </div>
        <div className="form-row">
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          {errors.contact && <p className="error-message">{errors.contact}</p>}
        </div>
        <div className="form-row">
          <label>Day Cost:</label>
          <input
            type="number"
            name="dayCost"
            value={formData.dayCost}
            onChange={handleChange}
            required
          />
          {errors.dayCost && <p className="error-message">{errors.dayCost}</p>}
        </div>
        <div className="form-row">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Accommodation Details Successfully Added to Database</h3>
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAccomadationForm;
