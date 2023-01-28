import * as React from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AppContext from "../../Context/Context";
import "./UpBar.css";

const UpBar = () => {

  const [user, setUser] = useContext(AppContext).user;
  const navigate = useNavigate();

  const logOutHandler = () => {
    setUser(undefined);
    navigate('/', { replace: true });
  }

  return (
    <Toolbar id="up-bar">
      <div id="site-name">Olaf</div>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Link to="/profile">
          <Button id="up-bar-profile-btn" variant="text">
            profile
          </Button>
        </Link>
        <Button id="up-bar-logout-btn" variant="outlined" onClick={logOutHandler}>
          Log Out
        </Button>
      </Grid>
    </Toolbar >
  );
};

export default UpBar;
