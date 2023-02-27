//import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MainProfile from "./Components/MainProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainProfile />}></Route>{" "}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
