import { useState } from "react";
import { Row, Col, Image, Form, Modal, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {
  BsEmojiSmile,
  BsFillCalendar2EventFill,
  BsFillPlayBtnFill,
  BsImageFill,
  BsThreeDots,
} from "react-icons/bs";
import { HiDocument } from "react-icons/hi";
import { RiArticleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { TbMessage2 } from "react-icons/tb";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";

function NewPostProva() {
  const myProfile = useSelector((state) => state.myProfile);
  const [innerData, setInnerData] = useState({
    text: "",
  });
  const [resp, setResp] = useState();
  const [fd, setFd] = useState(new FormData());
  const dispatch = useDispatch();

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
        const data = await response.json();
        setResp(data._id);

        console.log("News: fetch Post. if ok");
      } else {
        console.log("News: fetch Post. errore in if");
      }
    } catch (err) {
      console.log("News: fetch Post. err in catch");
    }
  };

  //!inizio

  const handleSubmitFile = async (ev) => {
    ev.preventDefault();
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/posts/${resp}`,
      {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const handleFile = (ev) => {
    setFd((prev) => {
      //per cambiare i formData, bisogna "appendere" una nuova coppia chiave/valore, usando il metodo .append()
      prev.delete("post"); //ricordatevi di svuotare il FormData prima :)
      prev.append("post", ev.target.files[0]); //L'API richiede un "nome" diverso per ogni rotta, per caricare un'immagine ad un post, nel form data andra' inserito un valore con nome "post"
      return prev;
    });
  };

  //!fine

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNewsPost();
    handleSubmitFile();
    dispatch({ type: "NEW_POST", payload: innerData });
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
                  <Form.Control
                    className="rounded-pill"
                    type="text"
                    placeholder="Avvia un post"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center py-2">
            <Col
              xs={3}
              md={2}
              className="d-flex justify-content-center align-items-center"
            >
              <BsImageFill className="text-primary" />
              <span className="d-none d-md-block ms-2">Foto</span>
            </Col>
            <Col
              xs={3}
              md={2}
              className="d-flex justify-content-center align-items-center"
            >
              <BsFillPlayBtnFill className="text-success" />{" "}
              <span className="d-none d-md-block ms-2">Video</span>
            </Col>
            <Col
              xs={3}
              md={2}
              className="d-flex justify-content-center align-items-center"
            >
              <BsFillCalendar2EventFill style={{ color: "brown" }} />{" "}
              <span className="d-none d-md-block ms-2">Evento</span>
            </Col>
            <Col
              xs={3}
              md={4}
              className="d-flex justify-content-center align-items-center"
            >
              <RiArticleFill style={{ color: "orange" }} />{" "}
              <span className="d-none d-md-block ms-2">Scrivi un articolo</span>
            </Col>
          </Row>
        </Card>
      </>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Crea un Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="position-relative">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <Row>
                  <Col xs={2}>
                    <Image
                      className="rounded-circle"
                      style={{ width: "100%" }}
                      src={myProfile.image}
                    ></Image>
                  </Col>
                  <Col xs={6}>
                    <Row>
                      {myProfile.name} {myProfile.surname}
                    </Row>
                    <Row className="pe-5">
                      <Button
                        variant="outline-secondary"
                        className="rounded-pill"
                        style={{
                          fontSize: "0.8rem",
                          width: "65%",
                        }}
                      >
                        mod da agg.
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Form.Label>
              <Form.Control
                aria-selected
                as="textarea"
                placeholder="Inserisci qui il tuo post"
                onChange={(e) => handleChange("text", e.target.value)}
                autoFocus="autofocus"
              />
              <div className="d-flex justify-content-between mt-1">
                <BsEmojiSmile />
                <Form.Label>{innerData.text.length}/2600</Form.Label>
              </div>
            </Form.Group>
            <Form.Group>
              <Row className="pb-3 px-3">
                <Form.Control aria-selected type="file" onChange={handleFile} />
              </Row>
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-between align-items-center"
                >
                  <BsImageFill style={{ color: "gray" }} className="fs-5" />
                  <BsFillPlayBtnFill
                    style={{ color: "gray" }}
                    className="fs-5"
                  />
                  <HiDocument style={{ color: "gray" }} className="fs-5" />
                  <BsThreeDots style={{ color: "gray" }} className="fs-5" />
                </Col>
                <Col xs={4}>
                  <Button
                    variant="secondary"
                    className="rounded-pill d-flex flex-wrap-novrap align-items-center"
                  >
                    <TbMessage2 className="me-1" />
                    tutti
                  </Button>
                </Col>

                <Col
                  xs={4}
                  className="d-flex justify-content-between align-items-center"
                >
                  <AiOutlineClockCircle
                    style={{ color: "gray" }}
                    className="fs-5"
                  />
                  <Button
                    className="rounded-pill"
                    variant="secondary"
                    type="submit"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Pubblica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewPostProva;
