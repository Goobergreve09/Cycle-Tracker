import { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import LolaLogo from "../assets/images/period-logo4.png";
import ResetModal from "../Components/ResetModal";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Home() {
  const [date, setDate] = useState(new Date()); // State to manage the selected date
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("Set Cycle"); // Default button text
  const [cyclePhase, setCyclePhase] = useState(null); // State for current cycle phase
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Retrieve the cycle data from localStorage
    const prevCycleStartDate = new Date(localStorage.getItem("prevCycleStartDate"));
    const prevCycleEndDate = new Date(localStorage.getItem("prevCycleEndDate"));
    const recentCycleStartDate = new Date(localStorage.getItem("recentCycleStartDate"));
    const today = new Date();

    // Calculate the current phase based on the dates
    const calculatePhase = () => {
      if (today >= prevCycleStartDate && today <= prevCycleEndDate) {
        return "Menstrual";
      } else if (today > prevCycleEndDate && today < recentCycleStartDate) {
        const ovulationDate = new Date(recentCycleStartDate);
        ovulationDate.setDate(recentCycleStartDate.getDate() - 14); // Ovulation assumed to be 14 days before next period
        
        if (today < ovulationDate) {
          return "Follicular";
        } else if (today.getTime() === ovulationDate.getTime()) {
          return "Ovulatory";
        } else {
          return "Luteal";
        }
      }
    };

    // Set the current phase
    const currentPhase = calculatePhase();
    setCyclePhase(currentPhase);

    // Update button text if cycle data exists
    if (localStorage.getItem("prevCycleStartDate")) {
      setButtonText("Reset Cycle"); // Change button text if cycleStartDate exists
    }
  }, []);

  const getTileColor = (date) => {
    // Retrieve the saved cycle data
    const prevCycleStartDate = new Date(localStorage.getItem("prevCycleStartDate"));
    const prevCycleEndDate = new Date(localStorage.getItem("prevCycleEndDate"));
    const recentCycleStartDate = new Date(localStorage.getItem("recentCycleStartDate"));
    const ovulationDate = new Date(recentCycleStartDate);
    ovulationDate.setDate(recentCycleStartDate.getDate() - 14);

    // Determine which phase the date belongs to and apply the respective class
    if (date >= prevCycleStartDate && date <= prevCycleEndDate) {
      return "menstrual-phase"; // Color for Menstrual phase
    } else if (date > prevCycleEndDate && date < ovulationDate) {
      return "follicular-phase"; // Color for Follicular phase
    } else if (date.getTime() === ovulationDate.getTime()) {
      return "ovulatory-phase"; // Color for Ovulation phase
    } else if (date > ovulationDate && date < recentCycleStartDate) {
      return "luteal-phase"; // Color for Luteal phase
    } else {
      return ""; // No specific phase
    }
  };

  const handleReset = () => {
    // If the button says "Reset Cycle", show the modal, otherwise navigate to questionnaire
    if (buttonText === "Reset Cycle") {
      setShowModal(true);
    } else {
      navigate("/questionnaire");
    }
  };

  const handleConfirmReset = () => {
    // Remove cycleStartDate and cycleEndDate from localStorage
    localStorage.removeItem("prevCycleStartDate");
    localStorage.removeItem("prevCycleEndDate");
    localStorage.removeItem("recentCycleStartDate");

    // Redirect to the questionnaire page
    navigate("/questionnaire");
  };

  return (
    <Container fluid className="calendar-container bg-dark">
      <Row className="logo-row">
        <Col className="text-center">
          <img
            src={LolaLogo}
            className="calendar-logo"
            alt="Lola logo and slogan"
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          m={12}
          className="text-center d-flex justify-content-center"
        >
          <Calendar
            onChange={setDate}
            value={date}
            className="full-page-calendar text-center bg-dark" // Apply custom CSS class
            tileClassName={({ date }) => getTileColor(date)} // Apply dynamic class names for phases
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="bg-dark m-3 resetCyclebutton w-100"
            onClick={handleReset}
          >
            {buttonText} {/* Dynamically display button text */}
          </Button>
          <ResetModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleConfirmReset} // Trigger cycle reset and navigation
          />
        </Col>
      </Row>
    </Container>
  );
}


