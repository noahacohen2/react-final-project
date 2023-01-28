import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./Pages/LogInPage/LogInPage";
import MusicalsPage from "./Pages/MusicalsPage/MusicalsPage";
import MusicalPage from "./Pages/MusicalPage/MusicalPage";
import UpBar from "./Components/UpBar/UpBar";
import { useContext } from "react";
import AppContext from "./Context/Context";

const router = createBrowserRouter([
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
  const [userID, setUserID] = useContext(AppContext).userID;

  return (
    <>
      {userID && <UpBar></UpBar>}
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
