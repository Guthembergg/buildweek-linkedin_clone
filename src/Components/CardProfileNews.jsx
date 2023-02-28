import { Card, Image } from "react-bootstrap"
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";
import {BsFillBookmarkFill} from "react-icons/bs"
import {GrCheckbox} from "react-icons/gr"
import { useSelector } from "react-redux";


const CardProfile = () => {
    return (
        <section>
            <Card className="d-flex mt-3">
              <Card.Img variant="top" src={imageBackground}/>
              <Card.Body className="border-bottom border-tertiary">         
                <Card.Title className="mt-1 position-relative m-0 fs-6">Nome e Cognome                 
                  <Image className="position-absolute imageProfileNews" roundedCircle={true}
                    alt=""
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                </Card.Title>
                <Card.Text> title del fetch</Card.Text>              
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