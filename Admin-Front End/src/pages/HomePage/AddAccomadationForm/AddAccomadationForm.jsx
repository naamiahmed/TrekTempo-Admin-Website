import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddAccomadationForm.css";

const AddAccomadationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    district: "",
    place: "",
    budget: "",
    locationLink: "",
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
    if (!formData.district) newErrors.district = "District cannot be empty";
    if (!formData.place) newErrors.place = "Place cannot be empty";
    if (!formData.budget) newErrors.budget = "Please select a budget category";
    if (!formData.locationLink) newErrors.locationLink = "Location link cannot be empty";
    if (!formData.dayCost) newErrors.dayCost = "Day cost cannot be empty";
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
      const response = await axios.post(
        "http://localhost:5000/api/createAccommodation",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Accommodation submitted successfully:", response.data);
      setFormData({
        name: "",
        description: "",
        phone: "",
        district: "",
        place: "",
        budget: "",
        locationLink: "",
        dayCost: "",
        image: null,
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting the accommodation:", error);
    }
  };

  return (
    <div className="add-accommodation-form-container">
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
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
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
          <label>Budget Category:</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Select Budget Category</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.budget && <p className="error-message">{errors.budget}</p>}
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
            accept="image/png, image/jpeg"
            required
          />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Accommodation Details Successfully Added</h3>
            <button onClick={() => {
              setShowPopup(false);
              navigate('/accommodations');
            }}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAccomadationForm;