import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

export function Table() {
  return (
    <Helmet title="Table">
      {<CommonSection title="Report" />}
      <section>
        <Container>

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