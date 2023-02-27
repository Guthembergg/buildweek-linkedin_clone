import { Row, Col, Card, Button, Image } from "react-bootstrap";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import { BsFillEyeFill } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";

const MainProfile = () => {
  const [me, setMe] = useState();
  const MainProfile = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjNjY0OGYxOTNlNjAwMTM4MDdmNGYiLCJpYXQiOjE2Nzc0ODU3MTIsImV4cCI6MTY3ODY5NTMxMn0.K-x1r1f3GI44gbmbavOGWzuo0OEpPf5qkw5L1mJaNLI";
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/me`,
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
      <Row>
        <Col xs={9}>
          <Card className="d-flex m-3 position-relative">
            <Card.Img variant="top" src={imageBackground} />
            <Card.Body>
              <Card.Title className="mt-5 position-relative ">
                Nome Utente
                <Image
                  roundedCircle={true}
                  alt=""
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  className="position-absolute imageProfile "
                />
              </Card.Title>
              <p className="m-0 p-0">scecialista informatico</p>
              <i className="m-0 p-0">Ferrara</i>
              <div>
                <Button>Disponibile per</Button>
                <Button className="ms-2" variant="outline-primary">
                  Aggiungi sezione del profilo
                </Button>
                <Button className="ms-2" variant="outline-secondary">
                  Altro
                </Button>
              </div>
            </Card.Body>{" "}
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
        </Col>
      </Row>
    </>
  );
};

export default MainProfile;
