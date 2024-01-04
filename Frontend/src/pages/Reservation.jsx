import axios from "axios";
import "../styles/table.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

export function Reservation() {

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [formData, setFormData] = useState({
    customerId:"",
    plateId: "",
    pickup:"",
    return:"",
    status:"active",
    //total calculated price?
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    navigate("/cars");

    console.log(data);
    const res = {
      customerId: data.customerId,
      pickUpDate: data.pickUpDate,
      returnDate: data.returnDate, // Assuming the backend expects contactInfo
      reservationStatus: "Reserved",
      plateId: data.plateId,
    };
     try{
       const response = await axios.post("http://localhost:8080/reservations", res);
       alert("Reservation Accepted Successfully!");
     }
     catch(error){
       if (error.response) {
         if (error.response.status === 500) {
           alert("Car Reservation Conflict!");
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
    <Helmet title="Reservation">
      {<CommonSection title="Reservation" />}
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h4 className="fw-bold mb-4">Enter Your Reservation Data:</h4>
              <Form onSubmit={onSubmit}>
                <FormGroup className="form__group">
                <label For="RegType">Customer ID:</label>
                  <input 
                    type="text" 
                    name="customerId"
                    placeholder="Customer ID" 
                    value={formData.customerId}
                    onChange={handleInputChange}
                    required 
                  />
                </FormGroup>
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
                <FormGroup className="form__group">
                <label For="RegType">Pickup Date:</label>
                  <input  
                    type="date"
                    name="pickUpDate"
                    id="pickUpDate"
                    placeholder="MM/DD/YYYY"
                    value={formData.pickUpDate}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                <label For="RegType">Return Date:</label>
                  <input  
                    type="date"
                    name="returnDate"
                    id="returnDate"
                    placeholder="MM/DD/YYYY"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <button className="contact__btn" type="submit">
                  Reserve
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      
      
    </Helmet>
  );
};
