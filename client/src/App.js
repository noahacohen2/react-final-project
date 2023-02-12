import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./Pages/LogInPage/LogInPage";
import MusicalsPage from "./Pages/MusicalsPage/MusicalsPage";
import MusicalPage from "./Pages/MusicalPage/MusicalPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Loader from "./Components/Loader/Loader.js";

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
  return (
    <>
      <Loader />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
