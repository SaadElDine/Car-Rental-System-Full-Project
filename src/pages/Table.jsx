import React, { useState }  from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/contact.css";
import axios from "axios";

import "../styles/table.css";


export function Table() {

  const [reportType, setReportType] = useState("allReservations");
  const [reportData, setReportData] = useState([]);

  const onSubmit = async (event) => {

    try {
      const response = await axios.get("http://localhost:8080/reservationsall", localStorage.getItem("Search"));
      console.log(response);
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
                  <th>Reservation ID</th>
                  <th>Plate ID</th>
                  <th>Customer ID</th>
                  <th>Pickup Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((reportData, index) => (
                  <tr key={index}>
                    <td>{reportData.reservationId}</td>
                    <td>{reportData.plateId}</td>
                    <td>{reportData.customerId}</td>
                    <td>{reportData.pickUpDate}</td>
                    <td>{reportData.returnDate}</td>
                    <td>{reportData.reservationStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br></br>
          <br></br>
          <Form>
                <button className=" contact__btn" type="submit">
                  Export PDF
                </button>
          </Form>

        </Container>
      </section>
    </Helmet>
  );
};