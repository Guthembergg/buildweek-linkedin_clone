import { React, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";

function ModalExp(props) {
  const [resp, setResp] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_EXP", payload: modalInfo });
    handleSubmitFile(await ExperiencesGetFetch());
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
            <Form.Group>
              <Form.Label>Seleziona immagine da inserire</Form.Label>
              <Row className="pb-3 px-3">
                <Form.Control aria-selected type="file" onChange={handleFile} />
              </Row>
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
