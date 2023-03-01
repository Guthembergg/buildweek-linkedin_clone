import { Row, Col, Card} from "react-bootstrap"
import CardProfile from "./CardProfileNews";
import{BiHash} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import {BsInfoSquareFill} from "react-icons/bs"
import {RxDotFilled} from "react-icons/rx"
import CardAndFooter from "./CardAndFooter";

const MainNews = () => {
    return (
        <Row className="d-flex justify-content-center">
            <Col xs={2}>
                <CardProfile/>
            <Card className="d-flex mt-2">
              <Card.Body className="position-relative px-0 py-2">
              <p className="text-secondary mb-1 px-3"> Recenti</p>
                <section>
                <p className="cardProfileText px-3 mb-1"><BiHash/> produttività</p>
                <p className="cardProfileText px-3 mb-1"><BiHash/> motivazione</p>
                <p className="cardProfileText px-3 mb-1 "><BiHash/> informatica</p>
                <p className="cardProfileText px-3 mb-1 "><BiHash/> tecnologia</p>  
                </section>
                <section className="d-flex">
                    <div>
                     <p className="cardProfileTextBlu text-primary px-3 my-3">Gruppi</p>
                     <p className="cardProfileTextBlu text-primary px-3 mb-3 ">Eventi</p>
                     <p className="cardProfileTextBlu text-primary px-3">Hashtag seguiti</p> 
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="ms-2 "><AiOutlinePlus/></p>
                    </div>
                </section>
                <section>
                <p className="cardProfileText px-3 mb-1"><BiHash/> produttività</p>
                <p className="cardProfileText px-3 mb-1"><BiHash/> motivazione</p>
                <p className="cardProfileText px-3 mb-1 "><BiHash/> informatica</p>
                <p className="cardProfileText px-3 mb-1 "><BiHash/> tecnologia</p>  
                </section>
                             
              </Card.Body>
            </Card>
                </Col>
            <Col xs={5}> FEED NEWS</Col>
            <Col xs={3}> 
            <Card className="mt-2">
            <Card.Body className="position-relative px-0 py-2">
              <h6 className="d-flex justify-content-between mb-2 px-3"> Linkedin Notizie <span><BsInfoSquareFill/></span></h6>
                <section className="d-flex px-3">
                    <div className="d-flex justify-content-center align-items-start">
                        <p><RxDotFilled/></p>
                    </div>
                    <div>
                      <p className="fs-6 m-0"><strong>A volte basta chiedere</strong></p>
                      <p className="text-secondary mb-1 fs-6">23 anni fa - 3 lettori</p> 
                    </div>                
                </section>
                <section className="d-flex px-3">
                    <div className="d-flex justify-content-center align-items-start">
                        <p><RxDotFilled/></p>
                    </div>
                    <div>
                      <p className="fs-6 m-0"><strong>A volte basta chiedere</strong></p>
                      <p className="text-secondary mb-1 fs-6">23 anni fa - 3 lettori</p> 
                    </div>                
                </section>
                <section className="d-flex px-3">
                    <div className="d-flex justify-content-center align-items-start">
                        <p><RxDotFilled/></p>
                    </div>
                    <div>
                      <p className="fs-6 m-0"><strong>A volte basta chiedere</strong></p>
                      <p className="text-secondary mb-1 fs-6">23 anni fa - 3 lettori</p> 
                    </div>                
                </section>
                <section className="d-flex px-3">
                    <div className="d-flex justify-content-center align-items-start">
                        <p><RxDotFilled/></p>
                    </div>
                    <div>
                      <p className="fs-6 m-0"><strong>A volte basta chiedere</strong></p>
                      <p className="text-secondary mb-1 fs-6">23 anni fa - 3 lettori</p> 
                    </div>                
                </section>
                <section className="d-flex px-3">
                    <div className="d-flex justify-content-center align-items-start">
                        <p><RxDotFilled/></p>
                    </div>
                    <div>
                      <p className="fs-6 m-0"><strong>A volte basta chiedere</strong></p>
                      <p className="text-secondary mb-1 fs-6">23 anni fa - 3 lettori</p> 
                    </div>                
                </section>
                <section className="d-flex px-3">
                    <div className="d-flex justify-content-center align-items-start">
                        <p><RxDotFilled/></p>
                    </div>
                    <div>
                      <p className="fs-6 m-0"><strong>A volte basta chiedere</strong></p>
                      <p className="text-secondary mb-1 fs-6">23 anni fa - 3 lettori</p> 
                    </div>                
                </section>
                             
              </Card.Body>
              </Card>
              <CardAndFooter />
            </Col>
        </Row>
    )
}

export default MainNews