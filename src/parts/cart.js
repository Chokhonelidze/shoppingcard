import React from "react";
import axios from "axios";
import { CartItems,StackItems } from "../App";

function Cart(props) {
  const [items, setItems] = React.useContext(CartItems);
  const [stack,setStack] = React.useContext(StackItems);

  let removeItem = (id) => {
      let newStack = Object.keys(stack).map((item,index) => {
          if(stack[item].id === id) {
              let obj = stack[item];
              obj.stack ++;
              return obj;

          }
          else{
              return stack[item];
          }
      });
      setStack(newStack);
      let deleted = false;
      let newItems =[]; 
      Object.keys(items).forEach((item)=>{
          if(items[item].id === id && !deleted ){
              deleted = true;
          }
          else {
              newItems.push(items[item]);
          }
      });

      setItems(newItems);
  };

  let Total = () =>{
      let sum = 0;
      Object.keys(items).forEach((obj,index)=>{
          sum = Math.round((sum + items[obj].price)*100)/100;
      });
      return (<h6 className="text-info">Total : {sum}$</h6>);
  }
  let output = Object.keys(items).map((item, index) => {
    return (
        <div key={index} className="card" style={{ width: "10rem" }} onClick={()=>{removeItem(items[item].id)}}>
          <img
            src={items[item].img}
            className="img-fluid img-thumbnail"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{items[item].name}</h5>
            <p className="card-text">
              Price : {items[item].price}$ <br />
            </p>
          </div>
        </div>
    );
  });

  return <>
  <Total />
  {output}</>;
}

export default Cart;
