import "../style/global/confirm.scss";
import "../style/global/confirm.scss";
import React from "react";
import FormButton from "./FormButton";

function Confirm(props) {
  return (
    <div className="confirm-wrapper">
      <div className="confirm">
        <div className="header">{props.tekst}</div>
        <div className="confirm-footer">
          <FormButton
            className={"button-cancel"}
            title={props.cancel_tekst}
            handleForm={props.handleCancel}
          />
          <FormButton
            title={props.confirm_tekst}
            handleForm={props.handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}
export default Confirm;
