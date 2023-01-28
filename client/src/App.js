import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./Pages/LogInPage/LogInPage";
import MusicalsPage from "./Pages/MusicalsPage/MusicalsPage";
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

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
