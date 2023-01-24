import * as React from "react";
import MusicalCard from "../../Components/MusicalCard/MusicalCard";
import Grid from "@mui/material/Grid";
import "./MusicalsPage.css";

const MusicalsPage = () => {
  const tempData = [
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
    <MusicalCard />,
  ];

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <h1>Musicals in London and New York You Can't Miss</h1>
        <div>Find the best musical for you</div>
      </Grid>
      <div id="musicals-page">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          id="center-content"
        >
          {tempData}
        </Grid>
      </div>
    </>
  );
};

export default MusicalsPage;
