import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const onSubmit = (event) => {
    event.preventDefault();
    navigate("/AdminHome");
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // I have to call the backend on api /login with the data I have.
    // You can use axios to call the backend
    //If kolo taht el saytara
    //navigate("Somewhere for data manipulation");
    // in case error we can notify the user
    //alert("Wrong email or password");
    // do whatever you want
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const handleForgotPasswordClick = () => {
    // Add logic to send a password reset email to the user
    alert("A password reset email will be sent to your email address.");
  };

  return (
    <Helmet title="Admin Login">
      {<CommonSection title="Admin Login" /> }
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Login</h6>

              <Form onSubmit={onSubmit}>
                
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" name="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"} // Conditionally change the type based on showPassword state
                    name="password"
                  />
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
