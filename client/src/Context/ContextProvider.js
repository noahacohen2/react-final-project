import AppContext from "./Context";
import { useState } from "react";

const ConetxtProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [musicals, setMusicals] = useState([]);
  const [currentMusicalId, setCurrentMusicalId] = useState();

  const contextData = {
    user: [user, setUser],
    musicals: [musicals, setMusicals],
    currentMusical: [currentMusicalId, setCurrentMusicalId],
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default ConetxtProvider;
