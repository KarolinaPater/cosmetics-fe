//poprawić

import "../style/global/action-button.scss";
import iconedit from "../images/icon-edit.svg";
import { Tooltip } from "react-tooltip"; //zainstawowana biblioteka

function EditButton(props) {
  return (
    <button
      onClick={props.handleClick}
      className="action-button"
      disabled={props.disabled}
    >
      <a className="tooltip-edit-button" data-tooltip-content={props.tooltip}>
        <img alt="icon-edit" className="edit-icon" src={iconedit}></img>
      </a>
      <Tooltip anchorSelect=".tooltip-edit-button" />
    </button>
  );
}
export default EditButton;
