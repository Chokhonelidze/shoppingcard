import React from "react";
import Tooltip from '@mui/material/Tooltip';
function NavBar() {
  var [data,setData] = React.useState([
    { href: "#", name: "Home", active: false ,info:"Shoping page"},
    { href: "#/addItems/", name: "Add new items", active: false,info:"Add new items from this page"},
    { href: "#/stackItems/", name: "Stack items", active: false,info:"Restuck existing items"},
  ]);

  function activate(e){
    let value = e.target.innerHTML;
    let newData = data.map((items)=>{
      if(items.name !== value){
        items.active = false;
      }
      else{
        items.active =true;
      }
      return items;
    });
    setData(newData);
  }
  function BuildMenu() {

    let menu = data.map((item,index) => {
      function classes(active){
        let act = '';
        if(active){
          act ='active';
        }
        return "nav-link "+act;
      }
      return (
        <li className="nav-item" key={index}>
           <Tooltip title={item.info}>
          <a className={classes(item.active)} href={item.href} onClick={activate} >
            {item.name}
          </a>
          </Tooltip>
        </li>
      );
    });
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#/">
            Shoping Cart
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              onClick={() => {
                let menu = document.getElementById("navbarNav");
                if (menu.style.display === "none") {
                  menu.style.display = "block";
                } 
                else if(!menu.style.display)
                {
                  menu.style.display = "block";
                }
                else {
                  menu.style.display = "none";
                }
              }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {menu}
              </ul>
          </div>
        </nav>
      </>
    );
  }
  return (
    <>
    <BuildMenu/>
    </>
  );
}
export default NavBar;
