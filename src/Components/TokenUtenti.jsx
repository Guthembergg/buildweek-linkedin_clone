import { Row, Col, Button, Image } from "react-bootstrap";

const TokenUtenti = ({ profile }) => {
  return (
    <>
      <Row>
        <Col xs={3} className="d-flex justify-content-center align-items-start">
          <Image
            className="rounded-circle"
            style={{ width: "100%" }}
            src={profile.image}
          ></Image>
        </Col>
        <Col xs={9}>
          <div>
            <p className="mb-0">
              {profile.name} {profile.surname}
              <span> 2°</span>
            </p>
          </div>
          <div>
            <p>{profile.title}</p>
          </div>
          <div>
            <Button>Segui</Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TokenUtenti;
