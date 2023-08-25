import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ShopBrowsing from "./Pages/ShopBrowsing";
import { Login } from "./Pages/Login";
import "./Styling/stylesheet/main.css";
import { useState, useEffect } from "react";
import { getJwtPayload } from "./Scripts/sessionService";
import { Admin } from "./Pages/Admin";
import { Role } from "./Types/Role";

function App() {

  const [userRole, setUserRole] = useState<Role>("");

  useEffect(() => {
    const jwtPayload = getJwtPayload();

    if(jwtPayload !== undefined){
      setUserRole(jwtPayload.role);
    }
  },[]);

  return (
    <BrowserRouter>
      <Header />
    <Routes>
      <Route index element={<ShopBrowsing />}/>
      <Route path="/login" element={<Login setUserRole={setUserRole}/>}/>
      {userRole === "ADMIN" && <Route path="/admin*" element={<Admin />}/>}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
