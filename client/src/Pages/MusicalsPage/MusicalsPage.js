import * as React from "react";
import MusicalCard from "../../Components/MusicalCard/MusicalCard";
import AppContext from "../../Context/Context.js";
import musicalsService from "../../services/musicals.js";
import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./MusicalsPage.css";

const MusicalsPage = () => {
  const [musicals, setMusicals] = useContext(AppContext).musicals;

  useEffect(() => {
    const getMusicals = () => {
      musicalsService
        .getMusicals()
        .then((res) => {
          setMusicals(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMusicals();
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        id="musical-page-title"
      >
        <h1>Musicals in London and New York You Can't Miss</h1>
        <div>Find the best musical for you</div>
      </Grid>
      <div id="musicals-page">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          id="center-content"
        >
          {musicals?.length != 0 &&
            musicals?.map((musical, index) => (
              <MusicalCard
                key={index}
                minimumPrice={musical.EventMinimumPrice}
                mainImageUrl={musical.MainImageUrl}
                minimumAge={musical.MinimumAge}
                name={musical.Name}
              />
            ))}
        </Grid>
      </div>
    </>
  );
};

export default MusicalsPage;
