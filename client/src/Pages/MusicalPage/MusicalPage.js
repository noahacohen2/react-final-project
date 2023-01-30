import * as React from "react";
import AppContext from "../../Context/Context";
import { useContext, useState, useEffect } from "react";
import UpBar from "../../Components/UpBar/UpBar";

const MusicalPage = () => {
  const [currentMusicalId, setCurrentMusicalId] =
    useContext(AppContext).currentMusical;
  const [musicals, setMusicals] = useContext(AppContext).musicals;
  const [currMusical, setCurrMusical] = useState();
  const [user, setUser] = useContext(AppContext).user;

  useEffect(() => {
    setCurrMusical(musicals.find((musical) => musical._id == currentMusicalId));
  }, []);

  return (
    <>
      {user && <UpBar />}
      <div>{currMusical?.Name}</div>
    </>
  );
};

export default MusicalPage;
