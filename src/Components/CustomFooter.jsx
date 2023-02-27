import { Col, Row } from "react-bootstrap"
import { IoMdArrowDropdown, IoMdSettings } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";

const CustomeFooter = () => {
    return(

        <>
            
            <Row className="footer">
            <h3 className="footerTitle">Linkedin</h3>
                <Col xs={6} className="footerLeftCol">
                    <ul>
                        <Col xs={4}>
                            <li>Informazioni</li>
                            <li>Linee guida della comunity</li>
                            <li>Privacy e condizioni <IoMdArrowDropdown className="arrowGiu"/></li>
                            <li>Sales Solutions</li>
                            <li>Centro sicurezza</li>
                        </Col >
    
                        <Col xs={4}>
                            <li>Accessibilità</li>
                            <li>Carriera</li>
                            <li>Opzioni di annuncio</li>
                            <li>Mobile</li>
                        </Col>
    
                        <Col xs={4}>
                            <li>Talent Solutions</li>
                            <li>Soluzioni di marketing</li>
                            <li>Pubblicità</li>
                            <li>Piccole imprese</li>
                        </Col >
    
                        {/* <li>Informazioni</li>
                        <li>Accessibilità</li>
                        <li>Talent Solutions</li>
                        <li>Linee guida della comunity</li>
                        <li>Carriera</li>
                        <li>Soluzioni di marketing</li>
                        <li>Privacy e condizioni <IoMdArrowDropdown className="arrowGiu"/></li>
                        <li>Opzioni di annuncio</li>
                        <li>Pubblicità</li>
                        <li>Sales Solutions</li>
                        <li>Mobile</li>
                        <li>Piccole imprese</li>
                        <li>Centro sicurezza</li> */}
                    </ul>
                </Col>
                <Col xs={3}>
                    <Row >
                        <Col xs={2}>
                            <AiFillQuestionCircle className="footerIcon"/>
                        </Col>
                        <Col xs={10}>
                            <h6>Domande?</h6>
                            <p>Visita il nostro Centro assistenza</p>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={2}>
                            <IoMdSettings className="footerIcon"/>
                        </Col>
                        <Col xs={10}>
                            <h6>Gestisci il tuo account e la tua privacy</h6>
                            <p>Vai alle impostazioni</p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={3}>
                    <label>Seleziona lingua</label>
                    <select name="language" id="" >
                        <option value="0" selected="selected"> Italiano - Italiano</option>
                        <option value="1">English - Inglese</option>
                        <option value="2">Français - Francese</option>
                    </select>
                </Col>
                <span className="footerCopiright">Linkedin Corporation © 2023</span>
                
            </Row>
        </>
    )
}

export default CustomeFooter