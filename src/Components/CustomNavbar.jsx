import { Col, Row, Form, Dropdown, Button, Image } from "react-bootstrap";
import { AiFillLinkedin, AiFillMessage } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdHome, MdWork, MdNotifications } from "react-icons/md";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const CustomNavbar = () => {
  const profile = useSelector((state) => state.myProfile);
  const token = process.env.REACT_APP_TOKEN;
  const token2 = process.env.REACT_APP_COMMENT;
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setQuery(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_QUERY", payload: query });
    navigate("/jobs");
  };

  const MainProfile = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();

        dispatch({ type: "ADD_MY_PROFILE", payload: data });
      } else {
        console.log("mainPage: Main profile. errore in if");
      }
    } catch (err) {
      console.log("mainPage: Main profile. err in catch");
    }
  };

  const addCommentsFetch = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token2}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: "test",
            rate: 3,
            elementId: "0316438960",
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "COMMENT_ID", payload: data });
        console.log(data);
      } else {
        console.log("mainPage: comments. errore in if");
      }
    } catch (err) {
      console.log("mainPage: comments. err in catch");
    }
  };
  useEffect(() => {
    MainProfile();
  }, []);
  useEffect(() => {
    addCommentsFetch();
  }, []);
  return (
    <Row
      className="w-100 navigation d-flex justify-content-center m-0 "
      style={{ zIndex: "100", height: "65px" }}
    >
      <Col
        className="leftNav d-flex justify-content-center align-items-center pt-0 "
        xs={10}
      >
        <Col lg={6} xs={0}>
          <div className="searchBar d-flex align-items-center">
            {/* QUESTO LINK PORTA A MAIN PROFILE PER IL MOMENTO */}
            <Link to="/">
              <AiFillLinkedin className="linkedinIcon" href="/" />
            </Link>

            <Form
              className="d-flex form d-none d-lg-block"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Control
                type="search"
                placeholder="Cerca"
                className="me-2 formBlue h-100"
                aria-label="Search"
                onChange={(e) => handleChange(e.target.value)}
              />
              <GoSearch className="lente" />
            </Form>
          </div>
        </Col>

        <ul className="navBarUl d-flex justify-content-center align-items-center">
          <Link className="text-secondary text-decoration-none" to={"/"}>
            <li>
              <MdHome className="navIcon" />
              <span className="d-none d-lg-block">Home</span>
            </li>
          </Link>
          <li className="d-none d-md-block text-center">
            <BsFillPeopleFill className="navIcon" />
            <span className="d-none d-lg-block">Rete</span>
          </li>
          <Link className="text-decoration-none text-secondary" to={"/jobs"}>
            <li className="d-none d-md-block text-center">
              <MdWork className="navIcon" />
              <span className="d-none d-lg-block">Lavoro</span>
            </li>
          </Link>
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
                <br></br>
                <div className="d-none d-lg-inline">Tu</div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Row className="px-3 py-1">
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
                    <div>
                      <strong>
                        {profile?.name} {profile?.surname}
                      </strong>
                    </div>
                    <div style={{ width: "200px", textOverflow: "ellipsis" }}>
                      {profile?.title}
                    </div>
                  </Col>
                </Row>

                <Dropdown.Item>
                  {" "}
                  <Link
                    className="text-secondary text-decoration-none"
                    to={"/profile/me"}
                  >
                    <Button
                      variant="outline-primary rounded-pill btn-sm"
                      className="fs-6 w-100 "
                    >
                      Visualizza profilo
                    </Button>
                  </Link>
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item>
                  <p className="fw-bold m-0"> Account</p>
                </Dropdown.Item>
                <Dropdown.Item>Prova Premium gratis</Dropdown.Item>
                <Dropdown.Item>Guida</Dropdown.Item>
                <Dropdown.Item>Lingua</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <p className="fw-bold m-0">Gestisci</p>
                </Dropdown.Item>
                <Dropdown.Item>Post e attività</Dropdown.Item>
                <Dropdown.Item>
                  Account per la pubblicazione di offerte
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Esci</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <ul className="navBarUl d-none d-md-flex">
          <li className="p-0">
            <CgMenuGridR className="navIcon" />
            <span className="d-none d-lg-flex p-0">
              Lavoro <IoMdArrowDropdown className="arrowGiu" />
            </span>
          </li>
          <li className="d-none d-xl-flex">
            <a href="/">Prova Premium</a>
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
