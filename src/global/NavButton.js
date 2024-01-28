import { useNavigate } from "react-router-dom";

import "../style/global/nav-button.scss";

function NavButton(props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(props.to)}
      className="nav-button"
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}
export default NavButton;
