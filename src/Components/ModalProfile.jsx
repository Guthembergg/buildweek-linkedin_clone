import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";

function ModalProfile(props) {
  const [show, setShow] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: props.me.name,
    surname: props.me.surname,
    title: props.me.title,
    area: props.me.area,
  });

  const handleChange = (property, value) => {
    setProfileForm({ ...profileForm, [property]: value });
  };

  console.log(profileForm);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const PutFetch = async () => {
    try {
      const token = process.env.REACT_APP_TOKEN;
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/`,
        {
          method: "PUT",
          body: JSON.stringify(profileForm),
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
  };

  return (
    <>
      <HiOutlinePencil onClick={handleShow} />

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modifica introduzione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="position-relative">
          <Form onSubmit={handleSubmit}>
            <Form.Text className="text-muted">
              * Indica che è obbligatorio
            </Form.Text>
            <Form.Group className="mb-3">
              <Form.Label>Nome*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                defaultValue={props.me.name}
                value={profileForm.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cognome"
                defaultValue={props.me.surname}
                value={profileForm.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sommario*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Job"
                defaultValue={props.me.title}
                value={profileForm.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Form.Group>
            <Modal.Title>Posizione Attuale</Modal.Title>
            <div>DOBBIAMO INSERIRE IL MODALE EXPE</div>
            <Modal.Title>Formazione</Modal.Title>
            <Form.Group className="mb-3">
              <Form.Label>Formazione*</Form.Label>
              <Form.Select type="" aria-label="Formazione">
                <option>Epicode</option>
                <option>Bocconi</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Modal.Title>Località</Modal.Title>
              <Form.Label>Città*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Job"
                defaultValue={props.me.area}
                value={profileForm.area}
                onChange={(e) => handleChange("area", e.target.value)}
              />
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

export default ModalProfile;
