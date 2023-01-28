import AppContext from "./Context";
import { useState } from "react";

const ConetxtProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [musicals, setMusicals] = useState([]);

  const contextData = {
    user: [user, setUser],
    musicals: [musicals, setMusicals],
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default ConetxtProvider;
