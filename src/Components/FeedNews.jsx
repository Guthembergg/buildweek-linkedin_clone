import { Card, Image } from "react-bootstrap";
import {SlLike} from "react-icons/sl"
import {AiOutlineComment} from "react-icons/ai";
import {FiSend} from "react-icons/fi"
import {ImLoop} from "react-icons/im"
import { Link } from "react-router-dom";

const FeedNews = (props) => {
  
    return(
        <Card className="mb-3">
            <section className="d-flex p-3">
                <div>
                    <Image
                    roundedCircle={true}
                    style={{width: "50px", height:"50px"}}
                    src={
                        props.news?.image
                          ? props.news.image
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }/>
                    </div>
                  <div className="p-2">
                    <Link className="text-decoration-none" to={`/${props.news?.user._id}`}><h6 className="m-0">{props.news?.user.name} {props.news?.user.surname}</h6></Link>
                    <p className="m-0 text-secondary">{props.news?.user.title}</p>
                    <p className="m-0 text-secondary"><span>{props.news?.createdAt.slice(12,16)} - {props.news?.createdAt.slice(8,10)}/{props.news?.createdAt.slice(5,7)}/{props.news?.createdAt.slice(0,4)}</span></p>
                  </div>
                  <div>
                    </div>                
            </section>
            <Card.Body className="border-top">
                <p>{props.news.text}</p>
            </Card.Body>
            <section className="d-flex justify-content-center text-tertiary border-top">
                <div className="iconPost rounded"><span className="me-2"><SlLike/></span>Consiglia </div>
                <div className="iconPost rounded"><span className="me-2"><AiOutlineComment/></span>Commenta </div>
                <div className="iconPost rounded"><span className="me-2"><ImLoop/></span> Diffondi il post</div>
                <div className="iconPost rounded"><span className="me-2"><FiSend/></span> Invia</div>
            </section>       
            
        </Card>


    )
};

export default FeedNews;
