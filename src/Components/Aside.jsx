import { useEffect, useState } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import TokenUtenti from "./TokenUtenti";
import Logo from "../assets/logoEpicode.jpg"

const Aside = () => {
  const [utenti, setUtenti] = useState();

  const AsideFetch = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjNjY0OGYxOTNlNjAwMTM4MDdmNGYiLCJpYXQiOjE2Nzc0ODU3MTIsImV4cCI6MTY3ODY5NTMxMn0.K-x1r1f3GI44gbmbavOGWzuo0OEpPf5qkw5L1mJaNLI";
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
        setUtenti(data);
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
    <div className="m-3">
      {/* primo div */}
      <div className="mb-2 p-2 text-secondary rounded" style={{ fontSize: "0.95em", fontWeight: "500" , border: "1px solid lightgray" }}>
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
      <div className="mb-2 p-2 text-secondary text-center rounded" style={{fontSize: "0.9em", fontWeight: "500", border: "1px solid lightgray" }}>
        <div className="d-flex justify-content-end text-dark"  style={{fontSize: "0.7em"}}>
          <p>Annuncio 
          <span className="ms-1">
            <BsThreeDots />
          </span></p>
        </div>
        <div>L'azienda che ti aiuta a costruire il tuo futuro</div>
        <div>
          <Image className="rounded-circle"
            style={{ width: "40%" }} src={Logo}/>
        </div>
        <div>EPICODE</div>
        <div className="d-flex justify-content-center mt-2">
          <Button href="https://www.epicode.com" target="_blank">Segui</Button>
        </div>
      </div>
      {/* terzo div */}
      <div className="mb-2 p-2 rounded" style={{ border: "1px solid lightgray" }}>
        <div style={{fontWeight:"600", fontSize: "1.15em"}} className="mb-1">Altre aziende consultate</div>
        {utenti &&
          utenti
            .filter((_, i) => i < 5)
            .map((e) => <TokenUtenti profile={e} />)}
      </div>
      {/* quarto div */}
      <div className="mb-2 p-2 rounded" style={{ border: "1px solid lightgray" }}>
        <div style={{fontWeight:"600", fontSize: "1.15em"}}  className="mb-1">Persone che potresti conoscere</div>
        {utenti &&
          utenti
            .filter((_, i) => i < 5)
            .map((e) => <TokenUtenti profile={e} />)}
      </div>
    </div>
  );
};

export default Aside;
