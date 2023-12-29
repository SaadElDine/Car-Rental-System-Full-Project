import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

import "../styles/contact.css";

export function AdminReport() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("allReservations");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [reportData, setReportData] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      let response;
      if (reportType === "allReservations" || reportType === "reservationsByCar") {
        response = await axios.get("http://localhost:8080/reservations", { params: data });
      } else if (reportType === "carStatus") {
        response = await axios.get(`http://localhost:8080/cars/status/${specificDate}`);
      } else if (reportType === "customerReservations") {
        response = await axios.get(`http://localhost:8080/customers/${customerId}/reservations`);
      } else if (reportType === "dailyPayments") {
        response = await axios.get("http://localhost:8080/payments", { params: data });
      }
      console.log(response.data);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data", error);
    }
  };

  return (
    <Helmet title="Admin Report">
      <CommonSection title="Report" />
      <section>
        <Container>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="reportType">Select Report Type:</Label>
              <Input
                type="select"
                name="reportType"
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="allReservations">All Reservations</option>
                <option value="reservationsByCar">Reservations by Car</option>
                <option value="carStatus">Car Status</option>
                <option value="customerReservations">Customer Reservations</option>
                <option value="dailyPayments">Daily Payments</option>
              </Input>
            </FormGroup>
            {(reportType === "allReservations" ||
              reportType === "reservationsByCar") && (
              <>
                <FormGroup>
                  <Label for="startDate">Start Date:</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDate">End Date:</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </>
            )}
            {reportType === "carStatus" && (
              <FormGroup>
                <Label for="specificDate">Specific Date:</Label>
                <Input
                  type="date"
                  name="specificDate"
                  id="specificDate"
                  value={specificDate}
                  onChange={(e) => setSpecificDate(e.target.value)}
                />
              </FormGroup>
            )}
            {reportType === "customerReservations" && (
              <FormGroup>
                <Label for="customerId">Customer ID:</Label>
                <Input
                  type="text"
                  name="customerId"
                  id="customerId"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </FormGroup>
            )}
            {reportType === "dailyPayments" && (
              <>
                <FormGroup>
                  <Label for="startDate">Start Date:</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDate">End Date:</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </>
            )}
            <button className="contact__btn" type="submit">
              Get Report
            </button>
          </Form>
          
          <div>
            <h2>Reservations</h2>
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

        </Container>
      </section>
    </Helmet>
  );
}
