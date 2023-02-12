import AppContext from "./Context";
import { useState, useEffect } from "react";

const ConetxtProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [musicals, setMusicals] = useState([]);
  const [currentMusicalId, setCurrentMusicalId] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("user") != "undefined") {
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
    isLoading: [isLoading, setLoading],
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default ConetxtProvider;
