import * as React from "react";
import AppContext from "../../Context/Context";
import { useContext, useState, useEffect } from "react";
const MusicalPage = () => {
  const [currentMusicalId, setCurrentMusicalId] =
    useContext(AppContext).currentMusical;
  const [musicals, setMusicals] = useContext(AppContext).musicals;
  const [currMusical, setCurrMusical] = useState();

  useEffect(() => {
    setCurrMusical(musicals.find((musical) => musical._id == currentMusicalId));
  }, []);

  return <div></div>;
};

export default MusicalPage;
