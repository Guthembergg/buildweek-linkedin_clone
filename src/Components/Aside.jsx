import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import TokenUtenti from "./TokenUtenti";

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
      <div className="mb-2" style={{ border: "1px solid gray" }}>
        <div>
          Modifica il tuo profilo e l'URL
          <span className="ps-2">
            <AiFillQuestionCircle style={{ color: "gray" }} />
          </span>
        </div>
        <br />
        <div>
          Aggiungi il tuo profilo in un'altra lingua
          <span className="ps-2">
            <AiFillQuestionCircle style={{ color: "gray" }} />
          </span>
        </div>
      </div>
      {/* secondo div */}
      <div className="mb-2" style={{ border: "1px solid gray" }}>
        <div>
          Annuncio
          <span>
            <BsThreeDots />
          </span>
        </div>
        <div>Visita la pagina di E.Distribuzione</div>
        <div className="">
          <span>immagine profilo </span>
          <span> e-d logo</span>
        </div>
        <div>Diamo molto più valore all'energia</div>
        <div className="d-flex justify-content-center">
          <Button>Segui</Button>
        </div>
      </div>
      {/* terzo div */}
      <div className="mb-2" style={{ border: "1px solid gray" }}>
        <div>Altre aziende consultate</div>
        {utenti &&
          utenti
            .filter((_, i) => i < 5)
            .map((e) => <TokenUtenti profile={e} />)}
      </div>
      {/* quarto div */}
      <div className="mb-2" style={{ border: "1px solid gray" }}>
        <div>Persone che potresti conoscere</div>
        {utenti &&
          utenti
            .filter((_, i) => i < 5)
            .map((e) => <TokenUtenti profile={e} />)}
      </div>
    </div>
  );
};

export default Aside;
