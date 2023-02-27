import { Row, Col, Card, Button, Image } from "react-bootstrap";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import Aside from "./Aside";

const MainProfile = () => {
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
                <Button>Aggiungi sezione del profilo</Button>
              </div>
            </Card.Body>{" "}
            <div className="d-flex ms-3">
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
        </Col>
        <Col xs={3}>
          <Aside />
        </Col>
      </Row>
    </>
  );
};

export default MainProfile;
