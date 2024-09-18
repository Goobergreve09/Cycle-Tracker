// ResetModal.jsx

import { Modal, Button } from "react-bootstrap";

const ResetModal = ({ show, onHide, onConfirm }) => (
  <Modal show={show} onHide={onHide} className="custom-modal">
    <Modal.Header closeButton>
      <Modal.Title className="text-dark d-flex justify-content-center">
        Confirm Reset
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-dark text-center">
      Are you sure you would like to restart your cycle?
    </Modal.Body>
    <Modal.Body className="text-dark text-center pt-0 italic">
      This will remove all current cycles on the calendar. Your diet, health,
      and mood history will <span className="emphasizedWord">NOT</span> be deleted.{" "}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={onHide}>
        Cancel
      </Button>
      <Button
        variant="dark"
        onClick={() => {
          onConfirm();
          onHide();
        }}
      >
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ResetModal;
