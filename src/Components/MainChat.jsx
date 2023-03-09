import { Card, Col, Row } from "react-bootstrap";
import CardAndFooter from "./CardAndFooter";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import moment from "moment/moment";
import "moment/locale/it";

const MainChat = () => {
  const ADDRESS = "https://chat-api-epicode.herokuapp.com";
  const socket = io(ADDRESS, { transports: ["websocket"] });
  const token = process.env.REACT_APP_TOKEN;
  moment.locale("it");

  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState();
  console.log(msg);

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

  /*  const fetchRoom = async () => {
    try {
      const response = await fetch(`${socket}/all`);
      if (response.ok) {
        const listChat = await response.json();
        console.log(listChat);
      }
    } catch (errore) {}
  }; */

  useEffect(() => {
    /*     fetchRoom(); */
    socket.on("connect", () => {
      console.log(`Connection established!${socket.id}`);
    });

    socket.on("joined", (bouncedMessage) => {
      setMsg(bouncedMessage);
    });
    socket.emit("setIdentity", setIdentity);
    socket.emit("joinRoom", joinRoom);
    return () => {
      socket.disconnect();
    };
  }, [msg]);

  return (
    <Row>
      <Col className="d-none d-md-block p-0" md={3} xl={2}></Col>
      <Col xs={10} md={8} lg={6}>
        <Card>
          <Card.Body>
            <div>
              {msg &&
                msg.msgs
                  .sort((a, b) => moment(b.createdAt).diff(a.createdAt))
                  .slice(0, 10)
                  .map((e) => (
                    <div>
                      <div>
                        NOME:
                        <strong>
                          {e?.User.first_name}
                          {e?.User.last_name}
                        </strong>
                      </div>
                      <div>data {e?.createdAt.slice(11, 19)}</div>
                      <div>{e?.content}</div>
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
