import { Row, Col, Button, Image } from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const TokenUtenti = ({ profile }) => {
  const navigate = useNavigate()
  return (
    <>
      <Row className="p-1">
        <Col xs={3} className="d-flex justify-content-center align-items-start">
          <Image
            className="rounded-circle"
            style={{ width: "45px", height:"45px" }}
            src={profile.image}
          ></Image>
        </Col>
        <Col xs={9}>
          <div>
          <Link
            className="text-decoration-none text-dark"
            to={`/profile/${profile._id}`}
          ><h6 className="mb-0">
              {profile.name} {profile.surname}
              <span className="text-secondary"> - 2°</span>
            </h6></Link>
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
