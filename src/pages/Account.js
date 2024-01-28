import { NavLink } from "react-router-dom";
import NavButton from "../global/NavButton";
import { AppContext } from "../AppContext";
import "../style/account-page.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import FormButton from "../global/FormButton";

function Account() {
  let navigate = useNavigate();
  const { userInfo, setUserInfo, setIsUserLogged, userRole } =
    useContext(AppContext);

  const handleLogOut = () => {
    console.log("wylogowywywanie");
    const config = {
      headers: {
        "x-access-token":
          window.localStorage.getItem("cosmetics-token") || undefined,
      },
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/logout`, {}, config)
      .then((response) => {
        setUserInfo({
          name: "",
          email: "",
          role: "",
        });
        setIsUserLogged(false);
        window.localStorage.removeItem("cosmetics-token");
        navigate("/login-form");
        //alert(response.data.message);
      })
      .catch((error) => {
        //alert(error.response.data.message || "Błąd serwera");
      });
  };

  return (
    <div className="page account-page">
      <div className="theme">Panel konta użytkownika</div>

      <div className="button-wrapper">
        <NavButton to={"/statistic"} title={"Statystyki"}></NavButton>

        <FormButton
          className="nav-button"
          handleForm={handleLogOut}
          title={"Wylogowanie"}
        ></FormButton>
      </div>
    </div>
  );
}
export default Account;
