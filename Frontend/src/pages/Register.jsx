import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input, InputGroup, Button } from "reactstrap";
import { Router, useNavigate } from "react-router-dom"; 
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";


import "../styles/contact.css";

export function RegisterPage() {
  const navigate = useNavigate();
  const navigate1 = useNavigate();
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

  const handleAlreadyHaveAnAccountClick = () => {
    navigate1("/login");
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return; 
    }

    // If passwords match, proceed with form submission
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const { email } = data; 
    //console.log(data);
    // Reset the passwords match state
    setPasswordsMatch(true);
    const user = {
      customerId: data.CustomerID,
      address: data.address,
      contactInfo: data.phoneNumber, // Assuming the backend expects contactInfo
      email: data.email,
      name: data.name,
      password: password, // Password comes directly from state
    };
  
    // Log the user object to ensure it's structured correctly
    console.log(user);
    // if user is logged in
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("Email", email);
    try {
      const response = await axios.post("http://localhost:8080/customers/register", user);
      
      // If the registration is successful, set loggedIn state and redirect
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("Email", data.email);
      navigate("/home"); // Redirect to the home page
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert("A customer with the same information already exists.");
        } else if (error.response.status === 500) {
          alert("An internal server error occurred ya hamoksha. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        // The request was made but no response was received
        alert("There was a problem connecting to the server. Please check your connection and try again.");
      }
      console.error("Error registering customer", error);
    }
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
                    placeholder="Name"
                    type="name"
                    name="name"
                    required
                  />
                </FormGroup>
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
                    placeholder="SSN"
                    type="number"
                    name="CustomerID"
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
                  <Input 
                    type="text" 
                    placeholder="Address"
                    name= "address"
                    required
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                      <Button onClick={togglePasswordVisibility}>
                        <i className={showPassword ? "ri-eye-close-line" : "ri-eye-line"}></i>
                      </Button>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="contact__form">
                  <InputGroup>
                    <Input
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"} 
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                      <Button onClick={toggleConfirmPasswordVisibility}>
                        <i className={showConfirmPassword ? "ri-eye-close-line" : "ri-eye-line"}></i>
                      </Button>
                  </InputGroup>
                  {!passwordsMatch && (
                    <span style={{ color: "red" }}>Passwords do not match</span>
                  )}
                  <span className="forgot-password-link">
                    <a href="#" onClick={handleAlreadyHaveAnAccountClick}>
                      Already Have An Account?
                    </a>{" "}
                  </span>
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