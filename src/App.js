import logo from "./logo.svg";
import "./App.css";
import { Items } from "./parts/items";
import Cart from "./parts/cart";
import React from "react";
const CartItems = React.createContext(null);
const StackItems = React.createContext(null);
function App() {
  const [cart, setCart] = React.useState([]);
  const [items, setItems] = React.useState([]);
  return (
    <div className="app">
      <StackItems.Provider value={[items, setItems]}>
        <CartItems.Provider value={[cart, setCart]}>
            <div className="left">
              <Items />
            </div>
            <div className="right">
              <Cart />
            </div>
        </CartItems.Provider>
      </StackItems.Provider>
    </div>
  );
}

export { App, CartItems, StackItems };
