import React from "react";
import axios from "axios";
import "./popup.css";
import { CartItems, StackItems } from "../App";
import Select from "react-select";

var server = process.env.REACT_APP_SERVER
  ? process.env.REACT_APP_SERVER
  : "http://localhost:3000";

var loginserver = process.env.REACT_APP_LOGINSERVER 
? process.env.REACT_APP_LOGINSERVER 
:"http://localhost:3001";

var API = process.env.API ? process.env.API : "/api";

function Popup(props) {
  const [items, setItems] = React.useContext(CartItems);
  const [stack, setStack] = React.useContext(StackItems);
  const [error, setErrors] = React.useState("");
  const [total, setTotal] = React.useState(getTotal());
  const [data, setData] = React.useState(null);
  const [isLoaded, setLoded] = React.useState(false);
  const [deposit, setDeposit] = React.useState(0);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${server}${API}/account`)
      .then((res) => {
        setData(res.data);
        setLoded(true);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

  function getTotal() {
    let sum = 0;
    Object.keys(items).forEach((obj, index) => {
      sum = Math.round((sum + items[obj].price) * 100) / 100;
    });
    return sum;
  }

  function checkout() {
    Object.keys(stack).forEach((item, index) => {
      updateItem(stack[item]);
    });
  }
  async function updateItem(item) {
    await axios
      .put(`${server}${API}/Items`, item)
      .then((res) => {
        setItems([]);
      })
      .catch((error) => {
        setErrors(error);
      });
  }

  const Accounts = ({ checkout,close}) => {
    const [password, setPassword] = React.useState("");

    async function handleCheckout() {
      setErrors("");

      let params = {
        name: deposit.value,
        password,
        deposit: deposit.deposit - total,
      };
      try{
      await axios .post(`${loginserver}/login`,{"name":deposit.value,password})
      .then((res,err) => {
        if(res.data.accessToken && res.data.accessToken !== ''){
          let config = {
            headers: {
              Authorization: `${deposit.value} ${res.data.accessToken}`
            }
          }
         axios
          .put(`${server}${API}/account`, params,config)
          .then((res) => {
            if(res.data.id){
                setSuccess(true);
            }
              setItems([]);
           })
        }
        else {
          setErrors([...error,"Login failed"])
        }
      })
      .catch((error) => {
        alert("wrong password");
        console.log(error.toJSON());
        setErrors(error);
      });
    }
    catch(e){
      setErrors([...error,"Login failed"]);
      alert("wrong password");
      window.location.reload(false);
    }
       
      await checkout();
    }
    let out = data.map((item, index) => {
      if (item.deposit) {
        return {
          value: item.name,
          label: `${item.name}  ${item.deposit} $`,
        };
      }
      else{
        return {};
      }
    });
    out = out.filter((item)=>{
      return item.value != null;
    });
    console.log(deposit);
    return (
      <>
        {!success ? (
          <>
            <Select
              options={out}
              value={deposit}
              onChange={(selectedOption) => {
                setDeposit(selectedOption);
                return selectedOption;
              }}
            />
            {deposit ? (
              <input
                style={{ width: "100%" }}
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            ):''}
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
            <h5 className="text-warning">{error}</h5>
            <div className="info_buttom text-info">
              <h5>Don't have a bank account?</h5>
              <a href="/BadBank/#/CreateAccount/">Open new Account</a>
            </div>
          </>
        ) : (
          <div>
              <p className="text-success">You have successfully purchased products</p>
              <p className="text-success">your current balance is {deposit.deposit - total}$</p>
              <button className="btn btn-success" onClick={close}>Ok</button>
          </div>
        )}
      </>
    );
  };
  return (
    <div className="popup">
      <div className="popup_open">
        <button onClick={props.close} className="x_button">
          X
        </button>
        <div className="total">
          <h2>Total : {total}$</h2>
          </div>
          {isLoaded ? (
            <div className="users">
              <Accounts checkout={checkout} close={props.close} />
            </div>
          ) : (
            ""
          )}
      </div>
    </div>
  );
}

export default Popup;
