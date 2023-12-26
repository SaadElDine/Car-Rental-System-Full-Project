import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import { Router, useNavigate } from "react-router-dom"; 
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); 
  };

  const handlePhoneChange = (event) => {
    // Get the input value and remove any non-numeric characters
    let inputValue = event.target.value.replace(/\D/g, '');
    
    if (inputValue.startsWith('01')) {
      inputValue = inputValue.substring(0, 11); // Limit to 11 digits if it starts with "01"
    } else {
      inputValue = ''; // Clear the input if it doesn't start with "01"
    }

    // Update the state with the cleaned phone number
    setPhoneNumber(inputValue);
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return; 
    }

    // If passwords match, proceed with form submission
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const { email } = data; 
    
    // Reset the passwords match state
    setPasswordsMatch(true);
    
    // if user is logged in
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("Email", email);
    window.location.reload();
    // Redirect to the home page 
    navigate("/home");
  };

  return (
    <Helmet title="Register">
      <CommonSection title="Registration" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Registration</h6>

              <Form onSubmit={onSubmit}>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Phone Number"
                    type="number"
                    name="phoneNumber"
                  //value={phoneNumber} 
                  //onChange={handlePhoneChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <input 
                    type="text" 
                    placeholder="Address"
                    name= "address"
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {!passwordsMatch && (
                    <span style={{ color: "red" }}>Passwords do not match</span>
                    
                  )}
                </FormGroup>

                <button className="contact__btn" type="submit">
                  Register
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

