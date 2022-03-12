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
    <div className="app container">
      <StackItems.Provider value={[items, setItems]}>
        <CartItems.Provider value={[cart, setCart]}>
          <div className="row">
            <div className="col-10">
              <Items />
            </div>
            <div className="col-2">
              <Cart />
            </div>
          </div>
        </CartItems.Provider>
      </StackItems.Provider>
    </div>
  );
}

export { App, CartItems, StackItems };
