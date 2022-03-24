import { Items } from "../parts/items";
import Cart from "../parts/cart";
import Popup from "../parts/popup";
import React from "react";
function Home() {
  const [showPopup,setPopup] = React.useState(false);
  function show(){
    setPopup(true);
  }
  function hide(){
    setPopup(false);
  }
  return (
    <div className="app">
      <div className="left">
        <Items />
      </div>
      <div className="right">
        {!showPopup?<Cart showPopup={show} />:''}
        {showPopup?<Popup close={hide}  />:''}
      </div>
    </div>
  );
}
export default Home;
