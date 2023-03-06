import { useState } from "react";

import { Form, Modal, Button, NavDropdown } from "react-bootstrap";

import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch } from "react-redux";

function NewPostProva(props) {
  const [commentBody, setCommentBody] = useState({ comment: "" });

  const token = process.env.REACT_APP_COMMENT;

  const handleChange = (value) => {
    setCommentBody({ comment: value, elementId: props.id, rate: 3 });
  };

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchNewsPost = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentBody),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchNewsPost();

    dispatch({ type: "MODIFIED_POST", payload: props.id });
  };

  return (
    <>
      <>
        <NavDropdown.Item onClick={handleShow}>
          <HiOutlinePencil />
          <span className="ps-2">Modifica post</span>
        </NavDropdown.Item>
      </>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modifica commento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="position-relative">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Modifica il tuo commento</Form.Label>
              <Form.Control
                aria-selected
                as="textarea"
                placeholder="Inserisci qui il tuo post"
                value={commentBody.comment}
                onChange={(e) => handleChange(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <Form.Label>{commentBody.comment.length}/2600</Form.Label>
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
