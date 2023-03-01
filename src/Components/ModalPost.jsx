import { useState } from "react";
import { Row, Col, Image, Form, Modal, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {
  BsFillCalendar2EventFill,
  BsFillPlayBtnFill,
  BsImageFill,
} from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";

function NewPostProva() {
  const [innerData, setInnerData] = useState({
    text: "",
  });

  const token = process.env.REACT_APP_TOKEN;

  const handleChange = (property, value) => {
    setInnerData({ [property]: value });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchNewsPost = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(innerData),
        }
      );
      if (response.ok) {
        /* const data = await response.json(); */
        console.log("News: fetch Post. if ok");
      } else {
        console.log("News: fetch Post. errore in if");
      }
    } catch (err) {
      console.log("News: fetch Post. err in catch");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNewsPost();
  };

  return (
    <>
      <>
        <Card body className="mb-3">
          <Row>
            <Col xs={2}>
              <Image
                roundedCircle={true}
                style={{ width: "50px" }}
                alt=""
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
            </Col>
            <Col xs={10}>
              <Form onClick={handleShow}>
                <Form.Group className="ms-0 m-2 ">
                  <Form.Control className="rounded-pill" type="text" placeholder="Avvia un post" />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center py-2">
            <Col xs={3} md={2} className="d-flex justify-content-center align-items-center">
              <BsImageFill  className="text-primary" /><span className="d-none d-md-block ms-2">Foto</span>
            </Col>
            <Col xs={3} md={2} className="d-flex justify-content-center align-items-center">
              <BsFillPlayBtnFill  className="text-success" />  <span className="d-none d-md-block ms-2">Video</span>
            </Col>
            <Col xs={3} md={2} className="d-flex justify-content-center align-items-center">
              <BsFillCalendar2EventFill style={{color: "brown"}} />  <span className="d-none d-md-block ms-2">Evento</span>
            </Col>
            <Col xs={3} md={4} className="d-flex justify-content-center align-items-center">
              <RiArticleFill style={{color: "orange"}} />  <span className="d-none d-md-block ms-2">Scrivi un articolo</span>
            </Col>
          </Row>
        </Card>
      </>

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
              <Form.Label>Nuovo post</Form.Label>
              <Form.Control
                aria-selected
                as="textarea"
                placeholder="Inserisci qui la tua bio"
                onChange={(e) => handleChange("text", e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <Form.Label>{innerData.text.length}/2600</Form.Label>
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
                Pubblica
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewPostProva;
