import { useState } from "react";
import { Card, Col, Row, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SingleCommentCard from "./SingleCommentCard";

const CommentComponent = ({ postId, comment }) => {
  const myProfile = useSelector((state) => state.myProfile);
  const token = process.env.REACT_APP_COMMENT;
  const [commentBody, setCommentBody] = useState({ comment: "" });
  const dispatch = useDispatch();
  console.log(commentBody);
  const addCommentsFetch = async (ourMethod) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: ourMethod,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentBody),
        }
      );
      if (response.ok) {
        const data = await response.json();
      } else {
        console.log("mainPage: comments. errore in if");
      }
    } catch (err) {
      console.log("mainPage: comments. err in catch");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCommentsFetch("POST");
    dispatch({ type: "COMMENT", payload: commentBody.elementId });
    setCommentBody({ comment: "" });
  };

  const handleChange = (value) => {
    setCommentBody({ comment: value, elementId: postId, rate: 3 });
  };

  return (
    <>
      <Card style={{ border: "none" }}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={1} className="text-end d-none d-md-block">
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
          <Col xs={12} md={11}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="ms-0 m-2 ">
                <Form.Control
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  className="rounded-pill py-2 px-3"
                  type="text"
                  placeholder="Aggiungi un commento..."
                  value={commentBody?.comment}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Card.Body className="py-3">
          {comment &&
            comment.map((e, i) => (
              <SingleCommentCard
                key={`comments-${i}`}
                data={e}
                commentId={e._id}
              />
            ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default CommentComponent;
