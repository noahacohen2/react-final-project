import * as React from "react";
import MusicalCard from "../../Components/MusicalCard/MusicalCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AppContext from "../../Context/Context.js";
import musicalsService from "../../services/musicals.js";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import "./MusicalsPage.css";
import FilterDialog from "../../Components/FilterDialog/FilterDialog.js";

const MusicalsPage = () => {
  const [musicals, setMusicals] = useContext(AppContext).musicals;
  const [searchValue, setSearchValue] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const [cities, setCities] = useState();
  const [minAge, setMinAge] = useState();
  const [minPrice, setMinPrice] = useState();

  const [isFiltePopupOpen, setIsFiltePopupOpen] = useState(false);

  useEffect(() => {
    const getMusicals = () => {
      musicalsService
        .getMusicals()
        .then((res) => {
          setMusicals(res.data);
          setFilterOptions(setCities, "City", res.data);
          setFilterOptions(setMinAge, "MinimumAge", res.data);
          setFilterOptions(setMinPrice, "EventMinimumPrice", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMusicals();
  }, []);

  const setFilterOptions = (setFunc, Feild, musicals) => {
    setFunc([...new Set(musicals.map((musical) => musical[Feild]))]);
  };

  const openFilterPopup = () => {
    setIsFiltePopupOpen(true);
  };

  const checkFilterParam = (filterBy, musical) => {
    return (
      (Object.keys(filterBy) == "city" &&
        Object.values(filterBy) == musical.City) ||
      (Object.keys(filterBy) == "age" &&
        Object.values(filterBy) == musical.MinimumAge) ||
      (Object.keys(filterBy) == "price" &&
        Object.values(filterBy) == musical.EventMinimumPrice)
    );
  };

  const Musicals = () => {
    const musicalsBySearch = musicals.filter((musical) => {
      if (
        (filterArray.length != 0 &&
          filterArray.find((filterBy) =>
            checkFilterParam(filterBy, musical)
          )) ||
        filterArray.length == 0
      )
        if (musical.Name.toLowerCase().includes(searchValue.toLowerCase()))
          return musical;
    });

    return musicalsBySearch?.map((musical, index) => (
      <MusicalCard
        key={index}
        minimumPrice={musical.EventMinimumPrice}
        mainImageUrl={musical.MainImageUrl}
        minimumAge={musical.MinimumAge}
        name={musical.Name}
        city={musical.City}
      />
    ));
  };

  return (
    <>
      <FilterDialog
        cities={cities}
        minAge={minAge}
        minPrice={minPrice}
        isOpen={isFiltePopupOpen}
        closeDialog={() => {
          setIsFiltePopupOpen(false);
        }}
        saveFilterOptions={setFilterArray}
      />
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
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
            <FilterAltOutlinedIcon
              id="filter-icon"
              fontSize="large"
              onClick={openFilterPopup}
            />
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
          {musicals?.length != 0 && Musicals()}
        </Grid>
      </div>
    </>
  );
};

export default MusicalsPage;
