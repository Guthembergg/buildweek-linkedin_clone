import { Card, Image } from "react-bootstrap"
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import {BsFillBookmarkFill} from "react-icons/bs"
import {GrCheckbox} from "react-icons/gr"
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";


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
            <Card className="d-flex">
              <Card.Img variant="top" src={imageBackground}/>
              <Card.Body className="border-bottom border-tertiary">         
                <Card.Title className="mt-1 position-relative m-0 fs-6">{me?.name} {me?.surname}               
                  <Image className="position-absolute imageProfileNews" roundedCircle={true}
                    alt=""
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                </Card.Title>
                <Card.Text>{me?.title}</Card.Text>              
            </Card.Body>
            <Card.Body className="cardProfileText border-bottom border-tertiary">         
                <p className=" text-secondary mb-0 d-flex justify-content-between"> Collegamenti<span className="text-primary">52</span></p>
                <p className=" text-dark mt-0"> Espandi la tua rete</p>
                <p className=" text-secondary d-flex justify-content-between"> Chi ha visitato il tuo profilo? <span className="text-primary">13</span></p>              
            </Card.Body>
            <Card.Body className="cardProfileText border-bottom border-tertiary">         
                <p className=" text-secondary mb-0 d-flex justify-content-between"> Accedi a strumenti e informazioni in esclusiva.</p>
                <div className="d-flex ">
                    <div>
                        <GrCheckbox />
                    </div>
                    <p className="cardProfileTextLink text-decoration-underline" > Fatti assumere più velocemente. Prova Premium Gratis.
                    </p>                    
                </div>             
            </Card.Body>
            <Card.Body className="cardProfileText border-bottom border-tertiary py-2">         
            <p className="mt-0"> <BsFillBookmarkFill/> I miei elementi</p>           
            </Card.Body>
            </Card>
            
        </section>
     

    )
}

export default CardProfile