import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { Form, FormGroup } from "reactstrap";
import { Button } from "@mui/material";
import { useSearchParams } from 'react-router-dom';



const CarListing = () => {

  const [selectedOffice, setSelectedOffice] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [carData, setCarData] = useState([]);

  var currentUrl = window.location.href;

  var url = new URL(currentUrl);
  var searchParams = new URLSearchParams(url.search);
 

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

  const fetchData = (filters) => {
    const response = axios.post("http://localhost:8080/cars/search", filters)
      .then((response) => setCarData(response.data))
      .catch((error) => alert(error))
  }
  useEffect(() => {
    const filterObject = {}
    searchParams.forEach((value, key) => {
      filterObject[key] = value
    })
    fetchData(filterObject)
  }, [])
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data)
    console.log("SENDING...")

    try {
      const response = await axios.post("http://localhost:8080/cars/search", data);
      console.log("RECEIVING...")
      console.log(response.data)
      setCarData(response.data)
      localStorage.setItem("cardata", JSON.stringify(response.data));


    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          alert("An internal server error occurred, Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        // The request was made but no response was received
        alert("There was a problem connecting to the server. Please check your connection and try again.");
      }
      console.error("Error", error);
    }

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
          <Button onClick={() => fetchData()}>
            Clear filters
          </Button>
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

            {carData.map((item, index) => (
              <CarItem item={item} key={index} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
