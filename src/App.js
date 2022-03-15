import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./parts/navbar";
import Home from "./pages/home";
import AddItems from "./pages/addItems";
import UpdateItems from "./pages/updateItems";

const CartItems = React.createContext(null);
const StackItems = React.createContext(null);
function App() {
  const [cart, setCart] = React.useState([]);
  const [items, setItems] = React.useState([]);
  return (
      <HashRouter>
       <NavBar />
      <StackItems.Provider value={[items, setItems]}>
        <CartItems.Provider value={[cart, setCart]}>
         <Routes>
         <Route path="/" exact element={<Home />} />
         <Route path="/addItems" element={<AddItems />} />
         <Route path="/addItems" element={<UpdateItems />} />
         </Routes>
        </CartItems.Provider>
      </StackItems.Provider>
      </HashRouter>
  );
}

export { App, CartItems, StackItems };
