import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddingForm.css";

const AddingForm = () => {
  const [formData, setFormData] = useState({
    placeName: "",
    district: "",
    city: "",
    location: "",
    direction: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
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
    
    // Place Name, District, City, Location validations
    if (!formData.placeName) newErrors.placeName = "Place Name cannot be empty";
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

    // Check for valid image file format
    ["image1", "image2", "image3"].forEach((imageField) => {
      const file = formData[imageField];
      if (file && !["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        newErrors[imageField] = "Invalid file format for image upload";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.placeName);
    formDataToSend.append("district", formData.district);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("direction", formData.direction);
    formDataToSend.append("description", formData.description);
    if (formData.image1) formDataToSend.append("images", formData.image1);
    if (formData.image2) formDataToSend.append("images", formData.image2);
    if (formData.image3) formDataToSend.append("images", formData.image3);

    try {
      const response = await axios.post("http://localhost:5000/api/createPlace", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);

      setFormData({
        placeName: "",
        district: "",
        city: "",
        location: "",
        direction: "",
        description: "",
        image1: null,
        image2: null,
        image3: null,
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/20');
  };

  return (
    <div className="add-place-form-container">
      <h2>Add New Place</h2>
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
          {errors.placeName && <p className="error-message">{errors.placeName}</p>}
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
          <label>Direction:</label>
          <input
            type="text"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            required
          />
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
        <div className="form-row">
          <label>Image 2:</label>
          <input
            type="file"
            name="image2"
            onChange={handleChange}
          />
          {errors.image2 && <p className="error-message">{errors.image2}</p>}
        </div>
        <div className="form-row">
          <label>Image 3:</label>
          <input
            type="file"
            name="image3"
            onChange={handleChange}
          />
          {errors.image3 && <p className="error-message">{errors.image3}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup1">
          <div className="popup-content1">
            <h3>Place Details Successfully Added to Database</h3>
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddingForm;
