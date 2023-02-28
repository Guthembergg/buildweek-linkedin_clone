import { Row, Col, Card, Button, Image } from "react-bootstrap";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import FotoExp from "../assets/FotoCardExp.jpeg";
import { BsFillEyeFill } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../Components/Aside";
import { useDispatch } from "react-redux";

const MainProfile = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const token = process.env.REACT_APP_TOKEN;
  let check;

  if (param.id === undefined) {
    check = "me";
  } else {
    check = param.id;
  }

  const [me, setMe] = useState();
  const [experience, setExperience] = useState();

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

  const ExperiencesFetch = async (me) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${me._id}/experiences`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setExperience(data);
      } else {
        console.log("mainPage: Experiences. errore in if");
      }
    } catch (err) {
      console.log("mainPage: Experiences. err in catch");
    }
  };

  useEffect(() => {
    ExperiencesFetch(me);
  }, [me]);

  console.log("me", me);
  console.log("experience", experience);

  return (
    <>
      {me && (
        <Row className="w-100 d-flex justify-content-center">
          <Col className="p-0" xs={10} md={6}>
            <Card className="d-flex m-3 position-relative">
              <Card.Img variant="top" src={imageBackground} />
              <Card.Body className="position-relative">
                <HiOutlinePencil className="modalPencil" />
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
                <div className="mt-2">
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
                    Altro
                  </Button>
                </div>
              </Card.Body>
              <div className="d-flex ms-3 pb-3">
                <Card className="p-2">
                  <Card.Title>Disponibile a lavorare</Card.Title>
                  <p className="m-0 p-0">Ruoli specialista IT</p>
                  <a href="s">inizia</a>
                </Card>
                <Card className="p-2 ms-3">
                  <Card.Title>Fai sapere che stai facendo selezione</Card.Title>
                  <p className="m-0 p-0">candidati qualificati</p>
                  <a href="s">inizia</a>
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
              </Card.Body>
            </Card>
            <Card className="d-flex m-3 position-relative">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Esperienza</Card.Title>
                <section className="d-flex ">
                  <div className="col-1">
                    <Image
                      style={{ width: "60%" }}
                      src={FotoExp}
                      alt="FotoExp"
                    />
                  </div>
                  <div className="col-11">
                    <h6 className="m-0">Macellaio</h6>
                    <p className="m-0">EPICODE Global · Part-time</p>
                    <p className="text-secondary m-0">
                      mag 2021 - Presente · 1 anno 10 mesi
                    </p>
                    <p className="mt-2">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Eius, quod necessitatibus error, neque aut quia mollitia
                      consequuntur nostrum dolore sed repellendus quidem
                      reiciendis delectus dolorum recusandae adipisci odit
                      tempore reprehenderit.
                    </p>
                  </div>
                </section>
              </Card.Body>
            </Card>
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
          <Col className="d-none d-md-block p-0" md={4} lg={3}>
            <Aside />
          </Col>
        </Row>
      )}
    </>
  );
};

export default MainProfile;
