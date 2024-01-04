import axios from "axios";
import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

export function AdminHome() {

  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [formData, setFormData] = useState({
    plateId: "",
    color: "",
    imageUrl: "",
    model: "",
    price: "",
  });

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Log the user object to ensure it's structured correctly
   
    const addcar = {
      plateId: data.plateId,
      color: data.color,
      imageUrl: data.imageUrl, // Assuming the backend expects contactInfo
      location: selectedOffice,
      model: data.model,
      price: data.price, // Password comes directly from state
      status: selectedStatus,
      year: data.year
    };
    console.log(addcar);
    try{
      const response = await axios.post("http://localhost:8080/cars/addcar", addcar);
      alert("New Car Added Successfully!");
    }
    catch(error){
      if (error.response) {
        if (error.response.status === 409) {
          alert("A Car with the same PlateId already exists.");
        } else if (error.response.status === 500) {
          alert("A Car with the same PlateId already exists");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        // The request was made but no response was received
        alert("There was a problem connecting to the server. Please check your connection and try again.");
      }
      console.error("Error registering customer", error);
    }
    
    
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Helmet title="Admin Home">
      {<CommonSection title="Register New Car" />}
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h4 className="fw-bold mb-4">Add New Car</h4>
              <Form onSubmit={onSubmit}>
                <FormGroup className="form__group">
                <label For="RegType">Plate ID:</label>
                  <input 
                    type="text" 
                    name="plateId"
                    placeholder="Plate ID" 
                    value={formData.plateId}
                    onChange={handleInputChange} 
                  />
                </FormGroup>

                <FormGroup className="form__group">
                <label For="RegType">Color:</label>
                  <input 
                    type="text" 
                    name="color"
                    placeholder="Color" 
                    value={formData.color}
                    onChange={handleInputChange} 
                  />
                </FormGroup>

                <FormGroup className="form__group">
                <label For="RegType">Image URL:</label>
                  <input 
                    type="text" 
                    name="imageUrl"
                    placeholder="Image URL" 
                    value={formData.imageUrl}
                    onChange={handleInputChange} 
                  />
                </FormGroup>

                <FormGroup className="select__group">
                <label For="RegType">Office:</label>
                  <select
                    name="office"
                    value={selectedOffice}
                    onChange={handleOfficeChange}
                  >
                    <option value="">Select An Office</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Cairo">Cairo</option>
                  </select>
                </FormGroup>

                <FormGroup className="form__group">
                <label For="RegType">Model:</label>
                  <input 
                    type="text" 
                    name="model"
                    placeholder="Model" 
                    value={formData.model}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup className="select__group">
                <label For="RegType">Status:</label>
                  <select
                    name="status"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="">Status</option>
                    <option value="Active">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Out Of Service">Out Of Service</option>
                  </select>
                </FormGroup>

                <FormGroup className="form__group">
                <label For="RegType">Price:</label>
                  <input 
                    type="number" 
                    name="price"
                    placeholder="Price (LE)" 
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                <label For="RegType">Year:</label>
                  <input 
                    type="number" 
                    name="year"
                    placeholder="Year" 
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <button className="contact__btn" type="submit">
                  Add New Car
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      
      
    </Helmet>
  );
};
