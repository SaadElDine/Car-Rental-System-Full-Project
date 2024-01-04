import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input, InputGroup, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import "../styles/contact.css";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const handleForgotPasswordClick = () => {
    // Add logic to send a password reset email to the user
    alert("A password reset email will be sent to your email address.");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Form Data from the event
    const formData = new FormData(event.target);
    const loginDetails = Object.fromEntries(formData.entries());

    // Prepare the loginDetails object for the API
    const user = {
      email: loginDetails.email,
      password: loginDetails.password, // Password from the form
    };

    try {
      // POST request to the Login API endpoint
      const response = await axios.post("http://localhost:8080/customers/login", user);

      if (response.status === 200) {
        // If login is successful, set loggedIn state and redirect
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("Email", user.email);
        navigate("/home"); // Redirect to the home page
        alert("Login successful");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Login failed: Invalid email or password");
        } else {
          // Handle other HTTP status codes appropriately
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        // The request was made but no response was received
        alert("There was a problem connecting to the server. Please check your connection and try again.");
      }
      console.error("Error logging in customer", error);
    }
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Login</h6>

              <Form onSubmit={onSubmit}>
                
                <FormGroup className="contact__form">
                  <Input 
                    placeholder="Email" 
                    type="email" 
                    name="email" 
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"} 
                      name="password"
                    />
                      <Button onClick={togglePasswordVisibility}>
                        <i className={showPassword ? "ri-eye-close-line" : "ri-eye-line"}></i>
                      </Button>

                  </InputGroup>
                  <span className="forgot-password-link">
                    <a href="#" onClick={handleForgotPasswordClick}>
                      Forgot Password?
                    </a>{" "}
                    We will contact you via email to handle this issue.
                  </span>
                </FormGroup>

                <button className="contact__btn" type="submit">
                  Login
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}