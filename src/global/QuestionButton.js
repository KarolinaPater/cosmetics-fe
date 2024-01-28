import "../style/global/question-button.scss";
import iconquestion from "../images/icon-question.svg";
import { Tooltip } from "react-tooltip";

function QuestionButton(props) {
  return (
    <>
      <div className="question-button" data-tooltip-content={props.tooltip}>
        <img
          alt="question-icon"
          className="question-icon"
          src={iconquestion}
        ></img>
      </div>
      <Tooltip anchorSelect=".question-button" />
    </>
  );
}
export default QuestionButton;
