import { Row, Col, Button, Image } from "react-bootstrap";

const TokenUtenti = ({ profile }) => {
  return (
    <>
      <Row>
        <Col
          xs={3}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            className="rounded-circle"
            style={{ width: "85%" }}
            src={profile.image}
          ></Image>
        </Col>
        <Col xs={9}>
          <Row>
            <p>
              {profile.name} {profile.surname}
              <span> 2°</span>
            </p>
          </Row>
          <Row>
            <p>{profile.title}</p>
          </Row>
          <Row>
            <Button>Segui</Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TokenUtenti;
