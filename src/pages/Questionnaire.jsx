import { useState } from "react";
import DatePicker from "react-datepicker";
import LolaLogo from "../assets/images/period-logo4.png";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation

export default function Questionnaire() {
  const [prevCycleStartDate, setPrevCycleStartDate] = useState(null); // State to store the start date
  const [prevCycleEndDate, setPrevCycleEndDate] = useState(null); // State to store the end date
  const [recentCycleStartDate, setRecentCycleStartDate] = useState(null); // State to store the end date
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (prevCycleStartDate && prevCycleEndDate && recentCycleStartDate) {
      // Save the selected start and end dates to localStorage
      localStorage.setItem(
        "prevCycleStartDate",
        prevCycleStartDate.toISOString()
      );
      localStorage.setItem("prevCycleEndDate", prevCycleEndDate.toISOString());
      localStorage.setItem(
        "recentCycleStartDate",
        recentCycleStartDate.toISOString()
      );

      // Redirect user to the home screen ("/")
      navigate("/");
    } else {
      alert("Please select both dates.");
    }
  };

  return (
    <Container fluid className="p-3 questionnaireContainer">
      <Row>
        <Col xs={12} md={6} className="mx-auto text-center">
          <h2 className="text-center mb-5">Cycle Questionnaire <img src={LolaLogo}
          className="questionnaire-logo text-center"
          alt="site logo"
          ></img></h2>
          <Form onSubmit={handleSubmit}>
            {/* Question 1: Most recent cycle start date */}
            <Form.Group controlId="prevCycleStartDate">
              <Form.Label>
                When was the <span className="emphasizedWord">first</span> day
                of your previous cycle
              </Form.Label>

              <DatePicker
                selected={prevCycleStartDate}
                onChange={(date) => setPrevCycleStartDate(date)}
                dateFormat="MM/dd/yyyy"
                className="form-control m-3"
                placeholderText="Select a date"
              />
            </Form.Group>

            {/* Question 2: Most recent cycle end date */}
            <Form.Group controlId="prevCycleEndDate" className="mt-3">
              <Form.Label>
                When was the <span className="emphasizedWord">last</span> day of
                your previous cycle?
              </Form.Label>
              <DatePicker
                selected={prevCycleEndDate}
                onChange={(date) => setPrevCycleEndDate(date)}
                dateFormat="MM/dd/yyyy"
                className="form-control m-3"
                placeholderText="Select a date"
              />
            </Form.Group>

            <Form.Group controlId="recentCycleStartDate" className="mt-3">
              <Form.Label>
                When was the <span className="emphasizedWord">first</span> day
                of your <span className="emphasizedWord">most recent</span>{" "}
                cycle?
              </Form.Label>
              <DatePicker
                selected={recentCycleStartDate}
                onChange={(date) => setRecentCycleStartDate(date)}
                dateFormat="MM/dd/yyyy"
                className="form-control m-3"
                placeholderText="Select a date"
              />
            </Form.Group>

            <Button type="submit" className="mt-3" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
