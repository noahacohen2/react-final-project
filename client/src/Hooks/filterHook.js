import { useState } from "react";

const filterKeys = {
    "reviews": [
        {
            key: "Seat",
            title: "Seat"
        },
        {
            key: "Stars",
            title: "Stars"
        },
        {
            key: "Musical",
            title: "Musical"
        }
    ],
    "musicals": [
        {
            key: "City",
            title: "City"
        },
        {
            key: "MinimumAge",
            title: "Minimum age"
        },
        {
            key: "EventMinimumPrice",
            title: "Price"
        }
    ],
}


const useFilter = ((type) => {

    const [filterArray, setFilterArray] = useState([]);

    const buildFilterArray = (List) => {
        let filterData = filterKeys[type];

        filterData.forEach(fil => {
            fil.optionalValues = [];
        });

        const setFilterOptionalValues = (filterKey, List) => {
            let currFilter = filterData.find((fil) => fil.key == filterKey);
            currFilter.optionalValues = [
                ...new Set(List.map((element) => element[filterKey])),
            ];
        };
        if (List) {
            filterData.forEach(filterKey => {
                setFilterOptionalValues(filterKey.key, List);
            });

            setFilterArray(filterData)
        }
        return filterData;
    }

    const checkFilterParam = (element, currFilter) => {
        let isOk = true;
        filterArray.forEach((filter) => {
            let currentFilterValues;
            if (currFilter.find((curr) => curr.key == filter.key)) {
                currentFilterValues = currFilter.find(
                    (curr) => curr.key == filter.key
                ).selectedValues;

                isOk =
                    isOk &&
                    (currentFilterValues.length == 0 ||
                        currentFilterValues.some((value) => value === element[filter.key]));
            }
        })

        return isOk
    }

    return { buildFilterArray, checkFilterParam };
});

export default useFilter;