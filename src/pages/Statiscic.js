import "../style/text.scss";
import NavButton from "../global/NavButton";

function Statistic() {
  return (
    <div className="page">
      <div className="theme">Statystyki</div>
      <div className="text-area-wrapper">
        <div className="cell"> Fukcjonalność zostanie dodana wkrótce.</div>

        <div className="button-wrapper">
          <NavButton to={"/account"} title={"Powrót"}></NavButton>
        </div>
      </div>
    </div>
  );
}
export default Statistic;
