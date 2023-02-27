import { Row, Col, Card, Button, Image } from "react-bootstrap";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import { BsFillEyeFill } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../Components/Aside";

const MainProfile = () => {
  const param = useParams();
  let check;
  if (param.id === "") {
    check = "me";
  } else {
    check = "";
  }
  const [me, setMe] = useState();
  const MainProfile = async () => {
    try {
      const token = process.env.REACT_APP_TOKEN;
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${check}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setMe(data);
      } else {
        console.log("mainPage errore in if");
      }
    } catch (err) {
      console.log("mainPage err in catch");
    }
  };

  useEffect(() => {
    MainProfile();
  }, []);
  console.log(me);
  return (
    <>
      {me && (
        <Row className="w-100">
          <Col xs={9}>
            <Card className="d-flex m-3 position-relative">
              <Card.Img variant="top" src={imageBackground} />
              <Card.Body>
                <Card.Title className="mt-5 position-relative m-0">
                  {me.name} {me.surname}
                  <Image
                    roundedCircle={true}
                    alt=""
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    className="position-absolute imageProfile "
                  />
                </Card.Title>
                <p className="m-0 p-0">scecialista informatico</p>
                <i className="m-0 p-0">Ferrara</i>
                <div className="mt-2">
                  <Button>Disponibile per</Button>
                  <Button className="ms-2" variant="outline-primary">
                    Aggiungi sezione del profilo
                  </Button>
                  <Button className="ms-2" variant="outline-secondary">
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
          </Col>
          <Col xs={3} className="mt-5">
            <Aside />
          </Col>
        </Row>
      )}
    </>
  );
};

export default MainProfile;
