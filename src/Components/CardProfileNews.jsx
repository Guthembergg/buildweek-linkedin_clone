import { Card, Image } from "react-bootstrap"
import { Hashtag } from "react-bootstrap-icons";
import imageBackground from "../assets/linkedin_immagine_sfondo.jpg";



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
            <Card.Body className="border-bottom border-tertiary">         
                <p className="cardProfileText text-secondary mb-0"> Collegamenti<span>52</span></p>
                <p className="cardProfileText text-dark mt-0"> Espandi la tua rete</p>
                <p className="cardProfileText text-secondary"> Chi ha visitato il tuo profilo? <span>52</span></p>              
            </Card.Body>
            </Card>
            
        </section>
     

    )
}

export default CardProfile