import { useState } from "react";
import { Card, Col, Row, Image, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import SingleCommentCard from "./SingleCommentCard";

const CommentComponent = ({ postId, comment }) => {
  const myProfile = useSelector((state) => state.myProfile);
  const token = process.env.REACT_APP_COMMENT;
  const [commentBody, setCommentBody] = useState();
  const addCommentsFetch = async (ourMethod) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${postId}`,
        {
          method: ourMethod,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          Body: JSON.stringify(commentBody),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (ourMethod === "GET") {
        }
      } else {
        console.log("mainPage: comments. errore in if");
      }
    } catch (err) {
      console.log("mainPage: comments. err in catch");
    }
  };

  const handleSumbmit = (e) => {
    e.preventDefault();
    addCommentsFetch("POST");
  };

  const handleChange = (value) => {
    setCommentBody({ comment: value, elementId: postId });
  };

  return (
    <>
      <Card style={{ border: "none" }}>
        <Row className="d-flex align-items-center">
          <Col md={2} className="text-end d-none d-md-block">
            <Image
              roundedCircle={true}
              style={{ width: "35px", height: "35px" }}
              alt=""
              src={
                myProfile.image
                  ? myProfile.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
          </Col>
          <Col xs={12} md={10}>
            <Form onSubmit={handleSumbmit}>
              <Form.Group className="ms-0 m-2 ">
                <Form.Control
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  className="rounded-pill py-3 px-3"
                  type="text"
                  placeholder="Aggiungi un commento..."
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Card.Body>
          {comment &&
            comment.map((e) => (
              <SingleCommentCard name={e?.author} comment={e?.comment} />
            ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default CommentComponent;
