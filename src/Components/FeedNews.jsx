import { Button, Card, Col, Image, NavDropdown, Row } from "react-bootstrap";
import { SlLike } from "react-icons/sl";
import { BiCommentDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { ImLoop } from "react-icons/im";
import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import PostPencilModal from "./PostPencilModal";
import PostDeleteModal from "./PostDeleteModal";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
const FeedNews = (props) => {
  const newComment = useSelector((state) => state.comment);
  const modifiedComment = useSelector((state) => state.modified_comment);
  const followArray = useSelector((state) => state.seguiti);
  const likesArray = useSelector((state) => state.likes);

  const deleteComment = useSelector((state) => state.delete_comment);
  const dispatch = useDispatch();
  moment.locale("it");
  const [spinnerComment, setSpinnerComment] = useState();
  const [comment, setComment] = useState();
  const [alertComment, setAlertComment] = useState();
  const [selected, setSelected] = useState(false);
  const token = process.env.REACT_APP_COMMENT;
  const myId = useSelector((state) => state.myProfile._id);

  /*  console.log(myId);
  console.log(props);
  console.log(props.news.user._id); */

  const commentsFetch = async (postId, ourMethod) => {
    setSpinnerComment(true);
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
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("fetch di", postId);
        if (ourMethod === "GET") {
          setComment(data);
          setSpinnerComment(false);
          setAlertComment(false);
        }
      } else {
        console.log("mainPage: comments. errore in if");
        setAlertComment(true);
        setSpinnerComment(false);
      }
    } catch (err) {
      console.log("mainPage: comments. err in catch");
      setAlertComment(true);
      setSpinnerComment(false);
    }
  };
  const followClick = (value) => {
    if (!followArray.includes(value)) {
      dispatch({ type: "FOLLOW", payload: value });
    }
  };
  return (
    <Card className="mb-3 px-3 py-1 ">
      <section className=" p-1">
        <Row>
          <Col xs={8}>
            {" "}
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
                  <h6 className="m-0 fw-bold">
                    {props.news?.user.name} {props.news?.user.surname}
                  </h6>
                </Link>
                <p className="m-0 text-secondary" style={{ fontSize: "0.9em" }}>
                  {props.news?.user.title}
                </p>
                <p
                  className="m-0 text-secondary d-flex justify-content-start align-items-center"
                  style={{ fontSize: "0.9em" }}
                >
                  <span>
                    {moment(props.news?.createdAt).format("DD MM YY") ===
                    moment().format("DD MM YY") /* ||
                parseInt(moment().format("DD")) ===
                  parseInt(moment(props.news?.createdAt).format("DD")) + 1 */
                      ? moment(props.news?.createdAt).fromNow()
                      : moment(props.news?.createdAt).format("YYYY") ===
                        moment().format("YYYY")
                      ? moment(props.news?.createdAt).format(
                          "ddd D MMMM [alle] H:mm "
                        )
                      : moment(props.news?.createdAt).format(
                          "ddd d MMMM YYYY [alle] H:mm "
                        )}
                  </span>
                  <BiWorld className="ms-1 text-tertiary" />
                </p>
              </div>
            </div>
          </Col>
          {/* questa roba non serve più visto che vediamo solo i post di chi seguiamo... */}
          <Col xs={2}>
            {!followArray.includes(props.news?.user._id) && (
              <Button onClick={() => followClick(props.news?.user._id)}>
                follow
              </Button>
            )}
          </Col>
          <Col xs={2} className="d-flex justify-content-end">
            {myId === props.news.user._id && (
              <div className="d-flex justify-content-center align-items-center">
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
          </Col>
        </Row>
      </section>
      <Card.Body className="border-top">
        <p>{props.news.text}</p>
        <Image className="w-100" src={props?.news?.image} />
      </Card.Body>
      <section className="d-flex justify-content-around text-tertiary border-top">
        <div className="iconPost rounded d-flex align-items-center">
          {likesArray?.includes(props.news._id) ? (
            <span
              onClick={() => {
                dispatch({ type: "REMOVE_LIKE", payload: props.news._id });
              }}
              className="me-2"
            >
              <AiFillLike style={{ fontSize: "1.4em" }} />
              <span className="ms-2"> Consiglia</span>
            </span>
          ) : (
            <span
              className="me-2"
              onClick={() => {
                dispatch({ type: "LIKE", payload: props.news._id });
              }}
            >
              <AiOutlineLike style={{ fontSize: "1.4em" }} />
              <span className="ms-2"> Consiglia</span>
            </span>
          )}
        </div>
        <div
          className="iconPost rounded d-flex align-items-center"
          onClick={() => {
            commentsFetch(props.news._id, "GET");
            setSelected(!selected);
          }}
        >
          <span className="me-2">
            <BiCommentDetail style={{ fontSize: "1.4em" }} />
          </span>
          <span className="d-none d-md-inline text-secondary">Commenta</span>
        </div>
        <div className="iconPost rounded d-flex align-items-center">
          <span className="me-2">
            <ImLoop style={{ fontSize: "1.4em" }} />
          </span>
          <span className="d-none d-md-inline text-secondary">Condividi</span>
        </div>
        <div className="iconPost rounded d-flex align-items-center">
          <span className="me-2">
            <FiSend style={{ fontSize: "1.4em" }} />
          </span>
          <span className="d-none d-md-inline text-secondary">Invia</span>
        </div>
      </section>
      {selected && (
        <CommentComponent postId={props.news._id} comment={comment} />
      )}
    </Card>
  );
};

export default FeedNews;
