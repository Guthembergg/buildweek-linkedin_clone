import { useEffect, useState } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";

const CardRete = ({ id }) => {
  const [singleProfile, setSingleProfile] = useState();
  const token = process.env.REACT_APP_TOKEN;

  const fetchFollowProfile = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setSingleProfile(data);
        console.log(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchFollowProfile();
  }, []);

  return (
    <Col xs={6} md={3}>
      <Card className="d-flex mb-3">
        <Card.Img
          variant="top"
          src={imageBackground}
          style={{ maxHeight: "100px", minHeight: "60px" }}
        />
        <Card.Body className=" position-relative border-bottom border-tertiary text-center">
          <Card.Title className="mt-1  m-0 fs-6">
            <Link className="text-decoration-none text-dark" to={`/profile/me`}>
              {singleProfile?.name} {singleProfile?.surname}
            </Link>
            <Image
              className="position-absolute imageProfileNews"
              style={{ zIndex: "10" }}
              roundedCircle={true}
              alt=""
              src={
                singleProfile?.image
                  ? singleProfile?.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
          </Card.Title>
          <Card.Text
            style={{ height: "2rem" }}
            className="text-secondary text-truncate"
          >
            {singleProfile?.title}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardRete;
