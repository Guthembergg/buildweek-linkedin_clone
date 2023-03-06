import { NavDropdown } from "react-bootstrap";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CommentDeleteModal = (props) => {
  const token = process.env.REACT_APP_COMMENT;
  const dispatch = useDispatch();

  const DeleteFetch = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${props.data._id}`,
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
        let r = (Math.random() + 1).toString(36).substring(7);
        dispatch({ type: "DELETE_COMMENT", payload: r });
      } else {
        console.log("errore nell'if");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <NavDropdown.Item className="text-danger" onClick={DeleteFetch}>
        <RiDeleteBin6Fill />
        <span className="ps-2">Elimina post</span>
      </NavDropdown.Item>
    </>
  );
};

export default CommentDeleteModal;
