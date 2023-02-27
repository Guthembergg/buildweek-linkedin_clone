//import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainProfile from "./Components/MainProfile";
import CustomNavbar from "./Components/CustomNavbar";
import CustomeFooter from "./Components/CustomFooter";

// import Aside from "./Components/Aside";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainProfile />}></Route>
          <Route path="/:id" element={<MainProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
