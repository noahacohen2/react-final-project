import * as React from "react";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import "./UpBar.css";

const UpBar = () => {
  return (
    <Toolbar id="up-bar">
      <div id="site-name">Olaf</div>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button id="up-bar-profile-btn" variant="text">
          profile
        </Button>
        <Button id="up-bar-logout-btn" variant="outlined">
          Log Out
        </Button>
      </Grid>
    </Toolbar>
  );
};

export default UpBar;
