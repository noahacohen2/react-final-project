import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from './Pages/LogInPage/LogInPage';
import MusicalsPage from './Pages/MusicalsPage/MusicalsPage';
import UpBar from "./Components/UpBar/UpBar"
import { useContext, useEffect } from 'react';
import AppContext from "./Context/Context";

const router = createBrowserRouter([
  {
    path: "/AllMusicals",
    element: <MusicalsPage />
  },
  {
    path: "/",
    element: <LogInPage />,
  },
]);

function App() {
  const [userID, setUserID] = useContext(AppContext).userID;

  useEffect(() => {
    console.log(userID);
  }, [userID]);

  return (
    <>
      {
        userID && (<UpBar></UpBar>)
      }
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  );
}

export default App;
