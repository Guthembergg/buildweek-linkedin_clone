import { Button, Card, Col, Row } from "react-bootstrap";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import moment from "moment/moment";
import "moment/locale/it";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaRegHandPointLeft } from "react-icons/fa";
import { BsFillCircleFill } from "react-icons/bs";
import ScrollToBottom from "react-scroll-to-bottom";

const MainChat = () => {
  const ADDRESS = "https://chat-api-epicode.herokuapp.com";
  const socket = io(ADDRESS, { transports: ["websocket"] });
  const token = process.env.REACT_APP_TOKEN;
  moment.locale("it");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState([]);
  const myProfileId = useSelector((state) => state.myProfile._id);
  const [onlineUser, setOnlineUser] = useState([]);
  const [singleRoom, setSingleRoom] = useState("");
  console.log(onlineUser);

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
    id: singleRoom.id,
    token: `Bearer ${token}`,
  };

  const sendMsg = {
    room: singleRoom.id,
    token: `Bearer ${token}`,
    msg: query,
  };

  /////////////////////////////////// nuova stanza
  const createNewRoomSubmit = (e) => {
    e.preventDefault();
  };
  const createNewRoom = () => {
    newRoomFetch();
  };

  const newRoom = (e) => {
    setNewRoomTitle(e);
  };

  const [NewRoomTitle, setNewRoomTitle] = useState("");

  const NewRoom = {
    name: NewRoomTitle,
  };

  const newRoomFetch = async () => {
    try {
      const response = await fetch(
        "https://chat-api-epicode.herokuapp.com/api/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(NewRoom),
        }
      );
    } catch (error) {
      console.log("errore nella creazione della nuova stanza");
    }
  };

  ////////////// modifica nome stanza
  const editNewNameSubmit = (e) => {
    e.preventDefault();
  };
  const [NewNameRoom, setNewNameRoom] = useState("");
  const editNewName = (e) => {
    setNewNameRoom(e);
  };
  const changeName = () => {
    editRoomFetch();
  };
  const editNameRoom = {
    name: NewNameRoom,
  };

  //inizio fetch DePascale
  const [room, setRoom] = useState([]);

  const getRooms = async () => {
    try {
      const response = await fetch(
        `https://chat-api-epicode.herokuapp.com/api/all`
      );
      if (response.ok) {
        const data = await response.json();
        setRoom(data);
      } else {
        console.log("errore in if di getRooms");
      }
    } catch (err) {
      console.log("errore nel catch di getRooms");
    }
  };
  useEffect(() => {
    getRooms();
  }, [NewRoomTitle, NewNameRoom]);

  console.log("stanze", room);

  /*  createdAt: "2023-03-10T09:24:21.690Z"
id: "2a7c4f4d-bc3f-4557-864b-477c671cf8eb"
name: "due Prove"
updatedAt: "2023-03-10T09:57:28.883Z" */

  //fine fetch DePascale

  const editRoomFetch = async () => {
    try {
      const response = await fetch(
        `https://chat-api-epicode.herokuapp.com/api/${singleRoom.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editNameRoom),
        }
      );
    } catch (error) {
      console.log("errore nella creazione della nuova stanza");
    }
  };

  useEffect(() => {
    socket.on("message", (data) => setMsg((msg) => [...msg, data]));
    console.log(msg);
  }, [singleRoom, msg]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connection established!${socket.id}`);
    });
    socket.emit("joinRoom", joinRoom);
    socket.on("joined", (bouncedMessage) => {
      setMsg(bouncedMessage.msgs);
    });
    socket.emit("setIdentity", setIdentity);
    socket.on("loggedIn", (bouncedMessage) => {
      setOnlineUser(bouncedMessage);
      console.log("useeffect di user");
    });
    return () => {
      socket.disconnect();
    };
  }, [singleRoom]);

  useEffect(() => {
    socket.on("newUserHasLoggedIn", (bouncedMessage) => {
      setOnlineUser(bouncedMessage);
      console.log("useeffect di user");
    });
  }, [onlineUser]);

  return (
    <Row className="w-100 d-flex flex-column-reverse flex-md-row justify-content-center align-items-center align-items-md-start py-3 m-0 ">
      <Col xs={10} md={4} lg={3} xl={3}>
        <Card>
          <Card.Title className="text-center p-2">
            <strong>Stanze disponibili: {room?.length} </strong>
          </Card.Title>
          <Card.Body>
            {room?.map((e, i) => (
              <Card.Text key={`room-${i}`}>
                <span className="w-100">
                  <Button
                    className="w-100 d-flex justify-content-between"
                    variant="outline-secondary"
                    onClick={() => setSingleRoom(e)}
                  >
                    <span className="ms-2 text-uppercase text-dark fw-bold">
                      {e?.name}
                    </span>
                    <span>
                      <FaRegHandPointLeft style={{ color: "green" }} />
                    </span>
                  </Button>
                </span>
              </Card.Text>
            ))}
          </Card.Body>
        </Card>{" "}
        <Card className="my-3">
          <Form
            onSubmit={createNewRoomSubmit}
            className="d-flex flex-column justify-content-center align-content-center p-2"
          >
            <Form.Control
              className="text-center"
              type="text"
              placeholder="Nome della nuova stanza"
              onChange={(e) => newRoom(e.target.value)}
            ></Form.Control>
            <Button
              variant="outline-secondary"
              className="text-dark mt-2"
              onClick={() => createNewRoom()}
            >
              Crea nuova stanza
            </Button>
          </Form>
        </Card>
        <Card>
          <Card.Title className="text-center p-2">
            <strong>Utenti online: {onlineUser?.onlineUsers?.length}</strong>
          </Card.Title>
          <Card.Body>
            {onlineUser?.onlineUsers?.map((e, i) => (
              <Card.Text
                key={`user-${i}`}
                className="d-flex align-items-center"
              >
                {" "}
                <span>
                  <BsFillCircleFill style={{ color: "green" }} />
                </span>
                <span className="ms-2">
                  {e?.first_name} {e?.last_name}
                </span>
              </Card.Text>
            ))}
          </Card.Body>
        </Card>{" "}
      </Col>

      <Col xs={10} md={8} lg={6} xl={4}>
        <Card>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="px-5 pt-3 text-uppercase">
              <strong>{singleRoom.name}</strong>
            </Card.Title>
            <div className="d-flex flex-nowrap justify-content-center p-2">
              <Form className="d-flex" onSubmit={editNewNameSubmit}>
                <Form.Control
                  className="rounded-pill text-center p-1"
                  type="text"
                  placeholder="Modifica il nome"
                  onChange={(e) => editNewName(e.target.value)}
                ></Form.Control>
                <Button
                  variant="outline-secondary"
                  className="mx-2 rounded-pill text-dark"
                  onClick={() => changeName()}
                >
                  Modifica
                </Button>
              </Form>
            </div>
          </div>
          <Card.Body>
            <ScrollToBottom className="overflow" useAnimatingToEnd={false}>
              {msg
                ?.sort((a, b) => moment(a.createdAt).diff(b.createdAt))
                ?.slice(msg?.length - 50)
                ?.map((e, i) => (
                  <>
                    {e.User.linkedinId === myProfileId ? (
                      <div
                        key={`msgNumber-${i}`}
                        className="d-flex flex-column align-items-end"
                      >
                        <div
                          className="m-1 p-2 w-75 d-flex flex-column "
                          style={{
                            backgroundColor: "lightgreen",
                            borderRadius: "10px",
                          }}
                        >
                          <div className=" mb-1 d-flex justify-content-start">
                            <strong>TU:</strong>
                          </div>

                          <div className="ps-2 pe-2 d-flex justify-content-end">
                            {e?.content}
                          </div>
                          <div
                            className="d-flex justify-content-start"
                            style={{ color: "gray", fontSize: "0.7em" }}
                          >
                            <span className="d-none d-md-flex  justify-content-start">
                              {moment(e?.createdAt).fromNow(true)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={`msgNumber2-${i}`}
                        className="m-1 p-2 w-75 "
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
                            {moment(e?.createdAt).fromNow()}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </ScrollToBottom>
            <Form className="py-2" onSubmit={handleSubmit}>
              <Form.Control
                value={query}
                type="text"
                onChange={(e) => handleChange(e.target.value)}
              ></Form.Control>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MainChat;
