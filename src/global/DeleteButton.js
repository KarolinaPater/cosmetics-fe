import "../style/global/action-button.scss";
import icondelete from "../images/icon-trash.svg";
import { Tooltip } from "react-tooltip";

function DeleteButton(props) {
  return (
    <button
      onClick={props.handleClick}
      className="action-button"
      disabled={props.disabled}
    >
      <a className="tooltip-delete-button" data-tooltip-content={props.tooltip}>
        <img alt="icon-trash" className="delete-icon" src={icondelete}></img>
      </a>
      <Tooltip anchorSelect=".tooltip-delete-button" />

      {props.title}
    </button>
  );
}
export default DeleteButton;
