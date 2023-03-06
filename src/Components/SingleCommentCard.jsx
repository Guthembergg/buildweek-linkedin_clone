import { Card, Image } from "react-bootstrap";

const SingleCommentCard = ({ name, comment }) => {
  return (
    <>
      <Card className="d-flex flex-row" style={{ border: "none" }}>
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
          <div className="fw-bold">{name}</div>
          <div>{comment}</div>
        </div>
      </Card>
    </>
  );
};
export default SingleCommentCard;
