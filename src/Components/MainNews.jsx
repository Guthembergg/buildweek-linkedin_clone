import { Row, Col, Card, Image } from "react-bootstrap"
import CardProfile from "./CardProfileNews";

const MainNews = () => {
    return (
        <Row className="d-flex justify-content-center">
            <Col xs={2}>
                <CardProfile/>
            <Card className="d-flex mt-2">
              <Card.Img variant="top" />
              <Card.Body className="position-relative">         
                <Card.Title className="position-relative m-0"></Card.Title>
            </Card.Body>
            </Card>
                </Col>
            <Col xs={6}> FEED NEWS</Col>
            <Col xs={2}> SIDEBAR</Col>
        </Row>
    )
}

export default MainNews