import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import "../styles/table.css";
import "../styles/contact.css";

export function AdminReport() {

  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [reportData, setReportData] = useState([]);
  const [plateId, setPlateId] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      let response;
      if (reportType === "allReservations") {
        response = await axios.get("http://localhost:8080/reports/reservations", { params: data });
      }

      else if (reportType === "reservationsByCar") {
        const { plateId, startDate, endDate } = data;
        response = await axios.get('http://localhost:8080/reports/reservations2', {
        params: {
        plateId,
        fromDate: startDate,
        toDate: endDate
        }
        });
      } 

      else if (reportType === "carStatus") {
        const { specificDate } = data;
        response = await axios.get(`http://localhost:8080/cars/availability`, {
        params: { date: specificDate },
        });
      }
       
      else if (reportType === "dailyPayments") {
        response = await axios.get('http://localhost:8080/reports/reservation5', {
        params: data
        });
      }
      else if (reportType === "customerReservations") {
        response = await axios.get('http://localhost:8080/reports/reservation4', {
        params: data
        });
      }

      console.log(response.data);
      setReportData(response.data);
    }
      catch (error) {
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
                required
              >
                <option value="">Choose Report</option>
                <option value="allReservations">All Reservations</option>
                <option value="reservationsByCar">Reservations by Car</option>
                <option value="carStatus">Car Status</option>
                <option value="customerReservations">Customer Reservations</option>
                <option value="dailyPayments">Daily Payments</option>
              </Input>
            </FormGroup>
            {(reportType === "allReservations") && (
              <>
                <FormGroup>
                  <Label for="startDate">Start Date:</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="MM/DD/YYYY"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDate">End Date:</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="MM/DD/YYYY"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </>
            )}
            {(reportType === "reservationsByCar") && (
              <>
                <FormGroup>
                  <Label for="plateId">Plate ID:</Label>
                  <Input
                    type="text"
                    name="plateId"
                    id="plateId"
                    placeholder="Plate ID"
                    value={plateId}
                    onChange={(e) => setPlateId(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="startDate">Start Date:</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="MM/DD/YYYY"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDate">End Date:</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="MM/DD/YYYY"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
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
                  placeholder="MM/DD/YYYY"
                  value={specificDate}
                  onChange={(e) => setSpecificDate(e.target.value)}
                  required
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
                  placeholder="Customer ID"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
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
                    placeholder="MM/DD/YYYY"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDate">End Date:</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="MM/DD/YYYY"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </>
            )}
            <button className="contact__btn" type="submit">
              Get Report
            </button>
          </Form>
          <br></br>
          <br></br>
          <div>
            <h2>Reservations: </h2>
            <table>
              <thead>
                <tr>
                  <th>Reservation ID</th>
                  <th>Plate ID</th>
                  <th>Customer ID</th>
                  <th>Pickup Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Color</th>
                  <th>Model</th>
                  <th>Car Status</th>
                  <th>Price Per Day</th>
                  <th>Total Price</th>
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
                    <td>{reportData.color}</td>
                    <td>{reportData.model}</td>
                    <td>{reportData.carStatus}</td>
                    <td>{reportData.price}</td>
                    <td>{reportData.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
            <Form>
                <button className=" contact__btn" type="submit">
                  Export PDF
                </button>
            </Form>
          </div>


        </Container>
      </section>
    </Helmet>
  );
}
