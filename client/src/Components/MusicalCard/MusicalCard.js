import * as React from "react";
import "./MusicalCard.css";

const MusicalCard = ({
  minimumPrice,
  mainImageUrl,
  minimumAge,
  name,
  city,
}) => {
  return (
    <div id="musical-card">
      <img id="musical-card-img" src={mainImageUrl} />
      <div id="musical-card-title">{name}</div>
      <div>Min Price: {minimumPrice}</div>
      <div>Min Age: {minimumAge}</div>
      <div>City: {city}</div>
      {
        // TODO
      }
    </div>
  );
};

export default MusicalCard;
