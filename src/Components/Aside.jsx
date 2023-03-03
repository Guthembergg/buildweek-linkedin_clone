import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import TokenUtenti from "./TokenUtenti";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Logo from "../assets/logoEpicode.jpg";

const Aside = () => {
  const [utenti, setUtenti] = useState();

  const AsideFetch = async () => {
    try {
      const token = process.env.REACT_APP_TOKEN;

      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUtenti(data.reverse());
      } else {
        console.log("errore nel else di aside");
      }
    } catch (err) {
      console.log("errore nel catch di aside", err);
    }
  };
  useEffect(() => {
    AsideFetch();
  }, []);

  console.log(utenti);
  return (
    <div className="m-3 ">
      {/* primo div */}
      <div
        className="mb-2 p-2 text-secondary rounded bg-white"
        style={{
          fontSize: "0.95em",
          fontWeight: "500",
          border: "1px solid lightgray",
        }}
      >
        <div className=" linkAside">
          Modifica il tuo profilo e l'URL
          <span className="ps-2">
            <AiFillQuestionCircle style={{ color: "gray" }} />
          </span>
        </div>
        <hr />
        <div className=" linkAside">
          Aggiungi il tuo profilo in un'altra lingua
          <span className="ps-2">
            <AiFillQuestionCircle style={{ color: "gray" }} />
          </span>
        </div>
      </div>
      {/* secondo div */}
      <div
        className="mb-2 p-2 text-secondary text-center rounded bg-white"
        style={{
          fontSize: "0.9em",
          fontWeight: "500",
          border: "1px solid lightgray",
        }}
      >
        <div
          className="d-flex justify-content-end text-dark"
          style={{ fontSize: "0.7em" }}
        >
          <p>
            Annuncio
            <span className="ms-1">
              <BsThreeDots />
            </span>
          </p>
        </div>
        <div>L'azienda che ti aiuta a costruire il tuo futuro</div>
        <div>
          <Image
            className="rounded-circle"
            style={{ width: "40%" }}
            src={Logo}
          />
        </div>
        <div>EPICODE GLOBAL</div>
        <div className="d-flex justify-content-center mt-2">
          <Button href="https://www.epicode.com" target="_blank">
            Segui
          </Button>
        </div>
      </div>
      {/* terzo div */}
      <div
        className="mb-2 p-2 rounded bg-white"
        style={{ border: "1px solid lightgray" }}
      >
        <div style={{ fontWeight: "600", fontSize: "1.15em" }} className="mb-1">
          Altre aziende consultate
        </div>
        {utenti &&
          utenti
            .filter((_, i) => i < 5)
            .map((e, i) => <TokenUtenti key={`aziende-${i}`} profile={e} />)}
      </div>
      {/* quarto div */}
      <div
        className="mb-2 p-2 rounded bg-white"
        style={{ border: "1px solid lightgray" }}
      >
        <div style={{ fontWeight: "600", fontSize: "1.15em" }} className="mb-1">
          Persone che potresti conoscere
        </div>
        {utenti &&
          utenti
            .filter((_, i) => i > 5 && i < 11)
            .map((e, i) => <TokenUtenti key={`utenti-${i}`} profile={e} />)}
      </div>
    </div>
  );
};

export default Aside;
