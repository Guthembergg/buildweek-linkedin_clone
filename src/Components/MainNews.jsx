import { Row, Col, Card, Button, Pagination } from "react-bootstrap";
import CardProfile from "./CardProfileNews";
import { BiHash } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsInfoSquareFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useEffect, useState } from "react";
import FeedNews from "./FeedNews";
import ModalPost from "./ModalPost";
import { useDispatch, useSelector } from "react-redux";
import CardAndFooter from "./CardAndFooter";
import SpinnerLoad from "./Spinner";
import AlertErrorCatch from "./Alert";

const MainNews = () => {
  const [postList, setPostList] = useState([]);
  const [numberedPost, setNumberedPost] = useState([]);
  const token = process.env.REACT_APP_TOKEN;
  const newPost = useSelector((state) => state.newPost);
  const myProfileId = useSelector((state) => state.myProfile._id);

  const modifiedPost = useSelector((state) => state.modifiedPost);
  const deletedPost = useSelector((state) => state.deletedPost);
  const followArray = useSelector((state) => state.seguiti);
  const [currentPage, setCurrentPage] = useState(314);
  const numeroPerPagina = 10;

  let numeroPagine = Math.round(
    postList.filter((e) => followArray.includes(e?.user?._id)).length /
      numeroPerPagina
  );

  let myActive = 1;
  let active = 1;
  let items = [];
  const handleClick = (a) => {
    numbered((a - 1) * numeroPerPagina, a * numeroPerPagina);
    setCurrentPage(a);
    window.scrollTo(0, 0);
  };

  for (let number = 1; number <= numeroPagine; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => {
          handleClick(number);
        }}
        active={currentPage === number ? true : false}
      >
        {number}
      </Pagination.Item>
    );
  }

  const [spinner, setSpinner] = useState();
  const [alert, setAlert] = useState(false);
  const [elementi, setElementi] = useState();
  const fetchGetPost = async () => {
    setSpinner(true);
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        console.log(currentPage);
        if (currentPage === 1 || currentPage === 314) {
          setCurrentPage(1);
          const data = await response.json();
          setPostList(data.reverse().slice(0, 50));
          setNumberedPost(
            data
              ?.filter((e) => followArray.includes(e?.user?._id))
              .slice(0, numeroPerPagina)
          );
        }

        setSpinner(false);
        setAlert(false);
      } else {
        console.log("News: fetch Post. errore in if");
        setAlert(true);
        setSpinner(false);
      }
    } catch (err) {
      console.log("News: fetch Post. err in catch");
      setAlert(true);
      setSpinner(false);
    }
  };

  const numbered = (a, b) => {
    setNumberedPost(
      postList?.filter((e) => followArray.includes(e?.user?._id)).slice(a, b)
    );
  };

  useEffect(() => {
    fetchGetPost();
  }, []);
  useEffect(() => {
    fetchGetPost();
  }, [newPost]);
  useEffect(() => {
    fetchGetPost();
  }, [modifiedPost]);
  useEffect(() => {
    fetchGetPost();
  }, [deletedPost]);

  return (
    <Row className="d-flex justify-content-center py-3 m-0 w-100">
      <Col className="d-none d-md-block p-0" md={3} xl={2}>
        <CardProfile />
        <Card className="d-flex mt-3">
          <Card.Body className="position-relative px-0">
            <p className="text-secondary mb-1 px-3"> Recenti</p>
            <section>
              <p className="cardProfileText px-3 mb-1">
                <BiHash /> produttività
              </p>
              <p className="cardProfileText px-3 mb-1">
                <BiHash /> motivazione
              </p>
              <p className="cardProfileText px-3 mb-1 ">
                <BiHash /> informatica
              </p>
              <p className="cardProfileText px-3 mb-1 ">
                <BiHash /> tecnologia
              </p>
            </section>
            <section className="d-flex">
              <div>
                <p className="cardProfileTextBlu text-primary px-3 my-3">
                  Gruppi
                </p>
                <p className="cardProfileTextBlu text-primary px-3 mb-3 ">
                  Eventi
                </p>
                <p className="cardProfileTextBlu text-primary px-3">
                  Hashtag seguiti
                </p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="ms-2 ">
                  <AiOutlinePlus />
                </p>
              </div>
            </section>
            <section>
              <p className="cardProfileText px-3 mb-1">
                <BiHash /> produttività
              </p>
              <p className="cardProfileText px-3 mb-1">
                <BiHash /> motivazione
              </p>
              <p className="cardProfileText px-3 mb-1 ">
                <BiHash /> informatica
              </p>
              <p className="cardProfileText px-3 mb-1 ">
                <BiHash /> tecnologia
              </p>
            </section>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={10} md={8} lg={6}>
        <div className="d-block d-md-none">
          <CardProfile />
        </div>
        <ModalPost />
        <div className="d-flex justify-content-center flex-nowrap my-2">
          <Button
            className="rounded-pill px-5 py-0 text-center"
            variant="outline-primary"
            style={{ height: "30px", border: "none" }}
            onClick={() => fetchGetPost()}
          >
            {" "}
            Aggiorna nuovi post{" "}
          </Button>
        </div>{" "}
        {spinner && !alert && <SpinnerLoad />}
        {alert && !spinner && <AlertErrorCatch />}
        {numberedPost &&
          numberedPost.map((e, i) => <FeedNews key={`news-${i}`} news={e} />)}
        <div className="d-flex justify-content-center">
          <Pagination color="primary">{items}</Pagination>
        </div>
      </Col>

      <Col className="d-none d-xl-block p-0" xl={2}>
        <Card className="mb-3">
          <Card.Body className="position-relative px-0 py-2">
            <h6 className="d-flex justify-content-between mb-2 px-3">
              {" "}
              Linkedin Notizie{" "}
              <span>
                <BsInfoSquareFill />
              </span>
            </h6>
            <section className="d-flex px-3">
              <div className="d-flex justify-content-center align-items-start">
                <p>
                  <RxDotFilled />
                </p>
              </div>
              <div>
                <p className="fs-6 m-0">
                  <strong>Vincenzo Picone denunciato</strong>
                </p>
                <p className="text-secondary mb-1 fs-6">
                  Dopo 4 mesi di corso copia le righe di codice usando il tasto
                  destro del mouse.
                </p>
              </div>
            </section>
            <section className="d-flex px-3">
              <div className="d-flex justify-content-center align-items-start">
                <p>
                  <RxDotFilled />
                </p>
              </div>
              <div>
                <p className="fs-6 m-0">
                  <strong>Il codice rende folli</strong>
                </p>
                <p className="text-secondary mb-1 fs-6">
                  De Pascale impazzisce dopo aver visto una height non multipla
                  di 10.
                </p>
              </div>
            </section>
            <section className="d-flex px-3">
              <div className="d-flex justify-content-center align-items-start">
                <p>
                  <RxDotFilled />
                </p>
              </div>
              <div>
                <p className="fs-6 m-0">
                  <strong>Premio miglior coder</strong>
                </p>
                <p className="text-secondary mb-1 fs-6">
                  Guettech conquista per il primo anno il premio "CodeBreak": ha
                  distrutto un sito cambiando una sola riga di codice.
                </p>
              </div>
            </section>
            <section className="d-flex px-3">
              <div className="d-flex justify-content-center align-items-start">
                <p>
                  <RxDotFilled />
                </p>
              </div>
              <div>
                <p className="fs-6 m-0">
                  <strong>Le ricerche continuano</strong>
                </p>
                <p className="text-secondary mb-1 fs-6">
                  Un ragazzo dopo essere uscito di casa due giorni fa non è più
                  rientrato, la famiglia chiede alle autorità di venire a capo
                  della faccenda.
                </p>
              </div>
            </section>
          </Card.Body>
        </Card>
        <CardAndFooter />
      </Col>
    </Row>
  );
};

export default MainNews;
