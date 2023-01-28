import AppContext from "./Context";
import { useState } from "react";

const ConetxtProvider = ({ children }) => {
  const [userID, setUserID] = useState(undefined);
  const [musicals, setMusicals] = useState([]);

  const contextData = {
    userID: [userID, setUserID],
    musicals: [musicals, setMusicals],
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default ConetxtProvider;
