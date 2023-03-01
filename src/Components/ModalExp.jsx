import { React, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";

function ModalExp() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRuolo = (e) => {
    setModalInfo({ ...modalInfo, role: e.target.value });
  };

  const handleChangeCompagnia = (e) => {
    setModalInfo({ ...modalInfo, company: e.target.value });
  };

  const handleChangeImpiego = (e) => {
    setModalInfo({ ...modalInfo, description: e.target.value });
  };

  const handleChangeArea = (e) => {
    setModalInfo({ ...modalInfo, area: e.target.value });
  };

  const handleChangeDataIn = (e) => {
    setModalInfo({ ...modalInfo, startDate: e.target.value });
  };

  const handleChangeDataOut = (e) => {
    setModalInfo({ ...modalInfo, endDate: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_EXP", payload: modalInfo });
  };

  return (
    <>
      <AiOutlinePlus onClick={handleShow}></AiOutlinePlus>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Esperienza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control
                onChange={handleChangeRuolo}
                type="text"
                placeholder="Ruolo"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Compagnia</Form.Label>
              <Form.Control
                onChange={handleChangeCompagnia}
                type="text"
                placeholder="Compagnia"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrizione impiego</Form.Label>
              <Form.Control
                onChange={handleChangeImpiego}
                type="text"
                placeholder="Descrizione impiego"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                onChange={handleChangeArea}
                type="text"
                placeholder="Area"
              />
            </Form.Group>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data inizio</Form.Label>
                  <Form.Control onChange={handleChangeDataIn} type="date" />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data fine</Form.Label>
                  <Form.Control onChange={handleChangeDataOut} type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalExp;