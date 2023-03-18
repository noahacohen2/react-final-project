import * as React from "react";
import MusicalCard from "../../Components/MusicalCard/MusicalCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AppContext from "../../Context/Context.js";
import musicalsService from "../../Services/musicals";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import "./MusicalsPage.css";
import FilterDialog from "../../Components/FilterDialog/FilterDialog.js";
import UpBar from "../../Components/UpBar/UpBar";
import useFilter from "../../Hooks/filterHook"

const MusicalsPage = () => {
  const [user, setUser] = useContext(AppContext).user;
  const [musicals, setMusicals] = useContext(AppContext).musicals;
  const [isLoading, setLoading] = useContext(AppContext).isLoading;
  const [searchValue, setSearchValue] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const [currFilter, setCurrFilter] = useState([]);
  const [isFiltePopupOpen, setIsFiltePopupOpen] = useState(false);
  const { buildFilterArray, checkFilterParam } = useFilter("musicals");

  useEffect(() => {
    setLoading(true);
    const setFilterOptionalValues = (filterKey, tempFilter, AllMusicals) => {
      let currFilter = tempFilter.find((fil) => fil.key == filterKey);
      currFilter.optionalValues = [
        ...new Set(AllMusicals.map((musical) => musical[filterKey])),
      ];
    };
    let tempFilter = [
      {
        key: "City",
        title: "City",
        optionalValues: [],
      },
      {
        key: "MinimumAge",
        title: "Minimum age",
        optionalValues: [],
      },
      {
        key: "EventMinimumPrice",
        title: "Price",
        optionalValues: [],
      },
    ];
    const getMusicals = () => {
      musicalsService
        .getMusicals()
        .then((res) => {
          setMusicals(res.data);
          setFilterArray(buildFilterArray(res.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getMusicals();
  }, []);

  const openFilterPopup = () => {
    setIsFiltePopupOpen(true);
  };

  const Musicals = () => {
    const musicalsBySearch = musicals.filter((musical) => {
      if (
        (currFilter.length != 0 && checkFilterParam(musical, currFilter)) ||
        currFilter.length == 0
      ) {
        if (musical.Name.toLowerCase().includes(searchValue.toLowerCase())) {
          return true;
        }
      }
    });

    return musicalsBySearch?.map((musical, index) => (
      <MusicalCard
        key={index}
        musical={musical}
        setMusicalImg={setMusicalImg}
      />
    ));
  };

  const setMusicalImg = (musicalId) => {
    setMusicals(
      musicals.map((musical) => {
        if (musical._id == musicalId)
          musical.MainImageUrl =
            "https://www.londontheatredirect.com/images/Event/TheLionKing/The-Lion-King-6828.jpg";
        return musical;
      })
    );
  };
  return (
    <>
      {user && <UpBar />}
      <FilterDialog
        filterArray={filterArray}
        isOpen={isFiltePopupOpen}
        closeDialog={() => {
          setIsFiltePopupOpen(false);
        }}
        saveFilterOptions={setCurrFilter}
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
