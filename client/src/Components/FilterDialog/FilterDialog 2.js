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
  filterArray, //filter title, key, optional values
  saveFilterOptions,
}) => {
  const [filterByArray, setFilterByArray] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);


  const addToFilterByArray = (key, filterBy) => {
    let currKeyFilter = filterByArray.find(fil => fil.key == key)

    if (!currKeyFilter) {
      filterByArray.push({
        key: key,
        selectedValues: [filterBy]
      })
    } else {
      currKeyFilter.selectedValues.push(filterBy)
    }

    setFilterByArray(filterByArray);
    setActiveFilters((prev) => [...prev, { [key]: filterBy }]);
  };
  const removeFromFilterByArray = (key, removeFilter) => {
    let currKeyFilter = filterByArray.find(fil => fil.key == key)
    let index = currKeyFilter.selectedValues.indexOf(removeFilter);
    if (index != -1) {
      currKeyFilter.selectedValues.splice(index, 1);
    }

    setFilterByArray(filterByArray);

    setActiveFilters((prev) =>
      prev.filter((filterBy) => filterBy[key] !== removeFilter)
    );
  };

  const handleFilterOptionClick = (key, filterOptionValue) => {
    isInFilterArray(key, filterOptionValue)
      ? removeFromFilterByArray(key, filterOptionValue)
      : addToFilterByArray(key, filterOptionValue);
  };

  const isInFilterArray = (key, filterOptionValue) => {
    return activeFilters.find(
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
            className={`filter-options-btn ${isInFilterArray(key, filterOption) ? "clicked" : "unclicked"
              }`}
            onClick={() => {
              handleFilterOptionClick(key, filterOption);
            }}
            variant="outlined"
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

      {filterArray?.map((filter, filterIndex) => (
        <div key={filterIndex}>
          <h2 className="filter-category">{filter.title}</h2>
          {filterBtns(filter.optionalValues, filter.key)}
        </div>
      ))}

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
