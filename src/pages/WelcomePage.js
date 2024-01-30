import "../style/text.scss";
import "../style/welcome-page.scss";
import "../global/FormButton";

import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  const handleRedirectToLogin = () => {
    navigate("/login-form");
  };
  const handleRedirectToRegister = () => {
    navigate("/register-form");
  };

  return (
    <div className="welcome-page">
      <div className="theme">Witaj strudzony wędrowcze! </div>
      <div className="text-area-wrapper">
        Strona na której jesteś służy do katalogowania posiadanych kosmetyków.
        Do dalszego korzystania ze strony niezbędne jest zalogowanie się.
      </div>

      <button className="form-button" onClick={handleRedirectToLogin}>
        Zaloguj się
      </button>
      <button className="form-button" onClick={handleRedirectToRegister}>
        Zarejestruj się
      </button>
    </div>
  );
}
export default WelcomePage;
