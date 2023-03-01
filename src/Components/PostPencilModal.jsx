import { useState } from "react";
import {
  Row,
  Col,
  Image,
  Form,
  Modal,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {
  BsFillCalendar2EventFill,
  BsFillPlayBtnFill,
  BsImageFill,
} from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";

function NewPostProva(props) {
  const [innerData, setInnerData] = useState({
    text: props.text,
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
        `https://striveschool-api.herokuapp.com/api/posts/${props.id}`,
        {
          method: "PUT",
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
        <NavDropdown.Item onClick={handleShow}>
          <HiOutlinePencil />
        </NavDropdown.Item>
      </>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modifica informazioni</Modal.Title>
        </Modal.Header>
        <Modal.Body className="position-relative">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Modifica il tuo post</Form.Label>
              <Form.Control
                aria-selected
                as="textarea"
                placeholder="Inserisci qui il tuo post"
                value={innerData.text}
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