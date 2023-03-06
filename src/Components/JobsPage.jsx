import { Row, Col, Card, Button } from "react-bootstrap";
import {BsFillBookmarkFill, BsFillBellFill, BsFillPlayBtnFill, BsPencilSquare} from "react-icons/bs";
import {BiTask} from "react-icons/bi";
import {MdSettings} from "react-icons/md";
import { useEffect, useState } from "react";
import CardJob from "./CardJob";

const JobsPage = () => {

    const [jobList, setJobList] = useState()


    const fetchJob = async () => {
        try {
            const response = await fetch ("https://strive-benchmark.herokuapp.com/api/jobs")
            if (response.ok) {
                const job = await response.json()
                setJobList(job.data.reverse().slice(0,20))
                console.log(jobList)
            }
            
        } catch(error) {
            console.log(error)
        }
    } 

    useEffect(()=>{
        fetchJob()
    },[])
    return (
        <Row  className="d-flex flex-column flex-lg-row justify-content-center py-3 m-0 w-100">
            <Col  md={10} xl={2}>
                <Card>
                    <Card.Body>
                        <div className="my-2 text-secondary"><span><BsFillBookmarkFill/></span><span className="ms-2">Le mie offerte di lavoro</span></div>
                        <div className="my-2 text-secondary"><span><BsFillBellFill/></span><span className="ms-2">Avvisi offerte di lavoro</span></div>
                        <div className="my-2 text-secondary"><span><BiTask/></span><span className="ms-2">Valutazione delle competenze</span></div>
                        <div className="my-2 text-secondary"><span><BsFillPlayBtnFill/></span><span className="ms-2"> Indicazioni per chi cerca lavoro</span></div>
                        <div className="my-2 text-secondary"><span><MdSettings/></span><span className="ms-2">Impostazioni candidatura</span></div>
                    </Card.Body>
                </Card>
                <Button className="rounded-pill p-3 my-3 d-none d-lg-block" variant="outline-primary"><span><BsPencilSquare/></span> Pubblica offerta gratuita</Button>
            </Col>
            <Col  xs={10} md={8} lg={6}>
                <Card>
                    {jobList && jobList.map((job, i) => (<CardJob key={`job-${i}`} singleJob={job} />))}                    
                </Card>
            </Col>
            <Col className="d-none d-xl-block" xl={2}></Col>
        </Row>
        
    )
}

export default JobsPage