import axios from "axios";
import { filterHasil } from "../Functions/utility";

export function filterAndSortList(searchString, sortOption) {
  return (dispatch, getState) => {
    const listTransaction = getState().listTransaction;
    const filteredList = filterHasil(listTransaction, searchString);
    const sortedList = filteredList.sort((a, b) => {
      switch (sortOption) {
        case "nameASC":
          return a.beneficiary_name > b.beneficiary_name
            ? 1
            : a.beneficiary_name < b.beneficiary_name
            ? -1
            : 0;
        case "nameDESC":
          return a.beneficiary_name < b.beneficiary_name
            ? 1
            : a.beneficiary_name > b.beneficiary_name
            ? -1
            : 0;
        case "timeASC":
          return a.created_at < b.created_at
            ? 1
            : a.created_at > b.created_at
            ? -1
            : 0;
        case "timeDESC":
          return a.created_at > b.created_at
            ? 1
            : a.created_at < b.created_at
            ? -1
            : 0;
        default:
          return 0;
      }
    });

    dispatch({ type: "List/SetFilteredSorted", payload: sortedList });
  };
}

export function getDataTransaction() {
  return async (dispatch) => {
    try {
      let result = [];
      const { data } = await axios({
        url: "https://nextar.flip.id/frontend-test",
        method: "get",
      });
      for (const key in data) {
        result.push(data[key]);
      }
      dispatch({ type: "List/SetList", payload: result });
      //   console.log(Object.keys(data));
    } catch (err) {
      console.log(err);
    }
  };
}
