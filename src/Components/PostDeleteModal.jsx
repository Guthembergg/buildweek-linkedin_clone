import { useState } from "react";
import { Modal, Button, NavDropdown } from "react-bootstrap";

import { RiDeleteBin6Fill } from "react-icons/ri";

function PostDeleteModal(props) {
  const token = process.env.REACT_APP_TOKEN;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchDeletePost = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${props.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
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

  return (
    <>
      <>
        <NavDropdown.Item onClick={handleShow}>
          <RiDeleteBin6Fill />
          <span className="ps-2">Elimina post</span>
        </NavDropdown.Item>
      </>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro di voler cancellare il Post?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="position-relative">
          <p>I post una volta cancellati non srà possibile recuperarli</p>

          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                handleClose();
                fetchDeletePost();
              }}
            >
              Cancella
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostDeleteModal;
