import React from "react";
import { CartItems, StackItems } from "../App";
import { bestSelection } from "./algorithms";

var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";
var API = process.env.API ? process.env.API : "/api";

function Cart(props) {
  const [items, setItems] = React.useContext(CartItems);
  const [stack, setStack] = React.useContext(StackItems);
  const [error, setErrors] = React.useState('');
  const [weight,setWeight] = React.useState('');


  function checkout() { 
   props.showPopup();
  }
  function clear() {
   let newItems = {};
  Object.keys(items).forEach((item)=>{
    if(newItems[items[item].id]) newItems[items[item].id]++;
    else newItems[items[item].id] = 1;
  })
  let newStack = {...stack};
  Object.keys(newItems).forEach((id)=>{
    newStack = Object.keys(newStack).map((st)=>{
      if(Number(newStack[st].id) === Number(id)){
        let obj = {...newStack[st]};
        obj.stack += newItems[id];
        return obj;
      }
      else{
        return newStack[st];
      }
    });
  });
  setStack(newStack);
  setItems('');
  }
  let CheckoutButton = () => {
    return (
      <>
        {error ? <h6 className="text-worning">{error}</h6> : ""}
        {items.length ? (
          <>
          <button className="btn btn-primary" onClick={checkout}>
            Checkout
          </button>
          <button className="btn btn-warning " style={{marginLeft:"4px"}} onClick={clear}>
            clear All
          </button>
          </>
        ) : (
          ""
        )} 
      </>
    );
  };
  let weightChange = (event) =>{
    setWeight(event.target.value);
  }
  let autoSelect = () => {
    let ids = bestSelection(stack, weight);
    let arr = {};
    ids.forEach((item) => {

      if (arr[item]) return arr[item]++;
      else return (arr[item] = 1);
    });
 
    moveAll(arr);
    function moveAll(arr) {
      let cards = [];
     
      Object.keys(arr).forEach((obj)=>{
        let newStack= [...stack];
        newStack.map((st)=>{
          if(Number(st.id) === Number(obj)){
            let cartItem = {
              name: st.name,
              id: st.id,
              price: st.price,
              img: st.img,
            };
            let i =0;
            while(i<arr[obj]){
              cards.push(cartItem);
              i++;
            }
            let stackObject =st;
            stackObject.stack = stackObject.stack - arr[obj] ;  
            return stackObject ;
          }
          else{
            return st;
          }
        });
        setStack(newStack);    
        setItems([...items,...cards]);
      });
    }
  };
  let removeItem = (id) => {
    let newStack = Object.keys(stack).map((item, index) => {
      if (stack[item].id === id) {
        let obj = stack[item];
        obj.stack++;
        return obj;
      } else {
        return stack[item];
      }
    });
    setStack(newStack);
    let deleted = false;
    let newItems = [];
    Object.keys(items).forEach((item) => {
      if (items[item].id === id && !deleted) {
        deleted = true;
      } else {
        newItems.push(items[item]);
      }
    });

    setItems(newItems);
  };

  let Total = () => {
    let sum = 0;
    Object.keys(items).forEach((obj, index) => {
      sum = Math.round((sum + items[obj].price) * 100) / 100;
    });
    return <h6 className="text-info">Total : {sum}$</h6>;
  };

  let output = Object.keys(items).map((item, index) => {
    return (
      <div
        key={index}
        className="card"
        style={{ width: "10rem" }}
        onClick={() => {
          removeItem(items[item].id);
        }}
      >
        <img
          src={items[item].img}
          className="img-fluid img-thumbnail"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{items[item].name}</h5>
          <p className="card-text">
            Price : {Math.round(items[item].price * 100) / 100}$ <br />
          </p>
        </div>
      </div>
    );
  });
let panel =
    <div className="card">
      <input type='text' name = 'cardName' value={weight} onChange={weightChange} placeholder='enter weight'/>
      <button
        className="btn btn-secondary"
        onClick={autoSelect}
      >
        Get The Best Deal
      </button>
    </div>
    
  
  return (
    <>
      <Total />
      <br />
      <CheckoutButton />
      <div className="mini-card">{output}</div>
      {panel}
    </>
  );
}

export default Cart;
