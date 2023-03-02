import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch } from "react-redux";

function ModalInfo(props) {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({
    bio: props.me.bio,
  });
  const dispatch = useDispatch();
  const handleChange = (property, value) => {
    setInfo({ ...info, [property]: value });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const PutFetch = async () => {
    try {
      const token = process.env.REACT_APP_TOKEN;
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/`,
        {
          method: "PUT",
          body: JSON.stringify(info),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
      } else {
      }
    } catch (err) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PutFetch();
    dispatch({ type: "MODIFIED_INFO", payload: info });
  };

  console.log();

  return (
    <>
      <HiOutlinePencil onClick={handleShow}> </HiOutlinePencil>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modifica informazioni</Modal.Title>
        </Modal.Header>
        <Modal.Body className="position-relative">
          <Form onSubmit={handleSubmit}>
            <Form.Text className="text-muted">
              * Indica che è obbligatorio
            </Form.Text>
            <Form.Group className="mb-3">
              <Form.Label>
                Puoi includere anni di esperienza, settore o competenze
                acquisite. Potresti anche inserire i risultati raggiunti o le
                esperienze di lavoro precedenti.
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Inserisci qui la tua bio"
                value={info.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <Form.Label>{info.bio.length}/2600</Form.Label>
              </div>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  handleClose();
                }}
              >
                Salva
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalInfo;
