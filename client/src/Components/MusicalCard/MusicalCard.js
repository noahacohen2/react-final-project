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
        navigate("/Musical", { replace: true });
      }}
    >
      <img id="musical-card-img" src={musical.MainImageUrl} />
      <div id="musical-card-title">{musical.Name}</div>
      <div>Min Price: {musical.EventMinimumPrice}</div>
      <div>Min Age: {musical.MinimumAge}</div>
      <div>City: {musical.City}</div>
      {
        // TODO
      }
    </div>
  );
};

export default MusicalCard;
