import { Col, Row } from "react-bootstrap";
import CardAndFooter from "./CardAndFooter";
import CardProfile from "./CardProfileNews";
import CardProfileRete from "./CardRete";
import { useSelector } from "react-redux";

const MainRete = () => {
  const follow = useSelector((state) => state.seguiti);
  console.log(follow);
  return (
    <Row className="d-flex justify-content-center py-3 m-0 w-100">
      <Col className="d-none d-md-block p-0" md={3} xl={2}>
        <CardProfile />
      </Col>
      <Col xs={10} md={8} lg={6}>
        <Row className="d-flex justify-content-between">
          {" "}
          {follow &&
            follow.map((e, i) => <CardProfileRete key={`follow${i}`} id={e} />)}
        </Row>
      </Col>
      <Col className="d-none d-xl-block p-0" xl={2}>
        <CardAndFooter />
      </Col>
    </Row>
  );
};

export default MainRete;
