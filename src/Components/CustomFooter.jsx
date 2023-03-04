import { Col, Row } from "react-bootstrap";
import { IoMdArrowDropdown, IoMdSettings } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const CustomeFooter = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <Row className="footer w-100 d-flex justify-content-center flex-column flex-md-row">
          <h3 className="footerTitle my-3 text-center">Linkedin</h3>
          <Col md={4} className="footerLeftCol d-none d-lg-block">
            <ul className="d-flex justify-content-between">
              <Col xs={3}>
                <li>Informazioni</li>
                <li>Linee guida della comunity</li>
                <li>
                  Privacy e condizioni{" "}
                  <IoMdArrowDropdown className="arrowGiu" />
                </li>
                <li>Sales Solutions</li>
                <li>Centro sicurezza</li>
              </Col>

              <Col xs={3}>
                <li>Accessibilità</li>
                <li>Carriera</li>
                <li>Opzioni di annuncio</li>
                <li>Mobile</li>
              </Col>

              <Col xs={3}>
                <li>Talent Solutions</li>
                <li>Soluzioni di marketing</li>
                <li>Pubblicità</li>
                <li>Piccole imprese</li>
              </Col>
            </ul>
          </Col>
          <Col xs={10} md={3}>
            <Row>
              <Col xs={2}>
                <AiFillQuestionCircle className="footerIcon" />
              </Col>
              <Col xs={10}>
                <h6>Domande?</h6>
                <p>Visita il nostro Centro assistenza</p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <IoMdSettings className="footerIcon" />
              </Col>
              <Col xs={10}>
                <h6>Gestisci il tuo account e la tua privacy</h6>
                <p>Vai alle impostazioni</p>
              </Col>
            </Row>
          </Col>
          <Col xs={10} md={3}>
            <label>Seleziona lingua</label>
            <select name="language" id="">
              <option value="0" selectedvalue="selected">
                {" "}
                Italiano - Italiano
              </option>
              <option value="1">English - Inglese</option>
              <option value="2">Français - Francese</option>
            </select>
          </Col>
          <span className="footerCopiright">Linkedin Corporation © 2023</span>
        </Row>
      )}
    </>
  );
};

export default CustomeFooter;
