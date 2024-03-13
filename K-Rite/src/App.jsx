import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import Home from "./Components/Home";
import ListDomains from "./Components/DNS/ListDomain";
import CreateDomain from "./Components/DNS/CreateDomain";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list-domain" element={<ListDomains />} />
        <Route path="/create-domain" element={<CreateDomain />} />
      </Routes>
    </>
  );
}

export default App;
