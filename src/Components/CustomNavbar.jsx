import { Col, Row, Form, Dropdown, Button, Image } from "react-bootstrap";
import { AiFillLinkedin, AiFillMessage } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdHome, MdWork, MdNotifications } from "react-icons/md";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomNavbar = () => {
  const profile = useSelector((state) => state.myProfile);

  return (
    <Row
      className="w-100 navigation d-flex justify-content-center m-0 "
      style={{ zIndex: "100" }}
    >
      <Col
        className="leftNav d-flex justify-content-center align-items-center"
        xs={10}
      >
        <div className="searchBar">
          {/* QUESTO LINK PORTA A MAIN PROFILE PER IL MOMENTO */}
          <Link to="/">
            <AiFillLinkedin className="linkedinIcon" />
          </Link>
          <Form className="d-flex form d-none d-lg-block">
            <Form.Control
              type="search"
              placeholder="Cerca"
              className="me-2 formBlue"
              aria-label="Search"
            />
            <GoSearch className="lente" />
          </Form>
        </div>

        <ul className="navBarUl d-flex justify-content-center align-items-center">
          <Link className="text-secondary text-decoration-none" to={"/"}>
            <li>
              <MdHome className="navIcon" />
              <span className="d-none d-lg-block">Home</span>
            </li>
          </Link>
          <li>
            <BsFillPeopleFill className="navIcon" />
            <span className="d-none d-lg-block">Rete</span>
          </li>
          <li className="d-none d-md-block text-center">
            <MdWork className="navIcon" />
            <span className="d-none d-lg-block">Lavoro</span>
          </li>
          <li className="d-none d-md-block text-center ">
            <AiFillMessage className="navIcon" />
            <span className="d-none d-lg-block">Messaggistica</span>
          </li>
          <li>
            <MdNotifications className="navIcon" />
            <span className="d-none d-lg-block">Notifiche</span>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle
                variant="none"
                style={{ border: "none", color: "gray" }}
                id="dropdown-basic"
              >
                <BsFillPersonFill className="navIcon" />
                <div>
                  <span className="d-none d-lg-block">Tu</span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <Row>
                    <Col xs={3}>
                      <Image
                        roundedCircle={true}
                        style={{ width: "50px", height: "50px" }}
                        alt=""
                        src={
                          profile?.image
                            ? profile?.image
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                      />
                    </Col>
                    <Col xs={9}>
                      <Row>
                        {profile?.name}
                        {profile?.surname}
                      </Row>
                      <Row>{profile?.title}</Row>
                    </Col>
                  </Row>
                  <Row className="text-center pt-2">
                    <Link
                      className="text-secondary text-decoration-none"
                      to={"/profile/me"}
                    >
                      <Button
                        variant="outline-primary rounded-pill"
                        className="fs-6"
                      >
                        Visualizza profilo
                      </Button>
                    </Link>
                  </Row>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-2">
                  <p className="fw-bold m-0"> Account</p>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  Prova Premium gratis
                </Dropdown.Item>
                <Dropdown.Item href="#/action-4">Guida</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Lingua</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-6">
                  <p className="fw-bold m-0">Gestisci</p>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-7">Post e attività</Dropdown.Item>
                <Dropdown.Item href="#/action-8">
                  Account per la pubblicazione di offerte
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-9">Esci</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <ul className="navBarUl d-none d-md-flex">
          <li>
            <CgMenuGridR className="navIcon" />
            <span className="d-none d-lg-block">
              Lavoro <IoMdArrowDropdown className="arrowGiu" />
            </span>
          </li>
          <li className="p-0">
            <a href="a d-none d-lg-flex">Prova Premium</a>
          </li>
        </ul>
      </Col>
      {/* <Col className= "rightNav" xs={2}>
            <div>seconda col</div>
        </Col> */}
    </Row>
  );
};

export default CustomNavbar;
