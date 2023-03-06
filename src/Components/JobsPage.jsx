import { Row, Col, Card, Button, Form } from "react-bootstrap";
import {
  BsFillBookmarkFill,
  BsFillBellFill,
  BsFillPlayBtnFill,
  BsPencilSquare,
} from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import Spinner from "./Spinner";
import CardJob from "./CardJob";
import CardAndFooter from "./CardAndFooter";

const JobsPage = () => {
  const [jobList, setJobList] = useState();
  const [jobListQuery, setJobListQuery] = useState();
  const [spinner, setSpinner] = useState();
  const [alert, setAlert] = useState();
  const [searchSection, setSearchSection] = useState(false);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);

  const handleClick = () => {
    dispatch({ type: "CLEAR_SEARCH", payload: "" });
    setSearchSection(false);
  };
  const fetchJob = async () => {
    setSearchSection(false);
    setSpinner(true);
    try {
      const response = await fetch(
        "https://strive-benchmark.herokuapp.com/api/jobs"
      );
      if (response.ok) {
        const job = await response.json();
        setJobList(job.data.reverse().slice(0, 20));
        setSpinner(false);
        setAlert(false);
      } else {
        setAlert(true);
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      setAlert(true);
      setSpinner(false);
    }
  };

  const searchJob = async (query) => {
    setSearchSection(false);
    setSpinner(true);
    try {
      const response = await fetch(
        `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}`
      );
      if (response.ok) {
        const jobQuery = await response.json();
        setJobListQuery(jobQuery.data.reverse().slice(0, 5));
        setSpinner(false);
        setAlert(false);
        if (query === "") {
          setSearchSection(false);
        } else {
          setSearchSection(true);
        }
      } else {
        setAlert(true);
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      setAlert(true);
      setSpinner(false);
    }
  };
  useEffect(() => {
    fetchJob();
  }, []);

  useEffect(() => {
    searchJob(query);
  }, [query]);

  return (
    <Row className="d-flex flex-column justify-content-center align-items-center flex-lg-row align-items-xl-start  py-3 m-0 w-100">
      <Col xs={10} md={10} xl={2}>
        <Card className="mb-3">
          <Card.Body>
            <div className="my-2 text-secondary fw-bold">
              <span>
                <BsFillBookmarkFill />
              </span>
              <span className="ms-2">Le mie offerte di lavoro</span>
            </div>
            <div className="my-2 text-secondary fw-bold">
              <span>
                <BsFillBellFill />
              </span>
              <span className="ms-2">Avvisi offerte di lavoro</span>
            </div>
            <div className="my-2 text-secondary fw-bold">
              <span>
                <BiTask />
              </span>
              <span className="ms-2">Valutazione delle competenze</span>
            </div>
            <div className="my-2 text-secondary fw-bold">
              <span>
                <BsFillPlayBtnFill />
              </span>
              <span className="ms-2"> Indicazioni per chi cerca lavoro</span>
            </div>
            <div className="my-2 text-secondary fw-bold">
              <span>
                <MdSettings />
              </span>
              <span className="ms-2">Impostazioni candidatura</span>
            </div>
          </Card.Body>
        </Card>
        <Button
          className="rounded-pill p-3 my-3 d-none d-lg-block fw-bolder"
          variant="outline-primary"
        >
          <span>
            <BsPencilSquare />
          </span>{" "}
          Pubblica offerta gratuita
        </Button>
      </Col>
      <Col xs={10} md={10} xl={6}>
        {searchSection && (
          <Card className="p-2">
            <section className="p-3 d-flex justify-content-between">
              <Card.Title>
                <strong>Risultati della tua ricerca</strong>
              </Card.Title>
              <Button variant="outline-primary" onClick={(e) => handleClick(e)}>
                Cancella la ricerca
              </Button>
            </section>
            {jobListQuery &&
              jobListQuery.map((jobQuery, i) => (
                <CardJob key={`job-${i}`} singleJob={jobQuery} />
              ))}
          </Card>
        )}
        <Card className="p-2">
          <section className="p-3">
            <Card.Title>
              <strong>Consigliato per te</strong>
            </Card.Title>
            <Card.Text className="text-secondary">
              Sulla base del tuo profilo e della tua cronologia delle ricerche
            </Card.Text>
          </section>
          {spinner && <Spinner />}
          {alert && <Alert />}
          {jobList &&
            jobList.map((job, i) => (
              <CardJob key={`job-${i}`} singleJob={job} />
            ))}
        </Card>
      </Col>
      <Col className="d-none d-xl-block" xl={2}>
        <CardAndFooter />
      </Col>
    </Row>
  );
};

export default JobsPage;
