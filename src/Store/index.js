import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  sorting: "default",
  listTransaction: [],
  listFilteredSorted: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "List/SetList":
      return { ...state, listTransaction: payload };
    case "List/SetFilteredSorted":
      return { ...state, listFilteredSorted: payload };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
