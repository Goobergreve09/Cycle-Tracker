import {
  Container,
  Navbar,
  Nav,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap"; // Named imports from react-bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
export default function NavbarComponent() {
  // Exported as default
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
          {/* <Navbar.Brand href="#">
            <img
              src={Lola}
              width="75"
              height="75"
              className="d-inline-block align-top navbar"
              alt="logo"
            />
          </Navbar.Brand> */}
          <Nav className="mx-auto">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="calendar-tooltip">Calendar</Tooltip>}
            >
              <Nav.Link href="/">
                <i className="bi bi-calendar4-week navLogo"></i>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
          <Nav className="mx-auto">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="calendar-tooltip">Moods</Tooltip>}
            >
              <Nav.Link href="/">
                <i className="bi bi-emoji-smile navLogo"></i>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
          <Nav className="mx-auto">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="calendar-tooltip">Health</Tooltip>}
            >
              <Nav.Link href="/">
                <i className="bi bi-activity navLogo"></i>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
          <Nav className="mx-auto">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="calendar-tooltip">Diet</Tooltip>}
            >
              <Nav.Link href="/">
                <i className="bi bi-apple navLogo"></i>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
