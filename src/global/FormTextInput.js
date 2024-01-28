import "../style/global/form-text-input.scss";
import QuestionButton from "./QuestionButton";

function FormTextInput(props) {
  return (
    <div className="text-input-wrapper">
      <label className="text-input-label">
        {props.title}
        {props.tooltip ? <QuestionButton tooltip={props.tooltip} /> : null}
      </label>

      <input
        className="text-input-input"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      ></input>
      <div className="text-input-error">{props.error ? props.error : null}</div>
    </div>
  );
}
export default FormTextInput;
