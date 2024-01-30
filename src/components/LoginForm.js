import FormTextInput from "../global/FormTextInput";
import { useState, useContext } from "react";
import FormButton from "../global/FormButton";
import NavButton from "../global/NavButton";
import "../style/login-form-page.scss";
import { validateEmail, validatePassword } from "../validator/validator";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //alternatywa dla navlinka
import { AppContext } from "../AppContext";

function LoginForm() {
  let navigate = useNavigate();
  const { setUserInfo, setIsUserLogged } = useContext(AppContext);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: null,
    password: null,
  });
  // TODO obsluzy/wyswietlc blad z BE
  const [backendError, setBackendError] = useState(null);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleForm = () => {
    setError({
      email: null,
      password: null,
    });
    setBackendError(null); //zeruje błąd Be

    //walidacja
    const email_error = validateEmail(user.email);
    const password_error = validatePassword(user.password);

    //błędy walidacji
    setError({
      email: email_error,
      password: password_error,
    });

    if (email_error || password_error) {
      return;
    }

    setIsDisabledButton(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, user)
      .then((response) => {
        setUserInfo(response.data.user);
        setIsUserLogged(true);
        window.localStorage.setItem(
          "cosmetics-token",
          response.data.accessToken
        );
        setIsDisabledButton(false);
        navigate("/my-product-list");
      })

      .catch((error) => {
        // alert(error.response.data.message || "Błąd serwera");
        setBackendError(error.response.data.message || "Błąd serwera");

        setIsDisabledButton(false);
      });
  };
  return (
    <div className="page login-page">
      <div className="theme">Formularz logowania</div>
      <div className="text-area-wrapper">
        <FormTextInput
          title="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
          error={error.email}
        />
        <FormTextInput
          title="Hasło"
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
          error={error.password || backendError}
        />
        <FormButton
          title="Zaloguj się"
          handleForm={handleForm}
          disabled={isDisabledButton}
        />
        <div className="button-wrapper">
          <NavButton to={"/register-form"} title={"Zarejestruj się"} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
