import AppContext from "./Context";
import { useState, useEffect } from "react";

const ConetxtProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [musicals, setMusicals] = useState([]);
  const [currentMusicalId, setCurrentMusicalId] = useState();

  useEffect(() => {
    console.log("user effect")
    const getUser = async () => {
      if (localStorage.getItem("user")) {
        return await setUser(JSON.parse(localStorage.getItem("user")));
      }
    };

    getUser().then((data) => {
      return;
    });
  }, []);

  const setUserStorage = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const contextData = {
    user: [user, setUserStorage],
    musicals: [musicals, setMusicals],
    currentMusical: [currentMusicalId, setCurrentMusicalId],
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default ConetxtProvider;
