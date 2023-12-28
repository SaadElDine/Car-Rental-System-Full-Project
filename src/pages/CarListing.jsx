import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { Form, FormGroup } from "reactstrap";

const CarListing = () => {

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
    console.log(data)
  }

  React.useEffect(() => {
    const isAtLeastOneFieldFilled = Object.values(formData).some((value) => value !== "");
    setIsFormValid(isAtLeastOneFieldFilled);
  }, [formData]);


  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
          <h2 className="section__title">Search By:</h2>
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

            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
