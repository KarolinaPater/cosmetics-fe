import "../style/global/form-button.scss";
function FormButton(props) {
  return (
    <button
      onClick={props.handleForm}
      className="form-button"
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
}
export default FormButton;
