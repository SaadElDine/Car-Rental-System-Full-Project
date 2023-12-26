import React, { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {

  const [selectedOffice, setSelectedOffice] = useState("");

  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);
  };

  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Plate ID" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Pickup Date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time"
            type="time"
            placeholder="Pickup Time"
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <select
            value={selectedOffice}
            onChange={handleOfficeChange}
            required
            style={{width:"100%", paddingTop:9, paddingBottom:9}}
          >
          <option value="">Select an office</option>
          <option value="Alexandria">Alexandria</option>
          <option value="Cairo">Cairo</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <input type="number" placeholder="Price Range" required />
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
