import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Only store the first selected file
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // Optionally reset the form after submission
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
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
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
        </div>
        <div className="form-row">
          <label>Image 1:</label>
          <input
            type="file"
            name="image1"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Image 2:</label>
          <input
            type="file"
            name="image2"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Image 3:</label>
          <input
            type="file"
            name="image3"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddingForm;