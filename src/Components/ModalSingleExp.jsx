import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { BsImageFill } from "react-icons/bs";

function ModalSingleExp({ e, me }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    role: e.role,
    company: e.company,
    description: e.description,
    area: e.area,
    startDate: "",
    endDate: "",
  });
  const [fd, setFd] = useState(new FormData());
  const handleChange = (property, value) => {
    setModalInfo({ ...modalInfo, [property]: value });
  };
  const token = process.env.REACT_APP_TOKEN;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    dispatch({ type: "ADD_EXP", payload: modalInfo });
  };
  const handleSubmitFile = async () => {
    try {
      let res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${me}/experiences/${e._id}/picture`,
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

  const handleFile = (ev) => {
    setFd((prev) => {
      prev.delete("experience");
      prev.append("experience", ev.target.files[0]);
      return prev;
    });
    setActive(true);
  };
  const ModalSingleFetch = async (ourMethod, ourBody) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${me}/experiences/${e._id}`,
        {
          method: ourMethod,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ourBody),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("data modalSingleEpx", data);
      } else {
        console.log("mainPage: Experiences. errore in if");
      }
    } catch (err) {
      console.log("mainPage: Experiences. err in catch");
    }
  };

  return (
    <>
      <HiOutlinePencil onClick={handleShow}></HiOutlinePencil>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modifica Esperienza</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              ModalSingleFetch("DELETE", modalInfo);
              dispatch({ type: "DELETED_EXPERIENCE", payload: modalInfo });
              setActive(false);
            }}
          >
            Delete
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={async () => {
              handleClose();
              ModalSingleFetch("PUT", modalInfo);
              if (active) {
                await handleSubmitFile();
              }
              dispatch({ type: "MODIFIED_EXPERIENCE", payload: modalInfo });
              setActive(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSingleExp;
