import { useEffect, useState } from "react";
import { Row, Col, Image, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {
  BsFillCalendar2EventFill,
  BsFillPlayBtnFill,
  BsImageFill,
} from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";

const PostNewsProva = () => {
  const [innerData, setInnerData] = useState({
    text: "",
  });

  const token = process.env.REACT_APP_TOKEN;

  const handleChange = (property, value) => {
    setInnerData({ [property]: value });
  };

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
    setInnerData({ text: "" });
  };

  return (
    <>
      <Card body>
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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="ms-0 m-2">
                <Form.Control
                  type="text"
                  value={innerData.text}
                  placeholder="Avvia un post"
                  onChange={(e) => handleChange("text", e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <BsImageFill /> Foto
          </Col>
          <Col xs={3}>
            <BsFillPlayBtnFill /> Video
          </Col>
          <Col xs={3}>
            <BsFillCalendar2EventFill /> Evento
          </Col>
          <Col xs={3}>
            <RiArticleFill /> Scrivi un aticolo
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PostNewsProva;
