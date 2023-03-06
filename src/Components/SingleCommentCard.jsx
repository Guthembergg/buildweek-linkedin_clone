import { Card, Image, NavDropdown } from "react-bootstrap";
import { HiDotsHorizontal } from "react-icons/hi";
import CommentPencilModal from "./CommentPencilModal";
import CommentDeleteModal from "./CommentDeleteModal";
import { useSelector } from "react-redux";

const SingleCommentCard = ({ data, commentId }) => {
  const myId = useSelector((state) => state.myProfile._id);
  const myAuthor = useSelector((state) => state.commentId.author);

  return (
    <>
      {console.log(data)}
      <Card className="d-flex flex-row mb-2" style={{ border: "none" }}>
        <div className="ms-3">
          <Image
            roundedCircle={true}
            style={{ width: "35px", height: "35px" }}
            alt=""
            src={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
        </div>
        <div
          className="ms-2 w-100 rounded"
          style={{ backgroundColor: "#F3F2EF" }}
        >
          <div className="fw-bold">{data.author}</div>
          <div>{data.comment}</div>
        </div>
        {myAuthor === data.author && (
          <div>
            <NavDropdown
              className="iconPost rounded-circle p-2"
              title={
                <span>
                  <HiDotsHorizontal />
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <CommentPencilModal
                id={data.elementId}
                data={data}
                comment={data.comment}
              />
              {/* <PostDeleteModal id={props.news._id} /> */}
            </NavDropdown>
          </div>
        )}
      </Card>
    </>
  );
};
export default SingleCommentCard;
