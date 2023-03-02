import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
function ModalProfile(props) {
  const token = process.env.REACT_APP_TOKEN;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: props.me.name,
    surname: props.me.surname,
    title: props.me.title,
    area: props.me.area,
  });
  const [resp, setResp] = useState();
  const [fd, setFd] = useState(new FormData());
  const myProfileId = useSelector((state) => state.myProfile._id);
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
        const data = response.json();
      } else {
      }
    } catch (err) {}
  };

  //!inizio

  const handleSubmitFile = async () => {
    try {
      let res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${myProfileId}/picture`,
        {
          method: "POST",
          body: fd,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        console.log("foto ok");
      } else {
      }
    } catch (err) {}
  };

  const handleFile = (ev) => {
    setFd((prev) => {
      //per cambiare i formData, bisogna "appendere" una nuova coppia chiave/valore, usando il metodo .append()
      prev.delete("profile"); //ricordatevi di svuotare il FormData prima :)
      prev.append("profile", ev.target.files[0]); //L'API richiede un "nome" diverso per ogni rotta, per caricare un'immagine ad un post, nel form data andra' inserito un valore con nome "post"
      return prev;
    });
  };

  //!fine

  const handleSubmit = (e) => {
    e.preventDefault();
    PutFetch();
    handleSubmitFile();
    dispatch({ type: "MODIFIED_BIO", payload: profileForm });
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
              <Form.Control aria-selected type="file" onChange={handleFile} />
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
