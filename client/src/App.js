import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./Pages/LogInPage/LogInPage";
import MusicalsPage from "./Pages/MusicalsPage/MusicalsPage";
import UpBar from "./Components/UpBar/UpBar";
import { useContext } from "react";
import AppContext from "./Context/Context";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/AllMusicals",
    element: <MusicalsPage />,
  },
  {
    path: "/",
    element: <LogInPage />,
  },
]);

const App = () => {
  const [user, setUser] = useContext(AppContext).user;

  return (
    <>
      {user && <UpBar></UpBar>}
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
