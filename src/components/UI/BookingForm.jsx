import React from "react";
import "../../styles/booking-form.css";
import axios from 'axios';
import { Form, FormGroup } from "reactstrap";

const BookingForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={submitHandler}>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="customer_id" placeholder="Enter your national ID" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" placeholder="Phone Number" />
      </FormGroup>
      {/* BEGIN: ed8c6549bwf9 */}
      {/* <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select name="" id="">
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup> */}
      {/* END: ed8c6549bwf9 */}

      {/* <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select name="" id="">
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </select>
      </FormGroup> */}

      <h3 className="booking__form d-inline-block me-4 mb-4">From</h3>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="date" placeholder="Journey Start Date" />
      </FormGroup>
      <h3 className="booking__form d-inline-block me-4 mb-4">To</h3>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="date" placeholder="Journey End Date" />
      </FormGroup>
      
    </Form>
  );
};

export default BookingForm;
