import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios
import { Container, Row, Col, Form, FormGroup, Input, InputGroup, Button  } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/contact.css";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
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
  
    // Prepare the admin login details object for the API
    const adminCredentials = {
      email: loginDetails.email,
      password: loginDetails.password, // Password from the form
    };
  
    try {
      // POST request to the Admin Login API endpoint
      const response = await axios.post("http://localhost:8080/admins/login", adminCredentials);
  
      if (response.status === 200) {
        // If login is successful, set adminLoggedIn state and redirect
        localStorage.setItem("adminLoggedIn", true);
        localStorage.setItem("adminEmail", adminCredentials.email);
        navigate("/admin/home"); // Redirect to the admin home page
        alert("Admin Login successful");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Handle 401 Unauthorized error
          alert("Login failed: Invalid email or password");
        } else {
          // Handle other HTTP status codes appropriately
          alert("An unexpected error occurred. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert("There was a problem connecting to the server. Please check your connection and try again.");
      } else {
        // Something happened in setting up the request that triggered an error
        alert("Error: ", error.message);
      }
      console.error("Error logging in admin", error);
    }
  };
  

  return (
    <Helmet title="Admin Login">
      {<CommonSection title="Admin Login" /> }
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Admin Login</h6>

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

