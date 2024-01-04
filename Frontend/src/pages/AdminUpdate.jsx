import axios from "axios";
import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

export function AdminUpdate() {

  const [selectedStatus, setSelectedStatus] = useState("");
  const [formData, setFormData] = useState({
    plateId: "",
  });

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    try{
      const response = await axios.post("http://localhost:8080/cars/updatecar", data);
      alert("Car Status Updated Successfully!");
    }
    catch(error){
      if (error.response) {
        if (error.response.status === 409) {
          alert("A Car with this PlateId does not exist!");
        } else if (error.response.status === 500) {
          alert("A Car with this PlateId does not exist!");
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
    <Helmet title="Update Car Status">
      {<CommonSection title="Update Car Status" />}
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
                    required 
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
                    <option value="Available">Active</option>
                    <option value="Rented">Rented</option>
                    <option value="Out Of Service">Out Of Service</option>
                  </select>
                </FormGroup>

                <button className="contact__btn" type="submit">
                  Update Car Status
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      
      
    </Helmet>
  );
};
