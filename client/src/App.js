import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import LogInPage from "./Pages/LogInPage/LogInPage";
import MusicalsPage from "./Pages/MusicalsPage/MusicalsPage";
import MusicalPage from "./Pages/MusicalPage/MusicalPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Loader from "./Components/Loader/Loader.js";
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://127.0.0.1:8000';

const router = createBrowserRouter([
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/AllMusicals",
    element: <MusicalsPage />,
  },
  {
    path: "/Musical",
    element: <MusicalPage />,
  },
  {
    path: "/",
    element: <LogInPage />,
  },
]);

const App = () => {
  // const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);

  // useEffect(() => {
  //   sendMessage("daniel")
  // }, []);

  return (
    <>
      <Loader />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
