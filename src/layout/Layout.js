import React, { useEffect, useContext } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "../AppContext";
import WelcomePage from "../pages/WelcomePage";
import EditProduct from "../pages/EditProduct";
import AddProduct from "../pages/AddProduct";
import Account from "../pages/Account";
import MenuHeader from "./MenuHeader";
import MyProductList from "../pages/MyProductList";
import Statistic from "../pages/Statiscic";
import FAQ from "../pages/FAQ";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

import "../style/layout.scss";

function Layout() {
  const { setIsUserLogged, setUserInfo } = useContext(AppContext);

  const checkSession = () => {
    const config = {
      headers: {
        "x-access-token":
          window.localStorage.getItem("cosmetics-token") || undefined,
      },
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/session`, {}, config)
      .then((response) => {
        setUserInfo(response.data.user);
        setIsUserLogged(true);
        window.localStorage.setItem(
          "cosmetics-token",
          response.data.accessToken
        );
      })
      .catch((error) => {
        setUserInfo({
          name: "",
          email: "",
          role: "",
        });
        setIsUserLogged(false);
        window.localStorage.removeItem("cosmetics-token");
      });
  };
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="layout">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MenuHeader />
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/add-product" element={<AddProduct />}></Route>
          <Route path="/edit-product/:id" element={<EditProduct />}></Route>
          <Route path="/my-product-list" element={<MyProductList />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/faq" element={<FAQ />}></Route>
          <Route path="/statistic" element={<Statistic />}></Route>
          <Route path="/login-form" element={<LoginForm />}></Route>
          <Route path="/register-form" element={<RegisterForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Layout;
