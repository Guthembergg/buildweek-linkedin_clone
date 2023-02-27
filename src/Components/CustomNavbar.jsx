import { Col, Row, Form } from "react-bootstrap"
import { AiFillLinkedin, AiFillMessage } from "react-icons/ai"
import { IoMdArrowDropdown } from "react-icons/io";
import { MdHome, MdWork, MdNotifications } from "react-icons/md";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { GoSearch } from "react-icons/go";


const CustomNavbar = () => {
    return(
        <Row className="w-100 navigation d-flex justify-content-center">
        
        <Col className="leftNav d-flex justify-content-center align-items-center" xs={10}>
            <div className="searchBar">
                <AiFillLinkedin className="linkedinIcon"/>
                <Form className="d-flex form d-none d-lg-block">
                    <Form.Control
                        type="search"
                        placeholder="Cerca"
                        className="me-2 formBlue"
                        aria-label="Search"
                        
                    />
                <GoSearch className="lente"/>
                </Form>
            </div>
            
                <ul className="navBarUl">
                    <li>
                        < MdHome className="navIcon"/>
                        <span className="d-none d-lg-block">Home</span>
                    </li>
                    <li>
                        < BsFillPeopleFill className="navIcon"/>
                        <span className="d-none d-lg-block">Rete</span>
                    </li>
                    <li>
                        < MdWork className="navIcon"/>
                        <span className="d-none d-lg-block">Lavoro</span>
                    </li>
                    <li>
                        < AiFillMessage className="navIcon"/>
                        <span className="d-none d-lg-block">Messaggistica</span>
                    </li>
                    <li>
                        < MdNotifications className="navIcon"/>
                        <span className="d-none d-lg-block">Notifiche</span>
                    </li>
                    <li >
                        < BsFillPersonFill className="navIcon"/>
                        <span className="d-none d-lg-block">Tu <IoMdArrowDropdown className="arrowGiu"/></span>
                    </li>
                    </ul>
                    <ul className="navBarUl">
                        <li>
                            < CgMenuGridR className="navIcon"/>
                            <span className="d-none d-lg-block">Lavoro <IoMdArrowDropdown className="arrowGiu"/></span>
                        </li>
                        <li >
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