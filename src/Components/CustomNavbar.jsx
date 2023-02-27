import { Col, Row, Form } from "react-bootstrap"
import { AiFillLinkedin, AiFillMessage } from "react-icons/ai"
import { IoMdArrowDropdown } from "react-icons/io";
import { MdHome, MdWork, MdNotifications } from "react-icons/md";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { GoSearch } from "react-icons/go";


const CustomNavbar = () => {
    return(
        <Row className="navigation">
        
        <Col className="leftNav" xs={10}>
            <div className="searchBar">
                <AiFillLinkedin className="linkedinIcon"/>
                <Form className="d-flex form">
                    <Form.Control
                        type="search"
                        placeholder="Cerca"
                        className="me-2"
                        aria-label="Search"
                        
                    />
                <GoSearch className="lente"/>
                </Form>
            </div>
            
                <ul className="navBarUl">
                    <li>
                        < MdHome className="navIcon"/>
                        <span>Home</span>
                    </li>
                    <li>
                        < BsFillPeopleFill className="navIcon"/>
                        <span>Rete</span>
                    </li>
                    <li>
                        < MdWork className="navIcon"/>
                        <span>Lavoro</span>
                    </li>
                    <li>
                        < AiFillMessage className="navIcon"/>
                        <span>Messaggistica</span>
                    </li>
                    <li>
                        < MdNotifications className="navIcon"/>
                        <span>Notifiche</span>
                    </li>
                    <li >
                        < BsFillPersonFill className="navIcon"/>
                        <span>Tu <IoMdArrowDropdown className="arrowGiu"/></span>
                    </li>
                    </ul>
                    
        </Col>
        <Col xs={2} className="rightNav" >
            <ul className="navBarUl">
                        <li>
                            < CgMenuGridR className="navIcon"/>
                            <span>Lavoro <IoMdArrowDropdown className="arrowGiu"/></span>
                        </li>
                        <li>
                            <a href="a">Prova Premium</a>
                        </li>
                    </ul>
        </Col>
        {/* <Col className= "rightNav" xs={2}>
            <div>seconda col</div>
        </Col> */}
    </Row>
    )
    
}

export default CustomNavbar