import { Row, Col, Button, Image } from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";

const TokenUtenti = ({ profile }) => {
  return (
    <>
      <Row className="p-1">
        <Col xs={3} className="d-flex justify-content-center align-items-start">
          <Image
            className="rounded-circle"
            style={{ width: "100%" }}
            src={profile.image}
          ></Image>
        </Col>
        <Col xs={9}>
          <div>
            <h6 className="mb-0">
              {profile.name} {profile.surname}
              <span className="text-secondary"> - 2°</span>
            </h6>
          </div>
          <div>
            <p>{profile.title}</p>
          </div>
          <div className="ms-4">
            <Button variant="outline-dark" className="rounded-pill">
              <BsPersonPlusFill></BsPersonPlusFill> Segui
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TokenUtenti;
