import * as React from "react";
import "./MusicalCard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../Context/Context";

const MusicalCard = ({ musical }) => {
  const navigate = useNavigate();
  const [currentMusical, setCurrentMusical] =
    useContext(AppContext).currentMusical;

  return (
    <div
      id="musical-card"
      onClick={() => {
        setCurrentMusical(musical._id);
        navigate("/Musical");
      }}
    >
      <img id="musical-card-img" src={musical.MainImageUrl} />
      <span id="musical-card-title">{musical.Name} </span>
      <span>({musical.MinimumAge}+)</span>
      <div className="musical-card-data">{musical.City}</div>
      <div className="musical-card-data">From {musical.EventMinimumPrice}$</div>
    </div>
  );
};

export default MusicalCard;
