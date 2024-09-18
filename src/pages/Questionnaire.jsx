import { useState } from "react";
import DatePicker from "react-datepicker";
import LolaLogo from "../assets/images/period-logo4.png";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Questionnaire() {
  const [prevCycleStartDate, setPrevCycleStartDate] = useState(null);
  const [prevCycleEndDate, setPrevCycleEndDate] = useState(null);
  const [recentCycleStartDate, setRecentCycleStartDate] = useState(null);
  const [menstrualNumDays, setMenstrualNumDays] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Reset error state
    setError("");
  
    // Validate if the previous cycle end date is before the start date
    if (prevCycleEndDate && prevCycleStartDate && prevCycleEndDate < prevCycleStartDate) {
      setError("The last day of the previous cycle cannot be before the first day of the previous cycle.");
      return;
    }
  
    // Validate if the most recent cycle start date is before the previous cycle end date
    if (recentCycleStartDate && prevCycleEndDate && recentCycleStartDate < prevCycleEndDate) {
      setError("The first day of the most recent cycle cannot be before the last day of the previous cycle.");
      return;
    }
  
    if (prevCycleStartDate && prevCycleEndDate && recentCycleStartDate) {
      // Calculate the number of days between prevCycleStartDate and prevCycleEndDate
      const startDate = new Date(prevCycleStartDate);
      const endDate = new Date(prevCycleEndDate);
  
      // Calculate the difference in milliseconds and convert it to days
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include both start and end dates
  
      // Save the selected start and end dates to localStorage
      localStorage.setItem("prevCycleStartDate", prevCycleStartDate.toISOString());
      localStorage.setItem("prevCycleEndDate", prevCycleEndDate.toISOString());
      localStorage.setItem("recentCycleStartDate", recentCycleStartDate.toISOString());
      localStorage.setItem("menstrualNumDays", differenceInDays.toString()); // Save days as a string
  
      // Redirect user to the home screen ("/")
      navigate("/");
    } else {
      setError("Please select all the required dates.");
    }
  };
  

  return (
    <Container fluid className="p-3 questionnaireContainer">
      <Row>
        <Col xs={12} md={6} className="mx-auto text-center">
          <h2 className="text-center mb-5">
            Cycle Questionnaire{" "}
            <img
              src={LolaLogo}
              className="questionnaire-logo text-center"
              alt="site logo"
            />
          </h2>
          <Form onSubmit={handleSubmit}>
            {/* Display Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Question 1: Previous cycle start date */}
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

            {/* Question 2: Previous cycle end date */}
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

            {/* Question 3: Most recent cycle start date */}
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



