import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalProfile from "./ModalProfile";
import ModalInfo from "./ModalInfo";
import ModalExp from "./ModalExp";
import Aside from "../Components/Aside";
import ModalSingleExp from "./ModalSingleExp";
import FotoExp from "../assets/FotoCardExp.jpeg";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import { HiOutlinePencil } from "react-icons/hi";
import { BsFillEyeFill } from "react-icons/bs";

const func = () => {
  <Card className="d-flex m-3 position-relative">
    <Card.Img variant="top" src={imageBackground} />
    <Card.Body className="position-relative">
      <div className="modalPencil d-flex justify-content-center align-items-center">
        {check === "me" && <ModalProfile me={me} />}
      </div>

      <Card.Title className="mt-5 position-relative m-0">
        {me.name} {me.surname}
        <Image
          roundedCircle={true}
          alt=""
          src={
            me.image
              ? me.image
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          className="position-absolute imageProfile "
        />
      </Card.Title>
      <p className="m-0 p-0">{me.title}</p>
      <i className="m-0 p-0">{me.area}</i>
      <div className="mt-2">
        <Button variant="primary rounded-pill">Disponibile per</Button>
        <Button className="ms-2" variant="outline-primary rounded-pill">
          Aggiungi sezione del profilo
        </Button>
        <Button className="ms-2" variant="outline-secondary rounded-pill">
          Altro
        </Button>
      </div>
    </Card.Body>
    <div className="d-flex ms-3 pb-3">
      <Card className="p-2">
        <Card.Title>Disponibile a lavorare</Card.Title>
        <p className="m-0 p-0">Ruoli specialista IT</p>
        <a href="s">inizia</a>
      </Card>
      <Card className="p-2 ms-3">
        <Card.Title>Fai sapere che stai facendo selezione</Card.Title>
        <p className="m-0 p-0">candidati qualificati</p>
        <a href="s">inizia</a>
      </Card>
    </div>
  </Card>;
};

export default func;
