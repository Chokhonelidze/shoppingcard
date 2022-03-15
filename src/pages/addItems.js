import React  from "react";
import axios from "axios";
import { Item } from "../parts/items";
var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";
var API = process.env.API ? process.env.API : "/api";


function AddItems() {
  const [stack, setStack] = React.useState({});
  const [error,setErrors] = React.useState();

  function change(event) {
    let id = event.target.name;
    let value = event.target.value;
    let newStack = stack;
    newStack[id] = value;
    setStack(newStack);
    if (id === "discount") {
      document.getElementById(id).innerHTML = value;
    }
  }
  async function handleSubmit() {
    await axios
      .post(`${server}${API}/Items`, stack)
      .then((res) => {
        console.log("success", res);
        setStack([]);
      })
      .catch((error) => {
        setErrors(error);
      });
  }
  return (
    <div className="container">
      <div className="form-group">
        <div className="form-control">
          Name : <br />
          <input
            type="text"
            name="name"
            placeholder="Add item Name"
            value={stack.name}
            onChange={change}
          />
        </div>
        <div className="form-control">
          Stack : <br />
          <input
            type="number"
            name="stack"
            placeholder="Howmany Items?"
            value={stack.stack}
            onChange={change}
          />
        </div>
        <div className="form-control">
          Price : <br />
          <input
            type="number"
            name="price"
            placeholder="What is price of product"
            value={stack.price}
            onChange={change}
          />
        </div>
        <div className="col-auto">
          Discount : <span id="discount"></span>
        </div>
        <div className="form-control">
          0%
          <input
            type="range"
            name="discount"
            min="0"
            max="100"
            value={stack.discount}
            onChange={change}
          />
          100%
        </div>
        <div className="col-auto">Image Link :</div>
        <div className="form-control">
          <input
            type="text"
            name="img"
            placeholder="Add products image link"
            value={stack.img}
            onChange={change}
          />
        </div>
        <div className="form-control">
          Products Information :
          <br />
          <textarea
            name="info"
            rows="4"
            cols="50"
            value={stack.info}
            onChange={change}
          />
        </div>
        <div className="form-control">
          <button
            type="subbmit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add new product
          </button>
        </div>
      </div>
      <Item props={stack} height="100" width="18rem" removeItem={() => {}} />
    </div>
  );
}

export default AddItems;
