import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalProfile from "./ModalProfile";
import ModalInfo from "./ModalInfo";
import ModalExp from "./ModalExp";
import Aside from "../Components/Aside";
import ModalSingleExp from "./ModalSingleExp";
import FotoExp from "../assets/FotoCardExp.jpeg";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import { BsFillEyeFill, BsFillPeopleFill, BsSearch } from "react-icons/bs";
import { HiDotsHorizontal, HiOutlinePencil } from "react-icons/hi";
import { GoGraph } from "react-icons/go";

const MainProfile = () => {
  const dispatch = useDispatch();
  const modalBody = useSelector((state) => state.myExperience);
  const modalBio = useSelector((state) => state.modifiedBio);
  const modalInfo = useSelector((state) => state.modifiedInfo);
  const profile = useSelector((state) => state.myProfile);
  const modalExpMod = useSelector((state) => state.modifiedExperience);
  const modalExpDel = useSelector((state) => state.deletedExperience);
  const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  const param = useParams();
  const token = process.env.REACT_APP_TOKEN;
  const [me, setMe] = useState();
  const [experience, setExperience] = useState([]);

  const MainProfile = async (param) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${param.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setMe(data);

        if (param.id === "me") {
          dispatch({ type: "ADD_MY_PROFILE", payload: data });
        }
      } else {
        console.log("mainPage: Main profile. errore in if");
      }
    } catch (err) {
      console.log("mainPage: Main profile. err in catch");
    }
  };

  useEffect(() => {
    MainProfile(param);
  }, [param]);
  useEffect(() => {
    MainProfile(param);
  }, [modalBio, param]);
  useEffect(() => {
    MainProfile(param);
  }, [modalInfo, param]);
  useEffect(() => {
    MainProfile(param);
  }, [modalBody, param]);
  useEffect(() => {
    MainProfile(param);
  }, [modalExpMod, param]);
  useEffect(() => {
    MainProfile(param);
  }, [modalExpDel, param]);
  const ExperiencesGetFetch = async (me, ourMethod, ourBody) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${me._id}/experiences`,
        {
          method: ourMethod,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ourBody),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (ourMethod === "GET") {
          setExperience(data);
        }
      } else {
        console.log("mainPage: Experiences. errore in if");
      }
    } catch (err) {
      console.log("mainPage: Experiences. err in catch");
    }
  };

  useEffect(() => {
    ExperiencesGetFetch(me, "GET");
  }, [me]);

  console.log("me", me);
  console.log("experience", experience);

  return (
    <>
      {me && (
        <Row className="w-100 d-flex justify-content-center m-0">
          <Col className="p-0 m-0" xs={12} md={8} xl={6}>
            <Card className="d-flex m-3 position-relative">
              <Card.Img variant="top" src={imageBackground} />
              <Card.Body className="position-relative">
                {param.id === "me" && (
                  <>
                    <div className="modalPencil d-flex justify-content-center align-items-center">
                      <ModalProfile me={profile} />
                    </div>
                  </>
                )}

                <Card.Title className="mt-5 position-relative m-0">
                  {me?.name} {me?.surname}
                  <Image
                    roundedCircle={true}
                    alt=""
                    src={
                      me?.image
                        ? me?.image
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    className="position-absolute imageProfile "
                  />
                </Card.Title>
                <p className="m-0 p-0">{me.title}</p>
                <i className="m-0 p-0">{me.area}</i>
                <div className="mt-2 d-flex flex-wrap-nowrap">
                  <Button variant="primary rounded-pill">
                    Disponibile per
                  </Button>
                  <Button
                    className="ms-2"
                    variant="outline-primary rounded-pill"
                  >
                    Aggiungi sezione del profilo
                  </Button>
                  <Button
                    className="ms-2"
                    variant="outline-secondary rounded-pill"
                  >
                    <HiDotsHorizontal></HiDotsHorizontal>
                  </Button>
                </div>
              </Card.Body>
              <div className="d-flex ms-3 pb-3">
                <Card className="p-2">
                  <Row>
                    <Col xs={10}>
                      <h6 className="m-0">Disponibile a lavorare</h6>
                      <p className="m-0 p-0">Ruoli specialista IT</p>
                      <p
                        href="s"
                        className="fw-semibold"
                        style={{ color: "blue" }}
                      >
                        inizia
                      </p>
                    </Col>
                    {param.id === "me" && (
                      <Col xs={2} className="p-0">
                        <HiOutlinePencil></HiOutlinePencil>
                      </Col>
                    )}
                  </Row>
                </Card>
                <Card className="p-2 ms-3">
                  <Row>
                    <Col xs={10}>
                      <h6>Fai sapere che stai facendo selezione</h6>
                      <p className="m-0 p-0">candidati qualificati</p>
                      <p
                        href="s"
                        className="fw-semibold"
                        style={{ color: "blue" }}
                      >
                        inizia
                      </p>
                    </Col>
                    {param.id === "me" && (
                      <Col xs={2} className="p-0">
                        <HiOutlinePencil></HiOutlinePencil>
                      </Col>
                    )}
                  </Row>
                </Card>
              </div>
            </Card>

            <Card className="d-flex m-3 position-relative">
              <Card.Body>
                <Card.Title>Consigliato per te</Card.Title>
                <p className="m-0 p-0 d-flex align-items-center  text-secondary ">
                  <BsFillEyeFill className="me-2" />
                  Solo per te
                </p>
              </Card.Body>
            </Card>
            <Card className="d-flex m-3 position-relative">
              <Card.Body>
                <Card.Title>Analisi</Card.Title>
                <p className="m-0 p-0 d-flex align-items-center  text-secondary">
                  <BsFillEyeFill className="me-2" />
                  Solo per te
                </p>
                <Row>
                  <Col xs={10} md={4}>
                    <div className="p-2 d-flex flex-nowrap">
                      <div className="pe-2">
                        <BsFillPeopleFill></BsFillPeopleFill>
                      </div>
                      <div>
                        <h6>
                          {randomNumber(50)} visualizzazioni del tuo profilo
                        </h6>
                        <p className="fs-6">
                          Scopri chi ha visto il tuo profilo
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={10} md={4}>
                    <div className="p-2 d-flex flex-nowrap">
                      <div className="pe-2">
                        <GoGraph></GoGraph>
                      </div>
                      <div>
                        <h6>{randomNumber(50)} impressioni dei post</h6>
                        <p className="fs-6">
                          Vedi quante volte compari nei motori di ricerca
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={10} md={4}>
                    <div className="p-2 d-flex flex-nowrap">
                      <div className="pe-2">
                        <BsSearch></BsSearch>
                      </div>
                      <div>
                        <h6>
                          {randomNumber(50)} comparse nei motori di ricerca
                        </h6>
                        <p className="fs-6">
                          Vedi quante volte compari nei motori di ricerca
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="d-flex m-3 position-relative">
              <Card.Body className="d-flex flex-column position-relative">
                <Row className="d-flex align-items-center justify-content-between pe-3">
                  <Col xs={8}>
                    <Card.Title className="d-flex align-items-center p-0">
                      Informazioni
                    </Card.Title>
                  </Col>

                  {param.id === "me" && (
                    <Col xs={1}>
                      <div className="disc d-flex justify-content-center align-items-center fs-4 p-0">
                        <ModalInfo me={me} />
                      </div>
                    </Col>
                  )}
                </Row>

                <p>{me.bio}</p>
              </Card.Body>
            </Card>

            {experience && (
              <>
                <Card className="d-flex m-3 position-relative">
                  <Card.Body className="d-flex flex-column">
                    <Row className="d-flex align-items-center justify-content-between pe-3">
                      <Col xs={8}>
                        <Card.Title className="d-flex align-items-center p-0">
                          Esperienza
                        </Card.Title>
                      </Col>
                      {param.id === "me" && (
                        <>
                          <Col xs={1}>
                            <div className="m-0 ms-1 disc d-flex justify-content-center align-items-center fs-4 p-0">
                              <ModalExp me={me} />
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>

                    {experience?.map((e, i) => (
                      <Row key={`exp-${i}`}>
                        <Col xs={10}>
                          <section className="d-flex ">
                            <div className="col-1">
                              {e.image && (
                                <Image
                                  style={{ width: "60%" }}
                                  src={e?.image}
                                  alt="FotoExp"
                                />
                              )}
                            </div>
                            <div className="col-11">
                              <h6 className="m-0">{e?.role}</h6>{" "}
                              <p className="m-0">{e?.area}</p>
                              <p className="m-0">{e?.company}</p>
                              <p className="m-0">{e?.description}</p>
                              <p className="text-secondary mb-3">
                                `dal {e?.startDate?.slice(8, 10)}/
                                {e?.startDate?.slice(5, 7)}/
                                {e?.startDate?.slice(0, 4)} al {""}
                                {e?.endDate?.slice(8, 10)}/
                                {e?.endDate?.slice(5, 7)}/
                                {e?.endDate?.slice(0, 4)}`
                              </p>
                            </div>
                          </section>
                        </Col>
                        {param.id === "me" && (
                          <Col
                            xs={2}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <div className="fs-5">
                              <ModalSingleExp e={e} me={me} />
                            </div>
                          </Col>
                        )}
                      </Row>
                    ))}
                  </Card.Body>
                </Card>
              </>
            )}
            <Card className="d-flex m-3 position-relative">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Formazione</Card.Title>
                <section className="d-flex ">
                  <div className="col-1">
                    <Image
                      style={{ width: "60%" }}
                      src={FotoExp}
                      alt="FotoExp"
                    />
                  </div>
                  <div className="col-11">
                    <h6 className="m-0">Astronauta</h6>
                    <p className="m-0">EPICODE Global · Part-time</p>
                    <p className="text-secondary m-0">2020-2021</p>
                    <p className="mt-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Asperiores magni soluta ducimus perferendis voluptatibus
                      distinctio? Cumque hic tempora quaerat consequuntur
                      eveniet sapiente beatae qui molestiae quasi ipsa. Quam,
                      error doloribus!
                    </p>
                  </div>
                </section>
              </Card.Body>
            </Card>
            <Card className="d-flex m-3 position-relative">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Licenze e certificazioni</Card.Title>
                <section className="d-flex ">
                  <div className="col-1">
                    <Image
                      style={{ width: "60%" }}
                      src={FotoExp}
                      alt="FotoExp"
                    />
                  </div>
                  <div className="col-11">
                    <h6 className="m-0">Astronauta</h6>
                    <p className="m-0">EPICODE Global · Part-time</p>
                    <p className="text-secondary m-0">2020-2021</p>
                  </div>
                </section>
              </Card.Body>
            </Card>
            <Card className="d-flex m-3 position-relative">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Lingue</Card.Title>
                <section className="d-flex flex-column mt-1 ">
                  <div>
                    <h6>Inglese</h6>
                    <p className="text-secondary mb-0">Madrelingua</p>
                  </div>
                  <hr />
                  <div>
                    <h6>Italiano</h6>
                    <p className="text-secondary mb-0">Conoscenza base</p>
                  </div>
                </section>
                <hr />
                <div>
                  <h6>Francese </h6>
                  <p className="text-secondary mb-0">Conoscenza base</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-none d-md-block p-0 m-0" xs={0} md={4} xl={3}>
            <Aside />
          </Col>
        </Row>
      )}
    </>
  );
};

export default MainProfile;
