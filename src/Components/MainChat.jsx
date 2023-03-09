import { Card, Col, Row } from "react-bootstrap";
import CardAndFooter from "./CardAndFooter";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import moment from "moment/moment";
import "moment/locale/it";
import { BsDot } from "react-icons/bs";

const MainChat = () => {
  const ADDRESS = "https://chat-api-epicode.herokuapp.com";
  const socket = io(ADDRESS, { transports: ["websocket"] });
  const token = process.env.REACT_APP_TOKEN;
  moment.locale("it");

  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState([]);
  const [newMsg, setNewMsg] = useState([]);
  const [inRoom, setInRoom] = useState(true);

  const handleChange = (e) => {
    setQuery(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMsg", sendMsg);
    setQuery("");
  };

  const setIdentity = { token: `Bearer ${token}` };

  const joinRoom = {
    id: "7c2453a1-8dbf-436a-a50d-deac46f17314",
    token: `Bearer ${token}`,
  };

  const sendMsg = {
    room: "7c2453a1-8dbf-436a-a50d-deac46f17314",
    token: `Bearer ${token}`,
    msg: query,
  };

  useEffect(() => {
    socket.on("message", (data) => setMsg((msg) => [...msg, data]));
  }, [msg]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connection established!${socket.id}`);
    });
    socket.emit("joinRoom", joinRoom);
    socket.on("joined", (bouncedMessage) => {
      setMsg(bouncedMessage.msgs.slice(0, 10));
    });
    socket.emit("setIdentity", setIdentity);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Row className="w-100">
      <Col className="d-none d-md-block p-0" md={3} xl={2}></Col>
      <Col xs={10} md={8} lg={6}>
        <Card>
          <Card.Body>
            <div>
              {msg
                ?.sort((a, b) => moment(a.createdAt).diff(b.createdAt))
                ?.map((e, i) => (
                  <div
                    key={`msgNumber-${i}`}
                    className="m-1 p-2 w-75"
                    style={{
                      backgroundColor: "lightblue",
                      borderRadius: "10px",
                    }}
                  >
                    <div className=" mb-1">
                      <strong>
                        {e?.User?.first_name} {""}
                        {e?.User?.last_name}
                      </strong>
                    </div>

                    <div className="ps-2 pe-2">{e?.content}</div>
                    <div
                      className="d-flex justify-content-end"
                      style={{ color: "gray", fontSize: "0.7em" }}
                    >
                      <span className="d-none d-md-inline">
                        {e?.createdAt.slice(11, 19)}
                      </span>

                      <span className="d-none d-lg-inline">
                        <BsDot />
                        {e?.createdAt.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                value={query}
                type="text"
                onChange={(e) => handleChange(e.target.value)}
              ></Form.Control>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col className="d-none d-xl-block p-0" xl={2}>
        {" "}
        <CardAndFooter />{" "}
      </Col>
    </Row>
  );
};

export default MainChat;
