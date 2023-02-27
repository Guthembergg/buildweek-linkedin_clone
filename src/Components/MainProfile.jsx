import { Row, Col, Card, Button } from "react-bootstrap";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";

const MainProfile = () => {
  return (
    <>
      <Row>
        <Col xs={9}>
          <Card className="d-flex m-3 ">
            <Card.Img variant="top" src={imageBackground} />
            <Card.Body>
              <Card.Title className="mt-5">Nome Utente</Card.Title>
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
      </Row>
    </>
  );
};

export default MainProfile;
