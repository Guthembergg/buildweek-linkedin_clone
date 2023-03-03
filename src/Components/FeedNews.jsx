import { Card, Image, NavDropdown } from "react-bootstrap";
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { ImLoop } from "react-icons/im";
import {BiWorld} from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import PostPencilModal from "./PostPencilModal";
import PostDeleteModal from "./PostDeleteModal";
import { useSelector } from "react-redux";

const FeedNews = (props) => {
  const myId = useSelector((state) => state.myProfile._id);
  const navigate = useNavigate()
  console.log(myId);
  console.log(props);
  console.log(props.news.user._id);

  return (
    <Card className="mb-3 px-3 py-1 ">
      <section className="d-flex justify-content-between p-1">
        <div className="d-flex">
        <div className="d-flex align-items-center justify-content-center">
          <Image
            className="border"
            roundedCircle={true}
            style={{ width: "60px", height: "60px" }}
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
          <p className="m-0 text-secondary" style={{fontSize:"0.9em"}}>{props.news?.user.title}</p>
          <p className="m-0 text-secondary d-flex justify-content-start align-items-center" style={{fontSize:"0.9em"}}>
            <span>
              {props.news?.createdAt.slice(12, 16)} -{" "}
              {props.news?.createdAt.slice(8, 10)}/
              {props.news?.createdAt.slice(5, 7)}/
              {props.news?.createdAt.slice(0, 4)}
            </span>
            <BiWorld className="ms-1 text-tertiary"/>
          </p>
        </div>
        </div>
        <div >
          {myId === props.news.user._id && (
            <div className="d-flex ">
              <NavDropdown
              className="iconPost rounded-circle p-2"
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
        <div className="iconPost rounded d-flex align-items-center">
          <span className="me-2">
            <SlLike style={{fontSize:"1.4em"}} />
          </span>
          <span className="d-none d-md-inline text-secondary">Consiglia </span>
        </div>
        <div className="iconPost rounded d-flex align-items-center">
          <span className="me-2">
            <AiOutlineComment style={{fontSize:"1.4em"}} />
          </span>
          <span className="d-none d-md-inline text-secondary">Commenta</span>
        </div>
        <div className="iconPost rounded d-flex align-items-center">
          <span className="me-2">
            <ImLoop style={{fontSize:"1.4em"}} />
          </span>
          <span className="d-none d-md-inline text-secondary">Diffondi il post</span>
        </div>
        <div className="iconPost rounded d-flex align-items-center">
          <span className="me-2">
            <FiSend style={{fontSize:"1.4em"}}/>
          </span>
          <span className="d-none d-md-inline text-secondary">Invia</span>
        </div>
      </section>
    </Card>
  );
};

export default FeedNews;
