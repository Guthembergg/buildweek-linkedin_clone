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

const MainProfile = () => {
  const dispatch = useDispatch();
  const modalBody = useSelector((state) => state.myExperience);
  const param = useParams();
  const token = process.env.REACT_APP_TOKEN;
  let check;

  if (param.id === undefined) {
    check = "me";
  } else {
    check = param.id;
  }

  const [me, setMe] = useState();
  const [experience, setExperience] = useState([]);

  const MainProfile = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${check}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setMe(data);
        if (check === "me") {
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
    MainProfile();
  }, []);

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

  useEffect(() => {
    ExperiencesGetFetch(me, "POST", modalBody);
  }, [modalBody]);

  console.log("me", me);
  console.log("experience", experience);

  return (
    <>
      {me && (
        <Row className="w-100 d-flex justify-content-center">
          <Col className="p-0 m-0" xs={12} md={8} xl={6}>
            <Card className="d-flex m-3 position-relative">
              <Card.Img variant="top" src={imageBackground} />
              <Card.Body className="position-relative">
                <div className="modalPencil d-flex justify-content-center align-items-center">
                  {check === "me" && <ModalProfile me={me} />}
                </div>

                <Card.Title className="mt-5 position-relative m-0">
                  {me.name} {me.surname}
                  <Image
                    roundedCircle={true}
                    alt=""
                    src={
                      me.image
                        ? me.image
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
                    <Col xs={2} className="p-0">
                      <HiOutlinePencil></HiOutlinePencil>
                    </Col>
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
                    <Col xs={2} className="p-0">
                      <HiOutlinePencil></HiOutlinePencil>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Card>

            <Card className="d-flex m-3 position-relative">
              <Card.Body>
                <Card.Title>Consigliato per te</Card.Title>
                <p className="m-0 p-0 d-flex align-items-center ">
                  <BsFillEyeFill className="me-2" />
                  Solo per te
                </p>
              </Card.Body>
            </Card>
            <Card className="d-flex m-3 position-relative">
              <Card.Body>
                <Card.Title>Analisi</Card.Title>
                <p className="m-0 p-0 d-flex align-items-center ">
                  <BsFillEyeFill className="me-2" />
                  Solo per te
                </p>
                <Row>
                  <Col xs={6}>
                    <Row className="p-2">
                      <Col xs={1}>
                        <BsFillPeopleFill></BsFillPeopleFill>
                      </Col>
                      <Col xs={11}>
                        <h5>n visualizzazioni del tuo profilo</h5>
                        <p className="fs-6">
                          Scopri chi ha visto il tuo profilo
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={6}>
                    <Row className="p-2">
                      <Col xs={1}>
                        <BsSearch></BsSearch>
                      </Col>
                      <Col xs={11}>
                        <h5>n compars* nei motori di ricerca</h5>
                        <p className="fs-6">
                          Vedi quante volte compari nei motori di ricerca
                        </p>
                      </Col>
                    </Row>
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

                  <Col xs={1}>
                    <div className="disc d-flex justify-content-center align-items-center fs-4 p-0">
                      <ModalInfo me={me} />
                    </div>
                  </Col>
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
                      {check === "me" && (
                        <>
                          <Col xs={1}>
                            <div className="m-0 ms-1 disc d-flex justify-content-center align-items-center fs-4 p-0">
                              <ModalExp />
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
                                  src={e.image}
                                  alt="FotoExp"
                                />
                              )}
                            </div>
                            <div className="col-11">
                              <h6 className="m-0">{e.role}</h6>
                              <p className="m-0">{e.company}</p>
                              <p className="text-secondary m-0">
                                `{e.startDate.slice(0, 10)} -{" "}
                                {e.endDate.slice(0, 10)}`
                              </p>
                              <p className="mt-2">{e.decription}</p>
                            </div>
                          </section>
                        </Col>
                        {check === "me" && (
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
