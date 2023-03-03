import { React, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";

function ModalExp(props) {
  const [active, setActive] = useState(false);

  const [resp, setResp] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    role: "",
    company: "",
    description: "",
    area: "",
    startDate: "",
    endDate: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (property, value) => {
    setModalInfo({ ...modalInfo, [property]: value });
  };

  //!inizio
  const token = process.env.REACT_APP_TOKEN;
  const ExperiencesGetFetch = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${props.me._id}/experiences`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modalInfo),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const id = data._id;
        setResp(id);
        console.log(resp);
        return id;
      } else {
        console.log("mainPage: Experiences. errore in if");
      }
    } catch (err) {
      console.log("mainPage: Experiences. err in catch");
    }
  };
  const handleSubmitFile = async (expId) => {
    try {
      let res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${props.me._id}/experiences/${expId}/picture`,
        {
          method: "POST",
          body: fd,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log("foto post ok");
      } else {
        console.log("foto post bad");
      }
    } catch (err) {
      console.log("foto post catch");
    }
  };
  const [fd, setFd] = useState(new FormData());

  const handleFile = (ev) => {
    setFd((prev) => {
      //per cambiare i formData, bisogna "appendere" una nuova coppia chiave/valore, usando il metodo .append()
      prev.delete("experience"); //ricordatevi di svuotare il FormData prima :)
      prev.append("experience", ev.target.files[0]); //L'API richiede un "nome" diverso per ogni rotta, per caricare un'immagine ad un post, nel form data andra' inserito un valore con nome "post"
      return prev;
    });
    setActive(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (active) {
      await handleSubmitFile(await ExperiencesGetFetch());
    } else {
      await ExperiencesGetFetch();
    }

    dispatch({ type: "ADD_EXP", payload: modalInfo });
    setActive(false);
  };
  //!fine
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
                onChange={(e) => handleChange("role", e.target.value)}
                type="text"
                placeholder="Ruolo"
                value={modalInfo.role}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Compagnia</Form.Label>
              <Form.Control
                onChange={(e) => handleChange("company", e.target.value)}
                type="text"
                placeholder="Compagnia"
                value={modalInfo.company}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrizione impiego</Form.Label>
              <Form.Control
                onChange={(e) => handleChange("description", e.target.value)}
                type="text"
                placeholder="Descrizione impiego"
                value={modalInfo.description}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                onChange={(e) => handleChange("area", e.target.value)}
                type="text"
                placeholder="Area"
                value={modalInfo.area}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Seleziona media da inserire</Form.Label>
              <Row className="pb-3 px-3">
                <Form.Label>
                  <BsImageFill className="fs-2 text-primary" />
                  <Form.Control
                    className="d-none"
                    aria-selected
                    type="file"
                    onChange={handleFile}
                  />
                </Form.Label>
              </Row>
            </Form.Group>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data inizio</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    type="date"
                    value={modalInfo.startDate}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data fine</Form.Label>
                  <Form.Control
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    type="date"
                    value={modalInfo.endDate}
                  />
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
