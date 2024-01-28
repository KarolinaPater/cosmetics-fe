import FormTextInput from "../global/FormTextInput";
import FormButton from "../global/FormButton";
import { useState } from "react";
import {
  validateEmail,
  validateName,
  validateRegisterPassword,
  validateConfirmPassword,
} from "../validator/validator";
import axios from "axios";
import NavButton from "../global/NavButton";
import "../style/login-form-page.scss";

function RegisterForm() {
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    name: null,
    email: null,
    password: null,
    confirm_password: null,
  });

  const handleInput = (e) => {
    console.log(e.target.name, e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleForm = () => {
    setError({
      name: null,
      email: null,
      password: null,
      confirm_password: null,
    });

    //walidacja
    const email_error = validateEmail(user.email);
    const name_error = validateName(user.name);
    const password_error = validateRegisterPassword(user.password);
    const confirm_password_error = validateConfirmPassword(
      user.password,
      user.confirm_password
    );

    //wyswietlanie bledow walidacji
    setError({
      email: email_error,
      name: name_error,
      password: password_error,
      confirm_password: confirm_password_error,
    });

    if (name_error || email_error || password_error || confirm_password_error) {
      return;
    }

    setIsDisabledButton(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, user)
      .then((response) => {
        console.log("udalo sie zarejestrować", response);
        alert("udana rejestracja");
      })
      .catch((error) => {
        alert(error.response.data.message || "Błąd serwera");
      });

    setIsDisabledButton(false);
  };

  return (
    <div className="page login-page">
      <div className="theme">Formularz rejestracji</div>
      <div className="text-area-wrapper">
        <FormTextInput
          title="Nazwa użytkownika"
          type="text"
          name="name"
          value={user.name}
          onChange={handleInput}
          error={error.name}
        />

        <FormTextInput
          title="Adres email"
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
          error={error.password}
        />
        <FormTextInput
          title="Powtórz hasło"
          type="password"
          name="confirm_password"
          value={user.confirm_password}
          onChange={handleInput}
          error={error.confirm_password}
        />

        <FormButton
          title="Utwórz konto"
          handleForm={handleForm}
          disabled={isDisabledButton}
        />
        <div className="button-wrapper">
          <NavButton to={"/login-form"} title={"Zaloguj się"} />
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
