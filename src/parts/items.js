import React from "react";
import axios from "axios";
import "../App.css";
import { CartItems,StackItems } from "../App";
var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";
  var API = process.env.API ? process.env.API : "/api";

function Items() {
  const [items, setItems] = React.useContext(StackItems);
  const [isLoaded, setLoaded] = React.useState(false);
  const [errors, setErrors] = React.useState();
  const [discounted,setDiscounted] = React.useState(false);
  const [cart,setCart]  = React.useContext(CartItems);
  function removeItem(id) {
      let new_items = [];
      Object.keys(items).forEach((item,index)=>{
          if(items[item].id === id) {
              let obj = items[item];
              if(obj.stack>0){
                obj.stack = obj.stack - 1;
 
              }
              new_items[item] = obj;
              let cartItem = {
                  name:obj.name,
                  id:obj.id,
                  price:obj.price,
                  img:obj.img
              }
              setCart([...cart,cartItem]);
          }
          else{
              new_items[item] = items[item];
          }
      });
      setItems(new_items);
  }
  function price(price,discount){
      if(discounted){
          return price;
      }
      else{
          setDiscounted(true);
        return price - (price / 100) * discount;
      }
    
  }
  React.useEffect(() => {
    axios
      .get(`${server}${API}/Items`)
      .then((res) => {
        setItems(res.data);
        setLoaded(true);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, [setItems]);
  let display = null;
  if (isLoaded && !errors) {
    display = Object.keys(items).map((item, index) => {
      if (items[item].discount) {
        items[item].price = price(items[item].price,items[item].discount);
        
      }
      return (
        <div className="item" key={index} >
          <Item  props={items[item]} height="100" width="18rem" removeItem={removeItem}/>
        </div>
      );
    });
  } else if (isLoaded && errors) {
    display = errors;
  }
  return <div className="items">{display}</div>;
}

function Item(props) {
  let cardSize = (size) => {
    if (size) {
      return "card border-success mb-3 h-" + size;
    } else {
      return "card border-success mb-3";
    }
  };
  return (
    <div className={cardSize(props.height)} id={props.props.id} style={{ maxWidth: props.width }} onClick={()=>props.removeItem(props.props.id)}>
      <img src={props.props.img} className="card-img-top" alt="..." />
      {props.props.discount ? (
        <div className="sale">FOR SALE {props.props.discount}%</div>
      ) : (
        ""
      )}
      <div className="card-body">
        <h5 className="card-title">{props.props.name} </h5>
        <p className="card-text">{props.props.info}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">Value :{Math.round(props.props.price*100)/100}$</small>
        <br />
        <small className="text-muted">In stack :{props.props.stack}</small>
        <br />
      </div>
    </div>
  );
}

export { Item, Items };
