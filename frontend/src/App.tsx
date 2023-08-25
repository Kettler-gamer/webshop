import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ShopBrowsing from "./Pages/ShopBrowsing";
import "./Styling/stylesheet/main.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
    <Routes>
      <Route index element={<ShopBrowsing />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
