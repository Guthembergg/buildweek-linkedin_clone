import { Row, Col, Button } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const Aside = () => {
  return (
    <>
      <div>
        <div>
          Modifica il tuo profilo e l'URL
          <p>
            <AiFillQuestionCircle style={{ color: "gray" }} />
          </p>
        </div>
        <br />
        <div>
          Aggiungi il tuo profilo in un'altra lingua
          <p>
            <AiFillQuestionCircle style={{ color: "gray" }} />
          </p>
        </div>
      </div>
      <div>
        <Row>
          Annuncio
          <p>
            <BsThreeDots />
          </p>
        </Row>
        <Row>Visita la pagina di E.Distribuzione</Row>
        <Row>
          <Col sx={6}>immagine profilo</Col>
          <Col sx={6}>e-d logo</Col>
        </Row>
        <Row>Diamo molto più valore all'energia</Row>
        <Row>
          <Button>Segui</Button>
        </Row>
      </div>
      <div>
        <div>Altre aziende consultate</div>
        <Row>
          <Col xs={2}>img</Col>
          <Col xs={10}>
            <Row>
              <p>nome e comgnome</p>
              <p>2°</p>
            </Row>
            <Row>
              <p>Lavoro</p>
            </Row>
            <Row>
              <Button>Segui</Button>
            </Row>
          </Col>
        </Row>
      </div>
      <div>
        <div>Persone che potresti conoscere</div>
        <Row>
          <Col xs={2}>img</Col>
          <Col xs={10}>
            <Row>
              <p>nome e comgnome</p>
              <p>2°</p>
            </Row>
            <Row>
              <p>Lavoro</p>
            </Row>
            <Row>
              <Button>Segui</Button>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Aside;
