import React, { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import CarListing from "../../pages/CarListing";
import { Router, useNavigate } from "react-router-dom"; 

const FindCarForm = () => {

  const navigate = useNavigate();
  const [selectedOffice, setSelectedOffice] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);
  };

  const [formData, setFormData] = useState({
    plateId: "",
    model: "",
    year: "",
    priceRange: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const queryParams = new URLSearchParams(data).toString(); 
    navigate(`/cars?${queryParams}`);
  }

  React.useEffect(() => {
    const isAtLeastOneFieldFilled = Object.values(formData).some((value) => value !== "");
    setIsFormValid(isAtLeastOneFieldFilled);
  }, [formData]);


  return (
    <Form className="form" onSubmit={onSubmit}> 
       <div className=" d-flex align-items-center justify-content-between flex-wrap">

         <FormGroup className="form__group">
          <input 
            type="text" 
            name="plateId"
            placeholder="Plate ID" 
            value={formData.plateId}
            onChange={handleInputChange} 
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input 
            type="text" 
            name="model"
            placeholder="Model" 
            value={formData.model}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input 
            type="text" 
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup className="select__group">
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
          <input 
            type="number" 
            name="priceRange"
            placeholder="Price Range" 
            value={formData.priceRange}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup className="form__group">
          <button 
            className="btn find__car-btn"
            disabled={!isFormValid}
            type="submit"
          >
            Find Car
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
