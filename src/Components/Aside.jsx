import { Row, Col } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";

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
        <Row></Row>
        <Row></Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row></Row>
        <Row></Row>
      </div>
    </>
  );
};

export default Aside;
