import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";

const JobFav = () => {
  const favourites = useSelector((state) => state.favourites);
  console.log(favourites);
  const dispatch = useDispatch();
  return (
    <Card>
      <Card.Body className="p-3">
        <section className="d-flex justify-content-between align-items-center">
          <Card.Title>
            <strong>Lavori preferiti</strong>
          </Card.Title>
          <Button
            variant="primary"
            className="py-0"
            onClick={() => dispatch({ type: "CLEAR_FAV" })}
          >
            Svuota
          </Button>
        </section>
        <Card.Text>
          {" "}
          {favourites &&
            favourites.map((e, i) => (
              <div className="fs-6 my-2 d-flex justify-content-between align-items-center">
                <span>
                  <span className="badge rounded-pill bg-primary">
                    {" "}
                    {i + 1}
                  </span>
                  <Link
                    className="text-decoration-none ms-2"
                    to={e?.url}
                    target="_blank"
                  >
                    {e?.title}
                  </Link>
                </span>
                <span
                  onClick={() =>
                    dispatch({ type: "REMOVE_TO_FAV", payload: e })
                  }
                >
                  <BsTrashFill style={{ color: "red" }} />
                </span>
              </div>
            ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default JobFav;
