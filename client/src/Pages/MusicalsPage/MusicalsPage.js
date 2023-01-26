import * as React from "react";
import MusicalCard from "../../Components/MusicalCard/MusicalCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AppContext from "../../Context/Context.js";
import musicalsService from "../../services/musicals.js";
import { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
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
        <div id="actions-area">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <div id="search">
              <TextField
                fullWidth
                size="small"
                color="primary"
                variant="outlined"
                label="Search"
              />
            </div>
            <FilterAltOutlinedIcon id="filter-icon" fontSize="large" />
          </Grid>
        </div>
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
                city={musical.City}
              />
            ))}
        </Grid>
      </div>
    </>
  );
};

export default MusicalsPage;
