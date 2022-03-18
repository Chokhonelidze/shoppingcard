import React, { useState } from "react";
import axios from "axios";
import { Item } from "../parts/items";

var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";
var API = process.env.API ? process.env.API : "/api";

function UpdateItems() {
  const [items, setItems] = React.useState();
  const [isLoaded, setLoaded] = React.useState();
  const [error, setErrors] = React.useState();
  const [edit, setEdit] = React.useState();

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
  }, [edit]);
  function editItem(e) {
    let item = items.filter((item) => item.id === e)[0];
    setEdit(item);
  }

  function ListItems() {
    let output = Object.keys(items).map((item, index) => {
      return (
        <Item
          key={index}
          props={items[item]}
          height="100"
          width="12rem"
          removeItem={editItem}
        />
      );
    });
    return (
      <>
        <h1>Select an item you want to restuck</h1>
        <div className="list-card">{output}</div>
      </>
    );
  }
  function EditItem() {
    const [edit2, setEdit2] = React.useState(edit);
    function change(event) {
      let id = event.target.name;
      let value = event.target.value;
      let newEdit = { ...edit2 };
      newEdit[id] = event.target.value;
      setEdit2(newEdit);

      if (id === "discount") {
        document.getElementById(id).innerHTML = value;
      }
      event.preventDefault();
    }
   async function handleSubmit() {
      await axios
        .put(`${server}${API}/Items`, edit2)
        .then((res) => {
          console.log("success", res);
          setEdit2(false);
          setEdit(false);
        })
        .catch((error) => {
          setErrors(error);
        });
    }
    return (
      <>
        {edit2 ? (
          <div className="container" key="editor">
            <div className="row">
              <div className="form-group">
                <div className="form-control">
                  Stack : <br />
                  <input
                    type="text"
                    name="stack"
                    placeholder="Stack items"
                    value={edit2.stack}
                    onChange={change}
                  />
                </div>
                <div className="form-control">
                  Price : <br />
                  <input
                    type="text"
                    name="price"
                    placeholder="change the item's price"
                    value={edit2.price}
                    onChange={change}
                  />
                </div>
                <div className="form-control">
                  Weight : <br />
                  <input
                    type="text"
                    name="weight"
                    placeholder="change the item's price"
                    value={edit2.weight}
                    onChange={change}
                  />
                </div>
                <div className="col-auto">
                  Discount : <span id="discount">{edit2.discount}</span>
                </div>
                <div className="form-control">
                  0%
                  <input
                    type="range"
                    name="discount"
                    min="0"
                    max="100"
                    value={edit2.discount ? edit2.discount : 0}
                    onChange={change}
                  />
                  100%
                </div>
                <div className="form-control">
                  <button
                    type="subbmit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Update Product 
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }

  return (
    <>
      {isLoaded ? <ListItems /> : ""}
      {edit ? <EditItem /> : ""}
    </>
  );
}

export default UpdateItems;
