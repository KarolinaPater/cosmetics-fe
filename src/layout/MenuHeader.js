import "../style/text.scss";
import "../style/menu-header.scss";
import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../AppContext";

function MenuHeader() {
  const { isUserLogged } = useContext(AppContext);

  return (
    <div className="menu-header">
      {isUserLogged ? (
        <>
          <NavLink className="menu-button" to={"/add-product"}>
            <p>Dodaj produkt</p>
          </NavLink>
          <NavLink className="menu-button" to={"/my-product-list"}>
            <p>Lista produktów</p>
          </NavLink>
          <NavLink className="menu-button" to={"/account"}>
            <p>Konto</p>
          </NavLink>
        </>
      ) : null}
      <NavLink className="menu-button" to={"/faq"}>
        <p>?</p>
      </NavLink>
    </div>
  );
}
export default MenuHeader;
