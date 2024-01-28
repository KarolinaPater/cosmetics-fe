import "../style/global/action-button.scss";
import iconexpand from "../images/icon-expand.svg";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

function ExpandButton(props) {
  const [active, setActive] = useState(false);
  const handleActiveClick = () => {
    setActive(!active); //by klasa zmieniała się przy odkliknięciu na przeciwną. Zostawienie na true działało by tylko na jedno kliknięcie.
    props.handleClick();
  };

  return (
    <button
      onClick={handleActiveClick}
      className="action-button"
      disabled={props.disabled}
    >
      <a className="tooltip-expand-button" data-tooltip-content={props.tooltip}>
        <img
          alt="icon-expand"
          className={`expand-icon ${active ? "active" : ""}`}
          //umieszczone są tu dwie klasy: expand-icon oraz klasa activ pozwalająca na zarządzanie stanem przycisku
          src={iconexpand}
        ></img>
        {active}
      </a>

      <Tooltip anchorSelect=".tooltip-expand-button" />

      {props.title}
    </button>
  );
}
export default ExpandButton;
