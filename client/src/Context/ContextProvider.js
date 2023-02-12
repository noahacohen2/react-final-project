import AppContext from "./Context";
import { useState, useEffect } from "react";
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://127.0.0.1:8000';

const ConetxtProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [musicals, setMusicals] = useState([]);
  const [currentMusicalId, setCurrentMusicalId] = useState();
  const [isLoading, setLoading] = useState(false);

  const { getWebSocket } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

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
    WebSocket: [getWebSocket]
  };

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default ConetxtProvider;
