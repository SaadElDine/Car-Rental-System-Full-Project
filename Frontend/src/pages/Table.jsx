import React, { useState }  from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/contact.css";
import axios from "axios";

import "../styles/table.css";


export function Table() {

  const [reportType, setReportType] = useState("");
  const [reportData, setReportData] = useState([]);

  const onClick = async() => {

    try {
      console.log(localStorage.getItem("Search"));
      const searchTerm = localStorage.getItem("Search");
      const response = await axios.get("http://localhost:8080/cars/advanced", {
      params: { searchTerm }
      });
      console.log(response.data);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data", error);
    }
  };

  return (
    <Helmet title="Table">
      <CommonSection title="Searching..." />
      <section>
        <Container>
          <br></br>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Car PlateID</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>Location</th>
                  <th>Price/Day</th>
                  <th>Status</th>
                  <th>Year</th>
                  <th>Customer Name</th>
                  <th>Customer SSN</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Reservation ID</th>
                  <th>Pickup Date</th>
                  <th>Return Date</th>
                  <th>Reservation Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((reportData, index) => (
                  <tr key={index}>
                  <td>{reportData.car?.plateId || "N/A"}</td>
                  <td>{reportData.car?.model || "N/A"}</td>
                  <td>{reportData.car?.color || "N/A"}</td>
                  <td>{reportData.car?.location || "N/A"}</td>
                  <td>{reportData.car?.price || "N/A"}</td>
                  <td>{reportData.car?.status || "N/A"}</td>
                  <td>{reportData.car?.year || "N/A"}</td>
                  <td>{reportData.customer?.name || "N/A"}</td>
                  <td>{reportData.customer?.customerId || "N/A"}</td>
                  <td>{reportData.customer?.email || "N/A"}</td>
                  <td>{reportData.customer?.contactInfo || "N/A"}</td>
                  <td>{reportData.customer?.address || "N/A"}</td>
                  <td>{reportData.reservation?.reservationId || "N/A"}</td>
                  <td>{reportData.reservation?.pickUpDate || "N/A"}</td>
                  <td>{reportData.reservation?.returnDate || "N/A"}</td>
                  <td>{reportData.reservation?.reservationStatus || "N/A"}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br></br>
          <br></br>
          <button className=" contact__btn" onClick={onClick}>
            Show Result
          </button>
        </Container>
      </section>
    </Helmet>
  );
};