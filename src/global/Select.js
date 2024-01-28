import "../style/global/select.scss";
import "../style/text.scss";
import QuestionButton from "./QuestionButton";

function Select(props) {
  return (
    <div className="select-wrapper">
      <label className="select-label">
        {props.title}
        {props.tooltip ? <QuestionButton tooltip={props.tooltip} /> : null}
      </label>
      <select
        className="select"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option hidden value="">
          -- select an option --
        </option>
        {props?.options?.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="select-error">{props.error ? props.error : null}</div>
    </div>
  );
}
export default Select;
