import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const JobCard = (props) => {
    console.log(props)
    return (
        <Card.Body>
            <div>
            <Link to={props.singleJob.url} target={"_blank"} className="text-decoration-none"><h5>{props.singleJob.title}</h5></Link>
            <h6>{props.singleJob.company_name}</h6>
            <h6>{props.singleJob.candidate_required_location}</h6>
            

            </div>
            <div>

            </div>
            
        </Card.Body>        

    )
}

export default JobCard;