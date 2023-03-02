import { Card, Image, NavDropdown } from "react-bootstrap";
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { ImLoop } from "react-icons/im";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import PostPencilModal from "./PostPencilModal";
import PostDeleteModal from "./PostDeleteModal";
import { useSelector } from "react-redux";

const FeedNews = (props) => {
  const myId = useSelector((state) => state.myProfile._id);
  console.log(myId);
  console.log(props);
  console.log(props.news.user._id);

  return (
    <Card className="mb-3 p-2">
      <section className="d-flex p-2">
        <div>
          <Image
            className=""
            roundedCircle={true}
            style={{ width: "50px", height: "50px" }}
            src={
              props.news?.user.image
                ? props.news.user.image
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
        </div>
        <div className="p-2">
          <Link
            className="text-decoration-none text-dark"
            to={`/profile/${props.news?.user._id}`}
          >
            <h6 className="m-0">
              {props.news?.user.name} {props.news?.user.surname}
            </h6>
          </Link>
          <p className="m-0 text-secondary">{props.news?.user.title}</p>
          <p className="m-0 text-secondary">
            <span>
              {props.news?.createdAt.slice(12, 16)} -{" "}
              {props.news?.createdAt.slice(8, 10)}/
              {props.news?.createdAt.slice(5, 7)}/
              {props.news?.createdAt.slice(0, 4)}
            </span>
          </p>
        </div>
        <div>
          {myId === props.news.user._id && (
            <div className="d-flex ">
              <NavDropdown
                title={
                  <span>
                    <HiDotsHorizontal />
                  </span>
                }
                id="collasible-nav-dropdown"
              >
                <PostPencilModal id={props.news._id} text={props.news.text} />
                <PostDeleteModal id={props.news._id} />
              </NavDropdown>
            </div>
          )}
        </div>
      </section>
      <Card.Body className="border-top">
        <p>{props.news.text}</p>
        <Image className="w-100" src={props?.news?.image} />
      </Card.Body>
      <section className="d-flex justify-content-around text-tertiary border-top">
        <div className="iconPost rounded">
          <span className="me-2">
            <SlLike />
          </span>{" "}
          <span className="d-none d-md-inline">Consiglia </span>
        </div>
        <div className="iconPost rounded">
          <span className="me-2">
            <AiOutlineComment />
          </span>{" "}
          <span className="d-none d-md-inline">Commenta</span>{" "}
        </div>
        <div className="iconPost rounded">
          <span className="me-2">
            <ImLoop />
          </span>{" "}
          <span className="d-none d-md-inline">Diffondi il post</span>{" "}
        </div>
        <div className="iconPost rounded">
          <span className="me-2">
            <FiSend />
          </span>{" "}
          <span className="d-none d-md-inline">Invia</span>
        </div>
      </section>
    </Card>
  );
};

export default FeedNews;
