//import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./Components/CustomNavbar";
import CustomeFooter from "./Components/CustomFooter";

// import Aside from "./Components/Aside";

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        {/* <Aside /> */}
        <Routes>{/* <Route path="/" element={<Home />}></Route> */}</Routes>
        <CustomeFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
