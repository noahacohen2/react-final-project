import * as React from "react";
import Dialog from "@mui/material/Dialog";
import "./FilterDialog.css";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const FilterDialog = ({
  isOpen,
  closeDialog,
  cities,
  minPrice,
  minAge,
  saveFilterOptions,
}) => {
  const [filterByArray, setFilterByArray] = useState([]);

  const addToFilterByArray = (key, filterBy) => {
    setFilterByArray((prev) => [...prev, { [key]: filterBy }]);
  };
  const removeFromFilterByArray = (key, removeFilter) => {
    setFilterByArray((prev) =>
      prev.filter((filterBy) => filterBy[key] !== removeFilter)
    );
  };

  const handleFilterOptionClick = (key, filterOptionValue) => {
    isInFilterArray(key, filterOptionValue)
      ? removeFromFilterByArray(key, filterOptionValue)
      : addToFilterByArray(key, filterOptionValue);
  };

  const isInFilterArray = (key, filterOptionValue) => {
    return filterByArray.find(
      (filterOption) => filterOption[key] === filterOptionValue
    );
  };

  const filterBtns = (options, key) => {
    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        className="filter-category"
      >
        {options?.map((filterOption, index) => (
          <Button
            key={index}
            className={`filter-options-btn ${
              isInFilterArray(key, filterOption) ? "clicked" : "unclicked"
            }`}
            onClick={() => {
              handleFilterOptionClick(key, filterOption);
            }}
          >
            {filterOption}
          </Button>
        ))}
      </Grid>
    );
  };

  return (
    <Dialog onClose={closeDialog} open={isOpen} fullWidth>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        id="dialog-header"
      >
        <div id="dialog-title">Filters</div>
        <CloseIcon onClick={closeDialog} fontSize="large" id="x-icon" />
      </Grid>
      <h2 className="filter-category">City</h2>

      {filterBtns(cities, "city")}
      <h2 className="filter-category">Minimum age</h2>
      {filterBtns(minAge, "age")}
      <h2 className="filter-category">Minimum Price</h2>
      {filterBtns(minPrice, "price")}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          id="filter-btn"
          onClick={() => {
            saveFilterOptions(filterByArray);
            closeDialog();
          }}
        >
          Filter
        </Button>
      </Grid>
    </Dialog>
  );
};

export default FilterDialog;
