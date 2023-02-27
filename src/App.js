//import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Aside from "./Components/Aside";

function App() {
  return (
    <>
      <BrowserRouter>
        <Aside />
        <Routes>{/* <Route path="/" element={<Home />}></Route> */}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
