import { Card, Image } from "react-bootstrap";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import { BsFillBookmarkFill } from "react-icons/bs";
import {BiChart} from "react-icons/bi"
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useParams, Link } from "react-router-dom";

const CardProfile = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [me, setMe] = useState();
  const param = useParams();
  const dispatch = useDispatch();
  let check;

  if (param.id === undefined) {
    check = "me";
  } else {
    check = param.id;
  }

  const MainProfile = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${check}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setMe(data);
        if (check === "me") {
          dispatch({ type: "ADD_MY_PROFILE", payload: data });
        }
      } else {
        console.log("mainPage: Main profile. errore in if");
      }
    } catch (err) {
      console.log("mainPage: Main profile. err in catch");
    }
  };

  useEffect(() => {
    MainProfile();
  }, []);

  return (
    <section>
      <Card className="d-flex mb-3">
        <Card.Img variant="top" src={imageBackground} style={{maxHeight: "100px", minHeight:"60px"}} />
        <Card.Body className=" position-relative border-bottom border-tertiary text-center">
        <Card.Title className="mt-1  m-0 fs-6">
        <Link
            className="text-decoration-none text-dark"
            to={`/profile/me`}
          >{me?.name} {me?.surname}</Link>
            <Image
              className="position-absolute imageProfileNews"
              style={{ zIndex: "10" }}
              roundedCircle={true}
              alt=""
              src={
                me?.image
                  ? me?.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
          </Card.Title>
          <Card.Text className="text-secondary">{me?.title}</Card.Text>
        </Card.Body>
        <Card.Body className="cardProfileText border-bottom border-tertiary d-none d-md-block">
          <p className=" text-secondary mb-0 d-flex justify-content-between">
            {" "}
            Collegamenti<span className="text-primary">52</span>
          </p>
          <p className=" text-dark mt-0"> Espandi la tua rete</p>
          <p className=" text-secondary d-flex justify-content-between">
            {" "}
            Chi ha visitato il tuo profilo?{" "}
            <span className="text-primary">13</span>
          </p>
        </Card.Body>
        <Card.Body className="cardProfileText border-bottom border-tertiary d-none d-md-block">
          <p className=" text-secondary mb-0 d-flex justify-content-between">
            {" "}
            Accedi a strumenti e informazioni in esclusiva.
          </p>
          <div className="d-flex ">
            <p className="cardProfileTextLink text-decoration-underline">
              
              <BiChart className="text-warning fs-5 bg-warning"  /> {" "} 
              Prova Premium Gratis.
            </p>
          </div>
        </Card.Body>
        <Card.Body className="cardProfileText border-bottom border-tertiary py-2 d-none d-md-block">
          <p className="mt-0">
            {" "}
            <BsFillBookmarkFill /> I miei elementi
          </p>
        </Card.Body>
      </Card>
    </section>
  );
};

export default CardProfile;
